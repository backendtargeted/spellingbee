import React, { useState, useEffect } from 'react';
import './App.css';
import GameScreen from './components/GameScreen';
import { loadWordList } from './utils/wordManager';
import { loadGameState, saveGameState } from './utils/storageManager';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wordList, setWordList] = useState([]);
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    const initializeGame = async () => {
      try {
        const [words, savedState] = await Promise.all([
          loadWordList(),
          loadGameState()
        ]);
        
        setWordList(words);
        if (savedState) {
          setGameState(savedState);
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to initialize game:', err);
        setError('Failed to load game data. Please refresh the page.');
        setIsLoading(false);
      }
    };

    initializeGame();
  }, []);

  const handleGameStateUpdate = (newState) => {
    setGameState(newState);
    saveGameState(newState);
  };

  if (error) {
    return (
      <div className="App">
        <p className="error">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="App">
        <div className="loading">Loading Spelling Bee Adventure...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="game-container">
        <h1 className="title">Spelling Bee Adventure</h1>
        <GameScreen 
          wordList={wordList} 
          gameState={gameState}
          onGameStateUpdate={handleGameStateUpdate}
        />
      </div>
    </div>
  );
}

export default App;
