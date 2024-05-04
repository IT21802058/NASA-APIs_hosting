import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import Navbar from "../components/navbar"
import AstroMainmid from "../components/mainmid";
import bgVideo from '../assets/Earth-from-space.mp4';
import Footer from "../components/footer";

const Astro = () => {
     const { user } = useContext(UserContext);
     useEffect(() => {
        document.title = "Main | NASA";
        return () => {
          document.title = "NASA";
        };
      }, []);
    return (
        <div className='text-white h-screen relative'>
            <div className='text-white h-[100vh] flex justify-center items-center bg-cover'>
            <video autoPlay muted loop className='absolute inset-0 w-full h-full object-cover'>
                <source src={bgVideo} type='video/mp4' />
            </video>
            <div className='flex'>
            <div><Navbar /></div>
            <div style={{ paddingTop: '15%' }}>
                <AstroMainmid />
            </div>
            </div>
        </div>
        <Footer/>
        </div>
        
    );
};

export default Astro;
