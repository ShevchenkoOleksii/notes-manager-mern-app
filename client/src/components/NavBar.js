import React, {useCallback, useContext, useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";

const NavBar = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState('');
  const {request} = useHttp();
  const {token} = useContext(AuthContext);

  const fetchedUser = useCallback(async () => {
    try {
      const fetched = await request('/api/users/me', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setUserProfile(fetched.user);
    } catch (e) {
      console.log(e.message)
    }
  }, [token, request]);

  useEffect(() => {
    fetchedUser();
  }, [fetchedUser]);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    navigate("api/auth", { replace: true });
  }

  const goHome = (event) => {
    event.preventDefault();
  }

  return (
      <nav>
        <div className="nav-wrapper purple darken-1" style={{padding: '0 2rem'}}>
          <a href="/" onClick={goHome} className="brand-logo">
            <strong>{userProfile.username}</strong>
            <i className="large material-icons">person</i>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to={'/api/users/me'}>Profile</NavLink></li>
            <li><NavLink to={'/api/users/me/all'}>Users</NavLink></li>
            <li><NavLink to={'/api/friends'}>Friends</NavLink></li>
            <li><NavLink to={'/api/messages'}>Messages</NavLink></li>
            <li><NavLink to={'/api/notes'}>Notes</NavLink></li>
            {/*<li><NavLink to={'/api/notes/:id'}>Detail</NavLink></li>*/}
            <li><a
                href="/"
                onClick={logoutHandler}
            >
              Log Out
            </a></li>
          </ul>
        </div>
      </nav>
  );
};

export default NavBar;