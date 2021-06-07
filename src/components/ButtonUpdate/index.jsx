import styles from "./button.module.scss";
import { RiCupLine } from "react-icons/ri";
import { GiWaterBottle } from "react-icons/gi";
import { BsPlus } from "react-icons/bs";
import { useScoreContext } from "../../context/scoreContext";

export default function buttonUpdate() {
  const { setDrankWater, drankWater, setScore, score } = useScoreContext();

  function addCup() {
    setDrankWater(drankWater + 250);
    setScore(score + 100);
  }

  function addBottle() {
    setDrankWater(drankWater + 500);
    setScore(score + 200);
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
