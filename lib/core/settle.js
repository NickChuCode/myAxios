'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 * 这个函数让我们可以自定义正确的状态码，默认 200 - 300 之间是正确的状态码，其他会抛出异常，
 * 但如果 config 中有自定义的 validateStatus，就使用自定义的正确区间
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // 这个 if 的写法可以学习一下，意思就是：如果有 validateStatus 函数，
  // 就用这个函数判断，如果没有，就直接走 resolve(response) 流程
  // 也就是说，如果用户 config 中，没有 validateStatus, 就用默认的 200 - 300 区间
  // 如果用户 config 中，有 validateStatus, 就用用户的区间
  // 如果用户 config 中，有 validateStatus，但为空，
  // 则意味着没有错误状态码，直接执行，不抛出异常
  // validateStatus的合并策略是大多数属性所采用的合并策略，如果 config2 中有，使用 config2 的配置，
  // 如果 config2 中没有，config1 中有，则使用 config1 的配置
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};
