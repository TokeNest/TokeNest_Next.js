import ImageIcon from '@mui/icons-material/Image'
import CloseIcon from '@mui/icons-material/Close'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import {
  Avatar,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import * as React from 'react'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default function KioskCartBody() {
  return (
    <CardContent sx={{ height: 8 / 10 }}>
      <List>
        <KioskListItem />
        <KioskListItem />
      </List>
    </CardContent>
  )
}

function KioskListItem() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)
  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="open" onClick={handleOpen}>
            <KeyboardArrowDown
              sx={{
                transform: `rotate(${open ? 180 : 0}deg)`,
                transition: '0.2s',
              }}
            />
          </IconButton>
        }
      >
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
      <Collapse in={open} timeout="auto" unmountOnExit>
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
          <ListItem>
            <ListItemText primary="사이즈" />
          </ListItem>
        </List>
      </Collapse>
    </>
  )
}
