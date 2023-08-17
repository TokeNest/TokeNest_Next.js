/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random',
      },
    ],
  },
  env: {
    infuraKey: process.env.INFURA_KEY,
    alchemyKey: process.env.ALCHEMY_KEY,
    walletConnectProjectId: process.env.WALLET_CONNECT_PROJECT_ID,
    klaytnTestnet: process.env.BAOBAB_TESTNET_RPC_URL,
    apiBaseUrl: process.env.API_BASE_URL,
    mongodbUrl: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  },
}

module.exports = nextConfig
