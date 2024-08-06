import { useState, useContext } from 'react';
import axios from 'axios'; // Import axios
import { AuthContext } from '../context/AuthContext';
import './LoginPage.css'; // Reuse the same CSS

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the register endpoint
    try {
      await axios.post('http://localhost:5000/api/users/register', { name, email, password });
      // Automatically log in the user after successful signup
      await login(email, password);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
        <a href="/login" className="signup-link">Already have an account? Log in</a>
      </form>
    </div>
  );
};

export default SignupPage;
