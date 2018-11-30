# my-axios
axios是前端一个非常重要的http库，连Vue的尤雨溪都在推荐，它的功能完整，简洁，注释清晰，对于学习http，ajax再合适不过了。

axios是一个基于promise的http库，同时支持浏览器和node端。

在它的官方GitHub上，是这样介绍自己的特性的。
> - 在浏览器端利用XMLHttpRequests来发送请求
> - 在node端利用http库来发送请求
> - 支持Promise API
> - 请求与响应的拦截
> - 转换请求和响应数据
> - 取消请求
> - 自动转换JSON数据
> - 支持客户端XSRF防护

下面，我们就从这几个特性出发，来解读axios的源码。

- 文件结构
  - [Axios项目源码文件结构](https://github.com/NickChuCode/myAxios/issues/1)
- 浏览器端请求发送
- node端请求发送
- Promise API
- 请求响应的拦截
- 转换请求和响应数据
- 取消请求
- JSON数据自动转换
- 客户端XSRF防护
