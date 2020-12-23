import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export interface IApiOptions {
  client?: AxiosInstance;
  token?: string;
  userId?: string;
}

export default class Api {
  client: AxiosInstance
  token: string
  userId: string

  constructor(options: IApiOptions) {
    const config: AxiosRequestConfig = {
      withCredentials: true,
      responseType: 'json',
      baseURL: '/api/',
    }

    this.client = options.client || axios.create()
    this.token = options.token || ''
    this.userId = options.userId || ''
  }
}
