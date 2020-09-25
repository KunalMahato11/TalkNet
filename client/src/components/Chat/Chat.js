import React, { useState,  useEffect} from 'react';
import qString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

import OnlineUsers from '../OnlineUsers/OnlineUsers';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

import mainIcon from '../../icons/chat2.svg';
import gamepad from '../../icons/gamepad2.svg';
import group from '../../icons/group.svg';
import tv from '../../icons/tv2.svg';


let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const endPoint = 'https://react-talknet.herokuapp.com/';

    useEffect(() => {
        const { name, room } = qString.parse(location.search)
        
        socket = io(endPoint);
        
        setName(name);
        setRoom(room);
        
        socket.emit('join', { name : name, room : room }, (error) => {
            if(error) {
                alert(error);
            }
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [endPoint, location.search])


    useEffect(() => {
        socket.on('message', (msg) => {
            setMessages([...messages, msg]);
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [messages]);
    //messages

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    // console.log(message, messages);

    return (
        <div className="outerContainer"> 
        {/* outerContainer */}
            {/* <div className="container">
                <InfoBar room={room}/>
                <Messages messages = {messages} name = {name}/>
                <Input message = { message } setMessage = { setMessage } sendMessage = { sendMessage }/>
            </div> */}
            <div className="rooms">
				<div className="rooms-icons">
					<img src={mainIcon} className="main-icon" alt="icon" />
					<img src={gamepad} className="svg" alt="icon" />
					<img src={group} className="svg" alt="icon" />
					<img src={tv} className="svg" alt="icon" />
				</div>

				<div className="chat-area">
                    <InfoBar room={room}/>
                    <Messages messages = {messages} name = {name}/>
                    <Input message = { message } setMessage = { setMessage } sendMessage = { sendMessage }/>
                </div>
				<div className="online-users">
                    <OnlineUsers users= { users }/>
                </div>
			</div>
        </div>

        
    )
};

export default Chat;