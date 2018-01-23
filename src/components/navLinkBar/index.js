/**
 * Created by liqiankun on 2017/11/26.
 */
import React from 'react';
import {TabBar} from 'antd-mobile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getMsgList,receiveMsg} from '../../redux/action/chatAction';
import {withRouter} from 'react-router-dom';

import './index.css';

@withRouter
@connect(
	state => state.chat,
	{getMsgList,receiveMsg}
)

class NavLinkBar extends React.Component{
	static propTypes={
		data : PropTypes.array.isRequired
	}
	constructor(props){
		super(props);

	}

	componentDidMount(){
		this.props.getMsgList();
		this.props.receiveMsg()
	}

	render(){
		const navList = this.props.data.filter(v => !v.hide);
		const {pathname} = this.props.location;

		return (
			<TabBar id="tabBarContainer">
				{
					navList.map((v,index ) => (
						<TabBar.Item className="Item"
						    badge = {v.path=='/msg'&&this.props.unRead}
							title = {v.text}
						    key = {index}
						    icon = {{uri:require(`../../images/barImg/${v.icon}.png`)}}
						    selectedIcon={{uri:require(`../../images/barImg/${v.icon}-active.png`)}}
						    selected={pathname === v.path}
						    onPress={() => this.props.history.push(v.path)}
						>

						</TabBar.Item>
					))
				}
			</TabBar>
		)
	}
}

export default NavLinkBar