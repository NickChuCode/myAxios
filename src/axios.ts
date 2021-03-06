import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  // 首先，instance 就是一个函数，就是 request 绑定对象的 this的函数，可以调用
  const instance = Axios.prototype.request.bind(context)

  // 其次，通过 extend，将 context 对象上的所有属性和方法都给 instance，这样，instance 就又是一个对象
  extend(instance, context)

  return instance as AxiosStatic
}

const myAxios = createInstance(defaults)

myAxios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}
myAxios.CancelToken = CancelToken
myAxios.Cancel = Cancel
myAxios.isCancel = isCancel

myAxios.all = function all(promises) {
  return Promise.all(promises)
}

myAxios.spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr)
  }
}

myAxios.Axios = Axios

export default myAxios
