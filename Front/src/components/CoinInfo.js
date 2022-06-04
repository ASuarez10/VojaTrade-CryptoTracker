import { CircularProgress, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles((theme) => ({

    container: {
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
        [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
        },
    },

}));

//This component shows a histogram about a single coin in the time. Recieves a coin object that is a crypto.
const CoinInfo = ({coin}) => {

    const classes = useStyles();

    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);

    const {currency} = CryptoState();

    //This function fetch the data of the crypto in the time.
    const fetchHistoricData = async () => {
        const {data} = await axios.get(HistoricalChart(coin.id, days, currency));
        
        setHistoricData(data.prices)
    }

    console.log("data", historicData)

    //This function fetch the data every time that the currency and/or the amount of days changes.
    useEffect(() => {

        fetchHistoricData();

    }, [currency, days])


  return (
    <div className={classes.container}> 
    
        {
            !historicData ? (
                <CircularProgress
                    style={{color:"gold"}}
                    size={250}
                    thickness={1}
                />
            ):(<>
            
            {/*<Line
                data={{
                    labels: historicData.map((coin) => {
                        let date = new Date(coin[0]);
                        let time = 
                            date.getHours() > 12
                                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                : `${date.getHours()}: ${date.getMinutes()} AM`;
                    
                    return days === 1 ? time:date.toLocaleDateString()
                    }),

                    datasets: [{
                        data:historicData.map((coin) => coin[1]),
                        label: `Price ( Past ${days} Days ) in ${currency}`,
                        borderColor: "#EEBC1D",
                    }
                    ]
                }}
            
            /> */}

            </>)
        }
    
    </div>
  )
}

export default CoinInfo