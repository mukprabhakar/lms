import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { FiSearch, FiBell, FiMenu } from 'react-icons/fi';
import userImage from './user-avatar.png';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Country from './pages/Country';
import State from './pages/State';
import City from './pages/City';
import Department from './pages/Department';
import Designation from './pages/Designation';
import Organization from './pages/Organization';
import './components/Sidebar.css';
import './components/Dashboard.css';
import './components/Table.css';

function App() {
  // Sidebar is always open
  const sidebarOpen = true;

  return (
    <Router>
      <div className="app">
        <Sidebar isOpen={sidebarOpen} />
        
        <div className={`main-content ${!sidebarOpen ? 'expanded' : ''}`}>
          <nav className="navbar">
            <div className="navbar-left">
              <h1>Welcome Back</h1>
            </div>
            <div className="navbar-right">
              <div className="search-bar">
                <FiSearch className="search-icon" />
                <input type="text" placeholder="Search for form" />
              </div>
              <button className="notification-btn">
                <FiBell size={20} />
                <span className="notification-badge">3</span>
              </button>
              <div className="user-profile">
                <img src={userImage} alt="User" className="user-avatar" />
                <span className="user-name">Admin</span>
              </div>
            </div>
          </nav>
          
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/master/country" element={<Country />} />
            <Route path="/master/state" element={<State />} />
            <Route path="/master/city" element={<City />} />
            <Route path="/master/department" element={<Department />} />
            <Route path="/master/designation" element={<Designation />} />
            <Route path="/master/organization" element={<Organization />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
