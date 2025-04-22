// Utility functions for interacting with localStorage

const GAME_STATE_KEY = 'spellingBeeGameState';

// Saves the current game state to localStorage
// State typically includes score, word list progress (attempts, correct, difficulty), settings
export const saveGameState = (state) => {
  try {
    const stateString = JSON.stringify(state);
    localStorage.setItem(GAME_STATE_KEY, stateString);
    console.log("Game state saved.");
  } catch (error) {
    console.error("Error saving game state to localStorage:", error);
  }
};

// Loads the game state from localStorage
export const loadGameState = () => {
  try {
    const stateString = localStorage.getItem(GAME_STATE_KEY);
    if (stateString === null) {
      console.log("No saved game state found.");
      return null; // Or return a default initial state structure
    }
    const state = JSON.parse(stateString);
    console.log("Game state loaded.");
    return state;
  } catch (error) {
    console.error("Error loading game state from localStorage:", error);
    // Corrupted data or other issue, return null or default state
    return null; 
  }
};

 // Clears the saved game state
export const clearGameState = () => {
  try {
    localStorage.removeItem(GAME_STATE_KEY);
    console.log("Saved game state cleared.");
  } catch (error) {
    console.error("Error clearing game state from localStorage:", error);
  }
};

// --- Score breakdown storage ---

const SCORES_KEY = 'spellingBeeScoreEntries';

// Save a new score entry (object with base, speed, streak, total, word, timeTaken, streakCount, timestamp)
export const saveScoreEntry = (entry) => {
  try {
    const existing = getScoreEntries();
    const updated = [...existing, { ...entry, timestamp: Date.now() }];
    localStorage.setItem(SCORES_KEY, JSON.stringify(updated));
    // Optionally: console.log("Score entry saved.");
  } catch (error) {
    console.error("Error saving score entry to localStorage:", error);
  }
};

// Retrieve all score entries for the session
export const getScoreEntries = () => {
  try {
    const data = localStorage.getItem(SCORES_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading score entries from localStorage:", error);
    return [];
  }
};

// Clear all score entries
export const clearScoreEntries = () => {
  try {
    localStorage.removeItem(SCORES_KEY);
    // Optionally: console.log("Score entries cleared.");
  } catch (error) {
    console.error("Error clearing score entries from localStorage:", error);
  }
};
