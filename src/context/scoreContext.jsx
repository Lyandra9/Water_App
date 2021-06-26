import { createContext, useContext, useState } from "react";

const scoreContext = createContext();

export function ScoreWrapper({ children }) {
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");
  const [drankWater, setDrankWater] = useState(0);
  const [totalWater, setTotalWater] = useState(0);
  const [time, setTime] = useState(0);
  const [day, setDay] = useState();
  const [ringToggler, setRingToggler] = useState({ status: false, currentAlarm: 0 });

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
        time,
        setTime,
        day,
        setDay,
        ringToggler,
        setRingToggler
      }}
    >
      {children}
    </scoreContext.Provider>
  );
}

export function useScoreContext() {
  return useContext(scoreContext);
}
