import React from 'react'
import Banner from '../components/Banner/Banner'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid yellow',
    p: 4,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: '20px',
};

//This is an about page to show some information about us.
const AboutPage = ()=>{
    <Banner/>
    
    return(
        <Box>
            <Box sx={style}>
                <Typography sx={{textAlign:'center'}} variant="h4" component="h3">
                    ¿Quienes somos?
                </Typography>
                <br/>
                <br/>
                <br/>
                <Typography sx={{textAlign:'center'}} id="balance" variant="" component="h3">
                <p>
                    Somos un grupo de estudiantes entusiastas de las cryptomonedas pero que no tenemos mucha confianza en crear billeteras en diferentes paginas para poder tener una experiencia mas personalizada con estas transacciones.
                </p>   
                <br/> 
                <p>
                    Por eso mismo hemos decidido crear esta pagina que te da acceso a tus criptos favoritas junto con sus estadisticas para que puedas tomar decisiones sobre monedas de manera mas acertada.
                </p>
                
                </Typography>
            </Box>
            
        </Box>
    );
};



export default AboutPage