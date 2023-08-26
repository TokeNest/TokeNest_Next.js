import axios from 'axios'
import * as process from 'process'

const baseURL = process.env.apiBaseUrl as string
const axiosInstance = axios.create({
  baseURL: `${process.env.apiBaseUrl}/api`,
})
export const axiosFetcher = async (url: string) => {
  const { data } = await axiosInstance.get(url)
  return data
}

export const nextFetcher = async (url: RequestInfo | URL, init?: RequestInit | undefined) =>
  await fetch(`${baseURL}/api/${url}`, init)
