# nodejs写爬虫
> 参考至[csdn](https://blog.csdn.net/weixin_45849072/article/details/130984085)
## 使用手册
```sh
node index.js 
# 爬取热搜信息，并保存到json文件上。
# 目前支持百度热搜，抖音热搜

nodemon server.js
# 开启服务器，把内容放到线上
```

## 整体步骤
> 查看[开发日志](./dev-log.md)

## 依赖介绍
> 使用到两个依赖包`request`和`cheerio`模块。  
- request: 
	- 一个轻量级的HTTP客户端，方便发送请求并获取响应数据。  
- cheerio:
	- 一个类似于`jQuery`的依赖包，解析HTML代码。

> 使用koa搭建本地服务器，@koa/router配置路由.