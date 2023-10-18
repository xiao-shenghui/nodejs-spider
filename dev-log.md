# 开发日志
> 前期的开发步骤。

## 爬虫书写步骤
> 执行以下命令，创建文件夹和安装依赖
```sh
mkdir spider # 创建文件夹
cd spider
npm init -y # 初始化
cnpm i request cheerio --save-dev
```

> 创建入口文件，开始写代码。  
> 主程序 - index.js
```js
// 清除模块缓存
const cacheKeys = Object.keys(require.cache);
cacheKeys.forEach((key) => {
  delete require.cache[key];
});

// 引入对应的模块
const getBaiduHot = require('./module/baidu.js');
const getDouYinHot = require('./module/douyin.js');

// 对应的url
const urlbaidu = 'https://top.baidu.com/board?tab=realtime&sa=fyb_realtime_31065';
const urldouyin = 'https://www.iesdouyin.com/web/api/v2/hotsearch/billboard/word/';

// 主线程
async function main(){
  await getBaiduHot(urlbaidu);
  await getDouYinHot(urldouyin);
}
main();
```
> 工具函数 - tool.js
```js
const fs = require('fs')
const path = require('path')

const write = (data,filepath,arr) => {
    return new Promise((resolve, reject) => {
            fs.writeFile(path.resolve(__dirname, filepath), JSON.stringify(data), err => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(arr)
            })
        }

    );
}

module.exports = write;
```
> 百度爬取的代码 - baidu.js
```js
const request = require('request');
const cheerio = require('cheerio');
const path = require('path')
const fs = require('fs')
// 使用request模拟发送请求，获取响应数据。
const data = [];
console.log('百度模块')
const write = require('./tool.js')

// 获取百度信息
const getBaiduHot = function(url) {
    request(url, async function(error, response, body) {
        // 如果请求成功且状态码为 200
        if (!error && response.statusCode == 200) {
            // 使用 cheerio 加载 HTML 文档
            const $ = cheerio.load(body);

            // 存储获取到的数据
            const totalData = []

            // 获取content_1YWBm下全部的a元素
            await $('.category-wrap_iQLoo').each(function(index, value) {
                // 向数组中存放数据
                totalData.push({
                    title: $(value).find('.c-single-text-ellipsis').text().trim(),
                    content: $(value).find('.hot-desc_1m_jR').text().trim(),
                    href: $(value).find('a').attr('href'),
                    imgUrl: $(value).find('a').find('img').attr('src'),
                    hotNumber: $(value).find('.hot-index_1Bl1a').text().trim(),
                    type: '百度热搜'
                })
            })
            // 写入新数据
            data.push(...totalData)
            data[0].imgUrl ="https:" + data[0].imgUrl
            // // 把数据保存到data/baiduhot.json
            let res = await write(data,'./data/baiduhot.json','写入百度成功');
            console.log(res)
        }
    });
}

module.exports = getBaiduHot;
```

## 服务器书写步骤
> 使用`koa`和`@koa/router`, 部署服务端。  
> 服务端 - server.js
```js
// 用koa, 一律用get接口
const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();
const port = 3000;
let data;

router.get('/baidu', ctx => {
    data = require('./data/baiduhot.json')
    ctx.body = data
})

router.get('/douyin', ctx => {
    data = require('./data/douyinhot.json')
    ctx.body = data
})

// 注册路由
app.use(router.routes())

// 监听
app.listen(port, ()=>{
    console.log('服务器启动在', `http://localhost:${3000}/`)
})
```

## 服务器跨域和路由中间件
```js
// 匹配其他所有路由
app.use(async (ctx, next) => {
  data = require('./data/baiduhot.json')
  ctx.body = data
  await next();
});


// 使用跨域中间件
app.use(cors())
```