/**
 * Created by liqiankun on 2017/11/27.
 */
import * as types from '../action/actionType';


const initState = {
	userList:[]
}

export default function chatuser(state=initState,action) {
	switch(action.type){
		case types.USER_LIST:
			return {...state,userList:action.data}
		default:
			return state;
	}
}