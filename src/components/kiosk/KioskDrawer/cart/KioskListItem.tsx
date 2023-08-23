import * as React from 'react'
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'
import {
  ListItemDetailInfo,
  OpenDetailInfoBtn,
} from '@/components/kiosk/KioskDrawer/cart/interaction'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'

export default function KioskListItem() {
  return (
    <>
      <ListItem secondaryAction={<OpenDetailInfoBtn />}>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography variant="h4" fontWeight="bold">
                아메리카노
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexGrow: 1,
                }}
              >
                <CloseIcon fontSize="large" color="action" sx={{ mx: 1 }} />
                <Typography variant="h4">3</Typography>
              </Box>
              <Typography variant="h4" align="right" fontWeight="bold">
                7,880원
              </Typography>
            </>
          }
          sx={{ '& .MuiTypography-body1': { display: 'flex' } }}
        />
      </ListItem>
      <ListItemDetailInfo>
        <List sx={{ pl: 4, '& .MuiTypography-body1': { display: 'flex' } }}>
          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="h6">사이즈</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <HorizontalRuleIcon fontSize="small" color="action" sx={{ mx: 1 }} />
                    <Typography>VENTI</Typography>
                  </Box>
                </>
              }
            />
          </ListItem>
          <Divider />
        </List>
      </ListItemDetailInfo>
    </>
  )
}
