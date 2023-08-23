class fileRequestDto {
  fileName: string
  fileDir: string

  constructor(file: fileRequestDto) {
    this.fileName = file.fileName
    this.fileDir = file.fileDir
  }
}

export { fileRequestDto }
