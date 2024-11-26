import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Protect = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Check if the token exists in localStorage

    useEffect(() => {
        if (!token) {
            alert("First Login After Add Blogs")
            navigate('/login'); // Redirect to login if no token is present
        }
    }, [token, navigate]);

    // If token exists, render the child components (like PostForm)
    return token ? children : null;
};

export default Protect;
