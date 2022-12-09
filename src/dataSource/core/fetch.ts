import axios, { type AxiosError } from 'axios'

export const request = axios.create({ baseURL: '/api', timeout: 8000 })

request.interceptors.response.use((response) => {
  if (response.data.msg) {
    try {
      response.data.msg = JSON.parse(response.data.msg) // 由于后端返回的msg为字符串, 所以需要进行反序列化.
    }
    catch (ignore) {
    }
  }

  return response
}, (error: AxiosError) => {
  return {
    ...error,
    response: {
      ...error.response,
      codeInt: error.response ? error.response.status : 500,
      msg: error.response ? error.response.statusText : '请求失败',
    },
  }
})
