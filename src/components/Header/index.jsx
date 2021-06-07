import styles from "./header.module.scss";
import { BsFillDropletFill } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRankingContext } from "../../context/rankingContext";
import { useAccountContext } from "../../context/accountContext";
import { useScoreContext } from "../../context/scoreContext";
import Link from "next/link";
import { GiTwoCoins } from "react-icons/gi";

export default function Header() {
  const { name } = useAccountContext();
  const { dropToggle, shopToggle } = useRankingContext();
  const { score } = useScoreContext();

  return (
    <>
      {name != "" && (
        <header className={styles.headerContainer}>
          <div>
            {dropToggle && (
              <Link href="http://localhost:3000/config">
                <AiOutlineArrowLeft />
              </Link>
            )}
            {!dropToggle && <BsFillDropletFill className={styles.waterDrop} />}
          </div>
          <div className={styles.welcomeContainer}>
            {shopToggle && (
              <span className={styles.scoreContainer}>
                <GiTwoCoins />
                {score}
              </span>
            )}
            <h2>
              Welcome, <span>{name}!</span>
            </h2>
          </div>
        </header>
      )}
      {name == "" && (
        <header className={styles.headerContainer}>
          {dropToggle && (
            <Link href="http://localhost:3000/config">
              <AiOutlineArrowLeft />
            </Link>
          )}
          {!dropToggle && <BsFillDropletFill className={styles.waterDrop} />}
          <h2>
            Welcome, <span>visitor!</span>
          </h2>
        </header>
      )}
    </>
  );
}
