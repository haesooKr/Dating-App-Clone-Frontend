import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../Context/AuthContext';
import axios from "axios";
import "./scss/Find.scss";

const Find = () => {
  const [people, setPeople] = useState([]);

  const { user, setUser } = useContext(AuthContext);

  async function findPeople() {
    await axios
      .get("https://dating-app-clone.herokuapp.com/user/people", { withCredentials: true })
      .then((data) => {
        setPeople(data.data.people);
      });
  }

  useEffect(() => {
    findPeople();
  }, []);

  const onClick = (e) => {
    let type = e.target.value;
    if (!type) {
      type = e.target.parentNode.value;
    }
    if (people.length > 0) {
      async function action(type) {
        await axios.post(
          `https://dating-app-clone.herokuapp.com/user/${type}`,
          {
            _id: people[0]._id,
            firstName: people[0].firstName,
          }, { withCredentials: true }
        ).then(data => setUser({
          ...user, rooms: [...user.rooms, data.data.room]
        }) );
      }
      action(type);
      console.log(user);
      setPeople(people.slice(1));
    }
  };

  const User = () => {
    const user = people[0];
    return (
      <div className="user">
        <img
          src={
            user.picture
              ? `https://dating-app-clone.herokuapp.com/image/show/${user.picture}`
              : `logo.png`
          }
          alt="Profile"
        ></img>
        <div className="name">
          {user.firstName} {user.lastName}
        </div>
        <div className="essay">{user.essay}</div>
      </div>
    );
  };

  return (
    <div className="find">
      {people.length >= 1 ? (
        <User />
      ) : (
        <div className="nomore">
          <span>Searching...</span>
        </div>
      )}
      {people.length >= 1 ? (
        <div className="buttons">
          <button onClick={onClick} value="like">
            <i className="far fa-thumbs-up"></i>
          </button>
          <button onClick={onClick} value="dislike">
            <i className="far fa-thumbs-down"></i>
          </button>
          <button onClick={onClick} value="superlike">
            <i className="far fa-grin-hearts"></i>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Find;
