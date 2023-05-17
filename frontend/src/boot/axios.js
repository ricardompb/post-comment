import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

console.log(process.env.SERVER_HOST)

const api = axios.create({ baseURL: process.env.SERVER_HOST })
api.interceptors.request.use(function (config) {
  config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0MzI2NTQ0fQ.H-iHuIROJaG5Dj6ZAa8hgnpKQDeXhErz1y7bj0OzBjg'
  return config
}, function (error) {
  return Promise.reject(error)
})

api.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
