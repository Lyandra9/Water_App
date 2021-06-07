import { useAccountContext } from "../../context/accountContext";
import { useScoreContext } from "../../context/scoreContext";
import { useRouter } from "next/router";
import styles from "./infopop.module.scss";

export default function InfoPop() {
  const router = useRouter();
  const { setName, setWeight, setBirthdate } = useAccountContext();
  const { setTotalWater } = useScoreContext();

  function getValues(e) {
    e.preventDefault();
    setName(e.target.elements.name.value);
    setWeight(e.target.elements.weight.value);
    setBirthdate(e.target.elements.birthdate.value);
    setTotalWater(e.target.elements.weight.value * 35);

    e.target.elements.name.value = "";
    e.target.elements.weight.value = "";
    e.target.elements.birthdate.value = "";

    router.push("/");
  }

  return (
    <div className={styles.formContainer}>
      <h2>Your Info</h2>
      <form action="" onSubmit={getValues}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" required />

        <label htmlFor="weight">Weight</label>
        <input type="number" name="weight" required />

        <label htmlFor="birthdate">Birthdate</label>
        <input type="date" name="birthdate" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
