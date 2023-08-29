import { ParamsInputId } from '@/variables/interface/api/paramsInput'
import { fileService } from '@/app/_helpers/server/_service/account/fileService'
import { apiHandler } from '@/app/_helpers/server/api'

async function download(_req: Request, { params }: ParamsInputId) {
  return fileService.downloadFileByProductId(params.id)
}

module.exports = apiHandler({
  GET: download,
})
