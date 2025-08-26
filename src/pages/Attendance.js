import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiSave, FiPrinter, FiDownload, FiEye, FiX, FiPlus, FiUser, FiCalendar, FiUsers, FiChevronDown } from 'react-icons/fi';
import './Attendance.css';

const Attendance = () => {
  // State for attendance data and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [classFilter, setClassFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddAttendanceModal, setShowAddAttendanceModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceStatus, setAttendanceStatus] = useState({});

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const data = [
        { id: 1, admissionNo: 'ADM/2025/0491', firstName: 'Sunanda', lastName: 'Sharma', rollNo: 4, stream: '', attendance: '' },
        { id: 2, admissionNo: 'ADM/2025/0490', firstName: 'sddsds', lastName: 'dkdkdk', rollNo: 40, stream: '', attendance: '' },
        { id: 3, admissionNo: 'ADM/2025/0489', firstName: 'Addy', lastName: 'Broke', rollNo: 9, stream: 'N/A', attendance: '' },
        { id: 4, admissionNo: 'ADM/2025/0484', firstName: 'KARUNA', lastName: 'none', rollNo: 7, stream: 'N/A', attendance: '' },
        { id: 5, admissionNo: 'ADM/2025/0483', firstName: 'Barry', lastName: 'Allen', rollNo: 5, stream: '', attendance: '' },
        { id: 6, admissionNo: 'ADM/2025/0482', firstName: 'Wasim', lastName: 'Akram', rollNo: 20, stream: '', attendance: '' },
        { id: 7, admissionNo: 'ADM/2025/0433', firstName: 'Sourav', lastName: 'N/A', rollNo: 'Seat Excee', stream: 'English', attendance: '' },
        { id: 8, admissionNo: 'ADM/2025/0411', firstName: 'Shahrukh khan', lastName: 'Khan', rollNo: 2, stream: '', attendance: '' },
        { id: 9, admissionNo: 'ADM/2025/0410', firstName: 'Ajay', lastName: 'Mishra', rollNo: 22, stream: 'N/A', attendance: '' },
        { id: 10, admissionNo: 'ADM/2025/0409', firstName: 'Sony', lastName: 'Tirkey', rollNo: 1, stream: 'N/A', attendance: '' },
        // Add more students as needed
      ];
      
      setAttendanceData(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Handle view profile
  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setShowProfileModal(true);
  };

  // Close profile modal
  const closeProfileModal = () => {
    setShowProfileModal(false);
    setSelectedStudent(null);
  };

  // Open add attendance modal
  const openAddAttendanceModal = () => {
    setShowAddAttendanceModal(true);
  };

  // Close add attendance modal
  const closeAddAttendanceModal = () => {
    setShowAddAttendanceModal(false);
    setAttendanceStatus({});
  };

  // Handle attendance status change in the add attendance modal
  const handleAttendanceStatusChange = (studentId, status) => {
    setAttendanceStatus(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  // Handle form submission
  const handleAttendanceFormSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would validate the form and then proceed
    alert('Attendance form submitted successfully!');
  };

  // Filter students based on search term and filters
  const filteredStudents = attendanceData.filter(student => {
    const matchesSearch = 
      student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toString().toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClass = classFilter ? student.stream === classFilter : true;
    const matchesSection = sectionFilter ? student.section === sectionFilter : true;
    
    return matchesSearch && matchesClass && matchesSection;
  });

  // Save attendance
  const saveAttendance = () => {
    // In a real app, this would send data to the server
    console.log('Saving attendance:', attendanceData);
    alert('Attendance saved successfully!');
  };

  // Print attendance
  const printAttendance = () => {
    window.print();
  };

  // Download attendance
  const downloadAttendance = () => {
    // In a real app, this would generate and download a file
    console.log('Downloading attendance data');
    alert('Downloading attendance data...');
  };

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <h2><FiFilter className="header-icon" /> Attendance Management</h2>
        <div className="action-buttons">
          <button className="btn-primary" onClick={openAddAttendanceModal}>
            <FiPlus /> Add Attendance
          </button>
          <button className="btn-secondary" onClick={saveAttendance}>
            <FiSave /> Save
          </button>
          <button className="btn-secondary" onClick={printAttendance}>
            <FiPrinter /> Print
          </button>
          <button className="btn-secondary" onClick={downloadAttendance}>
            <FiDownload /> Download
          </button>
        </div>
      </div>

      {/* Add Attendance Modal */}
      {showAddAttendanceModal && (
        <div className="modal-overlay">
          <div className="attendance-form-modal">
            <div className="modal-header">
              <h3>Attendance Form</h3>
              <button className="close-modal" onClick={closeAddAttendanceModal}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAttendanceFormSubmit} className="attendance-form">
                <div className="form-group">
                  <label htmlFor="teacher">Teacher</label>
                  <select id="teacher" className="form-control" required>
                    <option value="">Select Teacher</option>
                    <option value="teacher1">John Doe</option>
                    <option value="teacher2">Jane Smith</option>
                    <option value="teacher3">Robert Johnson</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="class">Class</label>
                  <select id="class" className="form-control" required>
                    <option value="">Select Class</option>
                    <option value="1">Class 1</option>
                    <option value="2">Class 2</option>
                    <option value="3">Class 3</option>
                    <option value="4">Class 4</option>
                    <option value="5">Class 5</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="section">Section</label>
                  <select id="section" className="form-control" required>
                    <option value="">Select Section</option>
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input 
                    type="date" 
                    id="date" 
                    className="form-control" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required 
                  />
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={closeAddAttendanceModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-mark-attendance">
                    Mark Attendance
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      <div className="filters">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, admission no, or roll no..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <label>Date:</label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="date-picker"
          />
        </div>
        
        <div className="filter-group">
          <label>Class:</label>
          <select 
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Classes</option>
            <option value="N/A">N/A</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            {/* Add more classes as needed */}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Section:</label>
          <select 
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            className="filter-select"
            disabled={!classFilter}
          >
            <option value="">All Sections</option>
            {/* Sections would be loaded based on selected class in a real app */}
          </select>
        </div>
        
        <button className="btn-clear" onClick={() => {
          setClassFilter('');
          setSectionFilter('');
          setSearchTerm('');
        }}>
          Clear Filters
        </button>
      </div>

      <div className="attendance-table-container">
        {isLoading ? (
          <div className="loading">Loading attendance data...</div>
        ) : (
          <div className="table-responsive">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Serial No</th>
                  <th>Admission No</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Roll No</th>
                  <th>Stream</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}</td>
                      <td>{student.admissionNo}</td>
                      <td>{student.firstName}</td>
                      <td>{student.lastName === 'N/A' ? '' : student.lastName}</td>
                      <td>{student.rollNo}</td>
                      <td>{student.stream}</td>
                      <td className="action-cell">
                        <button 
                          className="view-profile-btn"
                          onClick={() => handleViewProfile(student)}
                          title="View Profile"
                        >
                          <FiEye />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-data">
                      No students found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Student Profile Modal */}
      {showProfileModal && selectedStudent && (
        <div className="modal-overlay">
          <div className="profile-modal">
            <div className="modal-header">
              <h3>Student Profile</h3>
              <button className="close-modal" onClick={closeProfileModal}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <div className="profile-section">
                <h4>Session 2024-25</h4>
                <div className="profile-grid">
                  <div className="profile-row">
                    <span className="profile-label">Admission No:</span>
                    <span className="profile-value">{selectedStudent.admissionNo || 'N/A'}</span>
                  </div>
                  <div className="profile-row">
                    <span className="profile-label">Student Name:</span>
                    <span className="profile-value">{selectedStudent.firstName} {selectedStudent.lastName !== 'N/A' ? selectedStudent.lastName : ''}</span>
                  </div>
                  <div className="profile-row">
                    <span className="profile-label">Class:</span>
                    <span className="profile-value">Nur</span>
                  </div>
                  <div className="profile-row">
                    <span className="profile-label">Section:</span>
                    <span className="profile-value">B</span>
                  </div>
                  <div className="profile-row">
                    <span className="profile-label">Roll No:</span>
                    <span className="profile-value">{selectedStudent.rollNo || 'N/A'}</span>
                  </div>
                  <div className="profile-row">
                    <span className="profile-label">Date of Birth:</span>
                    <span className="profile-value">05/08/2025</span>
                  </div>
                  <div className="profile-row">
                    <span className="profile-label">Admission Date:</span>
                    <span className="profile-value">22/08/2025</span>
                  </div>
                  <div className="profile-row">
                    <span className="profile-label">Email:</span>
                    <span className="profile-value">empty</span>
                  </div>
                  <div className="profile-row">
                    <span className="profile-label">Aadhar No:</span>
                    <span className="profile-value">333333333333</span>
                  </div>
                  <div className="profile-row">
                    <span className="profile-label">Father's Name:</span>
                    <span className="profile-value">Raghu</span>
                  </div>
                  <div className="profile-row">
                    <span className="profile-label">Father's Mobile:</span>
                    <span className="profile-value">2222222222</span>
                  </div>
                  <div className="profile-row">
                    <span className="profile-label">Father's Income:</span>
                    <span className="profile-value">N/A</span>
                  </div>
                  <div className="profile-row">
                    <span className="profile-label">Mother's Name:</span>
                    <span className="profile-value">Raghini</span>
                  </div>
                  <div className="profile-row">
                    <span className="profile-label">Mother's Mobile:</span>
                    <span className="profile-value">N/A</span>
                  </div>
                  <div className="profile-row">
                    <span className="profile-label">Mother's Income:</span>
                    <span className="profile-value">N/A</span>
                  </div>
                  <div className="profile-row">
                    <span className="profile-label">Address:</span>
                    <span className="profile-value">empty</span>
                  </div>
                </div>
              </div>
              
              <div className="attendance-record">
                <h4>Attendance Record</h4>
                <div className="no-data">No attendance data available</div>
                <div className="attendance-summary">
                  <div className="attendance-item present">
                    <span className="count">0</span>
                    <span className="label">Present</span>
                  </div>
                  <div className="attendance-item absent">
                    <span className="count">0</span>
                    <span className="label">Absent</span>
                  </div>
                  <div className="attendance-item holiday">
                    <span className="count">0</span>
                    <span className="label">Holiday</span>
                  </div>
                  <div className="attendance-item no-data">
                    <span className="count">0</span>
                    <span className="label">No Data</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
