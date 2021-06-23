import styles from "./menu.module.scss";
import { VscHome, VscGear } from "react-icons/vsc";
import { BiStore, BiPalette, BiPlanet } from "react-icons/bi";
import Link from "next/link";
import { api } from '../../services/api'
import { useEffect, useState } from "react";

export default function Menu() {
  const [logginToggle, setLoginToggle] = useState(false)

  async function getAPI() {
    const users = await api.get(`/user`)
    users.data.map((el) => {
      if (el.logged) {
        setLoginToggle(true)
      }
    })
  }
  useEffect(() => {
    getAPI()
  })

  return (
    <nav className={logginToggle ? styles.navContainer : styles.none}>
      <Link href="http://localhost:3000">
        <div className={typeof window !== 'undefined' ? window.location.href == 'http://localhost:3000/' ? styles.navColMain : styles.navCol : styles.navCol}>
          <VscHome className={styles.menuIcon} />
        </div>
      </Link>

      <Link href="http://localhost:3000/gallery">
        <div className={typeof window !== 'undefined' ? window.location.href == 'http://localhost:3000/gallery' ? styles.navColMain : styles.navCol : styles.navCol}>
          <BiPalette className={styles.menuIcon} />
        </div>
      </Link>

      <Link href="http://localhost:3000/store">
        <div className={typeof window !== 'undefined' ? window.location.href == 'http://localhost:3000/store' ? styles.navColMain : styles.navCol : styles.navCol}>
          <BiStore className={styles.menuIcon} />
        </div>
      </Link>

      <Link href="http://localhost:3000/config">
        <div className={typeof window !== 'undefined' ? window.location.href == 'http://localhost:3000/config' ? styles.navColMain : styles.navCol : styles.navCol}>
          <VscGear className={styles.menuIcon} />
        </div>
      </Link>
    </nav>
  );
}
