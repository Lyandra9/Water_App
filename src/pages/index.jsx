import styles from "../styles/Home.module.scss";
import Measurer from "../components/Measurer";
import { useAccountContext } from "../context/accountContext";
import { useRankingContext } from "../context/rankingContext";
import InfoPop from "../components/InfoPop";
import ButtonUpdate from "../components/ButtonUpdate";
import { useEffect } from "react";

export default function Home() {
  const { name } = useAccountContext();
  const { setDropToggle, setShopToggle } = useRankingContext();

  useEffect(() => {
    setShopToggle(false);
    setDropToggle(false);
  }, []);
  return (
    <div>
      {name != "" && (
        <>
          <Measurer />
          <ButtonUpdate />
        </>
      )}
      {name == "" && <InfoPop />}
    </div>
  );
}
