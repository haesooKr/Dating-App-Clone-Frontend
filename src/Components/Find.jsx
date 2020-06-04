import React, { useState, useEffect } from "react";
import axios from "axios";
import './scss/Find.scss';

const Find = () => {
  const [people, setPeople] = useState([]);

  async function findPeople() {
    await axios.get("/user/people").then((data) => {
      setPeople(data.data.people);
    });
  }

  useEffect(() => {
    findPeople();
  }, []);

  const onClick = (e) => {
    let type = e.target.value;
    if(!type){
      type = e.target.parentNode.value;
    }
    if(people.length > 0){
      async function action(type){
        await axios.post(`/user/${type}`, {
          _id: people[0]._id,
          firstName: people[0].firstName
        })
      }
      action(type);

      setPeople(people.slice(1));
    }
  }

  const User = () => {
    const user = people[0];
    return (
      <div className="user">
        <img src={ user.picture ? `/image/show/${user.picture}` : `logo.png` } alt="Profile"></img>
        <div className="name">{user.firstName} {user.lastName}</div>
        <div className="essay">{user.essay}</div>
      </div>
    );
  };

  return (
    <div className="find">
      {people.length >= 1 ? <User /> : <div className="nomore"><span>Searching...</span></div>}
      {people.length >= 1 ? 
        <div className="buttons">
          <button onClick={onClick} value="like"><i className="far fa-thumbs-up"></i></button>
          <button onClick={onClick} value="dislike"><i className="far fa-thumbs-down"></i></button>
          <button onClick={onClick} value="superlike"><i className="far fa-grin-hearts"></i></button>
        </div>
      : null}
    </div>
  );
};

export default Find;
