import { FileInfo, FileInfoClient, FileInfoDelete } from '@/variables/interface/api/file-interface'
import { db } from '@/app/_helpers/server'
import { ProductInfoCreate } from '@/variables/interface/api/product-interface'
import { fileProjection } from '@/variables/projection/projection'

const File = db.File

const create = async (product: ProductInfoCreate, fileInfo: FileInfo): Promise<string> => {
  const file = await new File({ ...fileInfo })
  await file.save()
  product.file = file
  await product.save!()
  return file._id
}

const getById = async (id: string): Promise<FileInfoClient> =>
  File.findOne({ _id: id, deletedDate: null }, fileProjection).exec()

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
  create,
  getById,
  softDelete,
  // delete: _delete,
}
