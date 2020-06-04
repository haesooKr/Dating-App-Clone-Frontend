import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import './scss/NavBar.scss';

const NavBar = (props) => {
  const { setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const onClickLogout = () => {
    const logout = window.confirm("Are you sure you want to logout?");
    console.log(logout);
    if(logout){
      AuthService.logout().then(data => {
        if(data.success){
          setUser(data.user);
          setIsAuthenticated(false);
        }
      })
    }
  }

  const unauthenticatedNavBar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-link"><i className="fas fa-user"></i></li>
        </Link>
        <Link to="/login">
          <li className="nav-link"><i className="fas fa-sign-in-alt"></i></li>
        </Link>
        <Link to="/register">
          <li className="nav-link"><i className="fas fa-plus"></i></li>
        </Link>
      </>
    )
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-link"><i className="fas fa-user"></i></li>
        </Link>
        <Link to="/find">
          <li className="nav-link"><i className="fas fa-users"></i></li>
        </Link>
        <Link to="/matches">
          <li className="nav-link"><i className="fab fa-gratipay"></i></li>
        </Link>
        <button type="button" className="btn-logout" onClick={onClickLogout}>
        <i className="fas fa-sign-out-alt"></i>
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
