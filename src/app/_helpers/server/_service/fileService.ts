import { ValidateFile } from '@/utils/server/validate/validateFile'
import { access, mkdir, readdir, readFile, rmdir, unlink, writeFile } from 'fs/promises'
import { productRepository } from '@/app/_helpers/server/_repository/productRepository'
import { fileRepository } from '@/app/_helpers/server/_repository/fileRepository'
import { join } from 'path'
import { FileInfo } from '@/variables/interface/api/file'

const deleteFile = async (id: string) => {
  const file = await fileRepository.getById(id)
  // file delete in storage
  await unlink(file.filePath)
  const storePath = join(`${file.filePath}/../../`)
  const productPath = join(`${file.filePath}/../`)
  // if folder not have file, then delete folder
  if (!(await readdir(productPath)).length) {
    await rmdir(productPath)
    if (!(await readdir(storePath)).length) {
      await rmdir(storePath)
    }
  }

  return await fileRepository.delete(id)
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

const saveFile = async (data: FormData, id: string) => {
  const file: File | null = data.get('file') as unknown as File
  ValidateFile(file)
  const product = await productRepository.getById(id)
  const storeId = await productRepository.getStoreIdByProductId(id)
  console.log('dd', storeId)
  // ./src/public/images/ <- path is must change to your cloud url
  const storePath = `./src/public/images/${storeId}`

  // Check if the directory exists, and if not, create it
  try {
    await access(storePath)
    await access(`${storePath}/${id}`)
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      try {
        await mkdir(`${storePath}/${id}`, { recursive: true })
      } catch (mkdirError) {
        throw 'Error with create directory'
      }
    } else {
      throw 'Error with checking directory'
    }
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

export const fileService = {
  saveFile,
  downloadFile,
  deleteFile,
}
