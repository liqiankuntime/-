/**
 * Created by liqiankun on 2017/11/26.
 */
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import {getUserList} from '../../redux/action/chatUserAction';
import UserCard from '../userCard';

@connect(
	state => state.chatuser,//function(state){return state.chatuser}
	{getUserList}
)

class Boss extends React.Component{
	constructor(props){
		super(props);

	}
	componentDidMount(){
		this.props.getUserList('genius');
	}
	render(){
		return (

			<UserCard userList={this.props.userList}></UserCard>
		)
	}
}

export default Boss