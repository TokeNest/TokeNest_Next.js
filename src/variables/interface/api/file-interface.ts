export interface FileInfo {
  fileName: string
  fileType: string
  fileCapacity: string
  filePath: string
}

export interface FileInfoCreate extends FileInfo {
  save(): any
}

export interface FileInfoDelete extends FileInfoCreate {
  deletedDate: Date
}

export interface FileInfoClient extends FileInfo {
  id: string
}
