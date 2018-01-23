/**
 * Created by liqiankun on 2017/11/19.
 */

import * as types from '../action/actionType';
import {getRedirectPath} from '../../common/utils';
const initState={
	//isAuth:false,
	redirectTo:'',
	msg:'',
	user:'',
	category:''
}
export default function user(state=initState,action) {
	console.log('redux:',state,action);
	switch (action.type){
		case types.AUTH_SUCCESS:
			return{...state,msg:'',redirectTo:getRedirectPath(action.data),...action.data}
		case types.ERROR_MSG:
			return{...state,msg:action.msg}
		case types.LOAD_DATA:
			return {...state,...action.data};
		case types.LOGINOUT:
			return{...initState,redirectTo:'/login'}
		default:
			return state;
	}

}