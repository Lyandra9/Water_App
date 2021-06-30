import Measurer from "../components/Measurer";
import { useRankingContext } from "../context/rankingContext";
import { useScoreContext } from "../context/scoreContext";
import ButtonUpdate from "../components/ButtonUpdate";
import { useEffect } from "react";
import { api } from "../services/api";
import { useRouter } from "next/router";
import Head from 'next/head';

export default function Home(props) {
  const Router = useRouter();
  const { setDropToggle, setShopToggle } = useRankingContext();
  const { setName, setDrankWater, setTotalWater } = useScoreContext();

  function switchHandler(e) {
    if (e.pageX <= 200) {
      Router.push("/config")
    } else {
      Router.push("/gallery")
    }
  }

  useEffect(() => {
    if (props.logged) {
      setName(props.name);
      setDrankWater(props.drankWater);
      setTotalWater(props.totalWater);
      setShopToggle(false);
      setDropToggle(false);
    } else {
      router.push('/login')
    }
  }, []);
  return (
    <div draggable onDragStart={switchHandler}>
      <Head>
        <title>Home</title>
      </Head>
      <Measurer />
      <ButtonUpdate id={props.id} />
    </div>
  );
}

export async function getServerSideProps() {
  const response = await api.get(`user`);
  const data = [];
  response.data.map((el) => {
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
    } || {},
  }
}
