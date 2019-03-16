const axiosConfig = {
  baseURL: process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:3333/api/v1/' : 'https://api.josephlevarato.me/api/v1/',
  timeout: 30000
}

export default axiosConfig
