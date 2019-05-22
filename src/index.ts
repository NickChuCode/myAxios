import {AxiosPromise, AxiosRequestConfig} from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from "./helpers/data";
import {processHeaders} from "./helpers/headers";

function myAxios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  // 因为 headers 的处理依赖 data，所以需要在 data 处理之前
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default myAxios
