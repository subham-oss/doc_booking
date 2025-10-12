import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import About from './pages/About'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Myappointment from './pages/Myappointment'
import Myprofile from './pages/Myprofile'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/doctors/:specialization' element={<Doctors/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/my-appointments' element={<Myappointment/>}/>
        <Route path='/my-profile' element={<Myprofile/>}/>
        <Route path='/appointment/:docid' element={<Appointment/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
