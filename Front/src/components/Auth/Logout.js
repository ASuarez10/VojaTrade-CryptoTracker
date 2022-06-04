import { Button, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { CryptoState } from '../../CryptoContext';

const useStyles = makeStyles({
    
    logout: {
      height: 40,
      width: 100,
      backgroundColor: "#EEBC1D",
      marginLeft: 15,
    },
    
});

function Logout () {

    const classes = useStyles();

    const [state, setState] = useState({
        right: false,
    });

    const { user, setAlert, watchlist, coins, symbol } = CryptoState();

    const toggleDrawer = (anchor, open) => (event) => {
        if (
          event.type === "keydown" &&
          (event.key === "Tab" || event.key === "Shift")
        ) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
    };

    const logOut = () => {
        signOut(auth);
        setAlert({
          open: true,
          type: "success",
          message: "Logout Successfull !",
        });
    
        toggleDrawer();
    };

  return (
    <Button
                variant="contained"
                className={classes.logout}
                onClick={logOut}
              >
                Log Out
    </Button>
  )
}

export default Logout