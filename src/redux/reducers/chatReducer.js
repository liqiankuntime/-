/**
 * Created by liqiankun on 2017/12/3.
 */
import * as types from '../action/actionType';

const initState = {
	chatMsg:[],
	users:{},
	unRead:0
}

export default function chat(state=initState,action) {
	switch (action.type){
		case types.MSG_LIST :
			return {...state,chatMsg:action.data.msgs,users:action.data.users,unRead:action.data.msgs.filter(v => !v.read && v.to==action.data.userid).length}
		case types.MSG_RECEIVE:
			const n = action.data.to == action.userid?1:0;
			return{...state,chatMsg:[...state.chatMsg,action.data],unRead:state.unRead+n}//?action.data.filter(v => !v.read).length?//每次发送信息时都会触发这里，所以未读信息都要加1
		case types.MSG_READ:
			console.log('MSG_READ>',state.chatMsg);
			const {from,num} = action.payload;
			return {
				...state,
				chatMsg:state.chatMsg.map(
					(v)=>({...v,read:from==v.from && true})
				),
				unRead:state.unRead-num}
		default:
			return state;
	}
}