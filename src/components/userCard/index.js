/**
 * Created by liqiankun on 2017/11/27.
 */
import React from 'react';
import PropeType from 'prop-types';
import {Card,WhiteSpace,WingBlank } from 'antd-mobile';
import {withRouter} from 'react-router-dom';

import './index.css';
@withRouter
class UserCard extends React.Component{

	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}
	static propTypes={//propTypes固定写法
		userList:PropeType.array.isRequired
	}

	handleClick(v){
		console.log('userCard',this.props,'location>',this.props.location,'v>',v.user);
		// this.props.history.push({
		// 	pathname:`/chat/${v.user}`
		// })

		this.props.history.push(`/chat/${v._id}`)
	}

	render(){
		return (
			<div style={{marginBottom:'10px'}} >
				{
					this.props.userList.map((item,index) => (
						<Card key={index} onClick={() => this.handleClick(item)}>
							<Card.Header
								title={item.user}
								thumb={require(`../../images/img/${item.avatar}.png`)}
								extra={<span>{item.title}</span>}
							>
							</Card.Header>
							<Card.Body>
								{item.company?<div>公司:{item.company}</div>:''}
								{item.company?<div>薪资:{item.money}</div>:''}
								{item.desc.split('\n').map((v,index) => (
									<div key={index}>{v}</div>
								))}

							</Card.Body>
						</Card>
					))
				}
			</div>
		)
	}
}

export default UserCard