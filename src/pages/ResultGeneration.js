import React, { useState, useRef } from 'react';
import { FiDownload, FiFilter, FiSearch, FiPrinter, FiX } from 'react-icons/fi';
import './ResultGeneration.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResultGeneration = () => {
  // Form state
  const [filters, setFilters] = useState({
    session: '',
    class: '',
    section: '',
    exam: '',
    subject: '',
    student: ''
  });

  // Sample data
  const sessions = ['2023-2024', '2024-2025', '2025-2026'];
  const classes = ['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  const sections = ['A', 'B', 'C', 'D'];
  const exams = ['Unit Test 1', 'Half Yearly', 'Unit Test 2', 'Final Exam'];
  const subjects = ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science'];
  
  // Modal state
  const printRef = useRef();

  // Sample result data
  const [results, setResults] = useState([
    { id: 1, rollNo: '001', name: 'John Doe', marks: 85, grade: 'A', status: 'Passed' },
    { id: 2, rollNo: '002', name: 'Jane Smith', marks: 92, grade: 'A+', status: 'Passed' },
    { id: 3, rollNo: '003', name: 'Robert Johnson', marks: 78, grade: 'B+', status: 'Passed' },
    { id: 4, rollNo: '004', name: 'Emily Davis', marks: 65, grade: 'B', status: 'Passed' },
    { id: 5, rollNo: '005', name: 'Michael Brown', marks: 42, grade: 'D', status: 'Failed' },
    { id: 6, rollNo: '006', name: 'Linda Wilson', marks: 55, grade: 'C', status: 'Passed' },
    { id: 7, rollNo: '007', name: 'William Taylor', marks: 30, grade: 'F', status: 'Failed' },
    { id: 8, rollNo: '008', name: 'Elizabeth Martinez', marks: 88, grade: 'A', status: 'Passed' },
    { id: 9, rollNo: '009', name: 'David Anderson', marks: 73, grade: 'B+', status: 'Passed' },
    { id: 10, rollNo: '010', name: 'Jennifer Thomas', marks: 95, grade: 'A+', status: 'Passed' },
  ]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would fetch results based on filters
    console.log('Fetching results with filters:', filters);
  };

  // Handle result generation
  const handleGenerateResults = () => {
    // In a real app, this would generate and prepare results for download/print
    alert('Generating results based on current filters...');
  };

  // Handle print for all results
  const handlePrintResults = () => {
    window.print();
  };
  
  // Handle print for individual student result
  const handlePrintResult = (student) => {
    // Create a new PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Set font
    pdf.setFont('helvetica');
    pdf.setFontSize(16);
    
    // Add header
    pdf.setTextColor(44, 62, 80);
    pdf.text('School Name', 105, 20, { align: 'center' });
    pdf.setFontSize(14);
    pdf.text('Academic Transcript', 105, 30, { align: 'center' });
    
    // Add academic info
    pdf.setFontSize(10);
    pdf.setTextColor(85, 85, 85);
    pdf.text(`Academic Year: ${filters.session || '2023-2024'}`, 105, 40, { align: 'center' });
    pdf.text(`Class: ${filters.class || ''} ${filters.section ? `- Section ${filters.section}` : ''}`, 105, 45, { align: 'center' });
    pdf.text(`Exam: ${filters.exam || 'Final Exam'}`, 105, 50, { align: 'center' });
    
    // Add student info section
    pdf.setFontSize(12);
    pdf.setTextColor(44, 62, 80);
    pdf.text('Student Information', 20, 70);
    
    // Add student details in a table
    const startY = 80;
    const cellPadding = 8;
    const cellHeight = 8;
    
    // Table headers
    pdf.setFillColor(240, 240, 240);
    pdf.rect(20, startY, 170, cellHeight, 'F');
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(undefined, 'bold');
    pdf.text('Roll No', 25, startY + 5);
    pdf.text('Name', 60, startY + 5);
    pdf.text('Marks', 120, startY + 5);
    pdf.text('Grade', 150, startY + 5);
    pdf.text('Status', 180, startY + 5);
    
    // Student data row
    const statusColor = student.status === 'Passed' ? [40, 167, 69] : [220, 53, 69];
    const gradeColor = student.grade === 'F' ? [220, 53, 69] : [40, 167, 69];
    
    pdf.rect(20, startY + cellHeight, 170, cellHeight, 'S');
    pdf.setFont(undefined, 'normal');
    pdf.text(student.rollNo, 25, startY + cellHeight + 5);
    pdf.text(student.name, 60, startY + cellHeight + 5);
    pdf.text(student.marks.toString(), 120, startY + cellHeight + 5);
    
    pdf.setTextColor(gradeColor[0], gradeColor[1], gradeColor[2]);
    pdf.text(student.grade, 150, startY + cellHeight + 5);
    
    pdf.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
    pdf.text(student.status, 180, startY + cellHeight + 5);
    
    // Add signature section
    const signatureY = startY + cellHeight * 4;
    
    // Teacher signature
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(undefined, 'normal');
    pdf.text('Class Teacher', 40, signatureY);
    pdf.line(30, signatureY + 5, 70, signatureY + 5);
    
    // Principal signature
    pdf.text('Principal', 150, signatureY);
    pdf.line(130, signatureY + 5, 170, signatureY + 5);
    
    // Date
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, signatureY + 20);
    
    // Footer note
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text('This is a computer-generated document. No signature is required.', 105, 280, { align: 'center' });
    
    // Generate PDF as data URL
    const pdfUrl = pdf.output('bloburl');
    
    // Open PDF in new tab
    window.open(pdfUrl, '_blank');
  };

  

  // Handle download results
  const handleDownloadResults = () => {
    // In a real app, this would download the results as a file
    alert('Downloading results...');
  };

  // Get grade color based on grade
  const getGradeColor = (grade) => {
    switch(grade) {
      case 'A+': return 'text-success';
      case 'A': return 'text-primary';
      case 'B+': return 'text-info';
      case 'B': return 'text-primary';
      case 'C': return 'text-warning';
      case 'D': 
      case 'F': 
        return 'text-danger';
      default: return 'text-muted';
    }
  };

  // Get status badge class
  const getStatusBadge = (status) => {
    return status === 'Passed' ? 'badge-success' : 'badge-danger';
  };

  return (
    <div className="result-generation-container">
      <div className="header">
        <h2>Result Generation</h2>
        <div className="actions">
          <button 
            className="btn btn-primary"
            onClick={handleGenerateResults}
            disabled={!filters.class || !filters.exam}
          >
            <FiDownload /> Generate Results
          </button>
          <button 
            className="btn btn-outline-primary"
            onClick={handlePrintResults}
            disabled={results.length === 0}
          >
            <FiPrinter /> Print
          </button>
          <button 
            className="btn btn-outline-secondary"
            onClick={handleDownloadResults}
            disabled={results.length === 0}
          >
            <FiDownload /> Download
          </button>
        </div>
      </div>

      {/* Filter Form */}
      <div className="filter-container">
        <div className="filter-header">
          <h3><FiFilter /> Filter Results</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Session</label>
              <select
                className="form-select"
                name="session"
                value={filters.session}
                onChange={handleInputChange}
              >
                <option value="">Select Session</option>
                {sessions.map((session, index) => (
                  <option key={index} value={session}>{session}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Class</label>
              <select
                className="form-select"
                name="class"
                value={filters.class}
                onChange={handleInputChange}
              >
                <option value="">Select Class</option>
                {classes.map((cls, index) => (
                  <option key={index} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Section</label>
              <select
                className="form-select"
                name="section"
                value={filters.section}
                onChange={handleInputChange}
                disabled={!filters.class}
              >
                <option value="">All Sections</option>
                {sections.map((section, index) => (
                  <option key={index} value={section}>Section {section}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Exam</label>
              <select
                className="form-select"
                name="exam"
                value={filters.exam}
                onChange={handleInputChange}
              >
                <option value="">Select Exam</option>
                {exams.map((exam, index) => (
                  <option key={index} value={exam}>{exam}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <select
                className="form-select"
                name="subject"
                value={filters.subject}
                onChange={handleInputChange}
              >
                <option value="">All Subjects</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Search Student</label>
              <div className="search-input">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name or roll no"
                  name="student"
                  value={filters.student}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-outline-secondary"
              onClick={() => setFilters({
                session: '',
                class: '',
                section: '',
                exam: '',
                subject: '',
                student: ''
              })}
            >
              Reset Filters
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!filters.class || !filters.exam}
            >
              <FiSearch /> Search
            </button>
          </div>
        </form>
      </div>

      {/* Results Table */}
      <div className="results-container">
        <div className="results-header">
          <h3>Results</h3>
          <div className="results-summary">
            <span className="summary-item">
              <span className="label">Total Students:</span>
              <span className="value">{results.length}</span>
            </span>
            <span className="summary-item">
              <span className="label">Passed:</span>
              <span className="value text-success">
                {results.filter(r => r.status === 'Passed').length}
              </span>
            </span>
            <span className="summary-item">
              <span className="label">Failed:</span>
              <span className="value text-danger">
                {results.filter(r => r.status === 'Failed').length}
              </span>
            </span>
            <span className="summary-item">
              <span className="label">Pass %:</span>
              <span className="value text-primary">
                {Math.round((results.filter(r => r.status === 'Passed').length / results.length) * 100)}%
              </span>
            </span>
          </div>
        </div>

        {results.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th className="text-center">Marks</th>
                  <th className="text-center">Grade</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={result.id}>
                    <td>{index + 1}</td>
                    <td>{result.rollNo}</td>
                    <td>{result.name}</td>
                    <td className="text-center">{result.marks}/100</td>
                    <td className={`text-center fw-bold ${getGradeColor(result.grade)}`}>
                      {result.grade}
                    </td>
                    <td className="text-center">
                      <span className={`badge ${getStatusBadge(result.status)}`}>
                        {result.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handlePrintResult(result)}
                        title="Print Result"
                      >
                        <FiPrinter />
                      </button>
                    </td>
                    {/* <td className="text-center">
                      <button 
                        className="btn-action btn-view"
                        onClick={() => console.log('View details for', result.id)}
                        title="View Details"
                      >
                        <FiSearch size={14} />
                      </button>
                      <button 
                        className="btn-action btn-print"
                        onClick={() => console.log('Print result for', result.id)}
                        title="Print Result"
                      >
                        <FiPrinter size={14} />
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-content">
              <FiSearch size={48} className="mb-3" />
              <h4>No results found</h4>
              <p>Try adjusting your filters or search criteria</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultGeneration;
