import ApiExecuteResult from '@/variables/interface/api/api-response-interface'

const apiExecuteSuccessWithBody = function (body: any) {
  const result: ApiExecuteResult = {
    success: true,
    message: 'success',
    body,
  }
  return result
}
export const apiResponses = {
  apiExecuteSuccessWithBody,
}
