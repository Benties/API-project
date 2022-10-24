import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './signupForm';

function SignupFormModal({setShowSignup, signup}) {
  const [showModal, setShowModal] = useState(false);



  return (
    <>
      {/* <button onClick={(e) => (setShowModal(true), e.stopPropagation())}>SignUp</button> */}
      {signup && (
        <Modal onClose={() => setShowSignup(false)}>
          <SignupFormPage/>
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
