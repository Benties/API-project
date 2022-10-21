import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReview from './reviewForm';
import './reviewForm.css'

function CreateFormModal({spot}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id='leaveRevButt' onClick={() => setShowModal(true)}>Leave Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReview spot={spot} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateFormModal;
