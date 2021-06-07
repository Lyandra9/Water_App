import styles from "./config.module.scss";
import { CgProfile } from "react-icons/cg";
import { BsClock } from "react-icons/bs";
import Link from "next/link";
import { useRankingContext } from "../../context/rankingContext";
import { useEffect } from "react";
import InfoPop from "../../components/InfoPop";
import { useAccountContext } from "../../context/accountContext";

export default function Config() {
  const { name } = useAccountContext();
  const { setDropToggle, setShopToggle } = useRankingContext();

  useEffect(() => {
    setDropToggle(false);
    setShopToggle(false);
  }, []);
  return (
    <div className={styles.configContainer}>
      {name != "" && (
        <>
          <h2>Config.</h2>
          <div className={styles.configOptionsContainer}>
            <ul>
              <Link href="/config/Account">
                <li>
                  <CgProfile className={styles.configIcon} /> Account
                </li>
              </Link>
              <Link href="/config/seeAlarms">
                <li>
                  <BsClock className={styles.configIcon} /> See alarms
                </li>
              </Link>
            </ul>
          </div>
        </>
      )}

      {name == "" && <InfoPop />}
    </div>
  );
}
