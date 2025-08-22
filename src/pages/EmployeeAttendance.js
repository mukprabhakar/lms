import React, { useState } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { format } from 'date-fns';
import '../components/Table.css';

const EmployeeAttendance = () => {
  // Sample employee attendance data
  const [attendance, setAttendance] = useState([
    { 
      id: 1, 
      employeeCode: 'EMP25S0054', 
      employeeName: 'Khusi Verma', 
      department: 'Driver', 
      designation: 'Driver',
      attendance: 'Present',
      date: format(new Date(), 'yyyy-MM-dd'),
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      workingHours: '9h 0m'
    },
    { 
      id: 2, 
      employeeCode: 'EMP25S0053', 
      employeeName: 'Rani Kumari', 
      department: 'Teacher', 
      designation: 'Class teacher',
      attendance: 'Present',
      date: format(new Date(), 'yyyy-MM-dd'),
      checkIn: '08:30 AM',
      checkOut: '03:30 PM',
      workingHours: '7h 0m'
    },
    { 
      id: 3, 
      employeeCode: 'EMP25S0047', 
      employeeName: 'ROSHNI', 
      department: 'Teacher', 
      designation: 'Class teacher',
      attendance: 'Present',
      date: format(new Date(), 'yyyy-MM-dd'),
      checkIn: '08:45 AM',
      checkOut: '03:45 PM',
      workingHours: '7h 0m'
    },
    { 
      id: 4, 
      employeeCode: 'EMP25S0040', 
      employeeName: 'shayan', 
      department: 'Teacher', 
      designation: 'Class teacher',
      attendance: 'Absent',
      date: format(new Date(), 'yyyy-MM-dd'),
      checkIn: '--',
      checkOut: '--',
      workingHours: '0h 0m'
    },
    { 
      id: 5, 
      employeeCode: 'EMP25S0038', 
      employeeName: 'Ramu Kumar', 
      department: 'Driver', 
      designation: 'Driver',
      attendance: 'Present',
      date: format(new Date(), 'yyyy-MM-dd'),
      checkIn: '08:00 AM',
      checkOut: '05:00 PM',
      workingHours: '9h 0m'
    },
    { 
      id: 6, 
      employeeCode: 'EMP25S0037', 
      employeeName: 'Sarah ali', 
      department: 'Teacher', 
      designation: 'Class teacher',
      attendance: 'Present',
      date: format(new Date(), 'yyyy-MM-dd'),
      checkIn: '08:30 AM',
      checkOut: '03:30 PM',
      workingHours: '7h 0m'
    },
    { 
      id: 7, 
      employeeCode: 'EMP25S0032', 
      employeeName: 'Jasmine', 
      department: 'Teacher', 
      designation: 'Class teacher',
      attendance: 'Present',
      date: format(new Date(), 'yyyy-MM-dd'),
      checkIn: '08:45 AM',
      checkOut: '03:45 PM',
      workingHours: '7h 0m'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  // Filter attendance based on search term
  const filteredAttendance = attendance.filter(record => {
    const searchLower = searchTerm.toLowerCase();
    return (
      record.employeeCode.toLowerCase().includes(searchLower) ||
      record.employeeName.toLowerCase().includes(searchLower) ||
      record.department.toLowerCase().includes(searchLower) ||
      record.designation.toLowerCase().includes(searchLower) ||
      record.attendance.toLowerCase().includes(searchLower)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredAttendance.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAttendance.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    // Here you would typically fetch attendance for the selected date
  };

  // Handle attendance status change
  const handleAttendanceChange = (id, status) => {
    setAttendance(attendance.map(record => 
      record.id === id ? { ...record, attendance: status } : record
    ));
  };

  // Handle check-in/check-out
  const handleCheckInOut = (id, type) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });

    setAttendance(attendance.map(record => {
      if (record.id === id) {
        const updatedRecord = { ...record };
        if (type === 'checkIn') {
          updatedRecord.checkIn = timeString;
          updatedRecord.attendance = 'Present';
        } else if (type === 'checkOut') {
          updatedRecord.checkOut = timeString;
          // Calculate working hours
          if (record.checkIn !== '--') {
            const checkInTime = new Date(`${selectedDate} ${record.checkIn}`);
            const checkOutTime = new Date(`${selectedDate} ${timeString}`);
            const diffMs = checkOutTime - checkInTime;
            const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
            const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            updatedRecord.workingHours = `${diffHrs}h ${diffMins}m`;
          }
        }
        return updatedRecord;
      }
      return record;
    }));
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header-top">
          <h1>Employee Attendance</h1>
          <div className="header-actions">
            <div className="entity-count">
              <span>{attendance.length}</span>
            </div>
            <div className="date-picker">
              <input 
                type="date" 
                value={selectedDate}
                onChange={handleDateChange}
                className="form-control"
                max={format(new Date(), 'yyyy-MM-dd')}
              />
            </div>
          </div>
        </div>
        <div className="search-container">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      <div className="table-actions">
        <div className="items-per-page">
          <label>Show</label>
          <select 
            value={itemsPerPage} 
            onChange={handleItemsPerPageChange}
            className="page-select"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span>entries</span>
        </div>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Employee Code</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Attendance</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Working Hours</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((record, index) => (
                <tr key={record.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{record.employeeCode}</td>
                  <td>{record.employeeName}</td>
                  <td>{record.department}</td>
                  <td>{record.designation}</td>
                  <td>
                    <select
                      value={record.attendance}
                      onChange={(e) => handleAttendanceChange(record.id, e.target.value)}
                      className={`attendance-select ${record.attendance.toLowerCase()}`}
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Half Day">Half Day</option>
                      <option value="Leave">Leave</option>
                    </select>
                  </td>
                  <td>
                    {record.attendance === 'Present' || record.attendance === 'Half Day' ? (
                      <div className="time-input">
                        {record.checkIn === '--' ? (
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleCheckInOut(record.id, 'checkIn')}
                          >
                            Check In
                          </button>
                        ) : (
                          record.checkIn
                        )}
                      </div>
                    ) : '--'}
                  </td>
                  <td>
                    {(record.attendance === 'Present' || record.attendance === 'Half Day') && record.checkIn !== '--' ? (
                      <div className="time-input">
                        {record.checkOut === '--' ? (
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleCheckInOut(record.id, 'checkOut')}
                            disabled={record.checkIn === '--'}
                          >
                            Check Out
                          </button>
                        ) : (
                          record.checkOut
                        )}
                      </div>
                    ) : '--'}
                  </td>
                  <td>{record.workingHours}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn btn-sm btn-icon"
                        title="View Details"
                        onClick={() => {}}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        className="btn btn-sm btn-icon"
                        title="Edit"
                        onClick={() => {}}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-info">
          Showing {filteredAttendance.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredAttendance.length)} of {filteredAttendance.length} entries
        </div>
        
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              title="First Page"
            >
              <FiChevronsLeft />
            </button>
            <button 
              className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
              title="Previous Page"
            >
              <FiChevronLeft />
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => paginate(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
              title="Next Page"
            >
              <FiChevronRight />
            </button>
            <button 
              className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              title="Last Page"
            >
              <FiChevronsRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeAttendance;
