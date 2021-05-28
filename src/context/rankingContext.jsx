import { createContext, useContext, useState, useEffect } from "react";

const rankingContext = createContext();

export function StatesWrapper({ children }) {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

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
      }}
    >
      {children}
    </rankingContext.Provider>
  );
}

export function useRankingContext() {
  return useContext(rankingContext);
}
