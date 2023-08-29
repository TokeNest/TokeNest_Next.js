import { ParamsInputId } from '@/variables/interface/api/params-input-interface'
import { fileService } from '@/app/_helpers/server/_service/account/FileService'
import { apiHandler } from '@/app/_helpers/server/api'

async function getById(_req: Request, { params }: ParamsInputId) {
  return fileService.getFileById(params.id)
}

async function _delete(_req: Request, { params }: ParamsInputId) {
  return fileService.softDeleteFileById(params.id)
}
module.exports = apiHandler({
  GET: getById,
  DELETE: _delete,
})
