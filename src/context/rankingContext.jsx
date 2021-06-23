import { createContext, useContext, useState, useEffect } from "react";
import { api } from '../services/api'

const rankingContext = createContext();

export function StatesWrapper({ children }) {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [dropToggle, setDropToggle] = useState(false);
  const [shopToggle, setShopToggle] = useState(false);



  return (
    <rankingContext.Provider
      value={{
        users,
        setUsers,
        loading,
        setLoading,
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
