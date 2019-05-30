import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from '../xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
import { flattenHeaders } from '../helpers/header'

export default function dispatchRequest(
  config: AxiosRequestConfig
): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    // 拿到结果以后，将结果处理一下，将字符串尽量转换为 JSON 格式的数据
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  // 因为 headers 的处理依赖 data，所以需要在 data 处理之前
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
