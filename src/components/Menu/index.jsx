import styles from "./menu.module.scss";
import { VscHome, VscGear } from "react-icons/vsc";
import { BsGraphUp } from "react-icons/bs";
import { BiStore } from "react-icons/bi";
import Link from "next/link";

export default function Menu() {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.navCol}>
        <Link href="http://localhost:3000">
          <VscHome className={styles.menuIcon} />
        </Link>
      </div>

      <div className={styles.navCol}>
        <Link href="http://localhost:3000/ranking">
          <BsGraphUp className={styles.menuIcon} />
        </Link>
      </div>

      <div className={styles.navCol}>
        <Link href="http://localhost:3000/store">
          <BiStore className={styles.menuIcon} />
        </Link>
      </div>

      <div className={styles.navCol}>
        <Link href="http://localhost:3000/config">
          <VscGear className={styles.menuIcon} />
        </Link>
      </div>
    </nav>
  );
}
