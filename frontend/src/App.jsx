import { useState } from 'react'
import Login from './pages/AuthPage'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import Astro from './pages/AstroMain';
import { UserContextProvider } from '../context/userContext';
import AstronomyPicOfDay from './pages/APOD';
import MarsRoverPhoto from './pages/MarsRover';

axios.defaults.baseURL = "https://nasa-apis-gkom-as2.onrender.com";
axios.defaults.withCredentials = true;

function App() {

  return (
    <div >
      <UserContextProvider>
        <Toaster position='top-center' toastOptions={{duration:3000}} />
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/astromain' element={<Astro/>}/>
          <Route path='/apod' element={<AstronomyPicOfDay/>}/>
          <Route path='/marsroverphoto' element={<MarsRoverPhoto/>}/>
        </Routes>
      </UserContextProvider>
    </div>
  )
}

export default App
