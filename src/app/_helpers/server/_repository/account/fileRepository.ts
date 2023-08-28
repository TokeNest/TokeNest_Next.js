import { FileInfo, FileInfoDelete } from '@/variables/interface/api/file'
import { db } from '@/app/_helpers/server'
import { ProductInfo } from '@/variables/interface/api/product'
import { fileProjection } from '@/variables/enum/projection-enum'

const File = db.File

const save = async (product: ProductInfo, fileInfo: FileInfo): Promise<string> => {
  const file = await new File({ ...fileInfo }).save()
  product.file = file
  product.save()
  return file._id
}

const getById = async (id: string): Promise<FileInfo> =>
  await File.findOne({ _id: id, deletedDate: null }, fileProjection).exec()

const getByProductId = async (id: string) =>
  await File.findOne({ product: id, deletedDate: null }, fileProjection).exec()

const softDelete = async (id: string, path: string): Promise<string> => {
  const file: FileInfoDelete = await File.findOne({ _id: id, deletedDate: null }).exec()
  file.filePath = path
  file.deletedDate = new Date()
  return (await file.save())._id
}

// const _delete = async (id: string) => {
//   await File.findByIdAndRemove(id)
//   return id
// }

export const fileRepository = {
  save,
  getById,
  getByProductId,
  softDelete,
  // delete: _delete,
}
