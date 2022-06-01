
import { Container, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CoinList } from '../../config/api'
import { CryptoState } from '../../CryptoContext'
import { numberWithCommas } from './Carousel'

const useStyles = makeStyles(() => ({

  row: {
    cursor: "pointer",
    fontFamily: "Montserrat",
  }
      
}));

const CoinsTable = () => {

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false) 
    const [search, setSearch] = useState("")

    const {currency, symbol} = CryptoState()

    const navigate = useNavigate()

    const fetchCoins =async () => {

        setLoading(true)
        const {data} = await axios.get(CoinList(currency))

        setCoins(data)
        setLoading(false)

    };

    console.log(coins)

    useEffect(() => {
        fetchCoins()
    }, [currency])

    const handleSearch=() =>{
      return coins.filter((coin)=> (
        coin.name.toLowerCase().includes(search) || 
        coin.symbol.toLowerCase().includes(search)
      ));
    };

    

    const classes = useStyles()

  return (
    <Container style ={{textAlign:"center"}}>
      <Typography
        variant='h4'
        style={{margin: 18, fontFamily: "Montserrat"}}
      >
        Precios de las cryptos en el mercado
        <TextField 
          label="Busca una crypto" 
          variant='outlined'
          style={{marginBotton: 20, width: "100%"}}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <TableContainer>
          <Table>
            <TableHead style={{backgroundColor: "#EEBC1D"}}>
              <TableRow>
                {["Moneda", "Precio", "Cambio en 24h", "Cap. Mercado"].map((head) =>(
                  <TableCell
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                    }}
                    key={head}
                    align={head === "Moneda" ? "" : "right"}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
                    {handleSearch().map((row)=>{
                      const profit = row.price_percentage_24h > 0;

                      return(
                        <TableRow
                          onClick={() => navigate(`/coins/${row.id}`)}
                          className={classes.row}
                          key={row.name}
                        >

                          <TableCell
                            component='th'
                            scope='row'
                            style={{
                              display: "flex",
                              gap: 15,
                            }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{marginBottom:10}}
                            />
                            <div style={{display: "flex", flexDirection:"column"}}>
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              
                              <span
                                style={{
                                  color: "gray"
                                }}
                              >
                                {row.name}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell
                            align='right'
                          >
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>

                          <TableCell
                            align='right'
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 500,
                          }}
                          >
                            {profit && '+'} {row?.price_change_percentage_24h?.toFixed(2)}%
                          </TableCell>

                          <TableCell
                            align='right'
                          >
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0,-6)
                            )}
                            M
                          </TableCell>
                        </TableRow>
                      )
                    })}
            </TableBody>

          </Table>
        </TableContainer>
      </Typography>
    </Container>
  )
}

export default CoinsTable