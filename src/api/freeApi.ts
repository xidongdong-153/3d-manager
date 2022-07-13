import freeService from "@/utils/Request/freeApiRequest";
import type { AxiosPromise } from 'axios'

const jokeApi = (params: JokeParams): AxiosPromise<JokeRes> => {
  return freeService({
    url:  'https://www.mxnzp.com/api/jokes/list',
    params
  })
}

const wbHot = (params: WbHotParams): AxiosPromise<WbHotRes> => {
  return freeService({
    url: 'https://v2.alapi.cn/api/new/wbtop',
    params
  })
}

export {
  jokeApi,
  wbHot
}
