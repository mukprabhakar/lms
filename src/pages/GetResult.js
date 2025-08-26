import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiPrinter, FiDownload, FiArrowLeft } from 'react-icons/fi';
import './GetResult.css';

const GetResult = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    session: '',
    class: '',
    section: ''
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sample data - in a real app, this would come from an API
  const sessions = ['2023-2024', '2024-2025', '2025-2026'];
  const classes = ['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  const sections = ['A', 'B', 'C', 'D'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      try {
        // In a real app, you would validate the inputs and make an API call here
        if (!searchParams.session || !searchParams.class || !searchParams.section) {
          throw new Error('Please fill in all fields');
        }

        // Mock data - replace with actual API call
        const mockResult = {
          student: {
            name: 'John Doe',
            rollNumber: '2023-001',
            class: searchParams.class,
            section: searchParams.section,
            admissionNumber: 'ADM2024001',
            dob: '01/01/2007',
            fatherName: 'Robert Doe',
            motherName: 'Jane Doe'
          },
          session: searchParams.session,
          result: 'Passed',
          totalMarks: 500,
          obtainedMarks: 425,
          percentage: 85,
          subjects: [
            { name: 'Mathematics', maxMarks: 100, marksObtained: 92, grade: 'A+', remarks: 'Excellent' },
            { name: 'Physics', maxMarks: 100, marksObtained: 88, grade: 'A', remarks: 'Very Good' },
            { name: 'Chemistry', maxMarks: 100, marksObtained: 85, grade: 'A', remarks: 'Very Good' },
            { name: 'English', maxMarks: 100, marksObtained: 82, grade: 'A-', remarks: 'Good' },
            { name: 'Computer Science', maxMarks: 100, marksObtained: 78, grade: 'B+', remarks: 'Good' }
          ],
          attendance: '95%',
          rank: 5,
          totalStudents: 120,
          remarks: 'Excellent performance. Keep it up!',
          principalRemarks: 'Congratulations on your outstanding performance!',
          generatedOn: new Date().toLocaleDateString()
        };

        setResult(mockResult);
      } catch (err) {
        setError(err.message || 'Failed to fetch result. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert('Downloading result...');
  };

  const handleBack = () => {
    setResult(null);
    setError('');
  };

  return (
    <div className="get-result-container">
      <div className="result-header">
        <h2>Get Result</h2>
        <p>View and download your examination results</p>
      </div>

      {!result ? (
        <div className="search-form-container">
          <div className="form-card">
            <h3>Search Result</h3>
            <p className="form-description">
              Please enter your details to view your result
            </p>
            
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                  <div className="form-group">
                <label>Session <span className="required">*</span></label>
                <select
                  className="form-control"
                  name="session"
                  value={searchParams.session}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Session</option>
                  {sessions.map((session, index) => (
                    <option key={index} value={session}>
                      {session}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Class <span className="required">*</span></label>
                <select
                  className="form-control"
                  name="class"
                  value={searchParams.class}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map((cls, index) => (
                    <option key={index} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Section <span className="required">*</span></label>
                <select
                  className="form-control"
                  name="section"
                  value={searchParams.section}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Section</option>
                  {sections.map((section, index) => (
                    <option key={index} value={section}>
                      {section}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : (
                    <>
                      <FiSearch /> Get Result
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div className="help-section">
            <h4>Need Help?</h4>
            <ul>
              <li>Make sure to select the correct session, class, and section.</li>
              <li>Contact your class teacher if you encounter any issues.</li>
              <li>For any discrepancies in the result, contact the examination department.</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="result-display">
          <div className="result-actions">
            <button 
              className="btn btn-outline-secondary"
              onClick={handleBack}
            >
              <FiArrowLeft /> Back to Search
            </button>
            <div className="action-buttons">
              <button 
                className="btn btn-outline-primary"
                onClick={handlePrint}
              >
                <FiPrinter /> Print
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleDownload}
              >
                <FiDownload /> Download
              </button>
            </div>
          </div>
          
          <div className="result-card">
            <div className="result-header">
              <div className="school-info">
                <h2>JEEVAN ADARSH VIDYALAYA</h2>
                <p>Affiliated to CBSE, New Delhi</p>
                <p>School Code: 12345 | UDISE: 1234567890</p>
                <h3>STUDENT REPORT CARD</h3>
                <p>ACADEMIC SESSION: 2024-2025</p>
              </div>
              <div className="student-photo">
                <div className="photo-placeholder">
                  <span>Student Photo</span>
                </div>
              </div>
            </div>
            
            <div className="student-details">
              <div className="detail-row">
                <div className="detail-item">
                  <span className="label">Student Name:</span>
                  <span className="value">{result.student.name}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Roll No:</span>
                  <span className="value">{result.student.rollNumber}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Class/Section:</span>
                  <span className="value">{result.student.class} - {result.student.section}</span>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-item">
                  <span className="label">Admission No:</span>
                  <span className="value">{result.student.admissionNumber}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Date of Birth:</span>
                  <span className="value">{result.student.dob}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Exam:</span>
                  <span className="value">{result.exam}</span>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-item">
                  <span className="label">Father's Name:</span>
                  <span className="value">{result.student.fatherName}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Mother's Name:</span>
                  <span className="value">{result.student.motherName}</span>
                </div>
              </div>
            </div>
            
            <div className="marks-table-container">
              <table className="marks-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Max Marks</th>
                    <th>Marks Obtained</th>
                    <th>Grade</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {result.subjects.map((subject, index) => (
                    <tr key={index}>
                      <td>{subject.name}</td>
                      <td className="text-center">{subject.maxMarks}</td>
                      <td className="text-center">{subject.marksObtained}</td>
                      <td className="text-center">{subject.grade}</td>
                      <td className="text-center">{subject.remarks}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Total</th>
                    <th className="text-center">{result.totalMarks}</th>
                    <th className="text-center">{result.obtainedMarks}</th>
                    <th colSpan="2" className="text-center">
                      Percentage: {result.percentage}%
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div className="result-summary">
              <div className="summary-item">
                <span className="label">Attendance:</span>
                <span className="value">{result.attendance}</span>
              </div>
              <div className="summary-item">
                <span className="label">Rank:</span>
                <span className="value">{result.rank} out of {result.totalStudents}</span>
              </div>
              <div className="summary-item">
                <span className="label">Result:</span>
                <span className={`value ${result.result === 'Passed' ? 'text-success' : 'text-danger'}`}>
                  <strong>{result.result.toUpperCase()}</strong>
                </span>
              </div>
            </div>
            
            <div className="remarks-section">
              <div className="remarks">
                <h4>Teacher's Remarks:</h4>
                <p>{result.remarks}</p>
              </div>
              <div className="signature">
                <div className="signature-line"></div>
                <p>Class Teacher</p>
              </div>
            </div>
            
            <div className="principal-remarks">
              <h4>Principal's Remarks:</h4>
              <p>{result.principalRemarks}</p>
              <div className="signature">
                <div className="signature-line"></div>
                <p>Principal</p>
              </div>
            </div>
            
            <div className="result-footer">
              <p>Generated on: {result.generatedOn}</p>
              <p className="disclaimer">
                <strong>Note:</strong> This is a computer-generated document and does not require a signature.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetResult;
