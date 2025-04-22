const scoringConfig = {
  BASE_POINTS_PER_LETTER: 20,
  SPEED_BONUS: {
    MAX_BONUS_PERCENT: 0.5, // 50% of base points
    FULL_BONUS_TIME: 10,    // seconds for full bonus
    ZERO_BONUS_TIME: 30     // seconds for no bonus
  },
  STREAK_BONUSES: [
    { streak: 10, multiplier: 0.5 },
    { streak: 5, multiplier: 0.25 },
    { streak: 3, multiplier: 0.1 }
  ]
};

export default scoringConfig;
