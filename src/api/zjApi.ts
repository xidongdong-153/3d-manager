import zjService from "@/utils/Request/zjApiRequest"
import type { AxiosPromise } from 'axios'

const typhoonData = (params: any): AxiosPromise<any>  => {
  return zjService({
    url: `TyphoonInfo/${params}`
  })
}

export {
  typhoonData
}