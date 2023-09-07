'use client'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Web3 } from 'web3'
import { factoryAbi, FactoryContractContext } from '@/web3/abi/factory-abi'
import { DEX_CONTRACT } from '@/variables/enum/web3-enum'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { MarketInfo } from '@/variables/interface/web3-interface'
import { axiosFetcher } from '@/utils/component/api-fetcher-util'
import { setMarketList, updateMarketPrice } from '@/redux/slice/market-slice'
import BigNumber from 'bignumber.js'

interface Web3SocketContextType {
  blockHeight: string
  setBlockHeight: React.Dispatch<React.SetStateAction<string>>
}
export const Web3SocketContext = createContext<Web3SocketContextType>({
  blockHeight: '0',
  setBlockHeight: () => {},
})

const rpcUrl = process.env.rpcUrl ?? 'wss://public-en-baobab.klaytn.net/ws'
export default function Web3SocketProvider({ children }: { children: React.ReactNode }) {
  const web3 = useMemo(() => new Web3(new Web3.providers.WebsocketProvider(rpcUrl)), [])
  const dexFactoryContract = useMemo(
    () =>
      new web3.eth.Contract(factoryAbi, DEX_CONTRACT.FACTORY) as unknown as FactoryContractContext,
    [web3.eth.Contract]
  )
  const [blockHeight, setBlockHeight] = useState('0')
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const subscribe = async () => {
      const { data }: { data: MarketInfo[] } = await axiosFetcher('web3/market')
      dispatch(setMarketList(data))
      const pairList = data.map(({ market }) => market)
      const subscription = await web3.eth.subscribe('newBlockHeaders')
      subscription.on('data', async (blockHeader) => {
        if (blockHeader.number) {
          setBlockHeight(blockHeader.number.toString())
        }
        const { token0Values, token1Values } = await dexFactoryContract.methods
          .getTokenValues(pairList)
          .call()
        dispatch(
          updateMarketPrice(
            pairList.map((market, i) => ({
              market,
              tokenA: new BigNumber(token0Values[i])
                .div(new BigNumber(10).exponentiatedBy(18))
                .toString(),
              tokenB: new BigNumber(token1Values[i])
                .div(new BigNumber(10).exponentiatedBy(18))
                .toString(),
            }))
          )
        )
      })
      return () => subscription.removeAllListeners()
    }
    subscribe()
  }, [dexFactoryContract.methods, dispatch, web3.eth])

  return (
    <Web3SocketContext.Provider value={{ blockHeight, setBlockHeight }}>
      {children}
    </Web3SocketContext.Provider>
  )
}

export const useWeb3SocketContext = () => useContext(Web3SocketContext)
