import { AxiosRequestConfig } from './types'
import xhr from './xhr'

function myAxios(config: AxiosRequestConfig) {
  xhr(config)
}

export default myAxios
