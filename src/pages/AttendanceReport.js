import React, { useState } from 'react';
import { FiDownload, FiPrinter } from 'react-icons/fi';
import './AttendanceReport.css';

const AttendanceReport = () => {
  // Sample data for dropdowns
  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  const sections = ['Section A', 'Section B', 'Section C'];
  const students = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Brown'];
  
  // State for form fields
  const [filters, setFilters] = useState({
    reportType: 'allClass',
    selectedClass: '',
    selectedSection: '',
    selectedStudent: '',
    fromDate: '',
    toDate: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Generating report with filters:', filters);
    // API call to generate report would go here
  };

  // Handle CSV export
  const handleExportCSV = () => {
    console.log('Exporting to CSV with filters:', filters);
    // CSV export logic would go here
  };

  return (
    <div className="attendance-report">
      <h1>Attendance Report</h1>
      
      <div className="report-container">
        <form onSubmit={handleSubmit} className="report-form">
          {/* Report Type Selection */}
          <div className="form-section">
            <h3>Select Report Type</h3>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="reportType"
                  value="allClass"
                  checked={filters.reportType === 'allClass'}
                  onChange={handleInputChange}
                />
                <span>All Class</span>
              </label>
              
              <label className="radio-option">
                <input
                  type="radio"
                  name="reportType"
                  value="classWise"
                  checked={filters.reportType === 'classWise'}
                  onChange={handleInputChange}
                />
                <span>Class Wise Student</span>
                {filters.reportType === 'classWise' && (
                  <select
                    name="selectedClass"
                    value={filters.selectedClass}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls, index) => (
                      <option key={index} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                )}
              </label>
              
              <label className="radio-option">
                <input
                  type="radio"
                  name="reportType"
                  value="allSection"
                  checked={filters.reportType === 'allSection'}
                  onChange={handleInputChange}
                />
                <span>All Section</span>
              </label>
              
              <label className="radio-option">
                <input
                  type="radio"
                  name="reportType"
                  value="selectSection"
                  checked={filters.reportType === 'selectSection'}
                  onChange={handleInputChange}
                />
                <span>Select Section</span>
                {filters.reportType === 'selectSection' && (
                  <select
                    name="selectedSection"
                    value={filters.selectedSection}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select Section</option>
                    {sections.map((section, index) => (
                      <option key={index} value={section}>
                        {section}
                      </option>
                    ))}
                  </select>
                )}
              </label>
              
              <label className="radio-option">
                <input
                  type="radio"
                  name="reportType"
                  value="allStudent"
                  checked={filters.reportType === 'allStudent'}
                  onChange={handleInputChange}
                />
                <span>All Student</span>
              </label>
              
              <label className="radio-option">
                <input
                  type="radio"
                  name="reportType"
                  value="selectStudent"
                  checked={filters.reportType === 'selectStudent'}
                  onChange={handleInputChange}
                />
                <span>Select Student</span>
                {filters.reportType === 'selectStudent' && (
                  <select
                    name="selectedStudent"
                    value={filters.selectedStudent}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select Student</option>
                    {students.map((student, index) => (
                      <option key={index} value={student}>
                        {student}
                      </option>
                    ))}
                  </select>
                )}
              </label>
            </div>
          </div>
          
          {/* Date Range */}
          <div className="form-section">
            <h3>Select Date Range</h3>
            <div className="date-range">
              <div className="form-group">
                <label>From Date</label>
                <input
                  type="date"
                  name="fromDate"
                  value={filters.fromDate}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>To Date</label>
                <input
                  type="date"
                  name="toDate"
                  value={filters.toDate}
                  onChange={handleInputChange}
                  min={filters.fromDate}
                  className="form-control"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              <FiPrinter /> Generate Report
            </button>
            <button 
              type="button" 
              className="btn btn-outline-primary"
              onClick={handleExportCSV}
            >
              <FiDownload /> Download CSV
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendanceReport;
