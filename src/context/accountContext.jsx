import { createContext, useContext, useState } from "react";

const accountContext = createContext();

export function AccountWrapper({ children }) {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [weight, setWeight] = useState("");

  return (
    <accountContext.Provider
      value={{
        name,
        setName,
        birthdate,
        setBirthdate,
        weight,
        setWeight,
      }}
    >
      {children}
    </accountContext.Provider>
  );
}

export function useAccountContext() {
  return useContext(accountContext);
}
