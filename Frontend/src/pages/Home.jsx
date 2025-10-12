import React from 'react'
import Header from '../components/Header'
import Specialtymenu from '../components/Specialitymenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
const Home = () => {
  return (
    <div>
      <Header/>
      <Specialtymenu />
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home
