import React, { useState } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiPlus, FiClock } from 'react-icons/fi';
import '../components/Table.css';
import './TimePeriodManagement.css';

const TimePeriodManagement = () => {
  // Sample data for time periods
  const initialPeriods = [
    { id: 1, startTime: '09:00 AM', endTime: '09:44 AM', session: 'Session 1' },
    { id: 2, startTime: '10:00 AM', endTime: '11:00 AM', session: 'Session 2' },
    { id: 3, startTime: '11:10 AM', endTime: '11:44 AM', session: 'Session 3' },
    { id: 4, startTime: '11:50 AM', endTime: '12:30 PM', session: 'Session 4' },
    { id: 5, startTime: '01:00 AM', endTime: '01:15 AM', session: 'Session 5' },
    { id: 6, startTime: '01:30 AM', endTime: '02:00 AM', session: 'Session 6' },
    { id: 7, startTime: '07:00 AM', endTime: '07:45 AM', session: 'Session 8' },
  ];

  const [periods, setPeriods] = useState(initialPeriods);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState({
    id: null,
    startTime: '',
    endTime: '',
    session: ''
  });

  // Filter periods based on search term
  const filteredPeriods = periods.filter(period => 
    Object.values(period).some(
      value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Get current periods for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPeriods = filteredPeriods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPeriods.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle page size change
  const handlePageSizeChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Handle input changes for add/edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPeriod(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Format time to 12-hour format with AM/PM
  const formatTime = (time) => {
    if (!time) return '';
    
    // If already in 12-hour format, return as is
    if (time.includes('AM') || time.includes('PM')) {
      return time;
    }
    
    // Convert 24-hour format to 12-hour format
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const twelveHour = hour % 12 || 12;
    
    return `${twelveHour}:${minutes} ${period}`;
  };

  // Open add new period modal
  const openAddModal = () => {
    setCurrentPeriod({
      id: null,
      startTime: '',
      endTime: '',
      session: ''
    });
    setIsAddModalOpen(true);
  };

  // Open edit period modal
  const openEditModal = (period) => {
    setCurrentPeriod({
      ...period,
      startTime: formatTime(period.startTime),
      endTime: formatTime(period.endTime)
    });
    setIsEditModalOpen(true);
  };

  // Save new period
  const savePeriod = (e) => {
    e.preventDefault();
    const newPeriod = {
      ...currentPeriod,
      id: periods.length > 0 ? Math.max(...periods.map(p => p.id)) + 1 : 1,
      startTime: formatTime(currentPeriod.startTime),
      endTime: formatTime(currentPeriod.endTime)
    };
    setPeriods([...periods, newPeriod]);
    setIsAddModalOpen(false);
  };

  // Update existing period
  const updatePeriod = (e) => {
    e.preventDefault();
    const updatedPeriods = periods.map(period => 
      period.id === currentPeriod.id 
        ? { 
            ...currentPeriod,
            startTime: formatTime(currentPeriod.startTime),
            endTime: formatTime(currentPeriod.endTime)
          } 
        : period
    );
    setPeriods(updatedPeriods);
    setIsEditModalOpen(false);
  };

  // Delete period
  const deletePeriod = (id) => {
    if (window.confirm('Are you sure you want to delete this time period?')) {
      setPeriods(periods.filter(period => period.id !== id));
    }
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  const maxPageNumbers = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);
  
  if (endPage - startPage + 1 < maxPageNumbers) {
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Time Period Management</h2>
        <button className="btn btn-primary" onClick={openAddModal}>
          <FiPlus /> Add Time Period
        </button>
      </div>

      <div className="table-controls">
        <div className="search-input">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search time periods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="items-per-page">
          <label>Rows per page:</label>
          <select 
            value={itemsPerPage} 
            onChange={handlePageSizeChange}
            className="page-select"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Period Session</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPeriods.length > 0 ? (
              currentPeriods.map(period => (
                <tr key={period.id}>
                  <td>{period.startTime}</td>
                  <td>{period.endTime}</td>
                  <td>{period.session}</td>
                  <td className="action-buttons">
                    <button 
                      className="btn-icon btn-edit"
                      onClick={() => openEditModal(period)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="btn-icon btn-delete"
                      onClick={() => deletePeriod(period.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No time periods found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredPeriods.length > 0 && (
        <div className="pagination">
          <div className="pagination-info">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredPeriods.length)} of {filteredPeriods.length} entries
          </div>
          
          <div className="pagination-controls">
            <button 
              className="page-button" 
              onClick={() => paginate(1)} 
              disabled={currentPage === 1}
              title="First Page"
            >
              <FiChevronsLeft />
            </button>
            <button 
              className="page-button" 
              onClick={() => paginate(Math.max(1, currentPage - 1))} 
              disabled={currentPage === 1}
              title="Previous Page"
            >
              <FiChevronLeft />
            </button>
            
            <div className="page-numbers">
              {pageNumbers.map(number => (
                <button
                  key={number}
                  className={`page-button ${currentPage === number ? 'active' : ''}`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              ))}
            </div>
            
            <button 
              className="page-button" 
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))} 
              disabled={currentPage === totalPages}
              title="Next Page"
            >
              <FiChevronRight />
            </button>
            <button 
              className="page-button" 
              onClick={() => paginate(totalPages)} 
              disabled={currentPage === totalPages}
              title="Last Page"
            >
              <FiChevronsRight />
            </button>
          </div>
        </div>
      )}

      {/* Add Time Period Modal */}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Time Period</h3>
              <button className="close-btn" onClick={() => setIsAddModalOpen(false)}>×</button>
            </div>
            <form onSubmit={savePeriod}>
              <div className="form-group">
                <label>Start Time</label>
                <div className="time-input-container">
                  <input
                    type="time"
                    name="startTime"
                    value={currentPeriod.startTime}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                  <FiClock className="time-icon" />
                </div>
              </div>
              <div className="form-group">
                <label>End Time</label>
                <div className="time-input-container">
                  <input
                    type="time"
                    name="endTime"
                    value={currentPeriod.endTime}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                  <FiClock className="time-icon" />
                </div>
              </div>
              <div className="form-group">
                <label>Session Name</label>
                <input
                  type="text"
                  name="session"
                  value={currentPeriod.session}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="e.g., Session 1"
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Time Period
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Time Period Modal */}
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Time Period</h3>
              <button className="close-btn" onClick={() => setIsEditModalOpen(false)}>×</button>
            </div>
            <form onSubmit={updatePeriod}>
              <div className="form-group">
                <label>Start Time</label>
                <div className="time-input-container">
                  <input
                    type="time"
                    name="startTime"
                    value={currentPeriod.startTime}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                  <FiClock className="time-icon" />
                </div>
              </div>
              <div className="form-group">
                <label>End Time</label>
                <div className="time-input-container">
                  <input
                    type="time"
                    name="endTime"
                    value={currentPeriod.endTime}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                  <FiClock className="time-icon" />
                </div>
              </div>
              <div className="form-group">
                <label>Session Name</label>
                <input
                  type="text"
                  name="session"
                  value={currentPeriod.session}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="e.g., Session 1"
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Time Period
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePeriodManagement;
