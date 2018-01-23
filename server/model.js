/**
 * Created by liqiankun on 2017/11/19.
 */

const mongoose = require('mongoose');
//链接mongo
const DB_URL = 'mongodb://localhost:27017/imooc-chat'
mongoose.connect(DB_URL,{ useMongoClient: true,});

//定义数据库的数据模型
const models = {
	//用户数据模型
	user:{
		"user":{'type':String,'require':true},
		"pwd":{'type':String,'require':true},
		"category":{'type':String,'require':true},
		//头像
		"avatar":{'type':String},
		//个人简历或职位介绍
		"desc":{'type':String},
		//职位名称
		"title":{'type':String},

		//BOSS还有两个字段
		"company":{'type':String},
		"money":{'type':String}
	},
	//聊天数据模型
	chat:{
		'chatid':{'type':String,'require':true},
		'from':{'type':String,'require':true},//谁发的信息
		'to':{'type':String,'require':true},//信息发给谁的
		'read':{'type':Boolean,'require':true,'default':false},//消息有没有读
		'content':{'type':String,'require':true,'default':''},
		'create_time':{'type':Number,'require':true,'default':new Date().getTime()}
	}
}

for(let m in models){
	console.log('m::',m);
	mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports={
	getModel:function (name) {
		return mongoose.model(name)
	}
}