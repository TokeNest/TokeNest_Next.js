export default interface ApiExecuteResult {
  success: boolean
  message: Error | string
  body: any
}
