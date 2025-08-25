import React, { useState } from 'react';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';
import '../components/Table.css';
import './VehicleManagement.css';

const VehicleManagement = () => {
  // Sample vehicle data
  const initialVehicles = [
    { id: 1, vehicleNo: '12345670', make: 'Tata Motors', seatingCapacity: 28, insuranceDueDate: '2025-05-31', status: 'Active' },
    { id: 2, vehicleNo: '112233', make: 'Mahindra', seatingCapacity: 30, insuranceDueDate: '2025-06-02', status: 'Active' },
    { id: 3, vehicleNo: 'DH0741356', make: 'Mahindra', seatingCapacity: 30, insuranceDueDate: '2025-06-30', status: 'Active' },
    { id: 4, vehicleNo: 'JH014567', make: 'DEFAULT_MAKE', seatingCapacity: 7, insuranceDueDate: '2025-07-08', status: 'Active' },
    { id: 5, vehicleNo: 'JH019876', make: 'Wolf', seatingCapacity: 30, insuranceDueDate: '2025-07-08', status: 'Active' },
    { id: 6, vehicleNo: 'JH012345', make: 'DEFAULT_MAKE', seatingCapacity: 12, insuranceDueDate: '2025-07-08', status: 'Active' },
    { id: 7, vehicleNo: 'JH016566', make: 'Tesla', seatingCapacity: 7, insuranceDueDate: '2025-07-08', status: 'Active' },
    { id: 8, vehicleNo: 'JH012349', make: 'GMC', seatingCapacity: 35, insuranceDueDate: '2025-07-09', status: 'Active' },
    { id: 9, vehicleNo: 'JH009876', make: 'DEFAULT_MAKE', seatingCapacity: 30, insuranceDueDate: '2025-08-04', status: 'Active' },
    { id: 10, vehicleNo: 'JH01CN4444', make: 'Maruti Suzuki', seatingCapacity: 15, insuranceDueDate: '2025-08-04', status: 'Active' },
  ];

  const [vehicles, setVehicles] = useState(initialVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    vehicleNo: '',
    make: '',
    seatingCapacity: '',
    insuranceDueDate: '',
    status: 'Active'
  });

  // Filter vehicles based on search term
  const filteredVehicles = vehicles.filter(vehicle => {
    const searchLower = searchTerm.toLowerCase();
    return (
      vehicle.vehicleNo.toLowerCase().includes(searchLower) ||
      vehicle.make.toLowerCase().includes(searchLower) ||
      vehicle.status.toLowerCase().includes(searchLower)
    );
  });

  // Get current vehicles for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVehicles = filteredVehicles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle input change for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission for adding a new vehicle
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newVehicle = {
      id: vehicles.length > 0 ? Math.max(...vehicles.map(v => v.id)) + 1 : 1,
      ...formData,
      seatingCapacity: parseInt(formData.seatingCapacity, 10)
    };
    setVehicles([...vehicles, newVehicle]);
    setIsAddModalOpen(false);
    resetForm();
  };

  // Handle form submission for editing a vehicle
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedVehicles = vehicles.map(vehicle => 
      vehicle.id === currentVehicle.id 
        ? { ...formData, id: currentVehicle.id, seatingCapacity: parseInt(formData.seatingCapacity, 10) } 
        : vehicle
    );
    setVehicles(updatedVehicles);
    setIsEditModalOpen(false);
    resetForm();
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      vehicleNo: '',
      make: '',
      seatingCapacity: '',
      insuranceDueDate: '',
      status: 'Active'
    });
  };

  // Open edit modal with vehicle data
  const handleEdit = (vehicle) => {
    setCurrentVehicle(vehicle);
    setFormData({
      vehicleNo: vehicle.vehicleNo,
      make: vehicle.make,
      seatingCapacity: vehicle.seatingCapacity,
      insuranceDueDate: vehicle.insuranceDueDate,
      status: vehicle.status
    });
    setIsEditModalOpen(true);
  };

  // Handle delete vehicle
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
    }
  };

  // Format date to display in table
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Render pagination buttons
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination">
        <div className="pagination-info">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredVehicles.length)} of {filteredVehicles.length} entries
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
    );
  };

  // Render add/edit modal
  const renderModal = (isEdit = false) => (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{isEdit ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
          <button className="close-btn" onClick={() => isEdit ? setIsEditModalOpen(false) : setIsAddModalOpen(false)}>×</button>
        </div>
        <form onSubmit={isEdit ? handleEditSubmit : handleAddSubmit}>
          <div className="form-group">
            <label>Vehicle Number*</label>
            <input
              type="text"
              name="vehicleNo"
              value={formData.vehicleNo}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter vehicle number"
              required
            />
          </div>
          <div className="form-group">
            <label>Make*</label>
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter vehicle make"
              required
            />
          </div>
          <div className="form-group">
            <label>Seating Capacity*</label>
            <input
              type="number"
              name="seatingCapacity"
              value={formData.seatingCapacity}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter seating capacity"
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label>Insurance Due Date*</label>
            <input
              type="date"
              name="insuranceDueDate"
              value={formData.insuranceDueDate}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Status*</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="form-control"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => isEdit ? setIsEditModalOpen(false) : setIsAddModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? 'Update' : 'Add'} Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h2><FaCar /> Vehicle Management</h2>
        <button className="btn btn-primary" onClick={() => {
          resetForm();
          setIsAddModalOpen(true);
        }}>
          <FiPlus /> Add Vehicle
        </button>
      </div>

      <div className="table-controls">
        <div className="search-input">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="items-per-page">
          <label>Items per page:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
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
              <th>Vehicle No</th>
              <th>Make</th>
              <th>Seating Capacity</th>
              <th>Insurance Due On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentVehicles.length > 0 ? (
              currentVehicles.map(vehicle => (
                <tr key={vehicle.id}>
                  <td>{vehicle.vehicleNo}</td>
                  <td>{vehicle.make}</td>
                  <td>{vehicle.seatingCapacity}</td>
                  <td>{formatDate(vehicle.insuranceDueDate)}</td>
                  <td>
                    <span className={`status-badge ${vehicle.status.toLowerCase()}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button 
                      className="btn-icon btn-edit"
                      onClick={() => handleEdit(vehicle)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="btn-icon btn-delete"
                      onClick={() => handleDelete(vehicle.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No vehicles found. Click 'Add Vehicle' to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {renderPagination()}
      {isAddModalOpen && renderModal(false)}
      {isEditModalOpen && renderModal(true)}
    </div>
  );
};

export default VehicleManagement;
