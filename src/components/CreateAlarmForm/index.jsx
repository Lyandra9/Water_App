import { api } from "../../services/api";
import styles from "./CAF.module.scss";
import { useState } from 'react'
import { BiSave } from 'react-icons/bi'

export default function CreateAlarmForm({ set }) {
  const [createToggle, setCreateToggle] = useState(true);

  const weekdays = [
    {
      day: "S",
      name: "Sunday"
    },

    {
      day: "M",
      name: "Monday"
    },

    {
      day: "T",
      name: "Tuesday"
    },

    {
      day: "W",
      name: "Wednesday"
    },

    {
      day: "T",
      name: "Thursday"
    },

    {
      day: "F",
      name: "Friday"
    },

    {
      day: "S",
      name: "Saturday"
    }
  ]

  async function handleSubmit(e) {
    e.preventDefault();

    const clei = await api.get("/alarms");
    console.log("aaaa", clei)
    const tinho = {
      Aname: e.target.elements.name.value,
      Atime: e.target.elements.datetime.value,
      Astate: true,
      Arepeat: {
        sunday: e.target.elements.Sunday.checked,
        monday: e.target.elements.Monday.checked,
        tuesday: e.target.elements.Tuesday.checked,
        wednesday: e.target.elements.Wednesday.checked,
        thursday: e.target.elements.Thursday.checked,
        friday: e.target.elements.Friday.checked,
        saturday: e.target.elements.Saturday.checked,
      },
    }



    if (clei[0]) {
      await clei.map((el) => {
        if (el.Atime == tinho.Atime) {
          setCreateToggle(false)
        } else if (el.Arepeat.sunday == tinho.Arepeat.sunday) {
          setCreateToggle(false)
        } else if (el.Arepeat.monday == tinho.Arepeat.monday) {
          setCreateToggle(false)
        } else if (el.Arepeat.tuesday == tinho.Arepeat.tuesday) {
          setCreateToggle(false)
        } else if (el.Arepeat.wednesday == tinho.Arepeat.wednesday) {
          setCreateToggle(false)
        } else if (el.Arepeat.thursday == tinho.Arepeat.thursday) {
          setCreateToggle(false)
        } else if (el.Arepeat.friday == tinho.Arepeat.friday) {
          setCreateToggle(false)
        } else if (el.Arepeat.saturday == tinho.Arepeat.saturday) {
          setCreateToggle(false)
        } else {
          setCreateToggle(true)
        }
      })
    }

    if (createToggle) {
      await api.post(`/alarms`, tinho);
      window.location.reload();
    }
  }

  return (
    <div className={styles.container}>
      {!createToggle && (
        <div>
          <span>You can't add more than one alarm at the same moment</span>
        </div>
      )}
      <h2>New Alarm</h2>
      <form onSubmit={handleSubmit}>
        <span>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </span>

        <span>
          <label htmlFor="datetime">Time</label>
          <input type="time" name="datetime" id="datetime" />
        </span>

        <section className={styles.week}>
          {
            weekdays.map((el) => {
              const [checked, setChecked] = useState(false);
              function Update() {
                setChecked(!checked);
              }
              return (
                <span key={el.name} className={checked && styles.checked}>
                  <label htmlFor={`${el.name}`}>{el.day}</label>
                  <input onChange={Update} type="checkbox" name={`${el.name}`} id={`${el.name}`} />
                </span>
              )
            })
          }
        </section>
        <button type="submit"><BiSave /></button>
      </form>
    </div>
  );
}
