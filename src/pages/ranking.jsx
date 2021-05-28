import styles from "../styles/ranking.module.scss";
import { useRankingContext } from "../context/rankingContext";

export default function Ranking() {
  const { users, loading } = useRankingContext();

  return (
    <div className={styles.rankingContainer}>
      <h2>Ranking</h2>
      <div className={styles.listContainer}>
        <ul>
          {!loading &&
            users.map((el) => {
              return (
                <li>
                  <h2>{el.id}</h2>
                  <div className={styles.personContainer}>
                    <img width="60px" src="/Group 320.png" alt="Belo Dev" />
                    <div>
                      <h3>{el.name}</h3>
                      <p>2000 litros</p>
                    </div>
                  </div>
                </li>
              );
            })}
          {loading && <h1>Nothing found</h1>}
        </ul>
      </div>
    </div>
  );
}
