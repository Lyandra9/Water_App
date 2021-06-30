import styles from './alarmBlock.module.scss';
import Switch from 'react-switch'
import { api } from '../../services/api'
import { useState, useEffect } from 'react'
import { FiTrash } from 'react-icons/fi'
import { useScoreContext } from '../../context/scoreContext';

export default function AlarmBlock({ data }) {
  const [toggler, setToggler] = useState(false);
  const [checked, setChecked] = useState(data.Astate)

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
      <div draggable="true" onDragStart={dragHandler} className={styles.container}>
        <label>
          <Switch uncheckedIcon={false} checkedIcon={false} onColor={'#2EBAD3'} height={25} handleDiameter={18} offColor={'#408794'} checked={checked} onChange={handleChange} />
        </label>
        <div className={styles.info}>
          <h2>{data.Aname}</h2>
          <h3>{data.Atime}</h3>
        </div>
        <div onClick={delHandler} className={toggler ? styles.trash : styles.trashHidden}>
          <FiTrash />
        </div>
      </div>
      <hr style={{ width: "20rem", opacity: "0.2" }} />
    </>
  )
}