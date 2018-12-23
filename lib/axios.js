'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 * 这是axios的入口文件，基本上，它做了这几件事：
 * 1. 创建axios实例，并暴露给外部，作为交互的接口
 * 2. 赋值给axios默认的配置
 * 3. 将axios的几个功能create, Cancel, CancelToken, isCancel, all, spread挂载在axios上，暴露给外部
 * 4. 将axios的构造函数Axios挂到axios上，暴露给外部，方便外部扩展和继承
 * 5. 其中，create可以创建另一个axios实例，并可以传入自己的参数，覆盖默认的参数配置
 * 6. 这个文件中，最核心的就是createInstance函数
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  // 这个函数比较绕，要看懂，必须要比较master和1.0.0release版本的区别
  // new Axios 得到一个上下文环境 包含defatults配置以及拦截器
  var context = new Axios(defaultConfig);
  console.log('1. context: ', context)
  // instance实例为bind返回的一个函数(即是request发送请求方法)，此时this绑定到context上下文环境
  var instance = bind(Axios.prototype.request, context);
  console.log('2. instance: ', instance)

  // Copy axios.prototype to instance
  // 将Axios构造函数中的原型方法绑定到instance上并且指定this作用域为context上下文环境
  utils.extend(instance, Axios.prototype, context);
  console.log('3. instance: ', instance)

  // Copy context to instance
  // 把上下文环境中的defaults 以及拦截器绑定到instance实例中
  utils.extend(instance, context);
  console.log('4. instance: ', instance)

  return instance;
}

// Create the default instance to be exported
// axios入口其实就是一个创建好的实例
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
// 暴露Axios类，便于开发者基于axios进行封装和继承
axios.Axios = Axios;

// Factory for creating new instances
// 工厂函数 根据配置创建新的实例
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
// 绑定取消请求相关方法到入口对象
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
// all 和 spread 两个处理并行的静态方法
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
// 允许使用Ts 中的 default import 语法
module.exports.default = axios;
