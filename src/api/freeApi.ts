import freeService from "@/utils/Request/freeApiRequest";

const hotWrod = () => {
  return freeService({
    url:  '/showapi/rcInfo'
  })
}