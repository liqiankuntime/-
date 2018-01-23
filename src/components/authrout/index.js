/**
 * Created by liqiankun on 2017/11/19.
 */
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {userinfo} from '../../redux/action/userAction'



@withRouter//因为这个组件是一个普通的组件并不是一个路由组件，所以通过这个方法才有this.props.history的方法
@connect(
	null,
	{userinfo}
)


class AuthRout extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		//获取用户信息
		// 是否登陆
		// 若没有登陆的话有些页面(比如用户中心)(根据url进行判断)是进不去的，这时候就要自动跳转到登陆页面
		// 根据category 身份是boss还是genius，若是boss的话那么会跳转到牛人的列表进行查看，若是genius的话就会跳转到boss列表进行查看
		// 是否完善信息
		const publicpath = ['/login','/regist'];
		const currentRout = this.props.location.pathname;
		if( publicpath.includes(currentRout)  ){//publicpath.indexOf(currentRout)>-1
			return null;
		}
		//获取数据
		axios.get('/user/info')//返回用户当前状态的信息
			.then(res => {
				if(res.status == 200){
					if(res.data.code ==0){
						//有数据
						this.props.userinfo(res.data.data);
					}else{
						//code=1;  没有拿到数据
						// console.log('history:>:',this.props.history);
						this.props.history.push('/login');
					}

				}
			})
	}

	render(){
		return null
	}
}

export default AuthRout;