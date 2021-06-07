import { createContext, useContext, useState, useEffect } from "react";

const rankingContext = createContext();

export function StatesWrapper({ children }) {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [dropToggle, setDropToggle] = useState(false);
  const [shopToggle, setShopToggle] = useState(false);

  async function getAPI() {
    const timer = setTimeout(async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }

  useEffect(() => {
    getAPI();
  }, []);

  return (
    <rankingContext.Provider
      value={{
        users,
        setUsers,
        loading,
        dropToggle,
        setDropToggle,
        setShopToggle,
        shopToggle,
      }}
    >
      {children}
    </rankingContext.Provider>
  );
}

export function useRankingContext() {
  return useContext(rankingContext);
}
