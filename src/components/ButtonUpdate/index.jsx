import styles from "./button.module.scss";
import { RiCupLine } from "react-icons/ri";
import { GiWaterBottle } from "react-icons/gi";
import { BsPlus } from "react-icons/bs";
import { useScoreContext } from "../../context/scoreContext";
import { api } from "../../services/api";

export default function buttonUpdate({ id }) {
  const { setDrankWater, drankWater, setScore, score } = useScoreContext();
  const agua = typeof window !== "undefined" ? new Audio('/agua.mp3') : null;

  function playAgua() {
    agua.volume = 0.2;
    agua.play();
    setTimeout(() => {
      agua.pause();
      agua.currentTime = 0;

    }, 1000)
  }

  function addCup() {

    playAgua();
    setDrankWater(drankWater + 250);
    setScore(score + 100);
    api.patch(`user/${id}`, {
      drankWater: drankWater + 250,
      score: score + 100,
    });
  }

  function addBottle() {
    playAgua();
    setDrankWater(drankWater + 500);
    setScore(score + 200);
    api.patch(`user/${id}`, {
      drankWater: drankWater + 500,
      score: score + 200,
    });
  }

  return (
    <div className={styles.buttonContainer}>
      <button onClick={addCup}>
        <BsPlus /> Cup <RiCupLine />
      </button>
      <button onClick={addBottle}>
        <BsPlus /> Bottle <GiWaterBottle />
      </button>
    </div>
  );
}
