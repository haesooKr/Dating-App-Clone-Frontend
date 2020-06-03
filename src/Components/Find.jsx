import React, { useState, useEffect } from "react";
import axios from "axios";

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
    if(people.length > 0){
      async function action(type){
        await axios.post(`/user/${type}`, {
          _id: people[0]._id,
          firstName: people[0].firstName
        })
      }
      action(e.target.value);

      setPeople(people.slice(1));
    }
  }

  const User = () => {
    const user = people[0];
    return (
      <div className="user">
        <img src={`image/show/${user.picture}`} alt="profile"></img>
        <div className="name">{user.firstName} {user.lastName}</div>
        <div className="essay">{user.essay}</div>
      </div>
    );
  };

  return (
    <div>
      {people.length >= 1 ? <User /> : <div>No More User</div>}

      <button onClick={onClick} value="like">Like</button>
      <button onClick={onClick} value="dislike">Dislike</button>
      <button onClick={onClick} value="superlike">SuperLike</button>
    </div>
  );
};

export default Find;
