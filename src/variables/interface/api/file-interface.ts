export interface FileInfo {
  fileName: string
  fileType: string
  fileCapacity: string
  filePath: string
}

export interface FileInfoDelete extends FileInfo {
  deletedDate: Date
  save(): any
}
