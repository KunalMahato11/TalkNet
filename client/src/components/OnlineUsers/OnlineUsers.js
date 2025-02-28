import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './OnlineUsers.css';

const OnlineUsers = ({ users }) => (
  <div className="textContainer">
    
    {/* <div>
      <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
      <h2>Created with React, Express, Node and Socket.IO <span role="img" aria-label="emoji">❤️</span></h2>
      <h2>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2>
    </div> */}
    {
      users
        ? (
          <div>
            <h1 className="main-heading">Online</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    <img alt="Online Icon" className="icon" src={onlineIcon}/>
                    {name}
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default OnlineUsers;