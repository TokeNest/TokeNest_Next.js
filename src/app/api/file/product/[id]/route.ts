import { apiHandler } from '@/app/_helpers/server/api'
import { ParamsInputId } from '@/variables/interface/api/paramsInput'
import { fileService } from '@/app/_helpers/server/_service/account/fileService'

async function getByProductId(_req: Request, { params }: ParamsInputId) {
  return fileService.getFileByProductId(params.id)
}

async function upload(req: Request, { params }: ParamsInputId) {
  return fileService.uploadFileByProductId(await req.formData(), params.id)
}

module.exports = apiHandler({
  GET: getByProductId,
  POST: upload,
})
