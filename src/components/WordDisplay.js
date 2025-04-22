import React from 'react';
// import './WordDisplay.css'; // Styles to be added later

const WordDisplay = ({ word, userSpelling, showWord, onPronounce }) => {
  
  // Basic rendering logic, will be enhanced later with letter-by-letter feedback
  const display = showWord ? word.word : '_ '.repeat(word.word.length).trim();
  
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

      <button onClick={onPronounce} className="pronounce-btn">
        🔊 Listen
      </button>
    </div>
  );
};

export default WordDisplay;
