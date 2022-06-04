import { Button, LinearProgress, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { numberWithCommas } from '../components/Banner/Carousel'
import CoinInfo from '../components/CoinInfo'
import { SingleCoin } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const useStyles = makeStyles((theme) => ({

  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  sidebar: {
    width: "90%",
    [theme.breakpoints.down("md")]: {
      width: "100%"
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 75,
    borderRight: "2px solid grey",
  },

  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },

  marketData: {
    alignSelf: "start",
    padding: 250,
    paddingTop: 10,
    width: "100%",
    
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around"
    },
    
  },
  description:{
    
    marginTop: "20%",
  }


}));

  // This is the page that you see when you click on a crypto to see the information and to add to the preferences list.
const CoinPage = () => {

  const {id} = useParams()

  const [coin, setCoin] = useState()

  const {currency, symbol, user, setAlert, watchlist} = CryptoState()


// This const fetch the data about a single coin.
  const fetchCoin =async () => {
    const {data} = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  const inWatchlist = watchlist.includes(coin?.id);

  // This const ir to add a crypto to the preferences list.
  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Agregada a la lista de preferencias`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  // This const ir to remove a crypto from the preferences list.
  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((watch) => watch !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Eliminada de la lista de preferencias.`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  console.log(coin)

  //This function do the fetch of the coins every time that the page reload.
  useEffect(() => {
    fetchCoin()
  }, [])

  const classes = useStyles()

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold"}} />

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
         <img
         src={coin?.image.large}
         alt={coin?.name}
         height= "200"
         style={{marginBottom: 20}}
         />
         <Typography
          variant='h3'
          className={classes.heading}
         >
           {coin?.name}
         </Typography>

         <div className={classes.marketData}>
           <span style = {{display: "flex"}}>
            <Typography
              variant='h5' className={classes.heading}
            >
              Rango:
            </Typography> 

            &nbsp;&nbsp;

            <Typography
              variant='h5'
              style={{
                fontFamily: "Montserrat"
              }}
            >
              {coin?.market_cap_rank}
            </Typography>

           </span>

           <span style = {{display: "flex"}}>
            <Typography
              variant='h5' className={classes.heading}
            >
              Precio:
            </Typography> 

            &nbsp;&nbsp;
              
            <Typography
              variant='h5'
              style={{
                fontFamily: "Montserrat"
              }}
            >
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>

           </span>

           <span style = {{display: "flex"}}>
            <Typography
              variant='h5' className={classes.heading}
            >
              Cap. Mercado:
            </Typography> 

            &nbsp;&nbsp;

            <Typography
              variant='h5'
              style={{
                fontFamily: "Montserrat"
              }}
            >
              {symbol}{" "}
                  {numberWithCommas(
                    coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6)
                  )}
                  M
            </Typography>

           </span>

           {user && (
            <Button
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}

         </div>
      </div>
      
      <div className={classes.description}>
        <Typography variant="h7" className={classes.description}>
            {(coin?.description.en.split(". ")[0])}.
        </Typography>
      </div>

    </div>
  )
}

export default CoinPage