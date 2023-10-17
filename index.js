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