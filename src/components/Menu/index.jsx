import styles from "./menu.module.scss";
import { VscHome, VscGear } from "react-icons/vsc";
import { BsGraphUp } from "react-icons/bs";
import { BiStore } from "react-icons/bi";
import Link from "next/link";

export default function Menu() {
  return (
    <nav className={styles.navContainer}>
      <Link href="http://localhost:3000">
        <div className={styles.navCol}>
          <VscHome className={styles.menuIcon} />
        </div>
      </Link>

      <Link href="http://localhost:3000/ranking">
        <div className={styles.navCol}>
          <BsGraphUp className={styles.menuIcon} />
        </div>
      </Link>

      <Link href="http://localhost:3000/store">
        <div className={styles.navCol}>
          <BiStore className={styles.menuIcon} />
        </div>
      </Link>

      <Link href="http://localhost:3000/config">
        <div className={styles.navCol}>
          <VscGear className={styles.menuIcon} />
        </div>
      </Link>
    </nav>
  );
}
