const request = require('request');
const cheerio = require('cheerio');
const path = require('path')
const fs = require('fs')
// 使用request模拟发送请求，获取响应数据。
const data = [];
const write = require('./tool.js')

console.log('抖音模块')
// 获取百度信息
const getDouYinHot = function(url) {
    request(url, async function(error, response, body) {
        // 如果请求成功且状态码为 200
        if (!error && response.statusCode == 200) {
            // // 使用 cheerio 加载 HTML 文档
            // const $ = cheerio.load(body);

            // // 存储获取到的数据
            const totalData = []
            // console.log(body.word_list)
            totalData.push(...JSON.parse(body).word_list);
            let res = await write(totalData,'./data/douyinhot.json','写入抖音成功');
            console.log(res)
        }
    });
}

module.exports = getDouYinHot;