import { BsAlarm } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "./alarmButton.module.scss";

export default function NewAlarmButton() {
  return (
    <button className={styles.buttonAlarm}>
        <AiOutlinePlus />
    </button>
  );
}
