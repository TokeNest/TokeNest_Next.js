import { apiHandler } from '@/app/_helpers/server/api'
import { ParamsInputId } from '@/variables/interface/api/paramsInput'
import { fileService } from '@/app/_helpers/server/_service/account/fileService'

const _delete = async function (_req: Request, { params }: ParamsInputId) {
  return fileService.softDeleteFile(params.id)
}

const download = async function (_req: Request, { params }: ParamsInputId) {
  return fileService.downloadFile(params.id)
}

const upload = async function (req: Request, { params }: ParamsInputId) {
  return fileService.saveFile(await req.formData(), params.id)
}
module.exports = apiHandler({
  POST: upload,
  GET: download,
  DELETE: _delete,
})
