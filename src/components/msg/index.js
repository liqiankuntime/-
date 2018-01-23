/**
 * Created by liqiankun on 2017/11/28.
 */
import React from 'react';
import { connect } from 'react-redux';
import {List ,Badge} from 'antd-mobile';

@connect(
	state => state
)

class Msg extends React.Component{
	constructor(props){
		super(props);

		this.getLast = this.getLast.bind(this);

	}

	getLast(arr){
		return arr[arr.length-1];
	}

	render(){
		//根据聊天用户分组，根据chatid
		const userId = this.props.user._id;
		const userInfo = this.props.chat.users;
		const msgGroup = {};
		this.props.chat.chatMsg.forEach((v)=>{
			msgGroup[v.chatid] = msgGroup[v.chatid] || [];
			msgGroup[v.chatid].push(v);
		})
		const chatList = Object.values(msgGroup).sort( (item1,item2) => {
			const item1_last = this.getLast(item1).create_time;
			const item2_last = this.getLast(item2).create_time;
			return item2_last - item1_last;

		});
		const Item = List.Item;
		const Brief = Item.Brief;

		return this.props.user?(
			<div>
				{
					chatList.map((v,indx)=>{
						const lastItem = this.getLast(v);
						const targetId = v.from==userId?v[0].to:v[0].from;
						const unreadNum = v.filter((item,idx)=> !item.read&&v[0].to==userId).length;
						if(!userInfo[targetId]){
							return ;
						}
						return (
							<List key={indx}>
							<Item
								thumb={require(`../../images/img/${userInfo[targetId].avatar}.png`)}
							    extra={<Badge text={unreadNum}/>}
							    arrow="horizontal"
							    onClick={()=>{
								    this.props.history.push(`/chat/${targetId}`);
							    }}
							>
								{lastItem.content}

							<Brief>{userInfo[targetId].name}</Brief>

							</Item>
							</List>
						)
					})
				}
			</div>
		):null
	}
}

export default Msg