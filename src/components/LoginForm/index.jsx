import styles from './loginForm.module.scss'
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { useScoreContext } from '../../context/scoreContext';
import { useState } from 'react'
import UsernameDoesntMatch from '../UsernameDoesntMatch';

export default function LoginForm() {
    const [errorToggle, setErrorToggle] = useState(false)
    const router = useRouter();

    function handler() {
        router.push("/register")
    }

    async function getValues(e) {
        e.preventDefault();
        const { data } = await api.get("/user");
        const v = data.find(el => el.username == e.target.elements.username.value)
        if (v != undefined) {
            setErrorToggle(false)
            api.patch(`/user/${v.id}`, {
                logged: true
            })
            router.push('/')
        } else {
            setErrorToggle(true)
        }

        // await data.map((el) => {
        //     if (el.username == e.target.elements.username.value) {
        //         console.log("if")
        //         setErrorToggle(false)
        //         api.patch(`/user/${el.id}`, {
        //             logged: true
        //         })
        //         router.push("/")
        //     } else {
        //         console.log("else")
        //         setErrorToggle(true)
        //     }
        // })

    }

    return (
        <div className={styles.formContainer}>
            <h2>Login</h2>
            <form onSubmit={getValues}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" required />
                <button type="submit">Log in</button>
            </form>
            <button className={styles.signUpButton} onClick={handler} type='button'>Sign up</button>
            {errorToggle && (
                <UsernameDoesntMatch />
            )}
        </div>
    );
}
