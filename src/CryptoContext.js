import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { CoinList } from './config/api';
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "./firebase";

const Crypto = createContext()

const CryptoContext = ({children}) => {

   const [currency, setCurrency] = useState("USD");
   const [symbol, setSymbol] = useState("$");

   const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

   useEffect(() => {
    if(currency === "INR") setSymbol("₹")
    else if(currency === "USD") setSymbol("$")

    fetchCoins();

   }, [currency])

  return (
    <Crypto.Provider value={{
      currency,
      symbol,
      setCurrency,
      alert,
      setAlert,
      user,
      coins,
      loading,
      watchlist,}}
    >

        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState = () => {
    return useContext(Crypto)
}