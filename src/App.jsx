import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegistration from './components/UserRegistration';
import UserManagement from './components/UserManagement';
import CSVUpload from './components/CSVUpload';
import ReportFilter from './components/ReportFilter';
import ReportDownload from './components/ReportDownload';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<UserRegistration />} />
          <Route path="/manage" element={<UserManagement />} />
          <Route path="/upload" element={<CSVUpload />} />
          <Route path="/filter" element={<ReportFilter />} />
          <Route path="/download" element={<ReportDownload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;