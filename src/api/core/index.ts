import axios from 'axios'
import store from '@/store'

const request = axios.create({ baseURL: '/api', timeout: 8000 })

const Authorization = 'Authorization'

const state = store.getState()
request.defaults.headers.common[Authorization] = state.loginUser.value.token || 'default token.'

// 响应数据过滤器
request.interceptors.response.use((response) => {
  if (response.status === 200) {
    // 解析数据中是否包含 Token 信息.
    if (response.data.data)
      request.defaults.headers.common['Authorization'] = response.data.data.token || request.defaults.headers.common['Authorization']
  }

  return response
})

export default request
