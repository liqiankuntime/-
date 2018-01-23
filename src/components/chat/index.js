/**
 * Created by liqiankun on 2017/12/3.
 */
import React from 'react';
import {List, InputItem,NavBar,Icon,Grid} from 'antd-mobile';
import './index.css'
import {connect} from 'react-redux';
import {getMsgList,sendMsg,receiveMsg,readMsg} from '../../redux/action/chatAction';
import {getChatId} from '../../common/utils';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');




@connect(
	state=>state,
	{getMsgList,sendMsg,receiveMsg,readMsg}
)
class Chat extends React.Component{
	constructor(props){
		super(props);

		this.state={
			text:'',
			msgArr:[],
			showEmoj:false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleEmit = this.handleEmit.bind(this);
		this.backEvent = this.backEvent.bind(this);
		this.handlshowEmoj = this.handlshowEmoj.bind(this);
	}

	componentDidMount(){

		if(!this.props.chat.chatMsg.length){
			this.props.getMsgList();
			this.props.receiveMsg();
		}
		console.log('match:',this.props.match)

	}
	componentWillUnmount(){
		console.log('componentWillUnMount');
		const to = this.props.match.params.user;
		this.props.readMsg(to);
	}

	handleChange(v){
		this.setState({
			text:v
		})
	}
	//点击发送
	handleEmit(){
		//socket.emit('sendMsg',{content:this.state.text})
		// this.setState({text:''})
		const from = this.props.user._id;
		const to = this.props.match.params.user;
		const content = this.state.text;

		this.props.sendMsg({from,to,content});
		this.setState({text:''})
	}
	backEvent(){
		this.props.history.goBack();
	}
	handlshowEmoj(){
		this.setState({
			showEmoj:!this.state.showEmoj
		})
		setTimeout(()=>(//解决Grid的BUG
			window.dispatchEvent(new Event('resize'))
		),0);
	}

	render(){

		const userid = this.props.match.params.user;
		const Item = List.Item;
		const users = this.props.chat.users;
		if(!users[userid]){
			return null;
		}
		const chatId = getChatId(userid,this.props.user._id);
		const chatMgs = this.props.chat.chatMsg.filter( v => v.chatid == chatId);
		const emoji = '  😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 ☺ 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫'
			.split(' ')
			.filter(v=>v)//筛选出不是空的值
			.map(v=>({text:v}))
		return(
			<div id="chat-page">
				<NavBar
					icon={<Icon type="left"></Icon>}
					onLeftClick={this.backEvent}
				>{users[userid].name}</NavBar>
				{
					chatMgs.map((item,indx) => {
						const avator = require(`../../images/img/${users[item.from].avatar}.png`);
						return (
							item.from==userid
								?
							(
								<List key={indx}>
									<Item
										thumb={avator}
									>{item.content}</Item>
								</List>
							)
								:
							(
								<List key={indx}>
									<Item
										className="chat-me"
										extra={<img src={avator} alt=""/>}
									>{item.content}</Item>
								</List>
							)
						)

					})
				}
				<div className="stick-footer">
					<InputItem
						value={this.state.text}
						extra = {
							<div >
								<span style={{marginRight:10,background:'red'}} onClick={this.handlshowEmoj}>😀</span>
								<span onClick={this.handleEmit}>发送</span>
							</div>
						}
						onChange={this.handleChange}
					    placeholder="请输入"
					>

					</InputItem>
					{/*<div style={{width:'40px',height:'40px',background:'blue'}} onClick={this.handleEmit}>点击</div>*/}
					{
						this.state.showEmoj&&<Grid
							data={emoji}
							columnNum={9}
							carouselMaxRow={4}
							isCarousel={true}
						    onClick={(el)=>{
						    	this.setState({
								    text:this.state.text+el.text
							    })
						    }}
						/>
					}
				</div>
			</div>

		)
	}

}

export default Chat;
// {`:${this.props.match.params.user}`}