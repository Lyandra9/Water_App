import styles from "./infopop.module.scss";
import { useRouter } from "next/router";
import { api } from "../../services/api";

export default function InfoPop() {
  const router = useRouter();


  async function getValues(e) {
    e.preventDefault();
    await api.post("/user", {
      logged: false,
      name: e.target.elements.name.value,
      weight: e.target.elements.weight.value,
      birthdate: e.target.elements.birthdate.value,
      username: e.target.elements.username.value,
      totalWater: e.target.elements.weight.value * 35,
      drankWater: 0,
      score: 0,
    });
    router.push("/login");

    // await api.put("user/", {
    //   logged: false,
    //   name: e.target.elements.name.value,
    //   weight: e.target.elements.weight.value,
    //   birthdate: e.target.elements.birthdate.value,
    //   username: e.target.elements.username.value,
    //   totalWater: e.target.elements.weight.value * 35,
    //   drankWater: 0,
    //   score: 0,
    // });
  }

  return (
    <div className={styles.formContainer}>
      <h2>Create your account</h2>
      <form action="" onSubmit={getValues}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" required />

        <label htmlFor="username">Username</label>
        <input type="text" name="username" required />

        <label htmlFor="weight">Weight</label>
        <input type="number" name="weight" required />

        <label htmlFor="birthdate">Birthdate</label>
        <input type="date" name="birthdate" required />

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
