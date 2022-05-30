import { Container, makeStyles, Typography } from '@material-ui/core'
import { color } from '@mui/system';
import React from 'react'
import Carousel from './Carousel';

const useStyles = makeStyles(()=>({
    banner: {
        backgroundImage: "url(./banner2.jpg)"
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    },
}))

const Banner = () => {
    const classes = useStyles();

  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography
                  variant='h2'
                  style={{
                      fontWeight: "bold",
                      marginBottom: 15,
                      fontFamily: "Montserrat",
                      color:"white"
                  }}
                >
                    VojaTrade
                </Typography>

                <Typography
                  variant='subtitle2'
                  style={{
                      textTransform: "capitalize",
                      fontFamily: "Montserrat",
                      color:"darkgrey"
                  }}
                >
                    El mejor lugar para seguir tus cryptos
                </Typography>
            </div>
            <Carousel/>
        </Container>
    </div>
  )
};

export default Banner