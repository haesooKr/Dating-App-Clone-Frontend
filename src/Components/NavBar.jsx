import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';

const NavBar = (props) => {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const onClickLogout = () => {
    AuthService.logout().then(data => {
      if(data.success){
        setUser(data.user);
        setIsAuthenticated(false);
      }
    })
  }

  const unauthenticatedNavBar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-link">Home</li>
        </Link>
        <Link to="/login">
          <li className="nav-link">Login</li>
        </Link>
        <Link to="/register">
          <li className="nav-link">Register</li>
        </Link>
      </>
    )
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-link">Home</li>
        </Link>
        <Link to="/find">
          <li className="nav-link">Find</li>
        </Link>
        <Link to="/matches">
          <li className="nav-link">Matches</li>
        </Link>
        <Link to="/messages">
          <li className="nav-link">Messages</li>
        </Link>
        <button type="button" className="btn-logout" onClick={onClickLogout}>
          Logout
        </button>
      </>
    )
  }


  return (
    <div className="navBar">
      <ul className="nav">
        {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
      </ul>
    </div>
  )
}

export default NavBar
