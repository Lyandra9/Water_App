import { useEffect, useState } from "react";
import { useRankingContext } from "../../../context/rankingContext";
import styles from "./account.module.scss";
import { useAccountContext } from "../../../context/accountContext";
import { BiSave } from "react-icons/bi";
import { useRouter } from "next/router";

export default function Account() {
  const Router = useRouter();
  const { name, setName, weight, setWeight, birthdate, setBirthdate } =
    useAccountContext();
  const { setDropToggle, setShopToggle } = useRankingContext();
  useEffect(() => {
    setDropToggle(true);
    setShopToggle(false);
  }, []);

  const [changesSaved, setChangesSaved] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (e.target.elements.changeName.value != "") {
      setName(e.target.elements.changeName.value);
    }

    if (e.target.elements.changeWeight.value != "") {
      setWeight(e.target.elements.changeWeight.value);
    }

    if (e.target.elements.changeName.value != "") {
      setBirthdate(e.target.elements.changeBirthdate.value);
    }

    e.target.elements.changeName.value = "";
    e.target.elements.changeWeight.value = "";
    e.target.elements.changeBirthdate.value = "";

    setChangesSaved(true);

    setTimeout(() => {
      setChangesSaved(false);
    }, 2000);

    setTimeout(() => {
      Router.push("/");
    }, 2200);
  }

  return (
    <div className={styles.accountContainer}>
      <h2>Account</h2>
      <div className={styles.col1}>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="changeName">Change name</label>
          <input type="text" name="changeName" placeholder={name} />

          <label htmlFor="changeWeight">Change weight</label>
          <input type="number" name="changeWeight" placeholder={weight} />

          <label htmlFor="changeBirthdate">Change birthdate</label>
          <input type="date" name="changeBirthdate" placeholder={birthdate} />

          <button type="submit">
            <BiSave />
          </button>
        </form>

        {changesSaved && (
          <div className={styles.changesContainer}>
            <span>
              <h4>Changes Saved!</h4>
              <div className={styles.greenCircle}>
                <span></span>
                <span></span>
              </div>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
