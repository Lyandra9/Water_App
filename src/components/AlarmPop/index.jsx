import styles from './AP.module.scss';
import { useEffect } from 'react';
import { useRankingContext } from '../../context/rankingContext';
import { api } from '../../services/api'
import { useScoreContext } from '../../context/scoreContext';

export default function AlarmPop() {
    const { alarmNotif, setAlarmNotif } = useRankingContext();
    const { day, time } = useScoreContext();
    let alarmsF;

    async function serv() {
        const response = await api.get("/user")
        const data = response.data.find((el) => el.logged)
        const response1 = await api.get("/alarms");
        let alarms = response1.data.filter((el) => el.userId == data.id)
        alarmsF = alarms.find((el) => el.Astate && el.Atime == time);
        console.log('alarmsF', alarmsF)
    }

    function Clock() {
        setInterval(() => {
            serv()
            if (alarmsF != undefined) {
                service()
            }
        }, 10000)
    }

    async function service() {
        console.log('aaaaa')
        await alarmsF.map((el) => {
            console.log('ell', el)
            console.log('day', day)
            switch (day) {
                case 'sunday':
                    if (el.Arepeat.sunday) {
                        setAlarmNotif(true)
                    }
                    break;

                case 'tuesday':
                    if (el.Arepeat.tuesday) {
                        setAlarmNotif(true)
                    }
                    break;

                case 'wednesday':
                    if (el.Arepeat.wednesday) {
                        setAlarmNotif(true)
                    }
                    break;

                case 'thursday':
                    if (el.Arepeat.thursday) {
                        setAlarmNotif(true)
                    }
                    break;

                case 'friday':
                    if (el.Arepeat.friday) {
                        setAlarmNotif(true)
                    }
                    break;

                case 'saturday':
                    if (el.Arepeat.saturday) {
                        setAlarmNotif(true)
                    }
                    break;

                case 'monday':
                    if (el.Arepeat.monday) {
                        setAlarmNotif(true)
                    }
                    break;

                default:
                    console.log('default')
                    setAlarmNotif(false)
                    break;
            }
        })
    }

    useEffect(() => {
        console.log('executo')
        Clock();
    }, [])

    // useEffect(() => {
    //     audio.volume = 0.1;
    //     if (!playing) {
    //         audio.play();
    //         setPlaying(true)

    //         setTimeout(() => {
    //             audio.pause();
    //             audio.currentTime = 0;
    //         }, 30000)
    //     }
    // }, [])

    return (
        <>
            {alarmNotif && (
                // <div className={styles.AlarmContainer}>
                //     <div className={styles.content}>
                //         <h1>{data.Aname}</h1>
                //         <span>
                //             {data.Atime}
                //         </span>
                //     </div>
                // </div>
                <h1>tESRE</h1>

            )}
        </>
    )

}