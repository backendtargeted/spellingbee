import React from 'react';
// import './WordDisplay.css'; // Styles to be added later

const WordDisplay = ({ word, userSpelling, showWord, onPronounce }) => {
  
  // Handle spaces in words
  const renderDisplayWord = () => {
    if (showWord) {
      return word.word;
    }
    return word.word.split('').map(char => 
      char === ' ' ? '\u00A0' : '_'
    ).join(' ');
  };

  const display = renderDisplayWord();
  
  return (
    <div className="word-display">
      <h2>{display}</h2>
      
      {/* Placeholder for detailed spelling progress feedback */}
      <div className="spelling-progress">
        {/* Example: Map userSpelling to show correct/incorrect letters */}
        {userSpelling.split('').map((letter, index) => (
          <span key={index} className="letter-feedback">
            {letter} {/* Add correct/incorrect class later */}
          </span>
        ))}
      </div>

      <button onClick={onPronounce} className="listen-button">
        <span role="img" aria-label="Listen">🔊</span> Listen
      </button>
    </div>
  );
};

export default WordDisplay;
