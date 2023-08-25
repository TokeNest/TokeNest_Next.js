'use client'
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import * as React from 'react'
import { useCallback, useEffect } from 'react'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { metaMask, metaMaskHooks } from '@/web3/connectors/metaMask'
import { network, networkHooks } from '@/web3/connectors/network'
import { Web3 } from 'web3'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { setMarketList, updateMarketPrice } from '@/redux/slice/market-slice'
import { axiosFetcher } from '@/utils/component/api-fetcher-util'
import { MarketInfo } from '@/variables/interface/web3-interface'
import { factoryAbi, FactoryContractContext } from '@/web3/abi/factory-abi'
import { DEX_CONTRACT } from '@/variables/enum/web3-enum'
import BigNumber from 'bignumber.js'

const connectors: [MetaMask | Network, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [network, networkHooks],
]
export default function Web3Provider({ children }: { children: React.ReactNode }) {
  const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.klaytnTestnet as string))
  const dispatch = useDispatch<AppDispatch>()

  const subscribe = useCallback(async () => {
    const dexFactoryContract = new web3.eth.Contract(
      factoryAbi,
      DEX_CONTRACT.FACTORY
    ) as unknown as FactoryContractContext
    const { data }: { data: MarketInfo[] } = await axiosFetcher('web3/market')
    dispatch(setMarketList(data))

    const pairList = data.map(({ market }) => market)

    const subscription = await web3.eth.subscribe('newBlockHeaders')
    subscription.on('data', async () => {
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
  }, [dispatch, web3.eth])

  useEffect(() => {
    subscribe()
  }, [subscribe])

  return <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
}
