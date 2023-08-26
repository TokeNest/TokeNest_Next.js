export default interface ApiExecuteResult {
  success: boolean
  message: Error | string
  body: {
    id?: string
    [key: string]: any
  }
}
