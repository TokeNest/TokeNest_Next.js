import { access, mkdir, readdir, readFile, rename, rmdir, writeFile } from 'fs/promises'
import { dirname, join } from 'path'
import { productRepository } from '@/app/_helpers/server/_repository/store/ProductRepository'
import { fileRepository } from '@/app/_helpers/server/_repository/account/FileRepository'
import { FileInfo } from '@/variables/interface/api/file-interface'
import { ProductInfoCreate } from '@/variables/interface/api/product-interface'

const uploadFileByProductId = async (data: FormData, id: string) => {
  const file: File = (data.get('file') as File) || (await Promise.reject('file not found'))
  const product =
    (await productRepository.getById(id)) || (await Promise.reject('product not found'))
  const storeId = await productRepository.getStoreIdById(id)
  // ./src/public/images/ <- path is must change to your cloud url

  const storePath = `/images/${storeId}`

  const publicPath = './public' + storePath

  // Check if the directory exists, and if not, create it
  try {
    await access(publicPath)
    await access(`${publicPath}/${id}`)
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      await createDirectory(`${publicPath}/${id}/`)
    } else {
      throw 'error while checking directory'
    }
  }

  if ((await readdir(`${publicPath}/${id}`)).length) {
    throw 'file already exist'
  }

  const path = `${storePath}/${id}/${file.name}`

  try {
    await writeFile('./public' + path, Buffer.from(await file.arrayBuffer()))
  } catch (err) {
    throw 'error while creating file'
  }

  // save in db
  return fileRepository.create(product as ProductInfoCreate, {
    fileName: file.name,
    fileType: file.type,
    fileCapacity: file.size.toString(),
    filePath: path,
  })
}

const downloadFileById = async (id: string) => {
  const file = await fileRepository.getById(id)
  return downloadFile(file)
}
const downloadFileByProductId = async (id: string) => {
  const file = await fileRepository.getById(await productRepository.getFileIdById(id))
  return downloadFile(file)
}

const getFileById = async (id: string) => {
  const file = await fileRepository.getById(id)
  return file ? file : Promise.reject('file not found')
}

const getFileByProductId = async (id: string) => {
  const file = await fileRepository.getById(await productRepository.getFileIdById(id))
  return file ? file : Promise.reject('file not found')
}

const softDeleteFileById = async (id: string) => {
  const file = (await fileRepository.getById(id)) || (await Promise.reject('file not found'))
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
    throw 'error while archiving file'
  }

  return fileRepository.softDelete(id, archivePath)
}

// const deleteFile = async (id: string) => {
//   const filePath = (await fileRepository.getById(id)).filePath
//   // file delete in storage
//   await unlink(filePath)
//   await deleteDirectory(filePath)
//   return fileRepository.delete(id)
// }

const createDirectory = async (path: string) => {
  try {
    await mkdir(path, { recursive: true })
  } catch (mkdirError) {
    throw 'error while creating directory'
  }
}

const downloadFile = async (file: FileInfo) => {
  try {
    const fileBuffer = await readFile(file.filePath)
    return new Response(fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${file.fileName}"`,
      },
    })
  } catch (err: any) {
    throw 'file not found'
  }
}

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

export const fileService = {
  uploadFileByProductId,
  downloadFileById,
  downloadFileByProductId,
  getFileById,
  getFileByProductId,
  softDeleteFileById,
  // deleteFile,
}
