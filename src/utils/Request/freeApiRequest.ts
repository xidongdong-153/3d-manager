import axios, { AxiosInstance } from 'axios'

const freeService: AxiosInstance = axios.create({
  // baseURL: 'https://www.mxnzp.com/api/',
  timeout: 3000
})

// 响应拦截器
freeService.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
      return response.data
  }
)

export default freeService