import { isExistFile, ValidateFile } from '@/utils/server/validate/validateFile'
import { access, mkdir, readdir, readFile, rename, rmdir, writeFile } from 'fs/promises'
import { dirname, join } from 'path'
import { productRepository } from '@/app/_helpers/server/_repository/productRepository'
import { fileRepository } from '@/app/_helpers/server/_repository/fileRepository'
import { FileInfo } from '@/variables/interface/api/file'

const saveFile = async (data: FormData, id: string) => {
  const file: File | null = data.get('file') as unknown as File
  ValidateFile(file)
  const product = await productRepository.getById(id)
  const storeId = await productRepository.getStoreIdByProductId(id)
  // ./src/public/images/ <- path is must change to your cloud url
  const storePath = `./src/public/images/${storeId}`

  // Check if the directory exists, and if not, create it
  try {
    await access(storePath)
    await access(`${storePath}/${id}`)
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      await createDirectory(`${storePath}/${id}/`)
    } else {
      throw 'Error with checking directory'
    }
  }

  if ((await readdir(`${storePath}/${id}`)).length) {
    throw 'File Already Exist'
  }

  const path = `${storePath}/${id}/${file.name}`

  try {
    await writeFile(path, Buffer.from(await file.arrayBuffer()))
  } catch (err) {
    throw 'Error with create file'
  }

  // save in db
  const fileData: FileInfo = {
    fileName: file.name,
    fileType: file.type,
    fileCapacity: file.size.toString(),
    filePath: path,
    product,
  }

  return await fileRepository.save(product, fileData)
}

const downloadFile = async (id: string) => {
  const file = await fileRepository.getById(id)
  try {
    const fileBuffer = await readFile(file.filePath)
    return new Response(fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${file.fileName}"`,
      },
    })
  } catch (err: any) {
    throw 'File not found'
  }
}

const softDeleteFile = async (id: string) => {
  const file = await fileRepository.getById(id)
  isExistFile(file)
  const filePath = file.filePath

  // create archive path
  const archivePath = filePath
    .split('/')
    .map((part) => (part === 'images' ? 'imagesArchive' : part))
    .join('/')
  await createDirectory(dirname(archivePath))

  try {
    // move file
    await rename(filePath, archivePath)
    await deleteDirectory(filePath)
  } catch {
    throw 'Occur Error while archiving file'
  }

  return await fileRepository.softDelete(id, archivePath)
}

// const deleteFile = async (id: string) => {
//   const filePath = (await fileRepository.getById(id)).filePath
//   // file delete in storage
//   await unlink(filePath)
//   await deleteDirectory(filePath)
//   return await fileRepository.delete(id)
// }

const deleteDirectory = async (path: string) => {
  const storePath = join(`${path}/../../`)
  const productPath = join(`${path}/../`)
  // if folder not have file, then delete folder
  if (!(await readdir(productPath)).length) {
    await rmdir(productPath)
    if (!(await readdir(storePath)).length) {
      await rmdir(storePath)
    }
  }
}

const createDirectory = async (path: string) => {
  try {
    await mkdir(path, { recursive: true })
  } catch (mkdirError) {
    throw 'Error with create directory'
  }
}

export const fileService = {
  saveFile,
  downloadFile,
  softDeleteFile,
  // deleteFile,
}
