'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 * 对 Cancel 原因的封装
 *
 * @class
 * @param {string=} message The message. Cancel 的原因
 */
function Cancel(message) {
  this.message = message;
}

// 重写 toString，格式化 Cancel 原因
Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

// Cancel 状态
Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;
