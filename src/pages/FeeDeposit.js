import React, { useState } from 'react';
import { FiCalendar, FiUser, FiBook, FiHash, FiUserCheck, FiDollarSign } from 'react-icons/fi';
import './FeeDeposit.css';

const FeeDeposit = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample student data - in a real app, this would come from an API
  const students = [
    {
      id: 1,
      admissionNo: 'ADM2023001',
      name: 'Rahul Sharma',
      class: '10th',
      section: 'A',
      rollNo: '25',
      fatherName: 'Rajesh Sharma'
    },
    {
      id: 2,
      admissionNo: 'ADM2023002',
      name: 'Priya Patel',
      class: '9th',
      section: 'B',
      rollNo: '12',
      fatherName: 'Amit Patel'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const student = students.find(s => 
      s.admissionNo === searchTerm || 
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSelectedStudent(student || null);
  };

  return (
    <div className="fee-deposit">
      <h2>Fee Deposit</h2>
      
      {/* Payment Type Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'monthly' ? 'active' : ''}`}
          onClick={() => setActiveTab('monthly')}
        >
          <FiCalendar /> Monthly Payment
        </button>
        <button 
          className={`tab ${activeTab === 'annual' ? 'active' : ''}`}
          onClick={() => setActiveTab('annual')}
        >
          <FiCalendar /> Annual Pack Payment
        </button>
      </div>

      {/* Student Search */}
      <div className="student-search">
        <h3>Student Details</h3>
        <form onSubmit={handleSearch}>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by Admission No. or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </div>
        </form>

        {selectedStudent && (
          <div className="student-details">
            <div className="detail-row">
              <div className="detail-item">
                <span className="label">Admission No.</span>
                <div className="value">{selectedStudent.admissionNo}</div>
              </div>
              <div className="detail-item">
                <span className="label">Student Name</span>
                <div className="value">{selectedStudent.name}</div>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-item">
                <span className="label">Class</span>
                <div className="value">{selectedStudent.class}</div>
              </div>
              <div className="detail-item">
                <span className="label">Section</span>
                <div className="value">{selectedStudent.section}</div>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-item">
                <span className="label">Roll No.</span>
                <div className="value">{selectedStudent.rollNo}</div>
              </div>
              <div className="detail-item">
                <span className="label">Father's Name</span>
                <div className="value">{selectedStudent.fatherName}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeeDeposit;
