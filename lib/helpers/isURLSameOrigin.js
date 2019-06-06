'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
      // IIEF，如果是标准的浏览器环境，有API可以测试URL是否同源
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
       * 解析 url 中的协议，host 等信息，原理就是创建一个 a 节点（HTMLAnchorElement），
       * 设置 href 为 url 以后，这个节点会自动解析相关信息并放在对应的属性中
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
          // 这个函数将一个url解析为各个组件
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
            // 如果是IE，需要把href传进node，再取出来，完成正规化
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
 * Determine if a URL shares the same origin as the current location
 * 判断请求与响应是否同源
 *
 * @param {String} requestURL The URL to test
 * @returns {boolean} True if URL shares the same origin, otherwise false
 */
return function isURLSameOrigin(requestURL) {
    var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
    // 协议相同，host相同，即判断为同源
    return (parsed.protocol === originURL.protocol &&
        parsed.host === originURL.host);
};
})() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);
