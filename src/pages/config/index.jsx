import styles from "./config.module.scss";
import { CgProfile } from "react-icons/cg";
import { BsClock } from "react-icons/bs";
import Link from "next/link";
import { useRankingContext } from "../../context/rankingContext";
import { useScoreContext } from "../../context/scoreContext";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/router'
import { BsGraphUp } from "react-icons/bs";
import { AiOutlineDelete } from 'react-icons/ai';

export default function Config(props) {
  const [deleteToggle, setDeleteToggle] = useState(false)
  const { setDropToggle, setShopToggle } = useRankingContext();
  const { setName, setDrankWater, setTotalWater } = useScoreContext();
  const router = useRouter();

  async function deleteHandler() {
    api.delete(`/user/${props.id}`)
    router.push('/login')
    const gallery = await api.get('/gallery')
    const alarms = await api.get('/alarms')
    gallery.map((el) => {
      if (el.userId == props.id) {
        api.delete(`/gallery/${el.id}`)

      }
    })
    alarms.map((el) => {
      if (el.userId == props.id) {
        api.delete(`/alarms/${el.id}`)
      }
    })
  }

  function cancel() {
    setDeleteToggle(false)
  }

  function too() {
    setDeleteToggle(true);

  }

  function switchHandler(e) {
    if (e.pageX <= 200) {
      router.push("/store")
    } else {
      router.push("/")
    }
  }

  async function logoutHandler() {
    setName("Visitor")
    api.patch(`user/${props.id}`, {
      logged: false
    })
    router.push('/login')

  }

  useEffect(() => {
    setName(props.name);
    setDrankWater(props.drankWater);
    setTotalWater(props.totalWater);
    setDropToggle(false);
    setShopToggle(false);
  }, []);
  return (
    <>
      <div draggable onDragStart={switchHandler} className={styles.configContainer}>
        <h2>Config.</h2>
        <div className={styles.configOptionsContainer}>
          <ul>
            <Link href="/config/Account">
              <li>
                <CgProfile className={styles.configIcon} /> Account
              </li>
            </Link>
            <Link href="/config/seeAlarms">
              <li>
                <BsClock className={styles.configIcon} /> See alarms
              </li>
            </Link>
            <Link href="/ranking">
              <li>
                <BsGraphUp className={styles.configIcon} /> Ranking
              </li>
            </Link>
            <li onClick={logoutHandler} className={styles.logout}>
              <FiLogOut className={styles.configIconLogout} /> Log out
            </li>
            <li onClick={too} className={styles.logout}>
              <AiOutlineDelete className={styles.configIconLogout} /> Delete Account
            </li>
          </ul>
        </div>
        {deleteToggle && (
          <div className={styles.delete}>
            <span className={styles.textsPan}>
              <h2>Are you sure? </h2>
              <h3>All your data will be gone forever</h3>
              <p>(that's a very long time)</p>
            </span>
            <span className={styles.buttonsPan}>
              <button onClick={deleteHandler} > Delete </button>
              <button onClick={cancel}> Cancel </button>

            </span>
          </div>
        )
        }
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
