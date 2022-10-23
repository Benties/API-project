import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './signupForm';

function SignupFormModal({setShowMenu}) {
  const [showModal, setShowModal] = useState(false);



  return (
    <>
      <button onClick={(e) => (setShowModal(true), e.stopPropagation())}>SignUp</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage/>
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
