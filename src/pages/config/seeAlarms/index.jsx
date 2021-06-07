import { useEffect } from "react";
import { useRankingContext } from "../../../context/rankingContext";
import styles from "./alarms.module.scss";

export default function seeAlarms() {
  const { setDropToggle, setShopToggle } = useRankingContext();
  useEffect(() => {
    setDropToggle(true);
    setShopToggle(false);
  }, []);
  return <h1>alarms</h1>;
}
