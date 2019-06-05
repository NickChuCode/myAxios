'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  // cancel 的第二种使用方式，检查用户传入的 executor 是否为函数
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  // 内部生成一个 promise，并将 promise 的 resolve 函数暴露出去，在外部实现对异步代码的操作
  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  // executor 的作用就是包装 resolve 函数，将其暴露给外部的 cancel 函数，
  // 并新建一个 Cancel 对象，将 cancel 信息包装在 Cancel 对象中
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 * 第一种调用方式的代码，可以看到，实际就是第二种调用方式的代码的封装
 * 封装成一个工厂函数，替我们新建一个 CancelToken 对象，
 * 并将 resolve 函数以 cancel 的名称暴露出来给用户
 * cancel 就是 resolve 函数，token 就是这个新建的 CancelToken 的引用
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;
