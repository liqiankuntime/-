/**
 * Created by liqiankun on 2017/12/2.
 */
import React from 'react';

export default function HOCwraper(Comp) {

	return class Wraper extends React.Component{
		constructor(props){
			super(props);

			this.state={};

			this.handleClick = this.handleClick.bind(this);
			console.log('props:>>',this.props);
		}

		handleClick(key,val){
			console.log('key::',key,val);
			this.setState({
				[key]:val
			})
		}

		render(){
			return(
				<Comp handleClick={this.handleClick} state={this.state} {...this.props}></Comp>
			)
		}
	}

}