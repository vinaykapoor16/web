import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NewsPage from './pages/NewsPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/news" /> : <Navigate to="/login" />;
};

export default App;
