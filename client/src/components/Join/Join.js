import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');

	return (
		<div className="jOuter">
			<div className="jInner">
				<h1 className="heading">Join</h1>
				<div className="input-1">
					<input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
				</div>
				<div className="input-2">
					<input placeholder="Room" className="joinInput" type="text" onChange={(event) => setRoom(event.target.value)} />
				</div>
				<Link onClick={(event) => (!name || !room ? event.preventDefault() : null)} to={`/chat?name=${name}&room=${room}`}>
					<button className="button" type="submit">
						Submit
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Join;
