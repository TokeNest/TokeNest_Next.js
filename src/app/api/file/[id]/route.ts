import { access, mkdir, writeFile } from 'fs/promises'
import { fileService } from '@/app/_helpers/server/_service/fileService'
import { apiHandler } from '@/app/_helpers/server/api'
import { productRepository } from '@/app/_helpers/server/_repository'

module.exports = apiHandler({
  POST: upload,
})

async function upload(req: Request, { params: { id } }: any) {
  const data = await req.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return { success: false }
  }

  // if try upload pk is product, then change store pk
  const storeId = (await productRepository.getById(id)).storeId.toString()

  // Check if the directory exists, and if not, create it
  const storePath = `./src/public/images/${storeId}`

  try {
    await access(storePath)
    await mkdir(`${storePath}/${id}`)
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // Create Directory if it doesn't exist
      await mkdir(storePath, { recursive: true })
      await mkdir(`${storePath}/${id}`)
    } else {
      console.error('Error checking or creating directory:', error)
      return { success: false }
    }
  }

  const path = `${storePath}/${id}/${file.name}`

  await writeFile(path, Buffer.from(await file.arrayBuffer()))
  // save in db
  await fileService.saveFile({ fileName: file.name, fileDir: path })

  return {
    success: true,
    fileName: file.name,
  }
}
