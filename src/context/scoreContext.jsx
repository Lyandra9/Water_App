import { createContext, useContext, useState } from "react";

const scoreContext = createContext();

export function ScoreWrapper({ children }) {
  const [score, setScore] = useState(0);
  const [totalWater, setTotalWater] = useState(0);
  const [drankWater, setDrankWater] = useState(0);

  return (
    <scoreContext.Provider
      value={{
        score,
        setScore,
        totalWater,
        setTotalWater,
        drankWater,
        setDrankWater,
      }}
    >
      {children}
    </scoreContext.Provider>
  );
}

export function useScoreContext() {
  return useContext(scoreContext);
}
