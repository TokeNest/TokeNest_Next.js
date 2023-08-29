export interface FileInfo {
  fileName: string
  fileType: string
  fileCapacity: string
  filePath: string
}

export interface FileInfoSave extends FileInfo {
  save(): any
}

export interface FileInfoDelete extends FileInfoSave {
  deletedDate: Date
}

export interface FileInfoClient extends FileInfo {
  id: string
}
