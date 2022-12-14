import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import { useHistory } from 'react-router-dom';
import './Navigation.css';
import SignupFormModal from '../SignupModal';
import NoUserDrop from './loggedOffProfile';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state?.session?.user);
  const history = useHistory()
  const [signup, setShowSignup] = useState(false)
  const [login, setLogin] =  useState(false)


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='navContent'>
        <div className='buttHolder'>
          <NavLink className='hostingButt' to='/spot/new'>Switch to hosting</NavLink>
        </div>
        <ProfileButton className='profileDrop' user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className='navContent'>
        <div className='buttHolder'>
          <NavLink className='hostingButt' to='/hosting'>Become a Host</NavLink>
        </div>
        <NoUserDrop setShowSignup={setShowSignup} setLogin={setLogin}/>
      </div >
    );
  }

  return (
    <div className='navBar'>
      {/* <li > */}
        <input className='logo' id='icon' type='image' src='https://i.imgur.com/CWfOQ4A.png' onClick={() => history.push('/')}></input>
        {/* <NavLink className='navContent' exact to="/">Home</NavLink> */}
        {signup && <SignupFormModal setShowSignup={setShowSignup} signup={signup}/>}
        {login && <LoginFormModal setLogin={setLogin} login={login}/>}
        {isLoaded && sessionLinks}
      {/* </li> */}
    </div>
  );
}

export default Navigation;
