import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import "./scss/Matches.scss";

const Matches = () => {
  const [matches, setMatches] = useState([]);

  const { user, setUser } = useContext(AuthContext);

  async function findMatches() {
    await axios
      .get("https://dating-app-clone.herokuapp.com/user/matches", { withCredentials: true })
      .then((data) => {
        setUser({
          ...user, rooms: data.data.rooms
        })
        setMatches(data.data.matches);
      });
  }

  useEffect(() => {
    findMatches();
  }, []);

  const matchedRoom = (rooms1, rooms2) => {
    const matchedRoom = rooms1.filter((room) => -1 !== rooms2.indexOf(room));
    return matchedRoom;
  };

  const People = () => {
    return matches.map((match, index) => {
      return (
        <div className="match" key={index}>
          <div className="name">
            {match.firstName} {match.lastName}
          </div>
          <img
            src={
              match.picture
                ? `https://dating-app-clone.herokuapp.com/image/show/${match.picture}`
                : `logo.png`
            }
            alt="profile"
          ></img>
          <div className="essay">{match.essay}</div>
          <Link to={`/room/${matchedRoom(user.rooms, match.rooms)}`}>
            <i className="fas fa-comment-dots"></i>
          </Link>
        </div>
      );
    });
  };

  return (
    <div className="matches">
      <h1>Matched</h1>
      <People />
    </div>
  );
};

export default Matches;
