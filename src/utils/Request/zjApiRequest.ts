import  axios  from 'axios'

const zjService = axios.create({
  baseURL: '/Api'
})

// zjService.interceptors.request.use(
//   (request) => {

//   }
// )

export default zjService