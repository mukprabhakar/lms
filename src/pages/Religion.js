import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import '../components/Table.css';

const Religion = () => {
  // Sample data - in a real app, this would come from an API
  const [religions, setReligions] = useState([
    { id: 1, name: 'Hindu' },
    { id: 2, name: 'MUSLIM' },
    { id: 3, name: 'CHRISTIAN' },
    { id: 4, name: 'Sikh' },
  ]);

  const [formData, setFormData] = useState({
    name: ''
  });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter religions based on search term
  const filteredReligions = religions.filter(religion => 
    religion.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredReligions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReligions.slice(indexOfFirstItem, indexOfLastItem);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditMode) {
      setReligions(religions.map(religion => 
        religion.id === currentId ? { ...formData, id: currentId } : religion
      ));
    } else {
      const newReligion = {
        ...formData,
        id: religions.length > 0 ? Math.max(...religions.map(r => r.id)) + 1 : 1
      };
      setReligions([...religions, newReligion]);
    }
    resetForm();
  };

  const handleEdit = (religion) => {
    setFormData({
      name: religion.name
    });
    setIsEditMode(true);
    setCurrentId(religion.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this religion?')) {
      setReligions(religions.filter(religion => religion.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: ''
    });
    setIsFormOpen(false);
    setIsEditMode(false);
    setCurrentId(null);
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Sort religions alphabetically
  const sortedReligions = [...currentItems].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Religion</h2>
        <button 
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
        >
          <FiPlus /> Add Religion
        </button>
      </div>

      <div className="table-controls">
        <div className="search-input">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search religions..."
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
            onChange={handleItemsPerPageChange}
            className="page-select"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {isFormOpen && (
        <div className="form-container">
          <div className="form-header">
            <h3>{isEditMode ? 'Edit' : 'Add New'} Religion</h3>
            <button className="close-btn" onClick={resetForm}>
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Religion Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                autoComplete="off"
                placeholder="e.g., Hindu, Muslim, Christian, etc."
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {isEditMode ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Religion Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedReligions.length > 0 ? (
              sortedReligions.map((religion, index) => (
                <tr key={religion.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{religion.name}</td>
                  <td className="action-buttons">
                    <button 
                      className="btn-icon edit" 
                      onClick={() => handleEdit(religion)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="btn-icon delete" 
                      onClick={() => handleDelete(religion.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-data">
                  No religions found. Add a new religion to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={() => paginate(1)} 
              disabled={currentPage === 1}
              className="page-nav"
            >
              &laquo;
            </button>
            <button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
              className="page-nav"
            >
              &lsaquo;
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
                  className={`page-number ${currentPage === pageNum ? 'active' : ''}`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className="page-nav"
            >
              &rsaquo;
            </button>
            <button 
              onClick={() => paginate(totalPages)} 
              disabled={currentPage === totalPages}
              className="page-nav"
            >
              &raquo;
            </button>
            
            <div className="page-info">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredReligions.length)} of {filteredReligions.length} entries
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Religion;
