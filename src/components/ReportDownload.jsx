import React from 'react';
import axios from 'axios';

function ReportDownload() {
  const handleDownload = async () => {
    try {
      const response = await axios.get('/api/reports/download', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <button 
        onClick={handleDownload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Download Report
      </button>
    </div>
  );
}

export default ReportDownload;