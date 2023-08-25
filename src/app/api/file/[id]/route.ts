import { access, mkdir, readdir, readFile, rmdir, unlink, writeFile } from 'fs/promises'
import { fileService } from '@/app/_helpers/server/_service/fileService'
import { productRepository } from '@/app/_helpers/server/_repository'
import { fileRepository } from '@/app/_helpers/server/_repository/fileRepository'
import { validateFile } from '@/utils/server/validate/ValidateFile'
import { apiHandler } from '@/app/_helpers/server/api'
import { join } from 'path'
import fileParam from '@/variables/interface/api/getApiParams'

module.exports = apiHandler({
  POST: upload,
  GET: download,
  DELETE: _delete,
})

export async function _delete(req: Request, { params }: fileParam) {
  try {
    const file = await fileRepository.getFIleById(params.id)
    await unlink(file.file_path)

    const storePath = join(`${file.file_path}/../../`)
    const productPath = join(`${file.file_path}/../`)
    // if folder not have file, then delete folder
    if (!(await readdir(productPath)).length) {
      await rmdir(productPath)
      if (!(await readdir(storePath)).length) {
        await rmdir(storePath)
      }
    }
    await fileRepository.delete(params.id)

    return {
      success: true,
      id: params.id,
    }
  } catch (err: any) {
    return {
      success: false,
      message: 'Error: file not found',
      error: err,
    }
  }
}

export async function download(req: Request, { params }: fileParam) {
  const file = await fileRepository.getPathAndName(params.id)
  if (validateFile.validateFilePath(file.file_path) != true) {
    return validateFile.validateFilePath(file.file_path)
  }

  try {
    const fileBuffer = await readFile(file.file_path)
    return new Response(fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${file.file_name}"`,
      },
    })
  } catch (err: any) {
    return { success: false, message: 'Error: File not Found', error: err }
  }
}

async function upload(req: Request, { params }: fileParam) {
  const data = await req.formData()
  const file: File | null = data.get('file') as unknown as File

  const valFile = validateFile.validateFileAsCreate(file)
  if (valFile != true) {
    return valFile
  }
  const product = await productRepository.getById(params.id)
  const storeId = product.store_id.toString()

  // ./src/public/images/ <- path is must change your cloud url
  const storePath = `./src/public/images/${storeId}`

  // Check if the directory exists, and if not, create it
  try {
    await access(storePath)
    await access(`${storePath}/${params.id}`)
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      try {
        await mkdir(`${storePath}/${params.id}`, { recursive: true })
      } catch (mkdirError) {
        console.error('Error creating directory:', mkdirError)
        return { success: false }
      }
    } else {
      console.error('Error checking directory:', err)
      return { success: false, message: 'Error: checking directory', error: err }
    }
  }

  const path = `${storePath}/${params.id}/${file.name}`

  await writeFile(path, Buffer.from(await file.arrayBuffer()))
  // save in db
  const fileId = await fileService.saveFile({
    file_name: file.name,
    file_type: file.type,
    file_capacity: file.size.toString(),
    file_path: path,
    product,
  })

  return {
    success: true,
    fileName: file.name,
    fileId: fileId,
  }
}
