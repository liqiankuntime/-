/**
 * Created by liqiankun on 2017/11/27.
 */

import * as types from './actionType';
import axios from 'axios'


function chatuser(data) {
	return {
		type:types.USER_LIST,
		data:data
	}
}

export function getUserList(type) {
	return dispatch => {
		axios.get(`/user/list?category=${type}`)
			.then(res => {
				if(res.data.code==0){
					dispatch(chatuser(res.data.data))
				}
			})
	}
}