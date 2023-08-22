import { FileInfo } from '@/variables/interface/api/file'
import { fileRequestDto } from '@/app/_helpers/server/dto/user/fileRequestDto'

export const fileMapper = async function (file: FileInfo) {
  return new fileRequestDto({
    fileName: file.fileName,
    fileDir: file.fileDir,
  })
}
