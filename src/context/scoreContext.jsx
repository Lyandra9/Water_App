import { createContext, useContext, useState } from "react";

const scoreContext = createContext();

export function ScoreWrapper({ children }) {
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");
  const [drankWater, setDrankWater] = useState(0);
  const [totalWater, setTotalWater] = useState(0);
  const [logId, setLogId] = useState();

  return (
    <scoreContext.Provider
      value={{
        score,
        setScore,
        drankWater,
        setDrankWater,
        name,
        setName,
        totalWater,
        setTotalWater,
        logId,
        setLogId
      }}
    >
      {children}
    </scoreContext.Provider>
  );
}

export function useScoreContext() {
  return useContext(scoreContext);
}
