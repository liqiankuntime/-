/**
 * Created by liqiankun on 2017/12/3.
 */
import axios from 'axios';
import * as types from './actionType';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');



function msgList(msgs,users,userid) {
	return{
		data:{msgs,users,userid},
		type:types.MSG_LIST,
	}
}
export function getMsgList() {
	return (dispatch,getState) => {
		axios.get('/user/getmsgList')
			.then((res)=>{
				const userid = getState().user._id;
				dispatch(msgList(res.data.msgs,res.data.users,userid));
			})
	}
}


export function sendMsg({from ,to ,content}) {
	return dispatch => { socket.emit('sendMsg',{from ,to ,content})};
}

function msgReceive(data,userid) {
	return {
		data,
		userid,
		type:types.MSG_RECEIVE
	}
}

export function receiveMsg() {
	return (dispatch,getState) => {
		socket.on('receiveMsg',function (data) {
			const userid = getState().user._id;
			dispatch(msgReceive(data,userid))
		})
	}
}
function msgRead({from,userid,num}) {
	return {
		type:types.MSG_READ,
		payload:{from,userid,num}
	}
}
export function readMsg(from) {
	return (dispatch,getState)=>{
		console.log('readMsg>',from);
		axios.post('/user/readmsg',{from})
			.then(res => {
				const userid = getState().user._id;
				const num = res.data.num;
				if(res.status==200&&res.data.code==0){
					dispatch(msgRead({userid,from,num}));//一个变量的形式的可以按es6的写法，但不能直接写成res.data.num
				}
			})
	}
}

//用async + await 改写promise的异步请求
export function readNewMsg(from){
	return	async  (dispatch,getState)=>{
		const res = await axios.post('/user/readmsg',{from});
		const userid = getState().user._id;
		const num = res.data.num;
		if(res.status==200&&res.data.code==0){
			dispatch(msgRead({userid,from,num}));//一个变量的形式的可以按es6的写法，但不能直接写成res.data.num
		}
	}
}