import { FileInfo } from '@/variables/interface/api/file'
import { db } from '@/app/_helpers/server'
import { ProductInfo } from '@/variables/interface/api/product'

const File = db.File
const fileProjection = {
  fileName: true,
  fileType: true,
  fileCapacity: true,
  filePath: true,
  product: true,
}

const save = async (product: ProductInfo, fileInfo: FileInfo): Promise<string> => {
  const fileId = (await new File({ ...fileInfo }).save())._id
  product.file = fileId
  product.save()
  return fileId
}

const getById = async (id: string): Promise<FileInfo> =>
  await File.findOne({ _id: id, deletedDate: null }, fileProjection).exec()

const getByProductId = async (id: string) =>
  await File.findOne({ product: id, deletedDate: null }, fileProjection).exec()

const _delete = async (id: string) => {
  await File.findByIdAndRemove(id)
  return id
}

export const fileRepository = {
  save,
  getById,
  getByProductId,
  delete: _delete,
}
