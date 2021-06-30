import { createContext, useContext, useState, useEffect } from "react";
import { format } from 'date-fns'
const scoreContext = createContext();

export function ScoreWrapper({ children }) {
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");
  const [drankWater, setDrankWater] = useState(0);
  const [totalWater, setTotalWater] = useState(0);
  const [time, setTime] = useState(format(new Date(Date.now()), 'HH:mm'))
  const [day, setDay] = useState(format(new Date(Date.now()), 'eeee').toLowerCase());

  function clock() {
    setTime(format(new Date(), 'HH:mm'))
    setDay(format(new Date(), 'EEEE'))
    console.log("context", time)
  }

  setInterval(clock, 5000);

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
        setDay
      }}
    >
      {children}
    </scoreContext.Provider>
  );
}

export function useScoreContext() {
  return useContext(scoreContext);
}
