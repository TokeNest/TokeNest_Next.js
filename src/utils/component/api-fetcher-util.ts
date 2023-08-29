import axios from 'axios'
import * as process from 'process'
import ApiExecuteResult from '@/variables/interface/api/api-response-interface'

const baseURL = process.env.apiBaseUrl as string
const axiosInstance = axios.create({
  baseURL: `${process.env.apiBaseUrl}/api`,
})
export const axiosFetcher = async (url: string) => {
  const { data } = await axiosInstance.get(url)
  return data
}

export const nextFetcher = async (
  url: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<ApiExecuteResult> => (await fetch(`${baseURL}/api/${url}`, init)).json()
