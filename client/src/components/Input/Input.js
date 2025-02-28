import React from 'react';
import './Input.css';

import sendIcon from '../../icons/send.svg';

const Input = ({ message, setMessage, sendMessage }) => (
	<form className="form">
        <input className="input" type="text" placeholder="Type a message..." value={message}
            onChange= {(event) => setMessage(event.target.value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <img src={sendIcon} className="send-icon" alt="send" onClick={event => sendMessage(event)} />
        {/* <button className="sendButton" onClick={event => sendMessage(event)}>Send</button> */}
    </form>
)

export default Input;
