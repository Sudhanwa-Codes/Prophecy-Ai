import React from 'react';
import './BadgeBox.css';

const BadgeBox = ({ unlockedBadges = [], className = '' }) => {
  const badges = [
    { id: 'gopher', name: 'Gopher', keyword: 'gopher', icon: '🐹' },
    { id: 'protocol', name: 'Protocol', keyword: 'protocol', icon: '📡' },
    { id: 'ancient', name: 'Ancient', keyword: 'ancient', icon: '⚱️' },
    { id: 'kiroween', name: 'Kiroween', keyword: 'kiroween', icon: '🎃' },
    { id: 'kiro', name: 'Kiro', keyword: 'kiro', icon: '🤖' }
  ];

  const isUnlocked = (keyword) => unlockedBadges.includes(keyword.toLowerCase());

  return (
    <div className={`badge-container ${className}`}>
      <div className="badge-header">
        <div className="badge-ornament">⚔️</div>
        <h3 className="badge-title">Secrets</h3>
        <div className="badge-ornament">⚔️</div>
      </div>
      <div className="badge-subtitle">Digital Relics</div>
      <div className="badge-list">
        {badges.map(badge => (
          <div 
            key={badge.id} 
            className={`badge ${isUnlocked(badge.keyword) ? 'unlocked' : 'locked'}`}
          >
            {isUnlocked(badge.keyword) ? (
              <>{badge.icon} {badge.name}</>
            ) : (
              <>🔒 ???</>
            )}
          </div>
        ))}
      </div>
      <div className="badge-footer">
        <div className="badge-progress">
          <div 
            className="progress-bar" 
            style={{ width: `${(unlockedBadges.length / 5) * 100}%` }}
          ></div>
        </div>
        <div className="badge-count">🥚 {unlockedBadges.length}/5</div>
      </div>
    </div>
  );
};

export default BadgeBox;
