import styles from './alarmBlock.module.scss';
import Switch from 'react-switch'
import { api } from '../../services/api'
import { useState, useEffect } from 'react'
import { FiTrash } from 'react-icons/fi'
import { format } from 'date-fns'
import { useScoreContext } from '../../context/scoreContext';

export default function AlarmBlock({ data }) {
  const [toggler, setToggler] = useState(false);
  const [checked, setChecked] = useState(data.Astate)
  const { time, setTime, day, setDay, ringToggler, setRingToggler } = useScoreContext();

  useEffect(() => {
    setInterval(() => {
      setDay(format(new Date(), 'eeee').toLowerCase())
      setTime(format(new Date(), 'HH:mm'))
    }, 5000)

    setInterval(() => {
      service()
    }, 7000);

  }, [])

  async function service() {
    const response = await api.get("/user")
    const data = response.data.find((el) => !!el.logged)
    const response1 = await api.get("/alarms");
    let alarms = response1.data.filter((el) => el.userId == data.id)
    await alarms.map((el) => {
      if (el.Astate) {
        console.log("1", time, el.Atime)
        console.log(day)
        if (el.Atime == time) {
          switch (day) {
            case 'sunday':
              if (el.Arepeat.sunday) {
                setRingToggler({ status: true, currentAlarm: el.id })
              }
              break;

            case 'tuesday':
              if (el.Arepeat.tuesday) {
                setRingToggler({ status: true, currentAlarm: el.id })
              }
              break;

            case 'wednesday':
              if (el.Arepeat.wednesday) {
                setRingToggler({ status: true, currentAlarm: el.id })
              }
              break;

            case 'thursday':
              if (el.Arepeat.thursday) {
                setRingToggler({ status: true, currentAlarm: el.id })
              }
              break;

            case 'friday':
              if (el.Arepeat.friday) {
                setRingToggler({ status: true, currentAlarm: el.id })
              }
              break;

            case 'saturday':
              if (el.Arepeat.saturday) {
                setRingToggler({ status: true, currentAlarm: el.id })
              }
              break;

            case 'monday':
              if (el.Arepeat.monday) {
                setRingToggler({ status: true, currentAlarm: el.id })
              }
              break;
          }
        }
      }
    })
  }

  function dragHandler() {
    setToggler(!toggler);
  }

  function delHandler() {
    api.delete(`alarms/${data.id}`);
    setToggler(true)
    window.location.reload();
  }


  const handleChange = nextChecked => {
    setChecked(nextChecked);

    api.patch(`alarms/${data.id}`, {
      Astate: !checked
    })
  };

  return (
    <>
      <div>
        <h1>{time}</h1>
        {console.log("time", time)}
        <h2>{day}</h2>
        {console.log("day", day)}
      </div>
      <div draggable="true" onDragStart={dragHandler} className={styles.container}>
        <label>
          <Switch uncheckedIcon={false} checkedIcon={false} onColor={'#2EBAD3'} height={25} handleDiameter={18} offColor={'#408794'} checked={checked} onChange={handleChange} />
        </label>
        <div className={styles.info}>
          <h2>{data.Aname}</h2>
          <h3>{data.Atime}</h3>
          {ringToggler.status && data.id == ringToggler.currentAlarm && <h1>Aaaaaa</h1>}
        </div>
        <div onClick={delHandler} className={toggler ? styles.trash : styles.trashHidden}>
          <FiTrash />
        </div>
      </div>
      <hr style={{ width: "20rem", opacity: "0.2" }} />
    </>
  )
}