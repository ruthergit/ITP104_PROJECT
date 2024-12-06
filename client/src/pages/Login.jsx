import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate credentials
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true); // Mark as authenticated
      navigate('/'); // Redirect to home page
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="px-64 h-[700px] grid place-content-center">
      <form
        className="w-96 border border-BorderBlue rounded-lg overflow-hidden px-7 pb-5"
        onSubmit={handleSubmit}
      >
        <h1 className="block py-4 font-bold text-2xl text-white">Login</h1>
        <hr className="border-t-1 border-BorderBlue" />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div>
          <label htmlFor="username" className="block py-4 font-normal text-xl text-white">
            User Name
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 text-white border border-BorderBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-BorderBlue"
          />
        </div>
        <div>
          <label htmlFor="password" className="block py-4 font-normal text-xl text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 text-white border border-BorderBlue rounded-lg focus:outline-none focus:ring-2 focus:ring-BorderBlue"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="mt-2 px-4 py-3 w-full h-12 font-medium text-Blue bg-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-BorderBlue"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
