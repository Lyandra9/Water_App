import styles from './AP.module.scss';
import { useEffect, useState } from 'react';

export default function AlarmPop({ data, audio }) {
    const [playing, setPlaying] = useState(false)


    useEffect(() => {
        audio.volume = 0.1;
        if (!playing) {
            audio.play();
            setPlaying(true)

            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
            }, 30000)
        }
    }, [])
    return (
        <div className={styles.AlarmContainer}>
            <div className={styles.content}>
                <h1>{data.Aname}</h1>
                <span>
                    {data.Atime}
                </span>
            </div>
        </div>
    )

}