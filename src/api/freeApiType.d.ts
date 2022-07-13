interface JokeParams {
  page: number
  app_id: string
  app_secret: string
}

interface JokeRes {
  page: number
  totalCount: number
  totalPage: number
  limit: number
  list: []
}

interface WbHotParams {
  token: string
  num: number
}

interface WbHotRes {
  list: []
}