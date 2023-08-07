import { AddEthereumChainParameter } from '@web3-react/types'
import * as process from 'process'

const KLAY: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Klay',
  symbol: 'KLAY',
  decimals: 18,
}
interface BasicChainInformation {
  urls: string[]
  name: string
}
interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency']
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls']
}

type ChainConfig = { [chainId: number]: BasicChainInformation | ExtendedChainInformation }

const getInfuraUrlFor = (network: string) =>
  network === 'Baobab'
    ? 'https://public-en-baobab.klaytn.net'
    : `https://${network}.infura.io/v3/${process.env.infuraKey}`

export const MAINNET_CHAINS: ChainConfig = {
  8217: {
    urls: [getInfuraUrlFor('mainnet')].filter(Boolean),
    nativeCurrency: KLAY,
    name: 'Mainnet',
  },
}

export const TESTNET_CHAINS: ChainConfig = {
  1001: {
    urls: [getInfuraUrlFor('Baobab')].filter(Boolean),
    nativeCurrency: KLAY,
    name: 'Baobab',
  },
}

export const CHAINS: ChainConfig = {
  ...MAINNET_CHAINS,
  ...TESTNET_CHAINS,
}
export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{
  [chainId: number]: string[]
}>((acc, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls
  if (validURLs.length) {
    acc[Number(chainId)] = validURLs
  }
  return acc
}, {})
