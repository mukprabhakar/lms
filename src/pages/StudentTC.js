import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiPrinter, FiFileText, FiSearch } from 'react-icons/fi';
import './StudentTC.css';

const StudentTC = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  
  // Sample data - in a real app, this would come from an API
  const tcData = [
    { id: 1, name: 'Mohammad', rollNo: '3', className: 'Nur', issuedDate: '7/24/2025', leavingDate: '7/25/2025', reason: 'pass out' },
    { id: 2, name: 'Rahul', rollNo: '7', className: '2', issuedDate: '7/21/2025', leavingDate: '7/26/2025', reason: 'adasds' },
    { id: 3, name: 'STUDENT', rollNo: '82', className: 'Nur', issuedDate: '7/21/2025', leavingDate: '7/25/2025', reason: 'fdsfdsfsd' },
    { id: 4, name: 'STUDENT 2', rollNo: '28', className: '2', issuedDate: '7/21/2025', leavingDate: '7/26/2025', reason: 'fdfdfsd' },
    { id: 5, name: 'STUDENT 1', rollNo: '29', className: 'Nur', issuedDate: '7/21/2025', leavingDate: '7/22/2025', reason: "Father's transfer" },
    { id: 6, name: 'Amin', rollNo: '4', className: '2', issuedDate: '7/10/2025', leavingDate: '7/14/2025', reason: 'High fever' },
    { id: 7, name: 'shayaan', rollNo: '1', className: '5', issuedDate: '6/4/2025', leavingDate: '6/4/2025', reason: 'non' },
    { id: 8, name: 'AAdil', rollNo: '6', className: '2', issuedDate: '6/4/2025', leavingDate: '6/4/2025', reason: 'non' },
    { id: 9, name: 'Akshay', rollNo: '2', className: '2', issuedDate: '5/27/2025', leavingDate: '5/28/2025', reason: 'complet' },
    { id: 10, name: 'Mohammad', rollNo: '2', className: 'Nur', issuedDate: '3/22/2025', leavingDate: '3/24/2025', reason: 'complete' },
    { id: 11, name: 'Akash', rollNo: '17', className: '2', issuedDate: '3/12/2025', leavingDate: '3/12/2025', reason: 'leaving' },
    { id: 12, name: 'ishika', rollNo: '5', className: '2', issuedDate: '3/10/2025', leavingDate: '3/10/2025', reason: 'to attend a new school' },
    { id: 13, name: 'KRISHNA', rollNo: '6', className: 'Nur', issuedDate: '2/25/2025', leavingDate: '2/25/2025', reason: 'Passout' },
    { id: 14, name: 'KUNAL', rollNo: '9', className: 'Nur', issuedDate: '2/12/2025', leavingDate: '2/14/2025', reason: 'trignometry' },
    { id: 15, name: 'KUNAL', rollNo: '9', className: 'Nur', issuedDate: '2/11/2025', leavingDate: '2/9/2025', reason: 'physics' },
    { id: 16, name: 'STUDENT 2', rollNo: '31', className: 'Nur', issuedDate: '2/11/2025', leavingDate: '2/2/2025', reason: 'JS hindi' },
    { id: 17, name: 'PARI', rollNo: '10', className: 'Nur', issuedDate: '2/10/2025', leavingDate: '2/10/2025', reason: 'Teacher not good' },
    { id: 18, name: 'jasmine', rollNo: '1', className: '2', issuedDate: '1/30/2025', leavingDate: '1/30/2025', reason: 'Transfer' },
    { id: 19, name: 'AYUSHMAAN', rollNo: '15', className: 'Nur', issuedDate: '12/25/2024', leavingDate: '12/27/2024', reason: 'another school' },
    { id: 20, name: 'Ronit', rollNo: '3', className: '2', issuedDate: '12/6/2024', leavingDate: '12/5/2024', reason: 'NEW COLLLEGE' },
    { id: 21, name: 'YASH PAL', rollNo: '1', className: 'LKG', issuedDate: '11/27/2024', leavingDate: '11/28/2024', reason: 'Pass out' },
    { id: 22, name: 'RAGHAV', rollNo: '1', className: 'Nur', issuedDate: '10/27/2024', leavingDate: '10/28/2024', reason: 'Done' },
    { id: 23, name: 'Rahul', rollNo: '10', className: '2', issuedDate: '10/21/2024', leavingDate: '10/22/2024', reason: 'NONE' },
  ];

  // Filter data based on search and filters
  const filteredData = tcData.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.includes(searchTerm);
    
    const matchesClass = selectedClass ? student.className === selectedClass : true;
    
    // Date filtering logic
    let matchesDate = true;
    if (fromDate && toDate) {
      const issuedDate = new Date(student.issuedDate);
      const from = new Date(fromDate);
      const to = new Date(toDate);
      matchesDate = issuedDate >= from && issuedDate <= to;
    }
    
    return matchesSearch && matchesClass && matchesDate;
  });

  // Handle print action
  const handlePrint = (student) => {
    // In a real app, this would open a print dialog for the specific student's TC
    console.log('Printing TC for:', student);
    window.print();
  };

  // Get unique classes for filter dropdown
  const uniqueClasses = [...new Set(tcData.map(item => item.className))];

  return (
    <div className="student-tc-container">
      <div className="header">
        <h2><FiFileText className="header-icon" /> Student Transfer Certificate</h2>
        <div className="action-buttons">
          <Link to="/student/tc" className="btn-primary">
            <FiFileText /> TC List
          </Link>
          <Link to="/student/tc/generate" className="btn-secondary">
            <FiFileText /> Generate TC
          </Link>
        </div>
      </div>

      <div className="filter-section">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-row">
          <div className="form-group">
            <label>Class</label>
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">All Classes</option>
              {uniqueClasses.map((cls, index) => (
                <option key={index} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>From Date</label>
            <input 
              type="date" 
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>To Date</label>
            <input 
              type="date" 
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              min={fromDate}
            />
          </div>
          
          <button 
            className="btn-clear"
            onClick={() => {
              setSearchTerm('');
              setSelectedClass('');
              setFromDate('');
              setToDate('');
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="results-section">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Roll No</th>
                <th>Class</th>
                <th>Issued Date</th>
                <th>Leaving Date</th>
                <th>Reason for Leaving</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map(student => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.rollNo}</td>
                    <td>{student.className}</td>
                    <td>{student.issuedDate}</td>
                    <td>{student.leavingDate}</td>
                    <td>{student.reason}</td>
                    <td className="actions">
                      <button 
                        className="btn-print"
                        onClick={() => handlePrint(student)}
                        title="Print TC"
                      >
                        <FiPrinter /> Print
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    No transfer certificates found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentTC;
