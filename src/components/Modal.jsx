// src/Components/Modal.js
import React from 'react';

const Modal = ({ showModal, handleClose, data }) => {
  if (!showModal) return null; // Don't render modal if showModal is false

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Application Details</h2>
          <button onClick={handleClose} className="text-red-500 text-2xl">
            &times;
          </button>
        </div>
        <div>
          <p><strong>University Name:</strong> {data.universityName}</p>
          <p><strong>Degree:</strong> {data.degree}</p>
          <p><strong>Scholarship Category:</strong> {data.scholarshipCategory}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
