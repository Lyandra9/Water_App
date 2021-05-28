import styles from "./measurer.module.scss";

export default function Measurer() {
  return (
    <div className={styles.measurerContainer}>
      <h2>Sua jornada</h2>
      <div className={styles.circleContainer}>
        <div className={styles.internalCircle}>
          <div className={styles.dataCircle}>
            <h3>
              100 <span>/</span> 500
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
