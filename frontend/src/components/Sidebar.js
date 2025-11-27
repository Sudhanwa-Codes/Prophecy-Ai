import React, { useState } from 'react';
import './Sidebar.css';
import ConfirmModal from './ConfirmModal';

const Sidebar = ({ history, onSelectProphecy, onDeleteProphecy, onClearAll, className = '' }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearAll = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    onClearAll();
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <div className={`history-sidebar ${className}`}>
        <h3 className="history-title">Echoes from the Void</h3>
        <div className="history-list">
          {history.length === 0 ? (
            <p className="no-history">The void is silent...</p>
          ) : (
            history.slice(0, 5).map((item, index) => (
              <div key={item.id || index} className="history-item">
                <div 
                  className="history-query" 
                  onClick={() => onSelectProphecy(item)}
                  title={item.query}
                >
                  {item.query}
                </div>
                <button 
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteProphecy(index);
                  }}
                  title="Delete this prophecy"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
        {history.length > 0 && (
          <button className="clear-all-btn" onClick={handleClearAll}>
            Banish All Echoes
          </button>
        )}
      </div>
      
      {showConfirm && (
        <ConfirmModal 
          message="Banish all prophecies from the void? This action cannot be undone!"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default Sidebar;
