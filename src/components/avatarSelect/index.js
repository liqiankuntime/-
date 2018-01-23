/**
 * Created by liqiankun on 2017/11/23.
 */
import React from 'react';
import {Grid,List} from 'antd-mobile';
import PropeType from 'prop-types';

class AvatarSelect extends React.Component{
	static propTypes={//propTypes固定写法
		selectAvatar:PropeType.func.isRequired
	}
	constructor(props){
		super(props);

		this.state={}//为什么这里为空，而下面直接可以取值this.state.text判断
	}

	render(){
		const data = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
			.split(',')
			.map(item => ({
				icon:require(`../../images/img/${item}.png`),
				text:item
			}))
		const selectHead = this.state.text//初始时是没有这个字段的，所以说为假
							?
						(
							<div>
								<span>已选择头像</span>
								<img src={this.state.icon} />
							</div>
						)
							:
						'还未选择头像'

		return (
			<div>
				<List renderHeader={() => {return selectHead}}>
					<Grid
						data={data}
						columnNum={5}
						onClick={(item) => {console.log('123');this.props.selectAvatar(item);this.setState(item)}}
					/>
				</List>

			</div>
		)
	}
}

export default AvatarSelect