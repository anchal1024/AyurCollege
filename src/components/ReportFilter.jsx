import React, { useState } from 'react';
import axios from 'axios';

function ReportFilter() {
  const [filters, setFilters] = useState({ cohort: '', village: '' });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/reports/filter', filters);
      console.log('Filtered reports:', response.data);
    } catch (error) {
      console.error('Error filtering reports:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cohort">
            Cohort
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="cohort" 
            name="cohort" 
            type="text" 
            placeholder="Enter Cohort"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="village">
            Village
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            id="village" 
            name="village" 
            type="text" 
            placeholder="Enter Village"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit"
          >
            Filter Reports
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportFilter;