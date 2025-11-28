import React from 'react';
import './HintBox.css';

const HintBox = ({ collectedEggs = [], className = '' }) => {
  const getHint = () => {
    const allKeywords = ['gopher', 'protocol', 'ancient', 'kiroween', 'kiro'];
    const uncollected = allKeywords.filter(k => !collectedEggs.includes(k));

    // All collected - champion message
    if (uncollected.length === 0) {
      return "🏆 ALL EGGS FOUND, CHAMPION OF THE VOID! THE NEXUS BOWS TO THEE! 🏆";
    }

    // Hints for next uncollected egg
    const hintMap = {
      'gopher': "The void whispers... seek the burrowing beast of data tunnels...",
      'protocol': "The spirits murmur... ancient rules govern the digital realm...",
      'ancient': "Echoes from forgotten times... what predates the modern web?",
      'kiroween': "A spectral celebration draws near... the harvest of code...",
      'kiro': "The final secret lies with the oracle's creator... speak its name..."
    };

    return hintMap[uncollected[0]];
  };

  return (
    <div className={`hint-box ${className}`}>
      <div className="hint-header">
        <div className="hint-ornament">🔮</div>
        <h4 className="hint-title">
          {collectedEggs.length === 5 ? 'Champion!' : "Oracle's Whisper"}
        </h4>
        <div className="hint-ornament">🔮</div>
      </div>
      <p className="hint-text">{getHint()}</p>
      <div className="hint-divider"></div>
      <div className="egg-counter">🥚 {collectedEggs.length}/5</div>
    </div>
  );
};

export default HintBox;
