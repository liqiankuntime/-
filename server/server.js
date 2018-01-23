/**
 * Created by liqiankun on 2017/11/14.
 */
const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const model = require('./model');
const Chat = model.getModel('chat');

const app = express();
//io work width express:
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection',function (socket) {//io是全局的请求；socket是当前的请求
	socket.on('sendMsg',function (data) {//监听发送信息的事件，一旦监听到这个事件就走下面的逻辑
		console.log('data<>:',data);
		// io.emit('receiveMsg',data);//发送全局信息
		const {from,to,content} = data;
		const chatid = [from,to].sort().join('_');
		Chat.create({chatid,from,to,content},function (err,doc) {//这个时候已经把数据入库了
			console.log('docdata?',doc);
			io.emit('receiveMsg',Object.assign({},doc._doc))
		})
	});
})

app.use(cookieParser())
app.use(bodyParser.json());

app.use('/user',userRouter);

server.listen(9093,function () {//app.listen()
	console.log('express run at port 9093!')
});















