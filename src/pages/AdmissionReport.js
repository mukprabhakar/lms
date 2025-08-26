import React, { useState } from 'react';
import { FiDownload, FiPrinter } from 'react-icons/fi';
import './AdmissionReport.css';

const AdmissionReport = () => {
  // Sample data
  const classes = ['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  const categories = ['General', 'OBC', 'SC', 'ST', 'Other'];
  const genders = ['Male', 'Female', 'Other'];
  const streams = ['Science', 'Commerce', 'Arts', 'Vocational'];
  const sessions = ['2023-24', '2024-25', '2025-26'];
  
  // State for Registration Report
  const [regReportType, setRegReportType] = useState('all');
  const [regClass, setRegClass] = useState('');
  const [regFromDate, setRegFromDate] = useState('');
  const [regToDate, setRegToDate] = useState('');

  // State for Admission Report
  const [admReportType, setAdmReportType] = useState('all');
  const [admClass, setAdmClass] = useState('');
  const [ewsFilter, setEwsFilter] = useState('all');
  const [casteFilter, setCasteFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [streamFilter, setStreamFilter] = useState('');
  const [sessionFilter, setSessionFilter] = useState('');
  const [admFromDate, setAdmFromDate] = useState('');
  const [admToDate, setAdmToDate] = useState('');

  // Handle form submissions
  const handleRegReportSubmit = (e) => {
    e.preventDefault();
    console.log('Generating Registration Report', { regReportType, regClass, regFromDate, regToDate });
    // API call would go here
  };

  const handleAdmReportSubmit = (e) => {
    e.preventDefault();
    console.log('Generating Admission Report', { 
      admReportType, 
      admClass, 
      ewsFilter, 
      casteFilter, 
      genderFilter, 
      streamFilter, 
      sessionFilter, 
      admFromDate, 
      admToDate 
    });
    // API call would go here
  };

  // Export to CSV functions
  const exportRegToCSV = () => {
    console.log('Exporting Registration Report to CSV');
    // CSV export logic would go here
  };

  const exportAdmToCSV = () => {
    console.log('Exporting Admission Report to CSV');
    // CSV export logic would go here
  };

  return (
    <div className="admission-report">
      <h1>Admission Report</h1>
      
      {/* Registration Report Section */}
      <div className="report-section">
        <h2>Registration Report</h2>
        
        <form onSubmit={handleRegReportSubmit} className="report-form">
          <div className="form-row">
            <div className="radio-group">
              <label>
                <input 
                  type="radio" 
                  name="regReportType" 
                  value="all" 
                  checked={regReportType === 'all'}
                  onChange={(e) => setRegReportType(e.target.value)}
                />
                <span>All Students</span>
              </label>
              
              <label>
                <input 
                  type="radio" 
                  name="regReportType" 
                  value="class"
                  checked={regReportType === 'class'}
                  onChange={(e) => setRegReportType(e.target.value)}
                />
                <span>Class-wise Students</span>
              </label>
              
              {regReportType === 'class' && (
                <select 
                  className="form-control" 
                  value={regClass}
                  onChange={(e) => setRegClass(e.target.value)}
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map((cls, index) => (
                    <option key={index} value={cls}>{cls}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>From Date</label>
              <input 
                type="date" 
                className="form-control" 
                value={regFromDate}
                onChange={(e) => setRegFromDate(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>To Date</label>
              <input 
                type="date" 
                className="form-control" 
                value={regToDate}
                min={regFromDate}
                onChange={(e) => setRegToDate(e.target.value)}
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Generate Report
            </button>
            <button 
              type="button" 
              className="btn btn-outline-primary"
              onClick={exportRegToCSV}
            >
              <FiDownload /> Download CSV
            </button>
          </div>
        </form>
      </div>
      
      {/* Admission Report Section */}
      <div className="report-section">
        <h2>Admission Report</h2>
        
        <form onSubmit={handleAdmReportSubmit} className="report-form">
          <div className="form-row">
            <div className="radio-group">
              <label>
                <input 
                  type="radio" 
                  name="admReportType" 
                  value="all" 
                  checked={admReportType === 'all'}
                  onChange={(e) => setAdmReportType(e.target.value)}
                />
                <span>All Students</span>
              </label>
              
              <label>
                <input 
                  type="radio" 
                  name="admReportType" 
                  value="class"
                  checked={admReportType === 'class'}
                  onChange={(e) => setAdmReportType(e.target.value)}
                />
                <span>Class-wise Students</span>
              </label>
              
              {admReportType === 'class' && (
                <select 
                  className="form-control" 
                  value={admClass}
                  onChange={(e) => setAdmClass(e.target.value)}
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map((cls, index) => (
                    <option key={index} value={cls}>{cls}</option>
                  ))}
                </select>
              )}
              
              <div className="filter-group">
                <label>EWS:</label>
                <select 
                  className="form-control" 
                  value={ewsFilter}
                  onChange={(e) => setEwsFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Filter by Caste:</label>
                <select 
                  className="form-control" 
                  value={casteFilter}
                  onChange={(e) => setCasteFilter(e.target.value)}
                >
                  <option value="">All Castes</option>
                  {categories.map((caste, index) => (
                    <option key={index} value={caste}>{caste}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-group">
                <label>Filter by Gender:</label>
                <select 
                  className="form-control" 
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                >
                  <option value="">All Genders</option>
                  {genders.map((gender, index) => (
                    <option key={index} value={gender}>{gender}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-group">
                <label>Filter by Stream:</label>
                <select 
                  className="form-control" 
                  value={streamFilter}
                  onChange={(e) => setStreamFilter(e.target.value)}
                >
                  <option value="">All Streams</option>
                  {streams.map((stream, index) => (
                    <option key={index} value={stream}>{stream}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-group">
                <label>Session:</label>
                <select 
                  className="form-control" 
                  value={sessionFilter}
                  onChange={(e) => setSessionFilter(e.target.value)}
                >
                  <option value="">Select Session</option>
                  {sessions.map((session, index) => (
                    <option key={index} value={session}>{session}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>From Date</label>
              <input 
                type="date" 
                className="form-control" 
                value={admFromDate}
                onChange={(e) => setAdmFromDate(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>To Date</label>
              <input 
                type="date" 
                className="form-control" 
                value={admToDate}
                min={admFromDate}
                onChange={(e) => setAdmToDate(e.target.value)}
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Generate Report
            </button>
            <button 
              type="button" 
              className="btn btn-outline-primary"
              onClick={exportAdmToCSV}
            >
              <FiDownload /> Download CSV
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionReport;
