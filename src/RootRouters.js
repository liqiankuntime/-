/**
 * Created by liqiankun on 2017/11/17.
 */
import React from 'react';
import {Route,Switch} from 'react-router-dom';
//,Route,Redirect,Switch

import AuthRout from './components/authrout';
import Login from './containers/login';
import Regist from './containers/regist';
import BossInfo from './containers/bossinfo';
import GeniusInfo from './containers/geniusinfo';
import DashBoard from './components/dashboard';
import Chat from './components/chat';


//总共有页面：boss genius me msg  有相同的头部组件和底部的导航主见
{/*<Switch></Switch> 的用法是：当Route中不写path时候所有页面都会显示这个不写path的页面，而用了Switch后命中哪个路由就只渲染哪个页面,所以四个页面都在DashBoard组件里面*/}
export default class RootRouters extends React.Component{

	render(){
		return(
			<div>
				<AuthRout></AuthRout>
				<Switch>
					<Route path="/login" component={Login}></Route>
					<Route path="/regist" component={Regist}></Route>
					<Route path="/bossinfo" component={BossInfo}></Route>
					<Route path="/geniusinfo" component={GeniusInfo}></Route>
					<Route path="/chat/:user" component={Chat}></Route>
					<Route component={DashBoard}></Route>

				</Switch>

			</div>
		)
	}
}