import React, { useState, useEffect, useCallback } from 'react';
import WordDisplay from './WordDisplay';
import SpellingInput from './SpellingInput';
import AlphabetHelper from './AlphabetHelper';
import ScoreDisplay from './ScoreDisplay';
import ConfettiFeedback from './ConfettiFeedback';
import { calculateTotalScore } from '../utils/scoreCalculator';
import { saveScoreEntry } from '../utils/storageManager';

const GameScreen = ({ wordList, gameState, onGameStateUpdate }) => {
  const [currentWord, setCurrentWord] = useState(null);
  const [userSpelling, setUserSpelling] = useState('');
  const [mode, setMode] = useState(gameState?.mode || 'practice'); // 'practice' or 'test'
  const [startTime, setStartTime] = useState(Date.now());
  const [streakCount, setStreakCount] = useState(gameState?.streakCount || 0);
  const [totalScore, setTotalScore] = useState(gameState?.totalScore || 0);
  const [scoreBreakdown, setScoreBreakdown] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [showFeedback, setShowFeedback] = useState(null);

  // Initialize game state from saved state or start fresh
  useEffect(() => {
    if (wordList && wordList.length > 0) {
      const firstWord = wordList[Math.floor(Math.random() * wordList.length)];
      setCurrentWord(firstWord);
      setUserSpelling('');
      setStartTime(Date.now());
      setShowScore(false);
      setShowFeedback(null);
    }
  }, [wordList]);

  // Save game state when important values change
  const saveGameState = useCallback(() => {
    onGameStateUpdate({
      mode,
      streakCount,
      totalScore,
      lastUpdated: Date.now()
    });
  }, [mode, streakCount, totalScore, onGameStateUpdate]);

  // Handle letter input from SpellingInput
  const handleLetterInput = (letter) => {
    if (!currentWord) return;
    if (userSpelling.length < currentWord.word.length) {
      setUserSpelling(prev => prev + letter);
    }
  };

  // Handle pronunciation
  const handlePronounce = () => {
    if (currentWord && window.speechSynthesis) {
      const speech = new SpeechSynthesisUtterance(currentWord.word);
      speech.lang = 'en-US';
      window.speechSynthesis.speak(speech);
    }
  };

  // Handle word completion and scoring
  const handleWordComplete = useCallback(() => {
    if (!currentWord) return;
    const correct = userSpelling.toLowerCase() === currentWord.word.toLowerCase();
    const timeTaken = (Date.now() - startTime) / 1000;
    const newStreak = correct ? streakCount + 1 : 0;

    // Calculate score breakdown
    const breakdown = calculateTotalScore({
      word: currentWord.word,
      timeTaken,
      currentStreak: newStreak
    });

    // Only award points for correct answers
    const awarded = correct ? breakdown : { base: 0, speed: 0, streak: 0, total: 0 };

    // Save score entry
    saveScoreEntry({
      ...awarded,
      word: currentWord.word,
      userSpelling,
      correct,
      timeTaken,
      streakCount: newStreak
    });

    setScoreBreakdown(awarded);
    setTotalScore(prev => prev + awarded.total);
    setStreakCount(newStreak);
    setShowScore(true);
    setShowFeedback(correct);

    // Save game state after updating scores
    saveGameState();

    // Move to next word after short delay
    setTimeout(() => {
      const nextWord = wordList[Math.floor(Math.random() * wordList.length)];
      setCurrentWord(nextWord);
      setUserSpelling('');
      setStartTime(Date.now());
      setShowScore(false);
      setShowFeedback(null);
    }, 1500);
  }, [currentWord, userSpelling, startTime, streakCount, wordList, saveGameState]);

  // Auto-complete when user finishes typing
  useEffect(() => {
    if (currentWord && userSpelling.length === currentWord.word.length) {
      handleWordComplete();
    }
  }, [currentWord, userSpelling, handleWordComplete]);

  if (!currentWord) {
    return <div>Loading word...</div>;
  }

  const handleSkipWord = () => {
    const nextWord = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(nextWord);
    setUserSpelling('');
    setStartTime(Date.now());
    setShowScore(false);
    setStreakCount(0);
      setShowFeedback(null);
    saveGameState();
  };

  const handleModeToggle = () => {
    const newMode = mode === 'practice' ? 'test' : 'practice';
    setMode(newMode);
    saveGameState();
  };

  return (
    <div className="game-screen">
      <div className="mode-indicator">
        <span className="mode-label">Mode:</span>
        <span className={`mode-value ${mode}`}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
      </div>
      
      <WordDisplay
        word={currentWord}
        userSpelling={userSpelling}
        showWord={mode === 'practice'}
        onPronounce={handlePronounce}
      />
      
      <SpellingInput
        onLetterInput={handleLetterInput}
        disabled={userSpelling.length >= currentWord.word.length}
      />
      
      <AlphabetHelper />
      
      {showScore && scoreBreakdown && (
        <ScoreDisplay
          base={scoreBreakdown.base}
          speed={scoreBreakdown.speed}
          streak={scoreBreakdown.streak}
          total={scoreBreakdown.total}
        />
      )}

      {showFeedback !== null && (
      <ConfettiFeedback 
        isCorrect={showFeedback}
        onComplete={() => setShowFeedback(null)}
      />
      )}
      
      <div className="score-container">
        <span className="score-label">Total Score:</span>
        <span className="score-value">{totalScore}</span>
      </div>
      
      <div className="button-container">
        <button 
          className="button mode-toggle"
          onClick={handleModeToggle}
        >
          Switch to {mode === 'practice' ? 'Test' : 'Practice'} Mode
        </button>
        
        <button
          className="button skip-word"
          onClick={handleSkipWord}
        >
          Skip Word
        </button>
      </div>
    </div>
  );
};

export default GameScreen;
