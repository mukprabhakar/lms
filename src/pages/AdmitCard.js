import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiDownload, FiPrinter, FiSearch, FiChevronDown, FiUser, FiPlus } from 'react-icons/fi';
import './AdmitCard.css';

const AdmitCard = () => {
  // State for filters
  const [examType, setExamType] = useState('');
  const [subExam, setSubExam] = useState('');
  const [session, setSession] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [section, setSection] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Sample data
  const examTypes = ['Quarterly', 'Half Yearly', 'Pre-Board', 'Final'];
  const subExams = ['Maths', 'Science', 'English', 'Social Studies'];
  const sessions = ['2023-2024', '2024-2025', '2025-2026'];
  const classes = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const sections = ['A', 'B', 'C', 'D'];

  // Sample student data
  const students = [
    { id: 1, name: 'John Doe', rollNo: '101', admissionNo: 'ADM001', fatherName: 'Robert Doe', mobile: '9876543210' },
    { id: 2, name: 'Jane Smith', rollNo: '102', admissionNo: 'ADM002', fatherName: 'Michael Smith', mobile: '9876543211' },
  ];

  const handleGetDetails = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  const handlePrint = (student) => {
    // Print functionality for individual student
    console.log('Printing admit card for:', student);
    // In a real app, this would open a print dialog for the specific student's admit card
    window.print();
  };

  return (
    <div className="admit-card-container">
      <div className="header">
        <h2><FiUser className="header-icon" /> Admit Card</h2>
        <div className="action-buttons">
          <Link to="/student/admit-card" className="btn-primary">
            <FiUser /> Admit Card
          </Link>
          <Link to="/student/admit-card/create" className="btn-secondary">
            <FiPlus /> Create New Admit
          </Link>
        </div>
      </div>

      <div className="filter-section">
        <form onSubmit={handleGetDetails}>
          <div className="filter-row">
            <div className="form-group">
              <label>Exam Type</label>
              <select 
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                required
              >
                <option value="">Select Exam Type</option>
                {examTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Sub Exam</label>
              <select 
                value={subExam}
                onChange={(e) => setSubExam(e.target.value)}
              >
                <option value="">Select Sub Exam</option>
                {subExams.map((exam, index) => (
                  <option key={index} value={exam}>{exam}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Session</label>
              <select 
                value={session}
                onChange={(e) => setSession(e.target.value)}
                required
              >
                <option value="">Select Session</option>
                {sessions.map((sess, index) => (
                  <option key={index} value={sess}>{sess}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-row">
            <div className="form-group">
              <label>Class</label>
              <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                required
              >
                <option value="">Select Class</option>
                {classes.map((cls, index) => (
                  <option key={index} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Section</label>
              <select 
                value={section}
                onChange={(e) => setSection(e.target.value)}
              >
                <option value="">Select Section</option>
                {sections.map((sec, index) => (
                  <option key={index} value={sec}>{sec}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <button type="submit" className="btn-get-details">
                Get Admit Details
              </button>
            </div>
          </div>
        </form>
      </div>

      {showResults && (
        <div className="results-section">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Roll No</th>
                  <th>Admission No</th>
                  <th>Father's Name</th>
                  <th>Mobile No</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map(student => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.rollNo}</td>
                      <td>{student.admissionNo}</td>
                      <td>{student.fatherName}</td>
                      <td>{student.mobile}</td>
                      <td className="actions">
                        <button 
                          className="btn-print"
                          onClick={() => handlePrint(student)}
                        >
                          <FiPrinter /> Print
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No admit details found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Print styles for the admit card */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .admit-card-container,
          .admit-card-container * {
            visibility: visible;
          }
          .admit-card-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .header, .filters, .actions {
            display: none !important;
          }
          .student-card {
            page-break-inside: avoid;
            break-inside: avoid;
            margin-bottom: 20px;
            border: 1px solid #000;
            padding: 20px;
          }
          @page {
            size: A4;
            margin: 1cm;
          }
        }
      `}</style>
    </div>
  );
};

export default AdmitCard;
