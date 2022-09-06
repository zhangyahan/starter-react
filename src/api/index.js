import request from './core'

export function exampleRequest() {
  return request.get('/get').then(response => response.data)
}
