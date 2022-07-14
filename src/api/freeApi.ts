import freeService from "@/utils/Request/freeApiRequest";
import type { AxiosPromise } from 'axios'

/**
 * 笑话...
 */
const jokeApi = (params: JokeParams): AxiosPromise<JokeRes> => {
  return freeService({
    url:  'https://www.mxnzp.com/api/jokes/list',
    params
  })
}

/**
 * 微博热词...
 */
const wbHot = (params: WbHotParams): AxiosPromise<WbHotRes> => {
  return freeService({
    url: 'https://v2.alapi.cn/api/new/wbtop',
    params
  })
}

/**
 * 好好说话...
 */
const abbr = (params: AbbrParams): AxiosPromise<AbbrRes> => {
  return freeService({
    url: 'https://v2.alapi.cn/api/abbr',
    params
  })
}

export {
  jokeApi,
  wbHot,
  abbr
}
