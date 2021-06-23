import styles from "./measurer.module.scss";
import { useScoreContext } from "../../context/scoreContext";

export default function Measurer() {
  const { totalWater, drankWater } = useScoreContext();

  return (
    <div className={styles.measurerContainer}>
      <div className={styles.circleContainer}>
        <div className={drankWater >= totalWater ? styles.dark : styles.internalCircle}>
          <div className={styles.dataCircle}>
            <h3>
              {drankWater} / {totalWater}ml
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
