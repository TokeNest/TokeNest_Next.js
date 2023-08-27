import * as React from 'react'
import {
  Avatar,
  ButtonGroup,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'
import {
  ListItemCalculatePrice,
  ListItemDetailInfo,
  OpenDetailInfoBtn,
  QuantityButtonGroup,
} from '@/components/kiosk/KioskDrawer/cart/interaction'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import {
  Option,
  OptionGroup,
  OrderProductOptionGroup,
  Product,
} from '@/variables/interface/kiosk-interface'

export default function KioskListItem({
  product: { productName, productPrice, optionGroups },
  productQuantity,
  optionGroupsInfo,
}: {
  product: Product
  productQuantity: number
  optionGroupsInfo: OrderProductOptionGroup[]
}) {
  const selectGroupOptions = optionGroupsInfo.map(({ optionGroupId: groupId, optionIds }) => {
    const { optionGroupName, options } = optionGroups.find(
      ({ optionGroupId }) => optionGroupId === groupId
    ) as OptionGroup
    return {
      optionGroupName,
      options: options.find(({ optionId }) => optionIds.includes(optionId)) as Option,
    }
  })
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
                {productName}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexGrow: 1,
                }}
              >
                <CloseIcon fontSize="large" color="action" sx={{ mx: 1 }} />
                <Typography variant="h4">{productQuantity}</Typography>
              </Box>
              <ListItemCalculatePrice
                quantity={productQuantity}
                productPrice={productPrice}
                options={selectGroupOptions.map(({ options }) => options)}
              />
            </>
          }
          sx={{ '& .MuiTypography-body1': { display: 'flex' } }}
        />
      </ListItem>
      <ListItemDetailInfo>
        <List
          sx={{ pl: 4, flexGrow: 1, minHeight: 240, '& .MuiTypography-body1': { display: 'flex' } }}
        >
          {selectGroupOptions.map(({ optionGroupName, options: { optionId, optionName } }) => {
            return (
              <ListItem key={optionId}>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="h6">{optionGroupName}</Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <HorizontalRuleIcon fontSize="small" color="action" sx={{ mx: 1 }} />
                        <Typography>{optionName}</Typography>
                      </Box>
                    </>
                  }
                />
              </ListItem>
            )
          })}
          <Divider />
        </List>
        <ButtonGroup orientation="vertical" variant="text" size="large" sx={{ height: 1, px: 2 }}>
          <QuantityButtonGroup />
        </ButtonGroup>
      </ListItemDetailInfo>
    </>
  )
}
