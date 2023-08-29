import { ParamsInputId } from '@/variables/interface/api/params-input-interface'
import { fileService } from '@/app/_helpers/server/_service/account/FileService'
import { apiHandler } from '@/app/_helpers/server/api'

async function download(_req: Request, { params }: ParamsInputId) {
  return fileService.downloadFileById(params.id)
}

module.exports = apiHandler({
  GET: download,
})
