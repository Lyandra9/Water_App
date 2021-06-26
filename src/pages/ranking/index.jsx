import styles from "./ranking.module.scss";
import { useRankingContext } from "../../context/rankingContext";
import { useScoreContext } from "../../context/scoreContext";
import { useEffect } from "react";
import { api } from "../../services/api";
import Lottie from 'react-lottie';
import animationData from '../../lotties/loading-spinner.json';

export default function Ranking(props) {
  const { users, loading, setLoading, setDropToggle, setShopToggle, setUsers } = useRankingContext();
  const { setName, setTotalWater, setDrankWater } = useScoreContext();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  async function getAPI() {
    const timer = setTimeout(async () => {
      const response = await api.get("/user")
      response.data.sort((a, b) => {
        if (a.drankWater < b.drankWater) return 1
        if (a.drankWater > b.drankWater) return -1
        return 0
      })
      setUsers(response.data);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }

  useEffect(() => {
    setName(props.name);
    setDrankWater(props.drankWater);
    setTotalWater(props.totalWater);
    setDropToggle(true);
    setShopToggle(false);
    getAPI();
  }, []);

  return (
    <div className={styles.rankingContainer}>
      <h2>Ranking</h2>
      <div className={styles.listContainer}>
        <ul>
          {!loading &&
            users.map((el, index) => {
              return (
                <li>
                  <h2>{index + 1}</h2>
                  <div className={styles.personContainer}>
                    <img width="60px" src="/Group 320.png" alt="Belo Dev" />
                    <div>
                      <h3>{el.name}</h3>
                      <p>{el.drankWater} ml</p>
                    </div>
                  </div>
                </li>
              );
            })}
          {loading && (
            <div className={styles.loading}>
              <h1>Loading</h1>
              <Lottie
                options={defaultOptions}
                height={100}
                width={100}
              />
            </div>
          )}
        </ul>
      </div>
    </div>
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

