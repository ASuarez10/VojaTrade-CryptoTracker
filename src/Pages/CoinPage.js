import { LinearProgress, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { numberWithCommas } from '../components/Banner/Carousel'
import CoinInfo from '../components/CoinInfo'
import { SingleCoin } from '../config/api'
import { CryptoState } from '../CryptoContext'

//const handleSearch=() =>{
//  return coins.filter((coin)=> (
//    coin.name.toLowerCase().includes(search) || 
//    coin.symbol.toLowerCase().includes(search)
//  ));
//};

const useStyles = makeStyles((theme) => ({

  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%"
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },

  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },

  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around"
    },

  }

}));

const CoinPage = () => {

  const {id} = useParams()

  const [coin, setCoin] = useState()

  const {currency, symbol} = CryptoState()

  const fetchCoin =async () => {
    const {data} = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  console.log(coin)

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

         </div>
      </div>

      {/* chart */}
      <CoinInfo coin = {coin}/>
    </div>
  )
}

export default CoinPage