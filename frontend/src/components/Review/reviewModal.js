import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReview from './reviewForm';

function CreateFormModal({spot}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Leave Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReview spot={spot} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateFormModal;
