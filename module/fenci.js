const douyin = require('../data/douyinhot.json')
const baidu = require('../data/baiduhot.json')
const { load, cut,extract } = require('@node-rs/jieba')
const write = require('../tool.js')

load()
// 中文分词库load


const fenci = async function(){
	// 对词进行整理，匹配最多的词语
	// 把所有的title整理出来，放到分词库中分析
	let titleStr = ''
	for(let i of douyin){
		titleStr += i.title
	}
	for(let m of baidu){
		titleStr += m.title
	}
	// 做分词
	let resArr = await extract(titleStr,20)
	resArr = resArr.map(e => {
		e.weight *= 100;
		e.weight = e.weight.toFixed(2);
		return e
	})
	// 将分词结果存入fenci.json
	let res = await write(resArr,'./data/fenci.json','写入分词库成功');
    console.log(res)
}

module.exports = fenci;