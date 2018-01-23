/**
 * Created by liqiankun on 2017/11/19.
 */
const express = require('express');
const utility = require('utility');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const md5Pwd = require('./common/utils');
const _filter = {'pwd':0,'__v':0};
Router.get('/list',function (req,res) {//用户列表
	//console.log('require list',req)
	// User.remove({},function (e,d) {}) //把这一句打开后在请求一下这个地址时就会删除所有的内容

	const {category} = req.query;
	User.find({category},_filter,function (err,doc) {//搜索指定类型的数据，是老板搜索'牛人'还是牛人搜索'Boss'
		return res.json({code:0,data:doc});
	})
})
Router.post('/updata',function (req,res) {
	const {userid} = req.cookies;
	const body = req.body;
	if(!userid){
		return res.json( {code:1,msg:'cookie值不存在'} );
	}
	User.findByIdAndUpdate(userid,body,function (err,doc) {

		const data = Object.assign({},{
			user:doc.user,
			category:doc.category
		},body);

		return res.json({code:0,data});
	})


})

Router.post('/login',function (req,res) {//登陆
	const {user,pwd} = req.body;

	User.findOne({user,pwd:md5Pwd(pwd)},_filter,function (err,doc) {//把不想返回的字段设置为0，那么就不会返回了
		if(!doc){
			return res.json( {code:1,msg:'用户名不存在或密码错误'} );
		}
		console.log('user::',user,pwd,doc._id);
		res.cookie('userid',doc._id);//登陆成功后把登陆的id存到cookie中
		return res.json( {code:0,data:doc} );
	})
})
Router.post('/register',function (req,res) {//注册
	const {user,pwd,category} = req.body;
	User.findOne({user},function (err,doc) {
		if(doc){
			return res.json({code:1,msg:'用户名重复'})
		}

		const userModel = new User({user,pwd:md5Pwd(pwd),category});//往数据库中创建数据
		userModel.save(function (err,d) {
			const {user,category,_id} = d;
			if(err){
				return res.json({code:1,msg:'后端出错了'});
			}
			res.cookie('userid', d._id);
			return res.json({code:0,data:{user,category,_id}})
		})
	})
})
Router.get('/info',function (req,res) {
	//根据用户有没有cookie来返回不同的信息；

	const {userid} = req.cookies;
	if(!userid){
		return res.json({code:1,msg:'还未登陆'});
	}
	User.findOne({_id:userid},_filter,function (err,doc) {
		if(err){
			return res.json({code:1,msg:'后端出错了'})
		}
		if(doc){
			return res.json({code:0,data:doc});
		}
	})

})

// Chat.remove({},function () {
//
// })

//聊天信息功能：
Router.get('/getmsgList',function (req,res) {
	const userid = req.cookies.userid;
	User.find({},function (err,userdoc) {
		let users = {};
		userdoc.forEach((item,indx) => {
			users[item._id] = {name:item.user,avatar:item.avatar}
		});
		//按多条件查询的写法:{'$or':[{from:user,to:user}]}
		Chat.find({'$or':[{from:userid},{to:userid}]},function (err,doc) {
			if(!err){
				return res.json({code:0,msgs:doc,users:users})

			}
		});
	});

})

//未读消息数量
Router.post('/readmsg',function (req,res) {
	const userid = req.cookies.userid;
	const {from} = req.body;
	Chat.update(
		{from,to:userid},
		{'$set':{read:true}},
		{'multi':true},
		function (err,doc) {
		console.log('odc::',doc);//{ n: 4, nModified: 1, ok: 1 } n:总共有几条数据，nModified:修改了几条，ok:1修改成功
		if(!err){
			return res.json({code:0,num:doc.nModified})
		}
		return res.json({code:1,msg:'未读数据修改失败'})
	})
	
})

module.exports = Router;