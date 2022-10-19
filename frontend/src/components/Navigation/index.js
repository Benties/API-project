import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import { useHistory } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <NavLink className='navContent' to='/spot/new'>Switch to hosting</NavLink>
        <ProfileButton className='navContent' user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink className='navContent' to='/hosting'>Switch to hosting</NavLink>
        <NavLink className='navContent' to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='navBar'>
      {/* <li > */}
        <input className='navContent' id='icon' type='image' src='https://i.imgur.com/CWfOQ4A.png' onClick={() => history.push('/')}></input>
        {/* <NavLink className='navContent' exact to="/">Home</NavLink> */}
        {isLoaded && sessionLinks}
      {/* </li> */}
    </div>
  );
}

export default Navigation;
