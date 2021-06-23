import styles from "./alarms.module.scss";
import { useEffect, useState } from "react";
import { useRankingContext } from "../../../context/rankingContext";
import { useScoreContext } from "../../../context/scoreContext";
import { api } from "../../../services/api";
import NewAlarmButton from "../../../components/NewAlarmButton";
import CreateAlarmForm from "../../../components/CreateAlarmForm";
import AlarmBlock from '../../../components/AlarmBlock';
import { BsArrow90DegUp } from 'react-icons/bs';
import { BsArrow90DegLeft } from 'react-icons/bs';

export default function seeAlarms(props) {
  const { setDropToggle, setShopToggle } = useRankingContext();
  const { setName, setTotalWater, setDrankWater } = useScoreContext();
  const [toggleNewAlarm, setToggleNewAlarm] = useState(false);
  const [plusToggle, setPlusToggle] = useState(false)

  props.alarms.sort((a, b) => {
    if (a.Atime > b.Atime) {
      return 1
    }

    if (a.Atime < b.Atime) {
      return -1
    }
    return 0;
  })

  function alalaal() {
    setToggleNewAlarm(!toggleNewAlarm);
    setPlusToggle(!plusToggle)
  }

  useEffect(() => {
    setName(props.user.name);
    setDrankWater(props.user.drankWater);
    setTotalWater(props.user.totalWater);
    setDropToggle(true);
    setShopToggle(false);
  }, []);
  return (
    <div className={styles.alarmsContainer}>
      <div className={styles.content}>
        <h2>Alarms</h2>
        <span onClick={alalaal}>
          {plusToggle && (
            <BsArrow90DegLeft />
          )}
          {!plusToggle && (

            <NewAlarmButton />
          )}

        </span>
        {props.alarms == ![] && toggleNewAlarm == false && (
          <div className={styles.nothing}>
            <h3>Oops, nothing here!</h3>
            <BsArrow90DegUp className={styles.arrowUp} />
            <p>Try adding a new alarm</p>
          </div>
        )}
      </div>
      {toggleNewAlarm ? (<div><CreateAlarmForm set={setToggleNewAlarm} /></div>) : (<div className={styles.alarmsContainer}>
        {props.alarms.

          map((el) => {
            return <AlarmBlock data={el} />
          })}
      </div>)}

    </div>
  );
}


export async function getServerSideProps() {
  const response = await api.get("user/1");
  const response1 = await api.get("alarms");
  const user = {
    id: response.data.id,
    logged: response.data.logged,
    name: response.data.name,
    weight: response.data.weight,
    birthdate: response.data.birthdate,
    totalWater: response.data.totalWater,
    drankWater: response.data.drankWater,
    score: response.data.score,
  }
  const alarms = []
  response1.data.map((el) => {
    const NewObj = {
      id: el.id,
      Aname: el.Aname,
      Atime: el.Atime,
      Astate: el.Astate,
      Arepeat: el.Arepeat
    }
    alarms.push(NewObj)
  })
  return {
    props: {
      user,
      alarms
    },
  }
}