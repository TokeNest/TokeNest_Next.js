import { FileInfo } from '@/variables/interface/api/file'
import { db } from '@/app/_helpers/server'

const File = db.File

const save = (fileDto: FileInfo) => {
  const file = new File({ ...fileDto })
  file.save()
  return file._id
}

const getFileById = async (id: string) => await File.findOne({ _id: id, deleteDate: null }).exec()

const _delete = (id: string) => {
  File.findByIdAndRemove(id)
  return id
}

const getPathAndName = async function (id: string) {
  const file = await File.findOne({ _id: id, deleteDate: null }).exec()
  return {
    fileName: file.fileName,
    filePath: file.filePath,
  }
}

export const fileRepository = {
  save,
  getFIleById: getFileById,
  getPathAndName,
  delete: _delete,
}
