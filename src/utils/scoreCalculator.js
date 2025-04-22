import scoringConfig from '../config/scoringConfig';

// Calculate base points: word length * base per letter
export function calculateBase(word) {
  return word.length * scoringConfig.BASE_POINTS_PER_LETTER;
}

// Calculate speed bonus: linear decay from full bonus at FULL_BONUS_TIME to zero at ZERO_BONUS_TIME
export function calculateSpeedBonus(base, timeTaken) {
  const { MAX_BONUS_PERCENT, FULL_BONUS_TIME, ZERO_BONUS_TIME } = scoringConfig.SPEED_BONUS;
  if (timeTaken <= FULL_BONUS_TIME) {
    return Math.round(base * MAX_BONUS_PERCENT);
  }
  if (timeTaken >= ZERO_BONUS_TIME) {
    return 0;
  }
  // Linear interpolation
  const bonusFraction = 1 - (timeTaken - FULL_BONUS_TIME) / (ZERO_BONUS_TIME - FULL_BONUS_TIME);
  return Math.round(base * MAX_BONUS_PERCENT * bonusFraction);
}

// Calculate streak bonus: apply the highest milestone achieved
export function calculateStreakBonus(base, currentStreak) {
  const bonuses = scoringConfig.STREAK_BONUSES
    .filter(b => currentStreak >= b.streak)
    .sort((a, b) => b.streak - a.streak);
  if (bonuses.length === 0) return 0;
  return Math.round(base * bonuses[0].multiplier);
}

// Calculate total score for a word
export function calculateTotalScore({ word, timeTaken, currentStreak }) {
  const base = calculateBase(word);
  const speed = calculateSpeedBonus(base, timeTaken);
  const streak = calculateStreakBonus(base, currentStreak);
  return {
    base,
    speed,
    streak,
    total: base + speed + streak
  };
}
