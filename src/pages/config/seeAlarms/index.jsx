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
        {props.alarms == [] && toggleNewAlarm == false && (
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
  const response = await api.get("/user")
  const data = response.data.find((el) => !!el.logged)
  const response1 = await api.get("/alarms");
  let user;
  if (data != undefined) {
    user = {
      id: data.id,
      logged: data.logged,
      name: data.name,
      weight: data.weight,
      birthdate: data.birthdate,
      totalWater: data.totalWater,
      drankWater: data.drankWater,
      score: data.score,
    }

  }
  const alarms = [];
  const data1 = response1.data.filter((el) => el.userId == user.id)
  data1.map((el) => {
    const NewObj = {
      userId: el.userId,
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