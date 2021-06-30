import { useEffect, useState } from "react";
import { useRankingContext } from "../../../context/rankingContext";
import { useScoreContext } from "../../../context/scoreContext";
import styles from "./account.module.scss";
import { BiSave } from "react-icons/bi";
import { useRouter } from "next/router";
import { api } from "../../../services/api";
import { format } from "date-fns";
import Lottie from 'react-lottie';
import animationData from '../../../lotties/blue-check-animation.json';
import Head from "next/head";

export default function Account(props) {

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const Router = useRouter();
  const { setDropToggle, setShopToggle } = useRankingContext();
  const { setName, setTotalWater, setDrankWater } = useScoreContext();

  useEffect(() => {
    setName(props.name);
    setDrankWater(props.drankWater);
    setTotalWater(props.totalWater);
    setDropToggle(true);
    setShopToggle(false);
  }, []);

  const [changesSaved, setChangesSaved] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    api.patch(`/user/${props.id}`, {
      name: e.target.elements.changeName.value
        ? e.target.elements.changeName.value
        : props.name,
      username: e.target.elements.changeUsername.value
        ? e.target.elements.changeUsername.value
        : props.username,
      weight: e.target.elements.changeWeight.value
        ? e.target.elements.changeWeight.value
        : props.weight,
      birthdate: e.target.elements.changeBirthdate.value
        ? e.target.elements.changeBirthdate.value
        : props.birthdate,
      totalWater: e.target.elements.changeWeight.value
        ? e.target.elements.changeWeight.value * 35
        : props.totalWater,
    });

    setChangesSaved(true);

    setTimeout(() => {
      setChangesSaved(false);
      Router.push("/");
    }, 1000);

  }

  return (
    <div className={styles.accountContainer}>
      <Head>
        <title>
          Account
        </title>
      </Head>
      <h2>Account</h2>
      <div className={styles.col1}>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="changeName">Change name</label>
          <input
            defaultValue={props.name}
            type="text"
            name="changeName"
            placeholder={props.name}
          />

          <label htmlFor="changeUsername">Change username</label>
          <input
            defaultValue={props.username}
            type="text"
            name="changeUsername"
            placeholder={props.username}
          />

          <label htmlFor="changeWeight">Change weight</label>
          <input
            defaultValue={props.weight}
            type="number"
            name="changeWeight"
            placeholder={props.weight}
          />

          <label htmlFor="changeBirthdate">Change birthdate</label>
          <input
            defaultValue={props.birthdate}
            max={format(new Date(), "yyyy-MM-dd")}
            type="date"
            name="changeBirthdate"
            placeholder={props.birthdate}
          />

          <button type="submit">
            <BiSave />
          </button>
        </form>

        {changesSaved && (
          <div className={styles.Block}>
            <div className={styles.changesContainer}>
              <h4>Changes Saved</h4>
              <Lottie
                options={defaultOptions}
                height={45}
                width={45}
              />
            </div>
          </div>
        )}
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
