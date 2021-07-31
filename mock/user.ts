import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/mock/api/getUser',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'ok',
        data: ['aa', 'bb']
      }
    }
  }
] as MockMethod[]
