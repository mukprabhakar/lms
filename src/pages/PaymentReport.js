import React, { useState, useEffect } from 'react';
import { FiDownload, FiFileText } from 'react-icons/fi';
import './PaymentReport.css';

const PaymentReport = () => {
  // Sample data - in a real app, this would come from an API
  const classes = ['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  const sections = ['A', 'B', 'C', 'D'];
  
  // State for Fee Generate Report
  const [generateFilters, setGenerateFilters] = useState({
    class: '',
    section: 'All Section',
    student: 'All Student',
    fromDate: '',
    toDate: '',
    selectionType: 'all' // 'all', 'class', 'section', 'student'
  });
  
  // State for Fee Deposit Report
  const [depositFilters, setDepositFilters] = useState({
    class: '',
    section: 'All Section',
    student: 'All Student',
    fromDate: '',
    toDate: '',
    selectionType: 'all' // 'all', 'class', 'section', 'student'
  });
  
  // Sample students data - in a real app, this would come from an API based on class/section
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', class: 'XII', section: 'A' },
    { id: 2, name: 'Jane Smith', class: 'XII', section: 'A' },
    { id: 3, name: 'Robert Johnson', class: 'XI', section: 'B' },
  ]);
  
  // Filter students based on selected class and section
  const filteredStudents = (filters) => {
    return students.filter(student => {
      const classMatch = !filters.class || student.class === filters.class;
      const sectionMatch = filters.section === 'All Section' || student.section === filters.section;
      return classMatch && sectionMatch;
    });
  };
  
  // Handle radio button change for generate report
  const handleGenerateRadioChange = (type) => {
    setGenerateFilters(prev => {
      // If clicking the same radio button again, toggle back to 'all'
      const newType = prev.selectionType === type ? 'all' : type;
      return {
        ...prev,
        selectionType: newType,
        class: newType === 'all' ? '' : prev.class,
        section: newType === 'all' || newType === 'class' ? 'All Section' : prev.section,
        student: newType === 'all' || newType === 'class' || newType === 'section' ? 'All Student' : prev.student
      };
    });
  };
  
  // Handle radio button change for deposit report
  const handleDepositRadioChange = (type) => {
    setDepositFilters(prev => {
      // If clicking the same radio button again, toggle back to 'all'
      const newType = prev.selectionType === type ? 'all' : type;
      return {
        ...prev,
        selectionType: newType,
        class: newType === 'all' ? '' : prev.class,
        section: newType === 'all' || newType === 'class' ? 'All Section' : prev.section,
        student: newType === 'all' || newType === 'class' || newType === 'section' ? 'All Student' : prev.student
      };
    });
  };
  
  const handleGenerateFilterChange = (e) => {
    const { name, value } = e.target;
    setGenerateFilters(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset dependent fields
    if (name === 'class') {
      setGenerateFilters(prev => ({
        ...prev,
        section: 'All Section',
        student: 'All Student',
        selectionType: 'class'
      }));
    } else if (name === 'section') {
      setGenerateFilters(prev => ({
        ...prev,
        student: 'All Student',
        selectionType: 'section'
      }));
    } else if (name === 'student') {
      setGenerateFilters(prev => ({
        ...prev,
        selectionType: 'student'
      }));
    }
  };
  
  const handleDepositFilterChange = (e) => {
    const { name, value } = e.target;
    setDepositFilters(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset dependent fields
    if (name === 'class') {
      setDepositFilters(prev => ({
        ...prev,
        section: 'All Section',
        student: 'All Student',
        selectionType: 'class'
      }));
    } else if (name === 'section') {
      setDepositFilters(prev => ({
        ...prev,
        student: 'All Student',
        selectionType: 'section'
      }));
    } else if (name === 'student') {
      setDepositFilters(prev => ({
        ...prev,
        selectionType: 'student'
      }));
    }
  };
  
  const handleGenerateReport = (e) => {
    e.preventDefault();
    console.log('Generating report with filters:', generateFilters);
    // In a real app, this would call an API to get the report data
  };
  
  const handleDownloadGenerateCSV = () => {
    console.log('Downloading Generate Report CSV with filters:', generateFilters);
    // In a real app, this would generate and download a CSV
  };
  
  const handleDepositReport = (e) => {
    e.preventDefault();
    console.log('Generating deposit report with filters:', depositFilters);
    // In a real app, this would call an API to get the deposit report data
  };
  
  const handleDownloadDepositCSV = () => {
    console.log('Downloading Deposit Report CSV with filters:', depositFilters);
    // In a real app, this would generate and download a CSV
  };

  return (
    <div className="payment-report">
      <div className="page-header">
        <h2>Payment Report</h2>
      </div>

      {/* Fee Generate Report Section */}
      <div className="report-section">
        <div className="section-header">
          <FiFileText className="section-icon" />
          <h3>Fee Generate Report</h3>
        </div>
        
        <form onSubmit={handleGenerateReport} className="report-form">
          <div className="form-group">
            <label>Class</label>
            <select 
              className="form-control" 
              name="class"
              value={generateFilters.class}
              onChange={handleGenerateFilterChange}
              disabled={generateFilters.selectionType !== 'class'}
            >
              <option value="">Select Class</option>
              {classes.map((cls, index) => (
                <option key={index} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          
          <div className="radio-options">
            <div className="radio-row">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="generateAll" 
                  checked={generateFilters.selectionType === 'all'}
                  onChange={() => handleGenerateRadioChange('all')}
                />
                <span>All Class</span>
              </label>
            </div>
            
            <div className="radio-row">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="generateClass" 
                  checked={generateFilters.selectionType === 'class'}
                  onChange={() => handleGenerateRadioChange('class')}
                />
                <span>Class Wise Student</span>
              </label>
              {generateFilters.selectionType === 'class' && (
                <select 
                  className="form-control radio-select" 
                  name="class"
                  value={generateFilters.class}
                  onChange={handleGenerateFilterChange}
                >
                  <option value="">Select Class</option>
                  {classes.map((cls, index) => (
                    <option key={index} value={cls}>{cls}</option>
                  ))}
                </select>
              )}
            </div>
            
            <div className="radio-row">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="generateSection" 
                  checked={generateFilters.selectionType === 'section'}
                  onChange={() => handleGenerateRadioChange('section')}
                  disabled={!generateFilters.class}
                />
                <span>Select Section</span>
              </label>
              {generateFilters.selectionType === 'section' && generateFilters.class && (
                <select 
                  className="form-control radio-select" 
                  name="section"
                  value={generateFilters.section}
                  onChange={handleGenerateFilterChange}
                >
                  <option>All Section</option>
                  {sections.map((sec, index) => (
                    <option key={index} value={sec}>{sec}</option>
                  ))}
                </select>
              )}
            </div>
            
            <div className="radio-row">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="generateStudent" 
                  checked={generateFilters.selectionType === 'student'}
                  onChange={() => handleGenerateRadioChange('student')}
                  disabled={!generateFilters.class}
                />
                <span>Select Student</span>
              </label>
              {generateFilters.selectionType === 'student' && generateFilters.class && (
                <select 
                  className="form-control radio-select" 
                  name="student"
                  value={generateFilters.student}
                  onChange={handleGenerateFilterChange}
                >
                  <option>All Student</option>
                  {filteredStudents(generateFilters).map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name} (Class {student.class}-{student.section})
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          
          {(generateFilters.selectionType === 'section' || generateFilters.selectionType === 'student') && (
            <div className="form-group">
              <label>Section</label>
              <select 
                className="form-control" 
                name="section"
                value={generateFilters.section}
                onChange={handleGenerateFilterChange}
              >
                <option>All Section</option>
                {sections.map((sec, index) => (
                  <option key={index} value={sec}>{sec}</option>
                ))}
              </select>
            </div>
          )}
          
          {generateFilters.selectionType === 'student' && (
            <div className="form-group">
              <label>Student</label>
              <select 
                className="form-control" 
                name="student"
                value={generateFilters.student}
                onChange={handleGenerateFilterChange}
              >
                <option>All Student</option>
                {filteredStudents(generateFilters).map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} (Class {student.class}-{student.section})
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div className="form-row">
            <div className="form-group">
              <label>From Date</label>
              <input 
                type="date" 
                className="form-control" 
                name="fromDate"
                value={generateFilters.fromDate}
                onChange={handleGenerateFilterChange}
              />
            </div>
            
            <div className="form-group">
              <label>To Date</label>
              <input 
                type="date" 
                className="form-control" 
                name="toDate"
                value={generateFilters.toDate}
                onChange={handleGenerateFilterChange}
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Generate Report
              </button>
              <button 
                type="button" 
                className="btn btn-outline-primary"
                onClick={handleDownloadGenerateCSV}
              >
                <FiDownload /> Download CSV
              </button>
            </div>
          </div>
        </form>
      </div>
      
      {/* Fee Deposit Report Section */}
      <div className="report-section">
        <div className="section-header">
          <FiFileText className="section-icon" />
          <h3>Fee Deposit Report</h3>
        </div>
        
        <form onSubmit={handleDepositReport} className="report-form">
          <div className="form-group">
            <label>Class</label>
            <select 
              className="form-control" 
              name="class"
              value={depositFilters.class}
              onChange={handleDepositFilterChange}
              disabled={depositFilters.selectionType !== 'class'}
            >
              <option value="">Select Class</option>
              {classes.map((cls, index) => (
                <option key={index} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          
          <div className="radio-options">
            <div className="radio-row">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="depositAll" 
                  checked={depositFilters.selectionType === 'all'}
                  onChange={() => handleDepositRadioChange('all')}
                />
                <span>All Class</span>
              </label>
            </div>
            
            <div className="radio-row">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="depositClass" 
                  checked={depositFilters.selectionType === 'class'}
                  onChange={() => handleDepositRadioChange('class')}
                />
                <span>Class Wise Student</span>
              </label>
              {depositFilters.selectionType === 'class' && (
                <select 
                  className="form-control radio-select" 
                  name="class"
                  value={depositFilters.class}
                  onChange={handleDepositFilterChange}
                >
                  <option value="">Select Class</option>
                  {classes.map((cls, index) => (
                    <option key={index} value={cls}>{cls}</option>
                  ))}
                </select>
              )}
            </div>
            
            <div className="radio-row">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="depositSection" 
                  checked={depositFilters.selectionType === 'section'}
                  onChange={() => handleDepositRadioChange('section')}
                  disabled={!depositFilters.class}
                />
                <span>Select Section</span>
              </label>
              {depositFilters.selectionType === 'section' && depositFilters.class && (
                <select 
                  className="form-control radio-select" 
                  name="section"
                  value={depositFilters.section}
                  onChange={handleDepositFilterChange}
                >
                  <option>All Section</option>
                  {sections.map((sec, index) => (
                    <option key={index} value={sec}>{sec}</option>
                  ))}
                </select>
              )}
            </div>
            
            <div className="radio-row">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="depositStudent" 
                  checked={depositFilters.selectionType === 'student'}
                  onChange={() => handleDepositRadioChange('student')}
                  disabled={!depositFilters.class}
                />
                <span>Select Student</span>
              </label>
              {depositFilters.selectionType === 'student' && depositFilters.class && (
                <select 
                  className="form-control radio-select" 
                  name="student"
                  value={depositFilters.student}
                  onChange={handleDepositFilterChange}
                >
                  <option>All Student</option>
                  {filteredStudents(depositFilters).map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name} (Class {student.class}-{student.section})
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          
          {(depositFilters.selectionType === 'section' || depositFilters.selectionType === 'student') && (
            <div className="form-group">
              <label>Section</label>
              <select 
                className="form-control" 
                name="section"
                value={depositFilters.section}
                onChange={handleDepositFilterChange}
              >
                <option>All Section</option>
                {sections.map((sec, index) => (
                  <option key={index} value={sec}>{sec}</option>
                ))}
              </select>
            </div>
          )}
          
          {depositFilters.selectionType === 'student' && (
            <div className="form-group">
              <label>Student</label>
              <select 
                className="form-control" 
                name="student"
                value={depositFilters.student}
                onChange={handleDepositFilterChange}
              >
                <option>All Student</option>
                {filteredStudents(depositFilters).map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} (Class {student.class}-{student.section})
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div className="form-row">
            <div className="form-group">
              <label>From Date</label>
              <input 
                type="date" 
                className="form-control" 
                name="fromDate"
                value={depositFilters.fromDate}
                onChange={handleDepositFilterChange}
              />
            </div>
            
            <div className="form-group">
              <label>To Date</label>
              <input 
                type="date" 
                className="form-control" 
                name="toDate"
                value={depositFilters.toDate}
                onChange={handleDepositFilterChange}
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Fee Deposit Report
              </button>
              <button 
                type="button" 
                className="btn btn-outline-primary"
                onClick={handleDownloadDepositCSV}
              >
                <FiDownload /> Download CSV
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};


export default PaymentReport;
