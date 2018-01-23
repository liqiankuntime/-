/**
 * Created by liqiankun on 2017/11/19.
 */
import * as types from './actionType';
import axios from 'axios';

function errorMsg(msg){
	return {
		msg,
		type:types.ERROR_MSG
	}
}

function authSuccess(data) {
	return {
		type:types.AUTH_SUCCESS,
		data:data
	}
}

export function login({user,pwd}) {
	if(!user || !pwd){
		return errorMsg('请输入密码或用户名')
	};
	return dispatch => {
		axios.post('/user/login',{user,pwd})
			.then(res => {
				if(res.status===200&&res.data.code===0){
					dispatch(authSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}

export function regist({user,pwd,repeatpwd,category}) {
	if(!user || !pwd || !repeatpwd || !category){
		return errorMsg('用户名或密码必须输入！');//注意碰到的问题：把return单独写到下面时会报错

	}
	if(pwd !== repeatpwd){
		return errorMsg('两次密码不相同！');
	}

	return (dispatch, getState) => {
		axios.post('/user/register',{user,pwd,category})
			.then(res => {
				if(res.status===200 && res.data.code ===0){//拿到数据了
					dispatch(authSuccess({user,pwd,category}))
				}else{
					dispatch(errorMsg(res.data.msg));
				}
			})
	}
}

export function userinfo(userinfo){
	return {
		type:types.LOAD_DATA,
		data:userinfo
	}
}

export function updata(data) {//点击注册页面【保存】触发
	//return authSuccess(data)
	return (dispatch, getState) => {//异步请求，等请求成功后把数据更新到redux中
		axios.post('/user/updata',data)
			.then(res => {
				if(res.status==200&&res.data.code==0){
					dispatch(authSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
	}

}

export function loginout() {
	return{
		type:types.LOGINOUT
	}

}