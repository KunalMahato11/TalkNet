// hosted on https://talknet.netlify.app/
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const router = require('./router');

app.use(router);
app.use(cors());

io.on('connection', (socket) => {
	socket.on('join', ({ name, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, name: name, room: room });

		if (error) return callback(error);
		
		socket.join(user.room);
		socket.emit('message', { user: 'admin', text: `Welcome ${user.name} to ${user.room.toUpperCase()} room.` });
		socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} just slid into the room` });
		io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
		callback();
	});

	socket.on('sendMessage', (msg, callback) => {
		const user = getUser(socket.id);

		io.to(user.room).emit('message', { user: user.name, text: msg });
		// io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

		callback();
	});

	socket.on('disconnect', () => {
		console.log('User left !!');
		const user = removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('message', { user: 'admin', text: `${user.name} left` });
			io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
		} 
	});
});

app.use(router);

server.listen(PORT, () => {
	console.log(`SERVER HAS STARTED ON PORT ${PORT}`);
});
