import { Drawer } from '@mui/material'
import * as React from 'react'
import { useAppSelector } from '@/redux/store'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { OrderInfo } from '@/app/kiosk/order-info'

const customDrawerTheme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        root: ({ theme }) => {
          return theme.unstable_sx({})
        },
      },
    },
  },
})

export const CustomDrawer = ({ container }: { container: HTMLDivElement | null }) => {
  const { isShow, data } = useAppSelector(({ drawerReducer }) => drawerReducer.value)
  return (
    <ThemeProvider theme={customDrawerTheme}>
      <Drawer
        anchor="right"
        ModalProps={{
          disableAutoFocus: true,
          container: container,
          sx: {
            width: 1,
            height: 1,
            top: 0,
            bottom: 'auto',
            left: 'auto',
            right: 'auto',
            position: 'absolute',
          },
        }}
        PaperProps={{
          elevation: 5,
          sx: {
            position: 'absolute',
            width: 8 / 10,
            height: 1,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
          },
        }}
        open={isShow}
        hideBackdrop={false}
        keepMounted={false}
      >
        <Container
          sx={{
            height: 1,
          }}
          children={<OrderInfo product={data} />}
        />
      </Drawer>
    </ThemeProvider>
  )
}
