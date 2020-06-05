import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../Context/AuthContext';
import './scss/Room.scss';

import axios from "axios";

const Room = ( props ) => {
  const [roomId, setRoomId] = useState(props.match.params.roomId)
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const { user } = useContext(AuthContext);

  async function getMessages() {
    await axios.post("/user/room", { roomId }).then((data) => {
      setMessages(data.data.messages);
    });

    const scroll = document.querySelector('.scroll');
    scroll.scrollTop = scroll.scrollHeight;
  }

  async function sendMessage(){
    await axios.post("/user/sendMessage", { roomId, content: message }).then((data) => {
      setMessage('');
      getMessages();
    })
  }

  useEffect(() => {
    getMessages();
  }, []);

  const ListMessages = () => {
    return messages.map((message, index) => {
      return (
        <li key={index} className={message.sender_username === user.username ? 'me' : null}>
          <div className="sender"><span>{message.sender}</span></div>
          <div className="content"><span>{message.content}</span></div>
        </li>
      )
    })
  }

  const onChange = (e) => {
    setMessage(e.target.value);
  }

  const onClick = () => {
    sendMessage();
  }

  


  return (
    <div className="room">
      <h1>Messages</h1>
      <button className="back" onClick={() => props.history.goBack()}><i className="fas fa-backspace"></i></button>
      <ul className='scroll'>
        <ListMessages />
      </ul>
      <div className="chat">
        <input type="text" placeholder="Enter the message" value={message} onChange={onChange}/>
        <button className="send" onClick={onClick}><i className="fas fa-paper-plane"></i></button>
      </div>
    </div>
  )
}

export default Room;
