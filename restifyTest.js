// 练习使用restify
// 
// 服务端api
var restify = require('restify');

function respond(req,res,next){

	res.send('hello' + req.params.name);
	next()
}


var server = restify.createServer({  //创建服务器
	// name:'test',
	version:'1.0.0',
	url:"127.0.0.0"
})

//注册handler:server.use()  注册服务器控制组件，按照代码顺序执行，需要放在路由代码之前。
// server.use restify.queryParser() //插件用于解析HTTP请求结果存在req.query。
// server.use restify.bodyParser() //将请求数据转化成CoffeeScript对象。
// server.use restify.CORS() //添加CORS支持。

var count = 0
server.use(function foo(req,res,next){
	count ++ ;
	console.log(count)
	next();// 进入下一个组件 或 下一个相同路由方法
})

server.get('/foo/:id',function(req,res,next){

	next('foo2');

})

server.get({  //使用next(‘foo2’)唤起的路由不能重复注册  所以server.get('/hello/:name',respond)  将无法匹配
	name:'foo2',
	path:'/hello/:name'},function(req,res,next){
	res.send('200' + req.params.name)
	next();
})






// server.get('/hello/:name',respond)
// server.head('/hello/:name',respond)

server.listen(8080,function(){
	console.log('%s listenning at %s',server.name,server.url);
})
