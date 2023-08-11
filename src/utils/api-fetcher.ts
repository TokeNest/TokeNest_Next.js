import axios from 'axios'
import * as process from 'process'

const axiosInstance = axios.create({
  baseURL: `${process.env.apiBaseUrl}/api/`,
})
export const axiosFetcher = async (url: string) => {
  const { data } = await axiosInstance.get(url)
  return data
}
