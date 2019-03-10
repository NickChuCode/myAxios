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

- 文件结构: 首先，我们需要了解axios核心代码的组织方式
  - [Axios项目源码文件结构](https://github.com/NickChuCode/myAxios/issues/1)
- 名词解释 & 常用工具方法：axios中一些专用的名词，需要知道有哪些，干什么用的，才能发挥axios的全部威力。为了实现axios的功能，axios实现了很多的工具方法，了解这些工具方法，才能更好的阅读代码，而且，也可以从这些方法中学习到大牛解决问题的思路
  - [名词解释&常用函数](https://github.com/NickChuCode/myAxios/issues/2)
- axios的使用方法与相关源码解析：axios有多种调用的方法，用户可以根据实际情况灵活使用，这种灵活性是如何实现的，是我们可以学习和借鉴的
  - [axios调用方式](https://github.com/NickChuCode/myAxios/issues/4)
  - [createInstance为什么写这么绕](https://github.com/NickChuCode/myAxios/issues/3)
- 用户配置config：几乎axios所有的功能都是通过这个对象进行配置和传递的，既是axios项目内部的沟通桥梁，也是用户跟axios进行沟通的桥梁。
- axios.prototype.request：这个方法是整个axios的核心方法
- 拦截器的使用与源码分析
- 数据转换器的使用与源码分析
- axios是如何使用Promise的
- axios中对象的序列化
- 其他
