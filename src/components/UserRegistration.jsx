import React, { useState } from 'react';
import axios from 'axios';

// Add the API base URL constant here
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7070';

function UserRegistration() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const dataToSend = JSON.stringify(formData);
const response = await axios.post(`${API_BASE_URL}/api/users`, dataToSend, {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
      alert('Registration successful: ' + response.data);
      setFormData({ username: '', password: '' }); // Reset form
    } catch (error) {
      let errorMessage = 'Error registering user';
      if (error.response) {
        // Server responded with an error status
        errorMessage += `: ${error.response.data.message || error.response.statusText}`;
      } else if (error.request) {
        // No response received (e.g., network error, CORS)
        errorMessage += ': Network error or CORS issue. Ensure the backend is running and CORS is configured.';
      } else {
        // Something else happened
        errorMessage += ': ' + error.message;
      }
      setError(errorMessage);
      alert(errorMessage);
      console.error('Detailed error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="username" 
            name="username" 
            type="text" 
            placeholder="Username"
            value={formData.username} // Controlled input
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            id="password" 
            name="password" 
            type="password" 
            placeholder="******************"
            value={formData.password} // Controlled input
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserRegistration;