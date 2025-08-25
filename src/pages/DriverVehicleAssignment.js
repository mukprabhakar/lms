import React, { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiUser, FiUserX, FiTruck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './DriverVehicleAssignment.css';

const DriverVehicleAssignment = () => {
  // Sample data for driver vehicle assignments
  const [assignments, setAssignments] = useState([
    { 
      id: 1, 
      registrationNo: '3333333334',
      makeModel: 'DEFAULT_MAKE',
      chassisNo: 'CHASSIS001',
      fuelType: 'Petrol',
      manufacturingDate: '2025-07-08',
      driver: '',
      driverId: ''
    },
    { 
      id: 2, 
      registrationNo: '6666666667',
      makeModel: 'Tesla',
      chassisNo: 'CHASSIS002',
      fuelType: 'Hybrid',
      manufacturingDate: '2025-07-08',
      driver: '',
      driverId: ''
    },
    { 
      id: 3, 
      registrationNo: '33344455566',
      makeModel: 'GMC',
      chassisNo: 'CHASSIS003',
      fuelType: 'Diesel',
      manufacturingDate: '2025-07-09',
      driver: '',
      driverId: ''
    },
    { 
      id: 4, 
      registrationNo: '7654321987',
      makeModel: 'DEFAULT_MAKE',
      chassisNo: 'CHASSIS004',
      fuelType: 'Petrol',
      manufacturingDate: '2025-08-04',
      driver: '',
      driverId: ''
    },
    { 
      id: 5, 
      registrationNo: '9674803567',
      makeModel: 'Maruti Suzuki',
      chassisNo: 'CHASSIS005',
      fuelType: 'CNG',
      manufacturingDate: '2025-08-04',
      driver: '',
      driverId: ''
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showUnassignModal, setShowUnassignModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [availableDrivers, setAvailableDrivers] = useState([
    { id: 'DRV001', name: 'John Doe' },
    { id: 'DRV002', name: 'Rajesh Kumar' },
    { id: 'DRV003', name: 'Amit Sharma' },
    { id: 'DRV004', name: 'Vikram Singh' },
    { id: 'DRV005', name: 'Suresh Patel' },
    { id: 'DRV006', name: 'Rahul Verma' },
    { id: 'DRV007', name: 'Sanjay Gupta' },
  ]);
  const [selectedDriver, setSelectedDriver] = useState('');

  // Filter assignments based on search term
  const filteredAssignments = assignments.filter(assignment => 
    Object.values(assignment).some(
      value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Get current assignments for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssignments = filteredAssignments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle assign driver
  const handleAssignClick = (assignment) => {
    setSelectedAssignment(assignment);
    setSelectedDriver(assignment.driverId || '');
    setShowAssignModal(true);
  };

  // Handle unassign driver
  const handleUnassignClick = (assignment) => {
    setSelectedAssignment(assignment);
    setShowUnassignModal(true);
  };

  // Confirm assign driver
  const confirmAssign = () => {
    if (selectedAssignment && selectedDriver) {
      const updatedAssignments = assignments.map(assignment => {
        if (assignment.id === selectedAssignment.id) {
          const driver = availableDrivers.find(d => d.id === selectedDriver);
          return {
            ...assignment,
            driver: driver ? driver.name : '',
            driverId: selectedDriver
          };
        }
        return assignment;
      });
      setAssignments(updatedAssignments);
      setShowAssignModal(false);
      setSelectedAssignment(null);
      setSelectedDriver('');
    }
  };

  // Confirm unassign driver
  const confirmUnassign = () => {
    if (selectedAssignment) {
      const updatedAssignments = assignments.map(assignment => {
        if (assignment.id === selectedAssignment.id) {
          return {
            ...assignment,
            driver: '',
            driverId: ''
          };
        }
        return assignment;
      });
      setAssignments(updatedAssignments);
      setShowUnassignModal(false);
      setSelectedAssignment(null);
    }
  };

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="driver-vehicle-assignment">
      <div className="page-header">
        <h2>Driver Vehicle Assignment</h2>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="items-per-page">
            <span>Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="form-control"
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
                <th>Actions</th>
                <th>Registration No</th>
                <th>Make & Model</th>
                <th>Chassis No</th>
                <th>Fuel Type</th>
                <th>Manufacturing Date</th>
                <th>Assigned Driver</th>
              </tr>
            </thead>
            <tbody>
              {currentAssignments.length > 0 ? (
                currentAssignments.map((assignment, index) => (
                  <tr key={assignment.id}>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon btn-assign"
                          onClick={() => handleAssignClick(assignment)}
                          title="Assign/Change Driver"
                        >
                          <FiUser />
                        </button>
                        {assignment.driver && (
                          <button
                            className="btn-icon btn-unassign"
                            onClick={() => handleUnassignClick(assignment)}
                            title="Unassign Driver"
                          >
                            <FiUserX />
                          </button>
                        )}
                      </div>
                    </td>
                    <td>{assignment.registrationNo}</td>
                    <td>{assignment.makeModel}</td>
                    <td>{assignment.chassisNo}</td>
                    <td>
                      <span className={`status-badge ${assignment.fuelType.toLowerCase()}`}>
                        {assignment.fuelType}
                      </span>
                    </td>
                    <td>{new Date(assignment.manufacturingDate).toLocaleDateString()}</td>
                    <td>
                      {assignment.driver ? (
                        <span className="driver-info">
                          <FiUser className="driver-icon" />
                          {assignment.driver}
                        </span>
                      ) : (
                        <span className="not-assigned">Not Assigned</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    No assignments found. {searchTerm && 'Try a different search term.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <div className="pagination-info">
            Showing {filteredAssignments.length > 0 ? indexOfFirstItem + 1 : 0} to{' '}
            {Math.min(indexOfLastItem, filteredAssignments.length)} of {filteredAssignments.length} entries
            {searchTerm && ` (filtered from ${assignments.length} total entries)`}
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
              onClick={() => paginate(currentPage - 1)}
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
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              title="Next Page"
            >
              <FiChevronRight />
            </button>
            <button
              className="page-button"
              onClick={() => paginate(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
              title="Last Page"
            >
              <FiChevronsRight />
            </button>
          </div>
        </div>
      </div>

      {/* Assign Driver Modal */}
      {showAssignModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Assign Driver</h3>
              <button className="close-btn" onClick={() => setShowAssignModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Vehicle</label>
                <input
                  type="text"
                  className="form-control"
                  value={`${selectedAssignment?.registrationNo} - ${selectedAssignment?.makeModel}`}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Select Driver</label>
                <select
                  className="form-control"
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                >
                  <option value="">-- Select Driver --</option>
                  {availableDrivers.map(driver => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} ({driver.id})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAssignModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={confirmAssign}
                disabled={!selectedDriver}
              >
                Assign Driver
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unassign Driver Confirmation Modal */}
      {showUnassignModal && selectedAssignment && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Unassign Driver</h3>
              <button className="close-btn" onClick={() => setShowUnassignModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to unassign <strong>{selectedAssignment.driver}</strong> from vehicle <strong>{selectedAssignment.registrationNo}</strong>?
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowUnassignModal(false)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmUnassign}>
                Unassign Driver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverVehicleAssignment;
