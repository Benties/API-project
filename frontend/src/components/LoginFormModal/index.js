import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import '../Spot/spotManagement.css'
function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id='offModals' onClick={(e) => (setShowModal(true), e.stopPropagation())}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
