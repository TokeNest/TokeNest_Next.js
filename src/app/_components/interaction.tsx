'use client'
import { useWeb3SocketContext } from '@/web3/Web3SocketProvider'
import Chip from '@mui/material/Chip'
import * as React from 'react'
import klaytnLogo from '/public/klaytn-logo.png'
import { Avatar } from '@mui/material'
import Typography from '@mui/material/Typography'

export default function Web3HealthChecker() {
  const { blockHeight } = useWeb3SocketContext()
  return (
    <Chip
      sx={{
        justifyContent: 'left',
        width: 240,
        px: 1,
        '& .MuiChip-avatar': { width: 16, height: 16 },
      }}
      avatar={<Avatar src={klaytnLogo.src} />}
      color="secondary"
      label={<Typography variant="button">BlockHeight | {blockHeight}</Typography>}
    />
  )
}
