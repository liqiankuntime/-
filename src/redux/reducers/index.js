/**
 * Created by liqiankun on 2017/11/20.
 */
import { combineReducers} from 'redux';
import user from './userReducer';
import chatuser from './chatUserReducer';
import chat from './chatReducer';



export default combineReducers({
	user,
	chatuser,
	chat
})