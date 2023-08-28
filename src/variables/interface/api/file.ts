import { ProductInfo } from '@/variables/interface/api/product'

export interface FileInfo {
  fileName: string
  fileType: string
  fileCapacity: string
  filePath: string
  product: ProductInfo
}
