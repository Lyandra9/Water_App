import styles from "./store.module.scss";
import Product from "../../components/Product";
import { useRankingContext } from "../../context/rankingContext";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useScoreContext } from "../../context/scoreContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/router";

export default function Store(props) {
  const [temp, setTemp] = useState([]);
  const [products, setProducts] = useState([])
  const { setDropToggle, setShopToggle } = useRankingContext();
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
    <div>
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
                  <Product bought={bought} id={props.id} score={props.score} productId={el.id} name={el.name} image={el.image} price={el.price} />
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
  );
}

export async function getServerSideProps() {
  const response = await api.get(`user`);
  const data = [];
  response.data.map((el) => {
    console.log(el)
    if (el.logged) {
      data.push(el)
    }
  })

  return {
    props: {
      id: data[0].id,
      logged: data[0].logged,
      name: data[0].name,
      weight: data[0].weight,
      username: data[0].username,
      birthdate: data[0].birthdate,
      totalWater: data[0].totalWater,
      drankWater: data[0].drankWater,
      score: data[0].score,
    },
  };
}
