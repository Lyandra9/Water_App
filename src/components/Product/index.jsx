import styles from "./products.module.scss";
import { GiTwoCoins } from "react-icons/gi";
import { api } from '../../services/api'
import { useState } from 'react'

export default function Product({ bought, id, name, image, price, score }) {

  const [disable, setDisable] = useState(bought)
  const [toggler, setToggler] = useState(false)

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
      setDisable(true)
    } else {
      setToggler(true)
      setTimeout(() => {
        setToggler(false)
      }, 4000)
    }
  }

  return (
    <>
      {toggler && (
        <div className={styles.money}>
          <GiTwoCoins className={styles.coinIcon} />
          <h2>Sorry, you dont have enough coins</h2>
        </div>)
      }
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
    </>
  );
}
