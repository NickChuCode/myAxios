'use strict';

var utils = require('./../utils');

// 实现拦截器构造函数，实现对 request 和 response 中拦截器的类似"洋葱模型"方式的调用
// 包括三个方法和一个属性，handlers 是一个数组，存储拦截器，use 添加拦截器，eject 删除拦截器
// 还提供了一个 forEach 方法，在 axios 核心程序内部调用
function InterceptorManager() {
  // 这个属性保存拦截器序列
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 * 添加 use 方法，在拦截器序列上添加拦截器，拦截器包括 fulfiled 和 rejected 两个函数，
 * 分别对应 promise 调用中的 resolve 和 reject
 * 返回当前被添加的拦截器在当前拦截器序列中的索引
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 * 在拦截器序列中删除对应 id 的拦截器
 * 这里，并没有用 slice 来删除，而只是将对应 id 的内容赋值为 null
 * 这是因为，如果 slice，那么会影响序列中所有拦截器的索引，之前的索引就不对了，所以用这种方式简单快捷的实现
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 * 还提供了一个 forEach 方法，可以传入一个函数，让序列中每一个拦截器依次被这个函数调用
 * 这个方法并不是用户使用，而是在 Axios.js 中被调用，实现拦截器类"洋葱模型"的调用方式
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;
