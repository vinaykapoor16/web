import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        setUser(response.data);
      }).catch((error) => {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
      });
    }
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Sending login request:', { email, password });
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      console.log('Login response:', response);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      window.location.href = '/news'; // Redirect to news page
    } catch (error) {
      if (error.response) {
        console.error('Login error response data:', error.response.data);
        console.error('Login error response status:', error.response.status);
        console.error('Login error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Login error request:', error.request);
      } else {
        console.error('Login error message:', error.message);
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
