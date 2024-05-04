import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch user data
    const fetchUserData = () => {
        axios.get('/user/profile')
            .then(({ data }) => {
                setUser(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // useEffect to fetch user data on mount
    useEffect(() => {
        fetchUserData();
    }, []);

    // Function to update user data
    const updateUser = (userData) => {
        setUser(userData);
    };

    // Return loading state until user data is fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    // Return error message if there's an error fetching user data
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Once user data is fetched, provide it to the context
    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}
