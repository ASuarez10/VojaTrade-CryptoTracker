import { makeStyles } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../../CryptoContext'

const useStyles = makeStyles((theme) => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
    },

    carouselItem:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "black"
    }
}))

//This funtion recieves a number without commas and return it with commas.
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

//This component is a carousel that shows trending cryptos moving to the left.
const Carousel = () => {

    const [trending, setTrending] = useState([])

    const classes = useStyles()

    const {currency, symbol} = CryptoState()

    //This function fetch the trending cryptos info from the API.
    const fetchTrendingCoins =async () => {
        const {data} = await axios.get(TrendingCoins(currency))
        
        setTrending(data)
    };

    console.log(trending)

    //This function fetch the trending cryptos info every time that currency changes.
    useEffect(() => {
        fetchTrendingCoins()
    }, [currency]);


    //This function is to map the cryptos from the API to put them in the carousel.
    const items = trending.map((coin) => {

        let profit = coin.price_change_percentage_24h >= 0;

        return(
            <Link
              className={classes.carouselItem}
              to={`/coins/${coin.id}`}
              >

                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{marginBotton: 10}}
                />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                        }}
                    >
                        {profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>

                <span style={{fontSize: 22, fontWeight: 500}}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>

            </Link>
        )
    })

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

  return (
    <div className={classes.carousel}>
        <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}
        />
    </div>
  )
}

export default Carousel