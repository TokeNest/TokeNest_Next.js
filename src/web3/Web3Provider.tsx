'use client'
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import * as React from 'react'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { metaMask, metaMaskHooks } from '@/web3/connectors/metaMask'
import { network, networkHooks } from '@/web3/connectors/network'

const connectors: [MetaMask | Network, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [network, networkHooks],
]
export default function Web3Provider({ children }: { children: React.ReactNode }) {
  return <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
}
