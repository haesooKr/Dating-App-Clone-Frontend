import React, { useState, useEffect } from "react";
import Alert from './Alert';

import axios from "axios";

const Room = ( props ) => {
  const [alert, setAlert] = useState(null);
  const [roomId, setRoomId] = useState(props.match.params.roomId)
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  async function getMessages() {
    await axios.post("/user/room", { roomId }).then((data) => {
      setMessages(data.data.messages);
    });
  }

  async function sendMessage(){
    await axios.post("/user/sendMessage", { roomId, content: message }).then((data) => {
      setMessage('');
      setAlert(data.data);
      getMessages();
    })
  }

  useEffect(() => {
    getMessages();
  }, []);

  const ListMessages = () => {
    return messages.map((message, index) => {
      return (
        <li key={index}>
          <span className="sender">{message.sender}: </span>
          <span className="content">{message.content}</span>
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
    <div>
      Messages
      <button onClick={() => props.history.goBack()}>Back</button>
      <ul>
        <ListMessages />
      </ul>
      <input type="text" placeholder="Enter the message" value={message} onChange={onChange} onKeyUp={(e) => {
        if(e.key === "Enter"){
          sendMessage();
        }
      }}/>
      <button onClick={onClick}>Enter</button>
      { alert ? <Alert alert={alert} /> : null }
    </div>
  )
}

export default Room;
