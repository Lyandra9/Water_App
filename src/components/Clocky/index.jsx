import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { format } from 'date-fns';
import AlarmPop from '../AlarmPop'

export default function Clocky() {
    const audio = typeof window !== "undefined" ? new Audio('/zumbi.mp3') : null;
    const [notToggle, setNotToggle] = useState(false);
    const [clockTime, setClockTime] = useState();
    const [index, setIndex] = useState(0);
    const [receive, SetReceive] = useState([])
    const [clock, setClock] = useState(0);

    useEffect(() => {
        setClock(1);
        setClockTime(format(new Date, 'H:m'));

    }, [])
    useEffect(() => {

        setTimeout(() => {
            getAPI2();
            setClock(clock + 1)
        }, 10000);
    }, [clock, clockTime]);

    async function GetAPI() {
        const fil2 = [];
        const { data } = await api.get('alarms');
        await data.map((el) => {
            if (el.Astate == true) {
                switch (format(new Date, 'EEEE').toLowerCase()) {
                    case 'sunday':
                        if (el.Arepeat.sunday) {
                            fil2.push(el)
                        }
                        break;

                    case 'tuesday':
                        if (el.Arepeat.tuesday) {
                            fil2.push(el)
                        }
                        break;

                    case 'wednesday':
                        if (el.Arepeat.wednesday) {
                            fil2.push(el)
                        }
                        break;

                    case 'thursday':
                        if (el.Arepeat.thursday) {
                            fil2.push(el)
                        }
                        break;

                    case 'friday':
                        if (el.Arepeat.friday) {
                            fil2.push(el)
                        }
                        break;

                    case 'saturday':
                        if (el.Arepeat.saturday) {
                            fil2.push(el)
                        }
                        break;

                    case 'monday':
                        if (el.Arepeat.monday) {
                            fil2.push(el)
                        }
                        break;
                }
            }
        })
        return fil2;
    }

    async function getAPI2() {
        let data = await GetAPI();
        setClockTime(format(new Date, 'H:m'));
        if (data[0]) {
            data.map((el, index) => {
                if (clockTime == el.Atime) {

                    if (!notToggle) {
                        setIndex(index)
                        setNotToggle(true)
                    }
                } else {
                    setNotToggle(false)
                }
            })
        }
        SetReceive(data)
    }



    return (
        <>
            {notToggle && <AlarmPop audio={audio} data={receive[index]} />}
        </>
    )
}