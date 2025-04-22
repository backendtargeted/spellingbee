import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import './ConfettiFeedback.css';

const ConfettiFeedback = ({ isCorrect, onComplete }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isCorrect) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    } else if (isCorrect === false) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCorrect, onComplete]);

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          colors={['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590']}
        />
      )}
      {isCorrect === false && (
        <div className="incorrect-feedback">
          <div className="shake">Try again!</div>
        </div>
      )}
    </>
  );
};

export default ConfettiFeedback;
