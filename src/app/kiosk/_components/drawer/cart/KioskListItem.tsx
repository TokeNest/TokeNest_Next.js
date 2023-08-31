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
} from '@/app/kiosk/_components/drawer/cart/interaction'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import { OrderProductOptionGroup } from '@/variables/interface/kiosk-interface'
import { ProductInfoClient } from '@/variables/interface/api/product-interface'
import { ProductOptionGroupInfoClient } from '@/variables/interface/api/product-option-group-interface'
import { ProductOptionInfoClient } from '@/variables/interface/api/product-option-interface'

export default function KioskListItem({
  product: { productName, productPrice, productOptionGroups },
  productQuantity,
  optionGroupsInfo,
}: {
  product: ProductInfoClient
  productQuantity: number
  optionGroupsInfo: OrderProductOptionGroup[]
}) {
  const selectGroupOptions = optionGroupsInfo.map(({ optionGroupId: groupId, optionIds }) => {
    const { productOptionGroupName, productOptions } = productOptionGroups.find(
      ({ id }) => id === groupId
    ) as ProductOptionGroupInfoClient
    return {
      productOptionGroupName,
      options: productOptions.find(({ id }) => optionIds.includes(id)) as ProductOptionInfoClient,
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
          {selectGroupOptions.map(
            ({ productOptionGroupName, options: { id, productOptionName } }) => {
              return (
                <ListItem key={id}>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant="h6">{productOptionGroupName}</Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <HorizontalRuleIcon fontSize="small" color="action" sx={{ mx: 1 }} />
                          <Typography>{productOptionName}</Typography>
                        </Box>
                      </>
                    }
                  />
                </ListItem>
              )
            }
          )}
          <Divider />
        </List>
        <ButtonGroup orientation="vertical" variant="text" size="large" sx={{ height: 1, px: 2 }}>
          <QuantityButtonGroup />
        </ButtonGroup>
      </ListItemDetailInfo>
    </>
  )
}
