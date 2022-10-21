import SignupFormModal from "../SignupModal"
import LoginFormModal from "../LoginFormModal"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

const NoUserDrop = () => {
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


    return (
        <>
        <button className='profileButt' onClick={openMenu}>
          <i className="fas fa-bars"/>
          <i className="fas fa-user-circle" />
        </button>
        {showMenu && (
          <ul className="profile-dropdown">
            <SignupFormModal setShowMenu={setShowMenu}/>
            <LoginFormModal setShowMenu={setShowMenu}/>
          </ul>
        )}
        </>
    )
}

export default NoUserDrop
