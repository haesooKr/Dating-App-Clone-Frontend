import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import axios from "axios";

const Matches = () => {
  const [matches, setMatches] = useState([]);

  const { user } = useContext(AuthContext);

  async function findMatches() {
    await axios.get("/user/matches").then((data) => {
      setMatches(data.data.matches);
    });
  }

  useEffect(() => {
    findMatches();
  }, []);

  const matchedRoom = (rooms1, rooms2) => {
    const matchedRoom = rooms1.filter(room => -1 !== rooms2.indexOf(room));
    return matchedRoom;
  }

  const People = () => {
    return matches.map((match, index) => {
      return (
        <div className="match" key={index}>
          <div className="name">{match.firstName} {match.lastName}</div>
          <img src={`/image/show/${match.picture}`} alt="profile"></img>
          <Link to={`/room/${matchedRoom(user.rooms, match.rooms)}`}>링크</Link>
        </div>
      )
    })
  };

  return (
    <div>
      <h1>Matched</h1>
      <People />
    </div>
  )
}

export default Matches



