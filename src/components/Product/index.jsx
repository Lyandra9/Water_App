import styles from "./products.module.scss";
import { GiTwoCoins } from "react-icons/gi";
import { api } from '../../services/api'
import { useState } from 'react'
import { useRankingContext } from "../../context/rankingContext";
import { useScoreContext } from "../../context/scoreContext";

export default function Product({ bought, id, name, image, price, LocalScore }) {

  const { score, setScore } = useScoreContext(LocalScore)
  const [disable, setDisable] = useState(bought)
  const { setToggler } = useRankingContext();

  async function buyHandler() {
    if (price <= score) {
      await api.post("/gallery", {
        userId: id,
        name: name,
        image: image
      })
      await api.patch(`/user/${id}`, {
        score: score - price
      })
      setScore(score - price)
      setDisable(true)
    } else {
      setToggler(true)
      setTimeout(() => {
        setToggler(false)
      }, 4000)
    }
  }

  return (
    <div className={styles.ProductContent}>
      <img width={260} height={150} src={image} alt="" />
      <div className={styles.ProductInfo}>
        <h2>{name}</h2>
        <button disabled={disable} className={styles.normalButton} onClick={buyHandler}>
          <span>
            {price} points <GiTwoCoins className={styles.coinIcon} />
          </span>
        </button>
      </div>
    </div>
  );
}
