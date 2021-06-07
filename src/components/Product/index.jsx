import styles from "./products.module.scss";
import { GiTwoCoins } from "react-icons/gi";

export default function Product({ name, image, price }) {
  return (
    <div className={styles.ProductContent}>
      <img width={260} height={150} src={image} alt="" />
      <div className={styles.ProductInfo}>
        <h2>{name}</h2>
        <button>
          <span>
            {price} <GiTwoCoins className={styles.coinIcon} />
          </span>
        </button>
      </div>
    </div>
  );
}
