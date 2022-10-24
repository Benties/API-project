import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import '../Spot/spotManagement.css'
function LoginFormModal({setLogin, login}) {
  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <button id='offModals' onClick={(e) => (setShowModal(true), e.stopPropagation())}>Log In</button> */}
      {login && (
        <Modal onClose={() => setLogin(false)}>
          <LoginForm setLogin={setLogin}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
