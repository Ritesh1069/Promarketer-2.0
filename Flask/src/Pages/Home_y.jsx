import React from 'react'
import Home from '../Components/Home/Home'
import Explore from '../Components/Explore/Explore'
import About from '../Components/About/About'
import Navbar from '../Components/Navbar/Navbar'
import Contact_x from '../Components/Contact_x'

const Home_y = () => {
  return (
    <div>
        <Navbar/>
      <Home/>
      <Explore/>
      <About/>
      <Contact_x/>
    </div>
  )
}

export default Home_y
