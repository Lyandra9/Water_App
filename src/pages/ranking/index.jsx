import styles from "./ranking.module.scss";
import { useRankingContext } from "../../context/rankingContext";
import { useEffect } from "react";
import { useAccountContext } from "../../context/accountContext";
import InfoPop from "../../components/InfoPop";

export default function Ranking() {
  const { name } = useAccountContext();
  const { users, loading, setDropToggle, setShopToggle } = useRankingContext();
  useEffect(() => {
    setDropToggle(false);
    setShopToggle(false);
  }, []);

  return (
    <>
      <div className={styles.rankingContainer}>
        {name != "" && (
          <>
            <h2>Ranking</h2>
            <div className={styles.listContainer}>
              <ul>
                {!loading &&
                  users.map((el) => {
                    return (
                      <li>
                        <h2>{el.id}</h2>
                        <div className={styles.personContainer}>
                          <img
                            width="60px"
                            src="/Group 320.png"
                            alt="Belo Dev"
                          />
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
          </>
        )}
      </div>

      {name == "" && <InfoPop />}
    </>
  );
}
