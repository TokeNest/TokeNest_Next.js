import { FileInfo } from '@/variables/interface/api/file'
import { db } from '@/app/_helpers/server'

const File = db.File

const save = async function (fileDto: FileInfo) {
  const file = new File({ ...fileDto })
  await file.save()

  return file._id
}

const getFileById = async function (id: string) {
  return File.findOne({ _id: id, deleted_date: null }).exec()
}

// const softDelete = async function (id: string) {
//   const file = await getFileById(id)
//   file.deleted_date = new Date()
//   await file.save()
//   return file._id
// }

const _delete = async function (id: string) {
  await File.findByIdAndRemove(id)
  return id
}

const getPathAndName = async function (id: string) {
  const file = await File.findOne({ _id: id, deleted_date: null }).exec()
  return {
    file_name: file.file_name,
    file_path: file.file_path,
  }
}

export const fileRepository = {
  save,
  getFIleById: getFileById,
  getPathAndName,
  // softDelete,
  delete: _delete,
}
