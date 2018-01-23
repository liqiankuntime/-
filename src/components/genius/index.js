/**
 * Created by liqiankun on 2017/11/26.
 */
import React from 'react';
import {connect} from 'react-redux';
import UserCard from '../userCard';
import {Button} from 'antd-mobile';

import {getUserList} from '../../redux/action/chatUserAction';

@connect(
	state => state.chatuser,
	{getUserList}
)

class Genius extends React.Component{
	constructor(props){
		super(props);

	}

	componentDidMount(){
		this.props.getUserList('BOSS');
	}
	render(){
		return (
			<UserCard userList={this.props.userList}></UserCard>
		)
	}
}

export default Genius