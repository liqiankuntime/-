/**
 * Created by liqiankun on 2017/11/17.
 */
import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {List, InputItem,Button, WhiteSpace, WingBlank} from 'antd-mobile';
import { login } from '../../redux/action/userAction'
import Wraper from '../../components/HocComp';

import Logo from '../../components/logo'
//state => {return {user:state.user,logo:true}},

//高阶组件的属性代理
function Wrapper(Comp) {
	class NewRaper extends React.Component{
		render(){
			return(
				<div>
					<div>这里是争强的内容</div>
					<Comp {...this.props}></Comp>
				</div>
			)
		}
	}
	return NewRaper;
}
//高阶组件的反向继承
function Wrapper2(Comp) {
	class NewRaper extends Comp{
		render(){
			return(
				<div>
					<div>这里是争强的内容</div>
					<Comp {...this.props}></Comp>
				</div>
			)
		}
	}
	return NewRaper;
}
@Wrapper
class Hellow extends React.Component{
	render(){
		return(
			<h3>I like React & Redux</h3>
		)
	}
}


@connect(
	state => state.user,
	{login}
)
@Wraper

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={
			user:'',
			pwd:''
		}

		this.jumpToRegist = this.jumpToRegist.bind(this);
		this.loginEvent = this.loginEvent.bind(this);

	}

	jumpToRegist(){
		this.props.history.push('/regist')
	}

	loginEvent(){
		this.props.login(this.props.state);
	}

	render(){
		return(
			<div>
				<Hellow></Hellow>
				{this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
				<Logo />
				登陆页面

				<List>
					<InputItem
						onChange={(val) => this.props.handleClick('user',val)}
					>用户名:</InputItem>
					<WhiteSpace/>
					<InputItem
						onChange={(val) => this.props.handleClick('pwd',val)}
						type="password"
						placeholder="****"
					>密码:</InputItem>
					<WhiteSpace/>
				</List>

				<Button type="primary"
					onClick={this.loginEvent}
				>
					登陆
				</Button>
				<WhiteSpace/>
				<Button type="primary" onClick={this.jumpToRegist}>注册</Button>
			</div>
		)
	}
}

export default Login