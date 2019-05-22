import {AxiosPromise, AxiosRequestConfig, AxiosResponse} from './types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {
    const { data = null, url, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad () {
      if (request.readyState !== 4) {
        return
      }

      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        // 这里要额外判断一个逻辑，当我们传入的 data 为空的时候，
        // 请求 header 配置 Content-Type 是没有意义的，于是我们把它删除
        delete headers[name]
      } else {
        // 将处理后的 headers 放入请求
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })

}
