import { FileInfo } from '@/variables/interface/api/file'

export const ValidateFile = (file: File) => {
  if (!file) {
    throw 'File not found'
  } else if (!(file.type === 'image/png' || file.type === 'image/jpeg')) {
    throw 'Invalid file type'
  }
}

export const isExistFile = (file: FileInfo) => {
  if (!file) {
    throw 'File not found'
  }
}
