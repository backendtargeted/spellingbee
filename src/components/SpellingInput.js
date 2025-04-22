import React from 'react';
import './SpellingInput.css';

const SpellingInput = ({ onLetterInput, onSpace, onDelete, disabled }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  // Generate a unique color for each letter based on its position
  const getLetterColor = (index) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
      '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71',
      '#1ABC9C', '#F1C40F', '#E74C3C', '#34495E', '#95A5A6',
      '#16A085', '#27AE60', '#2980B9', '#8E44AD', '#F39C12',
      '#D35400', '#C0392B', '#BDC3C7', '#7F8C8D', '#2C3E50',
      '#E84393'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="spelling-input">
      <div className="letter-grid">
        {alphabet.map((letter, index) => (
          <button 
            key={letter}
            onClick={() => onLetterInput(letter)}
            disabled={disabled}
            className="letter-button"
            style={{
              backgroundColor: getLetterColor(index),
              color: '#fff',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            <span className="letter-text">{letter}</span>
          </button>
        ))}
      </div>
      
      <div className="control-buttons">
        <button 
          className="space-button" 
          onClick={onSpace}
          disabled={disabled}
        >
          SPACE
        </button>
        <button 
          className="delete-button" 
          onClick={onDelete}
          disabled={disabled}
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export default SpellingInput;
