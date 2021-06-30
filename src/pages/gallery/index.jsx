import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi'
import styles from './gallery.module.scss'
import { useScoreContext } from '../../context/scoreContext';
import { useRankingContext } from '../../context/rankingContext';
import { useRouter } from "next/router";
import Head from "next/head";

export default function Gallery(props) {
    const Router = useRouter();
    const { setName, setDrankWater, setTotalWater } = useScoreContext();
    const { setDropToggle, setShopToggle } = useRankingContext();
    const [gallery, setGallery] = useState([])
    const [toggler, setToggler] = useState(false)

    async function getAPI() {
        const { data } = await api.get('/gallery')
        setGallery(data)
    }

    function switchHandler(e) {
        if (e.pageX <= 200) {
            Router.push("/")
        } else {
            Router.push("/store")
        }
    }


    async function service() {
        if (gallery[0]) {
            const gf = await gallery.find(el => el.userId == props.id)
            if (gf) {
                setToggler(false)
            } else {
                setToggler(true)
            }
        } else {
            setToggler(true)
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
        setShopToggle(false);
        if (!gallery[0]) {
            getAPI();
        }
        service();
    }, [])

    return (
        <div draggable onDragStart={switchHandler} className={styles.gallery}>
            <Head>
                <title>
                    Gallery
                </title>
            </Head>
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