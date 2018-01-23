/**
 * Created by liqiankun on 2017/11/26.
 */
import React from 'react';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile';
import {Switch,Route} from 'react-router-dom';
import NavLinkBar from '../navLinkBar';
import Boss from '../boss';
import Genius from '../genius';
import Me from '../me';
import Msg from '../msg';
import {getMsgList,sendMsg,receiveMsg} from '../../redux/action/chatAction';
import './index.css'

@connect(
	state => state,
	{getMsgList,receiveMsg}
)


class DashBoard extends React.Component{

	componentDidMount(){
		if(!this.props.chat.chatMsg.length){
			this.props.getMsgList();
			this.props.receiveMsg();
		}
	}

	render(){
		const {category} = this.props.user;
		const {pathname} = this.props.location;
		const navList = [
			{
				path:'/boss',
				text:'牛人',
				icon:'boss',
				title:'牛人列表',
				component:Boss,
				hide:category === 'genius'
			},
			{
				path:'/genius',
				text:'Boss',
				icon:'genius',
				title:'Boss列表',
				component:Genius,
				hide:category === 'BOSS'
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:Msg,
			},
			{
				path:'/me',
				text:'我',
				icon:'user',
				title:'个人中心',
				component:Me,
			},
		];
		return (
			<div>
				<NavBar className="fixed-top" mode='dard'>{navList.find(v => v.path === pathname).title}</NavBar>
				<div style={{marginTop:'50px'}}>
					<Switch>
						{
							navList.map((v,index) => (
								<Route key={index} path={v.path} component={v.component}></Route>
							))
						}
					</Switch>
				</div>
				<NavLinkBar data={navList}/>
			</div>
		)
	}
}

export default DashBoard;