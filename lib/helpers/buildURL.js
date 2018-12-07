'use strict';

var utils = require('./../utils');

// 用encodeURI来转义val，但不转义其中的@等特殊符号
function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 * 构建一个结尾是参数的url
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    // 如果有参数的序列化处理函数，则使用它来序列化参数
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    // 如果params是URLSearchParam类的实例，则直接toString
    serializedParams = params.toString();
  } else {
    // 如果都不是以上的情况，则自己迭代来处理，同时处理的时候
    // 考虑了json不支持date类型数据的问题，做了相应的转换
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    // 如果存在序列化好的params，先去掉#后面的东西，因为无意义
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    // 把这个参数添加到url后，url如果没有？,则加?,如果有，则加&
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};
