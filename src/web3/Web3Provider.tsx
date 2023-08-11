'use client'
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import * as React from 'react'
import { useEffect } from 'react'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { metaMask, metaMaskHooks } from '@/web3/connectors/metaMask'
import { network, networkHooks } from '@/web3/connectors/network'
import { Web3 } from 'web3'
import { useAppSelector } from '@/redux/store'

const connectors: [MetaMask | Network, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [network, networkHooks],
]
export const Web3ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { marketList } = useAppSelector(({ marketReducer }) => marketReducer.value)
  useEffect(() => {
    const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.klaytnTestnet as string))
    const getSubscribe = async () => {
      const subscription = await web3.eth.subscribe('newBlockHeaders')
      subscription.on('data', async () => console.log(marketList))
    }
    getSubscribe()
  }, [])
  return <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
}
