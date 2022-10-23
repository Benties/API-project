import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupModal';
import './profileButton.css'
function ProfileButton({user}) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="loggedProfileDrop">
      <button className='profileButt' onClick={openMenu}>
        <i className="fas fa-bars"/>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <div className="profDropSection1">
            <li>{user.username}</li>
            <li>{user.email}</li>
          </div>
          <div className="profDropSection2">
            <li><button onClick={()=> (history.push('/hosting'))}>Manage Listings</button></li>
          </div>
          <div className="profDropSection3">
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </div>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
