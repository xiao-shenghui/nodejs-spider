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