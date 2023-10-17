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