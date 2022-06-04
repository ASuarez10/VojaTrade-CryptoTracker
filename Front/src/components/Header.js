import { AppBar, createTheme,  Container, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography, Link } from '@material-ui/core'
import React from 'react';
import { useNavigate } from "react-router-dom";
import { CryptoState } from '../CryptoContext';
import AuthModal from './Auth/AuthModal';
import Logout from './Auth/Logout';
import UserSidebar from './Auth/UserSidebar';
import {Link as RouterLink} from 'react-router-dom'

const useStyles = makeStyles(()=> ({
    title: {
        flex: 1,
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
        textAlign: "left"
    },
    navigation:{
        flex: 4,
    },
    link:{
        margin: 20
    }
}))

const Header = () => {

    const classes = useStyles()
    const navigate = useNavigate()

    const {currency, setCurrency, user } = CryptoState()

    console.log(currency)

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    })

  return (
    
        <AppBar color='primary' position='sticky'>
            <Container>
                <Toolbar>
                    <Typography 
                        onClick={()=> navigate("/")} 
                        className={classes.title}
                        variant='h6'
                    >
                        VojaTrade
                    </Typography>

                    <span className={classes.navigation}>
                        <RouterLink to="/"
                            className={classes.link}
                        >
                            Home
                        </RouterLink>

                        <RouterLink to="/about"
                            className={classes.link}
                        >
                            About
                        </RouterLink>
                    </span>
                    

                    <Select variant='outlined' style={{
                        width: 100,
                        height: 40,
                        marginLeft: 15,
                    }}
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    >
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"INR"}>INR</MenuItem>
                    </Select>

                    {user ? <Logout /> : <AuthModal />}

                </Toolbar>
            </Container>
        </AppBar>
  )
}

export default Header