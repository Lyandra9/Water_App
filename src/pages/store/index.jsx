import styles from "./store.module.scss";
import Product from "../../components/Product";
import { useRankingContext } from "../../context/rankingContext";
import { useAccountContext } from "../../context/accountContext";
import InfoPop from "../../components/InfoPop";
import { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { Transition } from "react-transition-group";

export default function Store() {
  const duration = 1000;
  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionedStyles = {
    entering: {},
  };

  const { name } = useAccountContext();
  const { setDropToggle, setShopToggle } = useRankingContext();
  useEffect(() => {
    setDropToggle(false);
    setShopToggle(true);
  }, []);

  const [activeProduct, setActiveProduct] = useState(0);

  const products = [
    { name: "Duckie", image: "pexels-anthony-132464.jpg", price: "200 points" },
    {
      name: "Duckie1",
      image: "pexels-anthony-132464.jpg",
      price: "200 points",
    },
    {
      name: "Duckie2",
      image: "pexels-anthony-132464.jpg",
      price: "200 points",
    },
    {
      name: "Duckie3",
      image: "pexels-anthony-132464.jpg",
      price: "200 points",
    },
    {
      name: "Duckie4",
      image: "pexels-anthony-132464.jpg",
      price: "200 points",
    },
  ];

  function next() {
    const length = products.length - 1;
    if (activeProduct < length) {
      setActiveProduct(activeProduct + 1);
    } else if (activeProduct == length) {
      setActiveProduct(0);
    }
  }

  function prev() {
    const length = products.length - 1;
    if (activeProduct > 0) {
      setActiveProduct(activeProduct - 1);
    } else if (activeProduct == 0) {
      setActiveProduct(length);
    }
  }
  return (
    <div>
      <div className={styles.shop}>
        {name != "" && (
          <>
            <h2>Shop</h2>
            <div className={styles.productsContainer}>
              <div className={styles.carrouselContainer}>
                {products.map((el, index) => {
                  if (index == activeProduct) {
                    return (
                      <Product
                        name={el.name}
                        image={el.image}
                        price={el.price}
                      />
                    );
                  }
                  return null;
                })}
              </div>
              <button className={styles.controller} onClick={prev}>
                <BsArrowLeftShort />
              </button>
              <button className={styles.controller} onClick={next}>
                <BsArrowRightShort />
              </button>
            </div>
          </>
        )}
      </div>

      {name == "" && <InfoPop />}
    </div>
  );
}
