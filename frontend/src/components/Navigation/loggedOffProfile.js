import SignupFormModal from "../SignupModal"
import LoginFormModal from "../LoginFormModal"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

const NoUserDrop = ({setShowSignup, setLogin}) => {
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
      setTimeout(() => {
        document.addEventListener('click', closeMenu);
      },100)

      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    return (
        <>
        <button className='profileButt' onClick={openMenu}>
          <i className="fas fa-bars"/>
          <i className="fas fa-user-circle" />
        </button>
        {showMenu && (
          <ul className="profile-dropdown">
            <button onClick={(e) => setShowSignup(true)}>SignUp</button>
            <button id='offModals' onClick={(e) => setLogin(true)}>Log In</button>
          </ul>
        )}
        </>
    )
}

export default NoUserDrop
