import axios, { AxiosInstance } from 'axios'

const freeService: AxiosInstance = axios.create({
  baseURL: 'https://www.free-api.com/',
  timeout: 3000
})

export default freeService