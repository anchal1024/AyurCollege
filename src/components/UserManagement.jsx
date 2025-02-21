import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Assuming this is defined in your project or environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7070';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/users`, { // Updated to use API_BASE_URL and match backend endpoint
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include if your backend requires credentials
      });
      setUsers(response.data); // Assuming response.data is an array of users
    } catch (error) {
      let errorMessage = 'Error fetching users';
      if (error.response) {
        errorMessage += `: ${error.response.data.message || error.response.statusText}`;
      } else if (error.request) {
        errorMessage += ': Network error or CORS issue. Ensure the backend is running and CORS is configured.';
      } else {
        errorMessage += ': ' + error.message;
      }
      setError(errorMessage);
      console.error('Detailed error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center">
        <p className="text-gray-500">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchUsers} 
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <ul className="space-y-2">
          {users.map(user => (
            <li key={user.id} className="bg-white rounded shadow p-2 hover:bg-gray-100 transition">
              {user.username || 'No username'} {/* Fallback if username is missing */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserManagement;