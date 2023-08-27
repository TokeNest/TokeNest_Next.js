const ValidateFileAsCreate = function (file: File) {
  if (!file) {
    return { success: false, error: 'Error: file is null' }
  } else if (!(file.type === 'image/png' || file.type === 'image/jpeg')) {
    return { success: false, error: 'Error: please check file type' }
  }
  return true
}

const ValidateFilePath = function (path: String | null) {
  if (!path) {
    return { success: false, error: 'Error: file path is null' }
  }
  return true
}

export const validateFile = {
  validateFileAsCreate: ValidateFileAsCreate,
  validateFilePath: ValidateFilePath,
}
