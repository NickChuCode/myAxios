'use strict';

var utils = require('../utils');

// 将header中的name统一为normalizedName
// 因为 headers 的名字是不区分大小写的，所以我们在传入数据的时候
// Content-Type 和 content-type 实际是同一个属性，所以我们将 headers 中属性统一为
// normalizedName，同时删掉可能存在的同样的，只是大小写不一样的属性
// 使用方法：normalizeHeaderName(headers, 'Content-Type')，
// 就可以将 headers 中的content-type设置为统一的形式
module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};
