'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var buildURL = require('./../helpers/buildURL');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  // axios为我们演示了，如果用promise封装一个XHR
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      // formData是XMLHttpRequest 2级发展出的一种标准，它简化了表单的序列化
      // 它的方便之处体现在不必明确地在XHR对象上设置请求头部
      // XHR对象能够识别传入的数据类型是FormData的实例，并配置适当的头部信息
      // 所以，可以删除掉已有的头部信息
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication.
    // 在网络活动中，身份认证是非常重要的一环。Basic身份认证，是HTTP 1.0中引入的认证方案之一。
    // 虽然方案比较古老，同时存在安全缺陷，但由于实现简单，至今仍有不少网站在使用它。
    // 具体步骤可以看https://juejin.im/entry/5ac175baf265da239e4e3999
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      // Authorization首部的格式为Basic base64(userid:password)
      // btoa从 String 对象中创建一个 base-64 编码的 ASCII 字符串，其中字符串中的每个字符都被视为一个二进制数据字节。
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      // 一般来说，request请求不到，或发生错误，会由onerror接管，
      // 但有一个例外，当使用file协议的时候，就算请求成功，request的status也是0
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      // 对状态码是否合法的操作逻辑进行封装
      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // 下面是对 AJAX 中各类错误的处理，前端的异常错误主要包括以下几类：
    // 1.网络异常；2.超时错误；3.非200状态码；4.取消请求（作为异常来处理）
    // Handle browser request cancellation (as opposed to a manual cancellation)
    // promise 抛出取消请求异常
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    // promise 抛出网络异常
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    // promise 抛出超时错误异常
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = require('./../helpers/cookies');

      // Add xsrf header
      // CSRF 防御 代码，只有携带 cookie，或者同源，并且 config 中有 xsrfCookieName
      // 才会读取 config 中的 cookie，将 cookie 放在 对应的请求头中
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    // 跨域携带凭据
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    // 处理 download 的进度
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    // 处理 upload 的进度
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    // 取消请求的实际执行代码
    // 如果 config 中带有 cancelToken，说明这个请求是可以 cancel 的，就执行下面的逻辑
    if (config.cancelToken) {
      // Handle cancellation
      // 调用 cancelToken 中的 promise，将其由 pending 变为 fullfilled，这样，
      // 再执行 then 中这些异步逻辑
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        // cancel 是一个 Cancel 对象
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};
