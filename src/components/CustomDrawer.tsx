import { Drawer } from '@mui/material'
import Box from '@mui/material/Box'
import * as React from 'react'
import Card from '@mui/material/Card'

export const CustomDrawer = ({
  open,
  onClose,
  container,
}: {
  open: boolean
  onClose: React.Dispatch<any>
  container: any
}) => {
  return (
    <Drawer
      container={container}
      anchor="right"
      ModalProps={{
        disableAutoFocus: true,
      }}
      open={open}
      hideBackdrop={true}
      keepMounted={true}
      sx={{
        position: 'relative',
        height: '100%',
        '& .MuiDrawer-root': {
          position: 'relative',
        },
        '& .MuiDrawer-paper': {
          position: 'absolute',
          height: '100%',
          width: 1000,
        },
      }}
    >
      <Box sx={{ p: 4 }} onClick={onClose}>
        <Card>test</Card>
      </Box>
    </Drawer>
  )
}
