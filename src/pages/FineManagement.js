import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import './FineManagement.css';

const FineManagement = () => {
  // Sample data
  const sampleFines = [
    { id: 1, feeType: 'Monthly', fineFor: 'July', startDate: '10/07/2025', endDate: '31/07/2025', finePerDay: '10' },
    { id: 2, feeType: 'Monthly', fineFor: 'August', startDate: '01/08/2025', endDate: '10/08/2025', finePerDay: '15' },
    { id: 3, feeType: 'Monthly', fineFor: 'September', startDate: '11/09/2025', endDate: '30/09/2025', finePerDay: '20' },
    { id: 4, feeType: 'Monthly', fineFor: 'October', startDate: '11/10/2025', endDate: '31/10/2025', finePerDay: '25' },
    { id: 5, feeType: 'Monthly', fineFor: 'November', startDate: '11/11/2025', endDate: '30/11/2025', finePerDay: '30' },
    { id: 6, feeType: 'Quarterly', fineFor: 'Q3 2025', startDate: '01/07/2025', endDate: '30/09/2025', finePerDay: '50' },
    { id: 7, feeType: 'Quarterly', fineFor: 'Q4 2025', startDate: '01/10/2025', endDate: '31/12/2025', finePerDay: '60' },
    { id: 8, feeType: 'Yearly', fineFor: '2025', startDate: '01/01/2025', endDate: '31/12/2025', finePerDay: '200' },
    { id: 9, feeType: 'Monthly', fineFor: 'December', startDate: '01/12/2025', endDate: '31/12/2025', finePerDay: '35' },
    { id: 10, feeType: 'Monthly', fineFor: 'January', startDate: '01/01/2026', endDate: '31/01/2026', finePerDay: '40' },
    { id: 11, feeType: 'Monthly', fineFor: 'February', startDate: '01/02/2026', endDate: '28/02/2026', finePerDay: '45' },
    { id: 12, feeType: 'Monthly', fineFor: 'March', startDate: '01/03/2026', endDate: '31/03/2026', finePerDay: '50' },
    { id: 13, feeType: 'Quarterly', fineFor: 'Q1 2026', startDate: '01/01/2026', endDate: '31/03/2026', finePerDay: '70' },
    { id: 14, feeType: 'Monthly', fineFor: 'April', startDate: '01/04/2026', endDate: '30/04/2026', finePerDay: '55' },
    { id: 15, feeType: 'Monthly', fineFor: 'May', startDate: '01/05/2026', endDate: '31/05/2026', finePerDay: '60' },
  ];

  const [fines, setFines] = useState(sampleFines);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // State for add/edit form
  const [formData, setFormData] = useState({
    feeType: 'Monthly',
    fineFor: '',
    startDate: '',
    endDate: '',
    finePerDay: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing fine
      setFines(fines.map(fine => 
        fine.id === currentId ? { ...formData, id: currentId } : fine
      ));
    } else {
      // Add new fine
      const newFine = {
        ...formData,
        id: fines.length > 0 ? Math.max(...fines.map(f => f.id)) + 1 : 1
      };
      setFines([...fines, newFine]);
    }
    
    // Reset form
    setFormData({
      feeType: 'Monthly',
      fineFor: '',
      startDate: '',
      endDate: '',
      finePerDay: ''
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  // Handle edit
  const handleEdit = (fine) => {
    setFormData({
      feeType: fine.feeType,
      fineFor: fine.fineFor,
      startDate: fine.startDate,
      endDate: fine.endDate,
      finePerDay: fine.finePerDay
    });
    setIsEditing(true);
    setCurrentId(fine.id);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this fine?')) {
      const updatedFines = fines.filter(fine => fine.id !== id);
      setFines(updatedFines);
      
      // Reset to first page if current page becomes empty
      const maxPage = Math.ceil(updatedFines.length / itemsPerPage);
      if (currentPage > maxPage && maxPage > 0) {
        setCurrentPage(maxPage);
      } else if (maxPage === 0) {
        setCurrentPage(1);
      }
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Filter fines based on search term
  const filteredFines = fines.filter(fine => 
    Object.values(fine).some(
      value => value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Get current fines for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFines = filteredFines.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFines.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="fine-management">
      <div className="page-header">
        <h1>Fine Management</h1>
        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search fines..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              className="search-input"
            />
          </div>
          <button 
            className="btn btn-primary" 
            onClick={() => {
              setIsEditing(false);
              setFormData({
                feeType: 'Monthly',
                fineFor: '',
                startDate: '',
                endDate: '',
                finePerDay: ''
              });
            }}
          >
            <FiPlus /> Add Fine
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      <div className={`form-container ${isEditing ? 'editing' : ''}`}>
        <h2>{isEditing ? 'Edit Fine' : 'Add New Fine'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Fee Type</label>
              <select 
                name="feeType" 
                value={formData.feeType} 
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Fine For</label>
              <input
                type="text"
                name="fineFor"
                value={formData.fineFor}
                onChange={handleInputChange}
                className="form-control"
                placeholder="e.g., July, August, etc."
                required
              />
            </div>
            
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="form-control"
                min={formData.startDate}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Fine Per Day (₹)</label>
              <input
                type="number"
                name="finePerDay"
                value={formData.finePerDay}
                onChange={handleInputChange}
                className="form-control"
                min="0"
                step="0.01"
                placeholder="Enter amount"
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {isEditing ? 'Update' : 'Add'} Fine
              </button>
              {isEditing && (
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      feeType: 'Monthly',
                      fineFor: '',
                      startDate: '',
                      endDate: '',
                      finePerDay: ''
                    });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Fines Table */}
      <div className="fines-table">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Fee Type</th>
                <th>Fine For</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Fine Per Day (₹)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentFines.length > 0 ? (
                currentFines.map((fine) => (
                  <tr key={fine.id}>
                    <td>{fine.feeType}</td>
                    <td>{fine.fineFor}</td>
                    <td>{fine.startDate}</td>
                    <td>{fine.endDate}</td>
                    <td>₹{fine.finePerDay}</td>
                    <td className="actions">
                      <button 
                        className="btn-icon edit"
                        onClick={() => handleEdit(fine)}
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        className="btn-icon delete"
                        onClick={() => handleDelete(fine.id)}
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
                    {searchTerm ? 'No matching fines found.' : 'No fines found. Click "Add Fine" to create one.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredFines.length > 0 && (
          <div className="pagination-container">
            <div className="items-per-page">
              <label>Items per page:</label>
              <select 
                value={itemsPerPage} 
                onChange={handleItemsPerPageChange}
                className="form-control items-selector"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="total-items">Total: {filteredFines.length} items</span>
            </div>
            
            <div className="pagination">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="pagination-arrow"
                title="Previous Page"
              >
                &laquo;
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around current page
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
                    onClick={() => paginate(pageNum)}
                    className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="pagination-arrow"
                title="Next Page"
              >
                &raquo;
              </button>
            </div>
            
            <div className="page-info">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FineManagement;
