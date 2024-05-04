import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import bgVideo from '../assets/Earth-from-space.mp4';
import bgImage from '../assets/background.jpg';
const apiKey = import.meta.env.VITE_API_KEY;

const MarsRoverPhoto = () => {
    const { user } = useContext(UserContext);
    const [selectedCamera, setSelectedCamera] = useState('FHAZ');
    const [photoData, setPhotoData] = useState(null);
    const [fullname, setFullname] = useState("Front Hazard Avoidance Camera");

    useEffect(() => {
        const fetchPhotoData = async () => {
            try {
                const data = {
                    params: {
                       camera:  selectedCamera,
                       api_key: apiKey
                    }
                }
                const response = await axios.get('/marsroverphotos', data);
                setPhotoData(response.data.photos);
            } catch (error) {
                console.error('Error fetching Mars Rover photo data:', error);
            }
        };
        fetchPhotoData();
    }, [selectedCamera]);

    const handleCameraChange = (camera) => {
        setSelectedCamera(camera);
        if(camera == 'FHAZ'){
            setFullname('Front Hazard Avoidance Camera');
        }else if (camera == 'RHAZ'){
            setFullname('Rear Hazard Avoidance Camera');
        }else{
            setFullname('Chemistry and Camera Complex');
        }
    };

    useEffect(() => {
        document.title = "Mars Rover | NASA";
        return () => {
          document.title = "NASA";
        };
      }, []);

    return (
        <div className='text-white h-screen relative'>
            <video autoPlay muted loop className='absolute inset-0 w-full h-screen object-cover'>
                <source src={bgVideo} type='video/mp4' />
            </video>
            <div className="absolute inset-0 w-full h-full bg-cover" style={{ backgroundImage: `url(${bgImage})`, opacity: 0.5 }}></div>
            <Navbar />
            <div className='text-white h-[100vh] flex flex-col justify-center items-center bg-cover relative'>
            <div className="sm:grid-cols-2 gap-4 bg-black/20 h-full text-white relative z-50 justify-center item-center p-5" style={{ paddingTop: '10%' }}>
                <div className="text-l p-3 absolute left-0 bg-black/40 right-0 flex justify-center mt-3 space-x-4 flex-wrap">
                    <button onClick={() => handleCameraChange('FHAZ')} className="btn hover:text-orange-500">FHAZ</button>
                    <button onClick={() => handleCameraChange('RHAZ')} className="btn hover:text-orange-500">RHAZ</button>
                    <button onClick={() => handleCameraChange('CHEMCAM')} className="btn hover:text-orange-500">CHEMCAM</button>
                </div><br/>
                <div className='text-orange-500 flex justify-center items-center w-full text-l underline capitalize' style={{ paddingTop: '3%' }}>{fullname}</div>
                <div className="mt-8 grid grid-cols-5  gap-4 bg-black/40">
                    {photoData && photoData.map(photo => (
                        <div>
                            <div key={photo.id} className="mb-4">
                            <img src={photo.img_src} alt={`Sol ${photo.sol} - ${selectedCamera}`} className="w-80 h-80 object-cover rounded-md" />
                        </div>
                        </div>
                        
                    ))}
                </div>
            </div>
        </div>
        <Footer />
        </div> 
    );
};

export default MarsRoverPhoto;
