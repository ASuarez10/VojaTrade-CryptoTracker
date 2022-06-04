import React from 'react'
import Banner from '../components/Banner/Banner'
import CoinsTable from '../components/Banner/CoinsTable'

//This is the home page or the main page where we see the name of the project, a carousel and a table with the cryptos.
const Homepage = () => {
  return (
    <>
        <Banner/>
        <CoinsTable/>
    </>
  )
}

export default Homepage