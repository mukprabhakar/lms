import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import './FineClassCharge.css';

const FineClassCharge = () => {
  // Sample data
  const sampleCharges = [
    { id: 1, chargeName: 'Exam Fees', chargeType: 'Monthly' },
    { id: 2, chargeName: 'ID Card', chargeType: 'Monthly' },
    { id: 3, chargeName: 'Lab Fees', chargeType: 'Monthly' },
    { id: 4, chargeName: 'Monthly Fees', chargeType: 'Monthly' },
    { id: 5, chargeName: 'Transport', chargeType: 'Monthly' },
  ];

  const [charges, setCharges] = useState(sampleCharges);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    chargeName: '',
    chargeType: 'Monthly'
  });

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
    
    if (editingId) {
      // Update existing charge
      setCharges(charges.map(charge => 
        charge.id === editingId ? { ...formData, id: editingId } : charge
      ));
    } else {
      // Add new charge
      const newCharge = {
        ...formData,
        id: charges.length > 0 ? Math.max(...charges.map(c => c.id)) + 1 : 1
      };
      setCharges([...charges, newCharge]);
    }
    
    // Reset form
    setFormData({
      chargeName: '',
      chargeType: 'Monthly'
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  // Handle edit
  const handleEdit = (charge) => {
    setFormData({
      chargeName: charge.chargeName,
      chargeType: charge.chargeType
    });
    setEditingId(charge.id);
    setIsFormOpen(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this charge?')) {
      const updatedCharges = charges.filter(charge => charge.id !== id);
      setCharges(updatedCharges);
      
      // Reset to first page if current page becomes empty
      const maxPage = Math.ceil(updatedCharges.length / itemsPerPage);
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
    setCurrentPage(1);
  };

  // Filter charges based on search term
  const filteredCharges = charges.filter(charge => 
    Object.values(charge).some(
      value => value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Get current charges for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCharges = filteredCharges.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCharges.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="fine-class-charge">
      <div className="page-header">
        <h1>Fine Class Charge</h1>
        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search charges..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
          </div>
          <button 
            className="btn btn-primary" 
            onClick={() => {
              setIsFormOpen(true);
              setFormData({
                chargeName: '',
                chargeType: 'Monthly'
              });
              setEditingId(null);
            }}
          >
            <FiPlus /> Add Charge
          </button>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingId ? 'Edit Charge' : 'Add New Charge'}</h2>
              <button 
                className="close-btn"
                onClick={() => setIsFormOpen(false)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Charge Name</label>
                <input
                  type="text"
                  name="chargeName"
                  value={formData.chargeName}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter charge name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Charge Type</label>
                <select
                  name="chargeType"
                  value={formData.chargeType}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="Monthly">Monthly</option>
                  <option value="One Time">One Time</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update' : 'Add'} Charge
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Charges Table */}
      <div className="charges-table">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Charge Name</th>
                <th>Charge Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCharges.length > 0 ? (
                currentCharges.map((charge, index) => (
                  <tr key={charge.id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{charge.chargeName}</td>
                    <td>{charge.chargeType}</td>
                    <td className="actions">
                      <button 
                        className="btn-icon edit"
                        onClick={() => handleEdit(charge)}
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        className="btn-icon delete"
                        onClick={() => handleDelete(charge.id)}
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">
                    {searchTerm ? 'No matching charges found.' : 'No charges found. Click "Add Charge" to create one.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredCharges.length > 0 && (
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
              <span className="total-items">Total: {filteredCharges.length} items</span>
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

export default FineClassCharge;
