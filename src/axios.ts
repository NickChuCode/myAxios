import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  const context = new Axios()
  // 首先，instance 就是一个函数，就是 request 绑定对象的 this的函数，可以调用
  const instance = Axios.prototype.request.bind(context)

  // 其次，通过 extend，将 context 对象上的所有属性和方法都给 instance，这样，instance 就又是一个对象
  extend(instance, context)

  return instance as AxiosInstance
}

const myAxios = createInstance()

export default myAxios
