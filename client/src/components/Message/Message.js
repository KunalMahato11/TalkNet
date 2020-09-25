import React from 'react';
import './Message.css';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { user, text }, name }) => {
	let isSendByCurrentUser = false;

	const trimmedName = name.trim().toLowerCase();

	if (user === trimmedName) {
		isSendByCurrentUser = true;
	}

	return isSendByCurrentUser ? (
		<div className="messageContainer justifyEnd">
			<div className="helper">
				<div className="messageBox backgroundBlue">
					<p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
				</div>
				<p className="sentText pr-10">{trimmedName}</p>
			</div>
		</div>
	) : (
		<div className="messageContainer justifyStart">
			<div className="helper2">
				<div className="messageBox backgroundLight">
					<p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
				</div>
				<p className="sentText2 pl-10">{user}</p>
			</div>
		</div>
	);
};

export default Message;
