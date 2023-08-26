import ApiExecuteResult from '@/variables/interface/api/apiResponseInterface'

const apiExecuteSuccessWithId = function (id: string) {
  const result: ApiExecuteResult = {
    success: true,
    message: 'success',
    body: { id },
  }
  return result
}

const apiExecuteSuccessWithBody = function (body: any) {
  const result: ApiExecuteResult = {
    success: true,
    message: 'success',
    body,
  }
  return result
}

const apiExecuteFail = function (message: Error | string) {
  const result: ApiExecuteResult = {
    success: false,
    message,
    body: {},
  }
  return result
}

export const apiResponses = {
  apiExecuteSuccessWithId,
  apiExecuteSuccessWithBody,
  apiExecuteFail,
}
