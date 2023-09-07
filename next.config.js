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
    domains: ['localhost', '*'],
  },
  env: {
    rpcUrl: process.env.RPC_URL,
    apiBaseUrl: process.env.API_BASE_URL,
    mongodbUrl: process.env.MONGODB_URL,
    jwtSecret: process.env.JWT_SECRET,
    storeId: process.env.STORE_ID,
  },
}

module.exports = nextConfig
