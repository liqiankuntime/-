/**
 * Created by liqiankun on 2017/11/28.
 */
import React from 'react';
import { connect } from 'react-redux';
import {Result, List,Button,Modal} from 'antd-mobile';
import { Redirect } from 'react-router-dom'
import browserCookie from 'browser-cookies';//用来对cookie的操作
import {loginout} from '../../redux/action/userAction';

@connect(
	state => state.user,
	{loginout}
)

class Me extends React.Component{
	constructor(props){
		super(props);

		this.loginout = this.loginout.bind(this);

	}

	loginout(){
		console.log('loginout');
		const alert = Modal.alert;
		alert('退出', '确定退出吗?', [
			{ text: '取消', onPress: () => console.log('cancel') },
			{ text: '确定', onPress: () => {
				browserCookie.erase('userid');
				this.props.loginout()
				//window.location.href = window.location.href//强制刷新页面,这样的用户体验不好

			} },
		])

	}

	render(){
		console.log('aaa:',this.props);//重要的知识点，也是自己容易迷糊的地方为什么要用三元表达式判断一下
		const Item = List.Item;
		const Brief = Item.Brief;
		return this.props.user?(
			<div>
				<Result
					img={<img src={require(`../../images/img/${this.props.avatar}.png`)}/>}
					title={this.props.user}
					message={this.props.company&&<div>{this.props.company}</div>}
				/>
				<List renderHeader={() => '简介'}>
					<Item>
						{this.props.title}
						{
							this.props.desc.split('\n').map((item,idx) => {
								return <Brief key={idx}>{item}</Brief>
							})
						}
						{this.props.money&&<Brief >{this.props.money}</Brief>}
					</Item>

				</List>
				<Button type="primary" onClick={this.loginout}>退出</Button>
			</div>
		):<Redirect to={this.props.redirectTo} />
	}
}

export default Me