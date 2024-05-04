import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import bgVideo from '../assets/Earth-from-space.mp4';
import bgImage from '../assets/background.jpg';
const apiKey = import.meta.env.VITE_API_KEY

const AstronomyPicOfDay = () => {
    const [apodData, setApodData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const fetchApodData = async () => {
            try {
                const formattedDate = selectedDate.toISOString().split('T')[0];
                const data = {
                    params: {
                        api_key: apiKey,
                        date: formattedDate,
                    }
                };
                const response = await axios.get('/apod', data);
                setApodData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching APOD data:', error);
            }
        };        
        fetchApodData();
    }, [selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        document.title = "APOD | NASA";
        return () => {
          document.title = "NASA";
        };
      }, []);

    return (
        <div className='text-white h-screen relative'>
            <video autoPlay muted loop className='absolute inset-0 w-full h-full object-cover'>
                <source src={bgVideo} type='video/mp4' />
            </video>
            <div className="absolute inset-0 w-full h-full bg-cover" style={{ backgroundImage: `url(${bgImage})`, opacity: 0.5 }}></div>
            <Navbar />
            <div className="sm:grid-cols-2 gap-4 bg-black/10 h-full text-white relative z-50 justify-center item-center p-5" style={{ paddingTop: '14%' }}>
                <div className="bg-black/10 space-y-4 lg:pr-36 flex justify-between items-center">
                    <div style={{ paddingRight: '20px' }}>
                        <h1 className="text-3xl font-bold mb-4">{apodData?.title}</h1>
                        <img src={apodData?.url} alt={apodData?.title} className='rounded-lg mb-4 h-80 w-80' />
                    </div>
                    <div className="text-lg border-l-2 border-white pl-4 w-full h-full item-center bg-black/50">
                        <h3 className="text-xl font-bold mb-4">
                        Select the date :-
                            <DatePicker 
                                selected={selectedDate} 
                                onChange={handleDateChange} 
                                maxDate={new Date()}
                                className="text-black opacity-50"
                            />
                        </h3>
                        <p>{apodData?.explanation}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AstronomyPicOfDay;
