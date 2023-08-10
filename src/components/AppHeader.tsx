'use client'
import * as React from 'react'
import { useEffect } from 'react'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Web3 } from 'web3'
import { ContractContext, pairAbi } from '@/web3/abi/pair-abi'
import { CONTRACT } from '@/web3/contractList'

const pages = [
  { text: 'Kiosk', href: '/kiosk' },
  { text: 'Manager', href: '/manager' },
]

export default function AppHeader() {
  useEffect(() => {
    const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.klaytnTestnet as string))
    const contract = new web3.eth.Contract(
      pairAbi,
      CONTRACT.WDOT_USDT_PAIR
    ) as unknown as ContractContext
    const subscription = web3.eth.subscribe('newBlockHeaders').then((res) =>
      res.on('data', () => {
        contract.methods
          .getReserves()
          .call()
          .then((res) => console.log(`reserve0: ${res.reserve0}, reserve1: ${res.reserve1}`))
      })
    )
  }, [])
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: 'primary.light',
        zIndex: 1000,
        height: '4rem',
        alignItems: 'center',
      }}
    >
      <Toolbar
        sx={{ width: '75rem', flexGrow: 1, display: 'flex', justifyContent: 'space-around' }}
      >
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          TokeИest
        </Typography>
        {pages.map(({ text, href }) => (
          <Button key={text} href={href} sx={{ my: 2, color: 'white', display: 'block' }}>
            {text}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  )
}
