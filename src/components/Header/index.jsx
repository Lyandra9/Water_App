import styles from "./header.module.scss";
import { BsFillDropletFill } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRankingContext } from "../../context/rankingContext";
import { useScoreContext } from "../../context/scoreContext";
import Link from "next/link";
import { GiTwoCoins } from "react-icons/gi";

export default function Header() {
  const { dropToggle, shopToggle } = useRankingContext();
  const { score, name } = useScoreContext();

  return (
    <header className={styles.headerContainer}>
      <div>
        {dropToggle && (
          <Link href="http://localhost:3000/config">
            <AiOutlineArrowLeft className={styles.backArrow} />
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
          Hi, <span>{name || "Visitor"}!</span>
        </h2>
      </div>
    </header>
  );
}
