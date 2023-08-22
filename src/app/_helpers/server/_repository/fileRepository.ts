import { FileInfo } from '@/variables/interface/api/file'
import { db } from '@/app/_helpers/server'

const File = db.File

const save = async function (fileDto: FileInfo) {
  const file = new File({ ...fileDto })
  await file.save()
  return file._id
}

const getFIleById = async function (id: string) {
  return File.findOne({ _id: id, deleted_date: null }).exec()
}

const softDelete = async function (id: string) {
  const file = await getFIleById(id)
  file.deleted_date = new Date()
  await file.save()
  return file._id
}

const _delete = async function (id: string) {
  File.findByIdAndRemove(id)
  return id
}

export const fileRepository = {
  save,
  getFIleById,
}
