'use strict';

// 判断一个 Cancel 对象是否已使用过（即对象对应的请求是否已取消）
module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};
