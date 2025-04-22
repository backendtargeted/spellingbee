import React, { useEffect, useState } from "react";

// Simple animated increment for each score part
function useAnimatedValue(target, duration = 600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    let startTime = null;
    function animate(ts) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(start + (target - start) * progress));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    animate(performance.now());
    // Reset animation if target changes
    return () => setValue(target);
    // eslint-disable-next-line
  }, [target]);
  return value;
}

const ScoreDisplay = ({ base, speed, streak, total }) => {
  const animatedBase = useAnimatedValue(base);
  const animatedSpeed = useAnimatedValue(speed);
  const animatedStreak = useAnimatedValue(streak);
  const animatedTotal = useAnimatedValue(total, 900);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "inherit",
      margin: "1rem 0"
    }}>
      <div style={{ fontSize: "1.2rem", color: "#2d7be5", margin: "0.2rem" }}>
        <span>+{animatedBase}</span> <span style={{ fontSize: "0.9rem" }}>base</span>
      </div>
      <div style={{ fontSize: "1.2rem", color: "#43b97f", margin: "0.2rem" }}>
        <span>+{animatedSpeed}</span> <span style={{ fontSize: "0.9rem" }}>speed</span>
      </div>
      <div style={{ fontSize: "1.2rem", color: "#f7b32b", margin: "0.2rem" }}>
        <span>+{animatedStreak}</span> <span style={{ fontSize: "0.9rem" }}>streak</span>
      </div>
      <div style={{
        fontSize: "2rem",
        color: "#e54b4b",
        fontWeight: "bold",
        marginTop: "0.5rem",
        textShadow: "1px 1px 4px #fff"
      }}>
        {animatedTotal}
      </div>
    </div>
  );
};

export default ScoreDisplay;
