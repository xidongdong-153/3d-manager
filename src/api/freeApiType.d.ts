interface JokeParams {
  page: number
  app_id: string
  app_secret: string
}

interface JokeRes {
  code: number
  data: {
    page: number
    totalCount: number
    totalPage: number
    limit: number
    list: []
  }
  msg: string
}

interface WbHotParams {
  token: string
  num: number
}

interface WbHotRes {
  data: {
    hot_word: string
    hot_word_num: number
    url: string
  }[]
  code: number
  log_id: number
  msg: string
  time: Date
}

interface AbbrParams {
  token: string
  abbr: string // 要查询的缩写  example: yyds
}
interface AbbrRes {
  data: {
    abbr: string
    explain: sting
    explain_arr: []
  }
}
