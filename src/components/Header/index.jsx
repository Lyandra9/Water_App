import styles from "./header.module.scss";
import { BsFillDropletFill } from "react-icons/bs";

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <BsFillDropletFill className={styles.waterDrop} />
      <h2>
        Bem vinde, <span>Rafael!</span>
      </h2>
    </header>
  );
}
