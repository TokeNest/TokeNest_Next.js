import { FileInfo } from '@/variables/interface/api/file'
import { fileRepository } from '@/app/_helpers/server/_repository/fileRepository'

const saveFile = async function (fileInfo: FileInfo) {
  return fileRepository.save(fileInfo)
}

export const fileService = {
  saveFile,
}
