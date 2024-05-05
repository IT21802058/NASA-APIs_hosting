import React, { useContext,useEffect,useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { BiUser } from 'react-icons/bi';
import { AiOutlineUnlock } from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import bgVideo from '../assets/Earth-from-space.mp4';
import Footer from '../components/footer';
import { UserContext } from '../../context/userContext';


const AuthPage = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const { updateUser } = useContext(UserContext);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: 'Astronomy'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const response = await axios.post('/user/userlogin', data);
                if (response.data) {
                    localStorage.setItem('user', JSON.stringify(response.data)); // Store user data in localStorage
                    updateUser(response.data);
                    toast.success('Login successful!');
                }
                navigate('/astromain');
            } else {
                if (data.password === data.confirmPassword) {
                    const response = await axios.post('/user/add', data);
                    if (response.data) {
                        toast.success('Registration successful!');
                        setIsLogin(true);
                    }
                } else {
                    toast.error('Password mismatch!');
                }
            }
        } catch (error) {
            toast.error('Something went wrong!');
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        document.title = "Auth page | NASA";
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
                <div className='bg-slate-800 border border-slate-400 rounded-md p-12 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-70 relative'>
                    <h1 className='text-4xl text-white font-bold text-center mb-7 py-4'>
                        {isLogin ? 'User Login' : 'Sign Up'}
                    </h1>
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className='relative my-4'>
                                <input
                                    type='text'
                                    className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:text-white focus:border-green-600 peer'
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    required
                                    placeholder=''
                                />
                                <label
                                    htmlFor=''
                                    className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y--4 peer-focus:scale-75 peer-focus:translate-y--6'>
                                    User Name:
                                </label>
                                <BiUser className='absolute top-0 right-4' />
                            </div>
                        )}
                        <br />
                        <div className='relative my-4'>
                            <input
                                type='email'
                                className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:text-white focus:border-green-600 peer'
                                value={data.email}
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                required
                                placeholder=''
                            />
                            <label
                                htmlFor=''
                                className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y--4 peer-focus:scale-75 peer-focus:translate-y--6'>
                                Your Email:
                            </label>
                            <FiMail className='absolute top-0 right-4' />
                        </div>
                        <br />
                        <div className='relative my-4'>
                            <input
                                type='password'
                                className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:text-white focus:border-green-600 peer'
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                required
                                placeholder=''
                            />
                            <label
                                htmlFor=''
                                className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y--4 peer-focus:scale-75 peer-focus:translate-y--6'>
                                Your Password:
                            </label>
                            <AiOutlineUnlock className='absolute top-0 right-4' />
                        </div>
                        <br />
                        {!isLogin && (
                            <div className='relative my-4'>
                                <input
                                    type='password'
                                    className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:text-white focus:border-green-600 peer'
                                    value={data.confirmPassword}
                                    onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                                    required
                                    placeholder=''
                                />
                                <label
                                    htmlFor=''
                                    className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y--4 peer-focus:scale-75 peer-focus:translate-y--6'>
                                    Confirm Your Password:
                                </label>
                                <AiOutlineUnlock className='absolute top-0 right-4' />
                            </div>
                        )}
                        <button
                            type='submit'
                            className='w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300'>
                            {isLogin ? 'Login' : 'Registration'}
                        </button>
                        <div>
                            <span className='m-1'>
                                {isLogin ? 'New Here?' : 'Already have an account?'}
                                <button
                                    type='button'
                                    className='text-blue-500 m-3'
                                    onClick={() => setIsLogin((prevState) => !prevState)}>
                                    {isLogin ? 'Create an Account' : 'Signin now'}
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AuthPage;
