import React from 'react';
import './AlphabetHelper.css';

const AlphabetHelper = () => {
  // Simplified pronunciation guide - can be expanded or made more accurate
  const alphabetPronunciation = {
    A: 'ei', B: 'bi', C: 'si', D: 'di', E: 'i', F: 'ef', G: 'lli', 
    H: 'eich', I: 'ai', J: 'llei', K: 'kei', L: 'el', M: 'em', N: 'en', 
    O: 'ou', P: 'pi', Q: 'kiu', R: 'ar', S: 'es', T: 'ti', U: 'iu', 
    V: 'vi', W: 'dabeliu', X: 'eks', Y: 'uai', Z: 'zi'
  };

  // Get the same color as used in SpellingInput for consistency
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
    <div className="alphabet-helper">
      <h2>Alphabet Helper</h2>
      <div className="alphabet-grid">
        {Object.entries(alphabetPronunciation).map(([letter, pronunciation], index) => (
          <div 
            key={letter} 
            className="alphabet-item"
            style={{
              borderLeft: `4px solid ${getLetterColor(index)}`,
              paddingLeft: '12px'
            }}
          >
            <span className="letter">{letter}</span>
            <span className="pronunciation">{pronunciation}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlphabetHelper;
