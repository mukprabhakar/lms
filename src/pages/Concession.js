import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import './Concession.css';

const Concession = () => {
  // Initial sample data
  const initialConcessions = [
    { id: 1, name: 'Scholarship', remark: 'N/A' },
    { id: 2, name: 'Maniority', remark: 'N/A' },
    { id: 3, name: 'Schlarship', remark: 'N/A' },
    { id: 4, name: 'Minority', remark: 'Concession on minority for student' },
    { id: 5, name: 'Monority', remark: 'Minority for student' },
  ];

  const [concessions, setConcessions] = useState(initialConcessions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    remark: ''
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
    
    if (!formData.name.trim()) {
      alert('Please enter a concession name');
      return;
    }

    if (editingId) {
      // Update existing concession
      setConcessions(concessions.map(concession => 
        concession.id === editingId ? { ...formData, id: editingId } : concession
      ));
    } else {
      // Add new concession
      const newConcession = {
        ...formData,
        id: concessions.length > 0 ? Math.max(...concessions.map(c => c.id)) + 1 : 1
      };
      setConcessions([...concessions, newConcession]);
    }
    
    // Reset form
    setFormData({ name: '', remark: '' });
    setEditingId(null);
    setIsModalOpen(false);
  };

  // Handle edit
  const handleEdit = (concession) => {
    setFormData({
      name: concession.name,
      remark: concession.remark || ''
    });
    setEditingId(concession.id);
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this concession?')) {
      const updatedConcessions = concessions.filter(concession => concession.id !== id);
      setConcessions(updatedConcessions);
      
      // Reset to first page if current page becomes empty
      const maxPage = Math.ceil(updatedConcessions.length / itemsPerPage);
      if (currentPage > maxPage && maxPage > 0) {
        setCurrentPage(maxPage);
      } else if (maxPage === 0) {
        setCurrentPage(1);
      }
    }
  };

  // Handle search
  const filteredConcessions = concessions.filter(concession => 
    Object.values(concession).some(
      value => value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredConcessions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredConcessions.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="concession">
      <div className="page-header">
        <h1>Concession Management</h1>
        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search concessions..."
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
              setIsModalOpen(true);
              setFormData({ name: '', remark: '' });
              setEditingId(null);
            }}
          >
            <FiPlus /> Add Concession
          </button>
        </div>
      </div>

      {/* Concessions Table */}
      <div className="concession-table">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Concession Name</th>
                <th>Remark</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((concession, index) => (
                  <tr key={concession.id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{concession.name}</td>
                    <td>{concession.remark || 'N/A'}</td>
                    <td className="actions">
                      <button 
                        className="btn-icon edit"
                        onClick={() => handleEdit(concession)}
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        className="btn-icon delete"
                        onClick={() => handleDelete(concession.id)}
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
                    {searchTerm ? 'No matching concessions found.' : 'No concessions available. Click "Add Concession" to create one.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredConcessions.length > 0 && (
          <div className="pagination-container">
            <div className="items-per-page">
              <label>Items per page:</label>
              <select 
                value={itemsPerPage} 
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="form-control items-selector"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="total-items">Total: {filteredConcessions.length} items</span>
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

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Edit Concession' : 'Add New Concession'}</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setIsModalOpen(false);
                  setFormData({ name: '', remark: '' });
                  setEditingId(null);
                }}
              >
                <FiX />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Concession Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter concession name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Remark</label>
                  <textarea
                    name="remark"
                    value={formData.remark}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter any remarks (optional)"
                    rows="3"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormData({ name: '', remark: '' });
                    setEditingId(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Concession;
