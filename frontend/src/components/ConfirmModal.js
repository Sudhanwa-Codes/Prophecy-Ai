import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-header">
          <div className="confirm-icon">⚠️</div>
          <h3 className="confirm-title">WARNING</h3>
          <div className="confirm-icon">⚠️</div>
        </div>
        <div className="confirm-message">{message}</div>
        <div className="confirm-buttons">
          <button className="confirm-btn confirm-yes" onClick={onConfirm}>
            ✓ CONFIRM
          </button>
          <button className="confirm-btn confirm-no" onClick={onCancel}>
            ✗ CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
