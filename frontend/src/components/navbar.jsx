import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios"; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, updateUser } = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogout = async () => {
        try {
            localStorage.removeItem('user'); // Remove user data from localStorage
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            updateUser(null); // Reset user context
            toast.success("Logout successful!");
            navigate("/");
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            updateUser(JSON.parse(storedUser)); // Set user context with stored user data
            setLoggedIn(true);
        }
    }, []);

    if (!loggedIn) {
        return null;
    }

    return (
        <div className='bg-slate-800 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-70 ' style={{ position: 'fixed', top: '0px', left: '0px', right: '0px', zIndex: '9999' }}>
            <div className="container">
                <div className="flex justify-between items-center">
                    <div className="flex w-10 font-bold text-2xl">
                        <div>
                            <h2>Hi {user ? user.name : 'Guest'}!</h2>
                        </div>
                    </div>
                    <div className="text-white">
                        <ul className="flex items-center gap-6 text-xl py-4">
                            <li>
                                <a href="/astromain" className="hover:text-green-500 ">|   Home   |</a>
                            </li>
                            <li>
                                <a href="/apod" className="hover:text-green-500">|   Astronomy Picture of the Day   |</a>
                            </li>
                            <li>
                                <a href="/marsroverphoto" className="hover:text-green-500">|   Mars Rover Photos   |</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <button onClick={handleLogout} className="hover:text-red-500 hover:border-red-500 text-white border-2 border-white px-3 py-1 rounded-md">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
