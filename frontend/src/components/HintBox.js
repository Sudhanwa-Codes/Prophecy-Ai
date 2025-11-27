import React from 'react';
import './HintBox.css';

const HintBox = ({ unlockedBadges = [], className = '' }) => {
  const getHint = () => {
    const count = unlockedBadges.length;
    
    if (count === 0) {
      return "Speak the ancient words... the protocol awaits...";
    } else if (count === 1) {
      return "One secret revealed... four more lie dormant in the void...";
    } else if (count === 2) {
      return "The path grows clearer... seek the elder wisdom...";
    } else if (count === 3) {
      return "Three relics found... the resurrection draws near...";
    } else if (count === 4) {
      return "One final secret remains... speak its name to the oracle...";
    } else if (count === 5) {
      return "All secrets unlocked! Thou art a true seeker of forgotten knowledge!";
    }
    
    return "The spirits whisper...";
  };

  return (
    <div className={`hint-box ${className}`}>
      <div className="hint-header">
        <div className="hint-ornament">🔮</div>
        <h4 className="hint-title">
          {unlockedBadges.length === 5 ? 'Champion!' : "Oracle's Whisper"}
        </h4>
        <div className="hint-ornament">🔮</div>
      </div>
      <p className="hint-text">{getHint()}</p>
      <div className="hint-divider"></div>
      <div className="egg-counter">🥚 {unlockedBadges.length}/5</div>
    </div>
  );
};

export default HintBox;
