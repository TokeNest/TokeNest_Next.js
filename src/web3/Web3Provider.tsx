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
import { setMarketList, setMarketPrice } from '@/redux/slice/market-slice'
import { axiosFetcher } from '@/utils/api-fetcher-util'
import { MarketInfo } from '@/variables/interface/web3'
import { ContractContext, pairAbi } from '@/web3/abi/pair-abi'
import BigNumber from 'bignumber.js'

const connectors: [MetaMask | Network, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [network, networkHooks],
]
export default function Web3Provider({ children }: { children: React.ReactNode }) {
  const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.klaytnTestnet as string))
  const dispatch = useDispatch<AppDispatch>()

  const subscribe = useCallback(async () => {
    const { data }: { data: MarketInfo[] } = await axiosFetcher('web3/market')
    dispatch(setMarketList(data))
    const marketContractList = data.map(
      ({ market }) => new web3.eth.Contract(pairAbi, market) as unknown as ContractContext
    )
    const subscription = await web3.eth.subscribe('newBlockHeaders')
    subscription.on('data', async () => {
      for (const marketContract of marketContractList) {
        const { token0Value, token1Value } = await marketContract.methods.getTokenValue().call()
        dispatch(
          setMarketPrice({
            market: marketContract.options.address,
            token0Value: new BigNumber(token0Value).toString(),
            token1Value: new BigNumber(token1Value).toString(),
          })
        )
      }
    })

    return () => subscription.removeAllListeners()
  }, [dispatch, web3.eth])

  useEffect(() => {
    subscribe()
  }, [subscribe])

  return <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
}
