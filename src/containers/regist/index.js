/**
 * Created by liqiankun on 2017/11/17.
 */
import React from 'react';
import './index.css';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import {List, InputItem,Button,Radio, WhiteSpace, WingBlank} from 'antd-mobile';

import Logo from '../../components/logo';
import Wrapper from '../../components/HocComp';
import {regist} from '../../redux/action/userAction'

const RadioItem = Radio.RadioItem;
@Wrapper
class Regist extends React.Component{
	constructor(props){
		super(props);

		// this.props.state={
		// 	user:'',
		// 	pwd:'',
		// 	repeatpwd:'',
		// 	category:'genius'
		// }

		//this.props.handleClick = this.props.handleClick.bind(this);
		this.handleRegist = this.handleRegist.bind(this);
	}

	handleRegist(){
		console.log('daddd:',this.props.state,this.props.registInfo);
		this.props.regist(this.props.state)
	}

	componentDidMount(){
		this.props.handleClick('category','genius')
	}

	render(){
		console.log('daddd2:',this.props.registInfo);
		return(
			<div>
				{this.props.registInfo.redirectTo?console.log('this.props::',this.props.registInfo.redirectTo):null}
				{this.props.registInfo.redirectTo?<Redirect to={this.props.registInfo.redirectTo}/>:null}
				<Logo />
				注册页面
				<List>
					<InputItem
						onChange={(v) => {this.props.handleClick('user',v)}}
					>
						用户名
					</InputItem>
					<InputItem
						type="password"
					    placeholder="***"
						onChange={(v) => {this.props.handleClick('pwd',v)}}
					>
						密码
					</InputItem>
					<InputItem
						type="password"
					    placeholder="***"
						onChange={(v) => {this.props.handleClick('repeatpwd',v)}}
					>
						确认密码
					</InputItem>
				</List>
				<WhiteSpace/>
				<RadioItem
					checked={this.props.state.category==='genius'}
					onClick={ () => this.props.handleClick('category','genius')}
				>
					genius
				</RadioItem>
				<RadioItem
					checked={this.props.state.category==='BOSS'}
					onClick={ () => this.props.handleClick('category','BOSS')}
				>
					BOSS
				</RadioItem>
				<WhiteSpace/>
				<Button
					type="primary"
				    onClick={this.handleRegist}
				>
					注册
				</Button>

			</div>
		)
	}
}

function mapStateToProps(state) {
	return{
		registInfo:state.user
	}
}
function mapDispatchToProps(dispatch) {
	return {
		regist: bindActionCreators(regist, dispatch)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Regist) ;