import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { CoinList } from './config/api';
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "./firebase";

const Crypto = createContext()

//This const save all the information about the coin and a user to know about his preferences.
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

  //This function changes the preferences list each time that user changes.
  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("No hay nada en la preferencias");
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

  // This const fetch the data about coins and saves it into the coins variable.
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  // This function sets the symbol of the currency each time currency changes.
   useEffect(() => {
    if(currency === "EUR") setSymbol("€")
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