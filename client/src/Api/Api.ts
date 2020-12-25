import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  IToken,
  ITokensInterface,
  IApiOptions,
  IRegisterRequestConfig,
} from './api.t'

export default class Api {
  client: AxiosInstance
  token: string | undefined
  userId: string | null
  refreshToken: string | undefined
  refreshRequest: AxiosResponse<ITokensInterface> | null

  constructor(options: IApiOptions = {}) {
    const config: AxiosRequestConfig = {
      withCredentials: true,
      responseType: 'json',
      baseURL: '/api/',
    }

    this.client = options.client || axios.create()
    this.token = options.token || undefined
    this.userId = options.userId || null
    this.refreshToken = options.refreshToken || undefined

    this.refreshRequest = null

    this.client.interceptors.request.use(
      (config) => {
        if (!this.token) {
          return config
        }

        const newConfig = {
          headers: {},
          ...config,
        }
        newConfig.headers.Authorization = `Bearer ${this.token}`
        return newConfig
      },
      (e) => Promise.reject(e)
    )
    this.client.interceptors.response.use(
      (r) => r,
      async (error) => {
        if (
          !this.refreshToken ||
          error.response.status !== 401 ||
          error.config.retry
        ) {
          throw error
        }
        if (!this.refreshRequest) {
          this.refreshRequest = await this.client.post<ITokensInterface>(
            `refresh-tokens`,
            {
              refreshToken: this.refreshToken,
            }
          )
        }

        const { data } = this.refreshRequest
        this.token = data.data.accessToken?.id
        this.refreshToken = data.data.refreshToken?.id
        const newRequest = { ...error.config, retry: true }
        this.refreshRequest = null
        return this.client(newRequest)
      }
    )
  }

  async register({
    email,
    password,
    firstName,
    lastName,
  }: IRegisterRequestConfig) {
    const { data } = await this.client.post('register', {
      email,
      password,
      firstName,
      lastName,
    })
    return data
  }
}
