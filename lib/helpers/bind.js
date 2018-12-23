'use strict';

// 与Function.prototype.bind()功能类似，都用于绑定函数的执行上下文，
// 返回的是一个函数，可以实现类似柯里化的效果
module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};
