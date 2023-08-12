'use client'
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import * as React from 'react'
import { useCallback, useEffect } from 'react'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { metaMask, metaMaskHooks } from '@/web3/connectors/metaMask'
import { network, networkHooks } from '@/web3/connectors/network'
import { Web3 } from 'web3'
import { axiosFetcher } from '@/utils/api-fetcher'
import { MarketInfo } from '@/variables/interface/web3'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { setMarketList } from '@/redux/slice/market-slice'

const connectors: [MetaMask | Network, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [network, networkHooks],
]
export const Web3ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { marketList } = useAppSelector(({ marketReducer }) => marketReducer)
  const marketSubscription = useCallback(() => {
    console.log(marketList)
  }, [marketList])
  useEffect(() => {
    const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.klaytnTestnet as string))
    const getSubscribe = async () => {
      const { data }: { data: MarketInfo[] } = await axiosFetcher('web3/market')
      dispatch(setMarketList(data))
      const subscription = await web3.eth.subscribe('newBlockHeaders')
      subscription.on('data', async () => marketSubscription())
    }
    getSubscribe()
  }, [dispatch, marketSubscription])
  return <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
}
