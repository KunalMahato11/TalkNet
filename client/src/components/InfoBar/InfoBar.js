import React from 'react';
import './InfoBar.css';

import closeIcon from '../../icons/house.svg';
import onlineIcon from '../../icons/onlineIcon.png';

const InfoBar = ({ room }) => (
	<div className="infoBar">
		<div className="leftInnerContainer">
			<img className="onlineIcon" src={ onlineIcon } alt="online img" />
			<h3 className="room-name"> { room } </h3>
		</div>
		<div className="rightInnerContainer">
			<a href="/">
				<img src={ closeIcon } alt="close img" className="home-icon"/>
			</a>
		</div>
	</div>
)

export default InfoBar;
