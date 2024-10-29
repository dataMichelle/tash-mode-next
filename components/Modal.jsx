// components/Modal.jsx
import React from "react";

const Modal = ({ message, onClose, onContinueShopping }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 shadow-md">
        <p className="text-center">{message}</p>
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={onContinueShopping}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Continue Shopping
          </button>
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
