import { writeFile } from 'fs/promises'
import { fileService } from '@/app/_helpers/server/_service/fileService'
import { apiHandler } from '@/app/_helpers/server/api'

module.exports = apiHandler({
  POST: upload,
})

// file upload는 구현함. 이제 DB저장하고 대충 유효성검사 체크하면 될듯.
async function upload(req: Request) {
  const data = await req.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return { success: false }
  }
  const path = `./src/images/${file.name}`
  await writeFile(path, Buffer.from(await file.arrayBuffer()))
  // save in db
  await fileService.saveFile({ fileName: file.name, fileDir: path })

  return {
    success: true,
    fileName: file.name,
  }
}
