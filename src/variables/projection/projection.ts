export const addressProjection = {
  addressName: true,
  roadAddress: true,
  addressDetail: true,
}

export const userProjection = {
  userName: true,
  userPhone: true,
  userEmail: true,
  userWalletAddress: true,
  userAccountType: true,
}

export const userLoginProjection = {
  userPasswordHash: true,
}

export const productProjection = {
  productName: true,
  productIntro: true,
  productStatus: true,
  productInfo: true,
  productPrice: true,
  productCategory: true,
}

export const fileProjection = {
  fileName: true,
  fileType: true,
  fileCapacity: true,
  filePath: true,
}

export const productOptionGroupProjection = {
  productOptionGroupName: true,
  productOptionGroupType: true,
}

export const productOptionProjection = {
  productOptionName: true,
  productOptionIsDefault: true,
  productOptionPrice: true,
  tokenRatio: true,
}

export const tokenProjection = {
  tokenType: true,
  tokenAddress: true,
  tokenDecimals: true,
}

export const contractProjection = {
  contractType: true,
  contractAddress: true,
}

export const orderProjection = {
  orderNum: true,
  orderStatus: true,
  product: true,
  orderOptions: true,
}

export const orderOptionProjection = {
  orderAmount: true,
  product: true,
  productOptions: true,
}

export const storeProjection = {
  storeName: true,
  storeTel: true,
  storeEmail: true,
  storeCategory: true,
  storeOffDay: true,
  storeOpenCloseTime: true,
  storeStatus: true,
}
