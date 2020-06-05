import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import './scss/Delete.scss';

const Delete = () => {
  const [count, setCount] = useState(0);
  const [firstNum, setFirstNum] = useState(0);
  const [secondNum, setSecondNum] = useState(0);
  const [answer, setAnswer] = useState(0);

  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const first = Math.floor((Math.random() * 10) + 10);
    const second = Math.floor((Math.random() * 10) + 10);
    setFirstNum(first);
    setSecondNum(second);
    setAnswer(first+second);
  }, [])

  useEffect(() => {
    if(answer && count === answer){
      const choice = window.confirm("Aere you sure you want to delete this account?")

      if(choice){
        deleteAccount();
      }
    }
  }, [count])

  async function deleteAccount(){
    await axios.get('/user/delete').then(data => {
      if(data.status === 200){
        setUser({ username: '', role: ''});
        setIsAuthenticated(false);
      }
    });
  }

  const onImageClick = (e) => {
    setCount(count + 1);
  }

  return (
    <div className="delete">
      <h1>Click Image {firstNum} + {secondNum} times</h1>
      <img src="logo.png" alt="logo" onClick={onImageClick}/>
      <div className="count">{count}</div>
    </div>
  )
}

export default Delete;