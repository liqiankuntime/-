/**
 * Created by liqiankun on 2017/11/19.
 */
import React from 'react';
import './index.css';
import LogoImg from '../../images/logo.jpg';

class Logo extends React.Component{


	render(){
		return (
			<div className="logoImageContainer">
				<img className="logoImg" src={LogoImg} alt="no"/>
			</div>
		)
	}
}

export default Logo;