import React, { useState } from 'react';
import { FiDownload, FiFilter, FiSearch, FiPrinter } from 'react-icons/fi';
import './ResultGeneration.css';

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
  
  // Sample result data
  const [results, setResults] = useState([
    { id: 1, rollNo: '001', name: 'John Doe', marks: 85, grade: 'A', status: 'Passed' },
    { id: 2, rollNo: '002', name: 'Jane Smith', marks: 92, grade: 'A+', status: 'Passed' },
    { id: 3, rollNo: '003', name: 'Robert Johnson', marks: 78, grade: 'B+', status: 'Passed' },
    { id: 4, rollNo: '004', name: 'Emily Davis', marks: 65, grade: 'B', status: 'Passed' },
    { id: 5, rollNo: '005', name: 'Michael Brown', marks: 42, grade: 'D', status: 'Failed' },
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

  // Handle print results
  const handlePrintResults = () => {
    window.print();
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
                    </td>
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
