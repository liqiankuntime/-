/**
 * Created by liqiankun on 2017/11/23.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile';
import AvatarSelect from '../../components/avatarSelect'

import {updata} from '../../redux/action/userAction';

@connect(
	state=>state.user,
	{updata}
)

class BossInfo extends React.Component{
	constructor(props){
		super(props);

		this.state={
			title:'',
			company:'',
			money:'',
			desc:'',
			avatar:''
		}

		this.handelChange = this.handelChange.bind(this);
		this.selectAvatar = this.selectAvatar.bind(this);
		this.handleUpdata = this.handleUpdata.bind(this);
	}

	handelChange(key,val){
		this.setState({
			[key]:val
		})
	}
	selectAvatar(item){
		this.setState({
			avatar:item.text
		})

	}
	handleUpdata(){
		this.props.updata(this.state);
	}

	render(){
		const path = this.props.location.pathname;
		const redirect = this.props.redirectTo;
		return (
			<div>
				{
					(redirect&&redirect!==path) ? <Redirect to={this.props.redirectTo} /> : null
				}
				<NavBar mode="dark"> BOSS信息完善页 </NavBar>
				<AvatarSelect selectAvatar={this.selectAvatar}/>
				<InputItem onChange={(val) => this.handelChange('title',val)} >
					招聘职位:
				</InputItem>
				<InputItem onChange={(val) => this.handelChange('company',val)}>
					公司名称:
				</InputItem>
				<InputItem onChange={(val) => this.handelChange('money',val)}>
					职位薪资:
				</InputItem>
				<TextareaItem
					title="职位要求:"
					placeholder="职位要求的描述"
					rows={3}
					autoHeight
				    onChange={(val) => this.handelChange('desc',val)}
				/>

				<Button type="primary" onClick={this.handleUpdata}> 保存</Button>
			</div>
		)
	}
}

export default BossInfo