import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi'
import styles from './gallery.module.scss'
import { useScoreContext } from '../../context/scoreContext';
import { useRankingContext } from '../../context/rankingContext';

export default function Gallery(props) {
    const { setName, setDrankWater, setTotalWater } = useScoreContext();
    const { setDropToggle, setShopToggle } = useRankingContext();
    const [gallery, setGallery] = useState([])
    const [toggler, setToggler] = useState(false)

    async function getAPI() {
        const { data } = await api.get('/gallery')
        setGallery(data)
    }

    async function service() {
        if (gallery[0]) {
            const gf = await gallery.find(el => el.userId == props.id)
            if (gf) {
                setToggler(false)
            } else {
                setToggler(true)
            }
        }
    }

    useEffect(() => {
        service()
    }, [gallery])

    useEffect(() => {
        setName(props.name);
        setDrankWater(props.drankWater);
        setTotalWater(props.totalWater);
        setDropToggle(false);
        setShopToggle(true);
        if (!gallery[0]) {
            getAPI();
        }
        service();
    })

    return (
        <div className={styles.gallery}>
            <h2>Gallery</h2>
            {gallery[0] && gallery.map((el) => {
                if (el.userId == props.id) {
                    return (
                        <div className={styles.galleryProductContainer}>
                            <img width={260} height={150} src={el.image} alt="Cute duckie" />
                            <h2>{el.name}</h2>
                        </div>
                    )
                }
            })}
            {toggler && (
                <div className={styles.noItem}>
                    <FiShoppingCart className={styles.shoppingCart} />
                    <h3>You havent bought any items yet</h3>
                </div>
            )}
        </div>
    )
}

export async function getServerSideProps() {
    const response = await api.get(`user`);
    const data = [];
    response.data.map((el) => {
        console.log(el)
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
        },
    };
}