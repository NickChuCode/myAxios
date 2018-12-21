'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  // new Axios 得到一个上下文环境 包含defatults配置以及拦截器
  var context = new Axios(defaultConfig);
  // instance实例为bind返回的一个函数(即是request发送请求方法)，此时this绑定到context上下文环境
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  // 将Axios构造函数中的原型方法绑定到instance上并且指定this作用域为context上下文环境
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  // 把上下文环境中的defaults 以及拦截器绑定到instance实例中
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
// axios入口其实就是一个创建好的实例
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
// 这句没太理解，根据作者的注释是：暴露Axios类去让类去继承
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
