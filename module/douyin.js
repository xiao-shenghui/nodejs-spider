const request = require('request');
const cheerio = require('cheerio');
const path = require('path')
const fs = require('fs')
// 使用request模拟发送请求，获取响应数据。
const data = [];
const write = require('../tool.js')

console.log('抖音模块')
// 获取百度信息
const getDouYinHot = function(url) {
    request(url, async function(error, response, body) {
        // 如果请求成功且状态码为 200
        if (!error && response.statusCode == 200) {
            // // 存储获取到的数据
            let totalData = []
            totalData.push(...JSON.parse(body).word_list);
            // 对数据进行处理
            totalData = totalData.map(e => {
                e.title = e.word;
                e.hotNumber = e.hot_value;
                return e
            })
            let res = await write(totalData,'./data/douyinhot.json','写入抖音成功');
            console.log(res)
        }
    });
}

module.exports = getDouYinHot;