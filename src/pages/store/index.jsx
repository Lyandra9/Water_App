import styles from "./store.module.scss";
import Product from "../../components/Product";
import { useRankingContext } from "../../context/rankingContext";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useScoreContext } from "../../context/scoreContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/router";
import { GiTwoCoins } from "react-icons/gi";
import Head from 'next/head';

export default function Store(props) {
  const [temp, setTemp] = useState([]);
  const [products, setProducts] = useState([])
  const { setDropToggle, setShopToggle, toggler } = useRankingContext();
  const { setName, setDrankWater, setTotalWater, setScore } = useScoreContext();
  const Router = useRouter();

  async function getAPI() {
    const temp = []
    const products = await api.get("/products");
    const gallery = await api.get("/gallery")
    await gallery.data.map((el) => {
      if (el.userId == props.id) {
        temp.push(el)
      }
    })
    setTemp(temp)
    setProducts(products.data)
  }

  function switchHandler(e) {
    if (e.pageX <= 200) {
      Router.push("/gallery")
    } else {
      Router.push("/config")
    }
  }

  useEffect(() => {
    if (props.logged === false) {
      Router.push("/login");
    }
    setName(props.name);
    setDrankWater(props.drankWater);
    setTotalWater(props.totalWater);
    setScore(props.score);
    setDropToggle(false);
    setShopToggle(true);
    if (!products[0]) {
      getAPI()
    }
  }, []);

  return (
    <>
      <Head>
        <title>
          Store
        </title>
      </Head>
      {toggler && (
        <div className={styles.money}>
          <GiTwoCoins className={styles.coinIcon} />
          <h2>Sorry, you dont have enough coins</h2>
        </div>)
      }
      <div draggable onDragStart={switchHandler}>
        <div className={styles.shop}>
          <h2>Shop</h2>
          <div className={styles.productsContainer}>
            <Carousel
              interval={3000}
              autoPlay={true}
              emulateTouch={true}
              infiniteLoop={true}
              showArrows={false}
              showIndicators={false}
              showThumbs={false}
              showStatus={false}
            >
              {products[0] && products.map((el) => {
                let bought = false
                temp.map((elT) => {
                  if (el.name == elT.name) {
                    bought = true
                  }
                })
                return (
                  <div className={styles.carrouselContainer}>
                    <Product bought={bought} id={props.id} LocalScore={props.score} productId={el.id} name={el.name} image={el.image} price={el.price} />
                  </div>
                );
              })}
            </Carousel>
          </div>
          <div className={styles.allProductsContainer}>
            <h2 className={styles.allTitle}>All Products</h2>
            {products[0] && products.map((el) => {
              let bought = false
              temp.map((elT) => {
                if (el.name == elT.name) {
                  bought = true
                }
              })
              return (
                <div className={styles.products}>
                  <Product bought={bought} id={props.id} score={props.score} productId={el.id} name={el.name} image={el.image} price={el.price} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const response = await api.get(`user`);
  const data = response.data.find((el) => !!el.logged)

  return {
    props: {
      id: data.id,
      logged: data.logged,
      name: data.name,
      weight: data.weight,
      username: data.username,
      birthdate: data.birthdate,
      totalWater: data.totalWater,
      drankWater: data.drankWater,
      score: data.score,
    },
  };
}
