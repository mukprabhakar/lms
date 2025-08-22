import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import '../components/Table.css';

const State = () => {
  // Sample data - in a real app, this would come from an API
  const [states, setStates] = useState([
    // India
    { id: 1, name: 'Andhra Pradesh', country: 'India' },
    { id: 2, name: 'Arunachal Pradesh', country: 'India' },
    { id: 3, name: 'Assam', country: 'India' },
    { id: 4, name: 'Bihar', country: 'India' },
    { id: 5, name: 'Chhattisgarh', country: 'India' },
    { id: 6, name: 'Goa', country: 'India' },
    { id: 7, name: 'Gujarat', country: 'India' },
    { id: 8, name: 'Haryana', country: 'India' },
    { id: 9, name: 'Himachal Pradesh', country: 'India' },
    { id: 10, name: 'Jharkhand', country: 'India' },
    { id: 11, name: 'Karnataka', country: 'India' },
    { id: 12, name: 'Kerala', country: 'India' },
    { id: 13, name: 'Madhya Pradesh', country: 'India' },
    { id: 14, name: 'Maharashtra', country: 'India' },
    { id: 15, name: 'Manipur', country: 'India' },
    { id: 16, name: 'Meghalaya', country: 'India' },
    { id: 17, name: 'Mizoram', country: 'India' },
    { id: 18, name: 'Nagaland', country: 'India' },
    { id: 19, name: 'Odisha', country: 'India' },
    { id: 20, name: 'Punjab', country: 'India' },
    { id: 21, name: 'Rajasthan', country: 'India' },
    { id: 22, name: 'Sikkim', country: 'India' },
    { id: 23, name: 'Tamil Nadu', country: 'India' },
    { id: 24, name: 'Telangana', country: 'India' },
    { id: 25, name: 'Tripura', country: 'India' },
    { id: 26, name: 'Uttar Pradesh', country: 'India' },
    { id: 27, name: 'Uttarakhand', country: 'India' },
    { id: 28, name: 'West Bengal', country: 'India' },
    
    // United States
    { id: 29, name: 'Alabama', country: 'United States' },
    { id: 30, name: 'Alaska', country: 'United States' },
    { id: 31, name: 'Arizona', country: 'United States' },
    { id: 32, name: 'Arkansas', country: 'United States' },
    { id: 33, name: 'California', country: 'United States' },
    { id: 34, name: 'Colorado', country: 'United States' },
    { id: 35, name: 'Connecticut', country: 'United States' },
    { id: 36, name: 'Delaware', country: 'United States' },
    { id: 37, name: 'Florida', country: 'United States' },
    { id: 38, name: 'Georgia', country: 'United States' },
    { id: 39, name: 'Hawaii', country: 'United States' },
    { id: 40, name: 'Idaho', country: 'United States' },
    { id: 41, name: 'Illinois', country: 'United States' },
    { id: 42, name: 'Indiana', country: 'United States' },
    { id: 43, name: 'Iowa', country: 'United States' },
    { id: 44, name: 'Kansas', country: 'United States' },
    { id: 45, name: 'Kentucky', country: 'United States' },
    { id: 46, name: 'Louisiana', country: 'United States' },
    { id: 47, name: 'Maine', country: 'United States' },
    { id: 48, name: 'Maryland', country: 'United States' },
    { id: 49, name: 'Massachusetts', country: 'United States' },
    { id: 50, name: 'Michigan', country: 'United States' },
    
    // Canada
    { id: 51, name: 'Alberta', country: 'Canada' },
    { id: 52, name: 'British Columbia', country: 'Canada' },
    { id: 53, name: 'Manitoba', country: 'Canada' },
    { id: 54, name: 'New Brunswick', country: 'Canada' },
    { id: 55, name: 'Newfoundland and Labrador', country: 'Canada' },
    { id: 56, name: 'Northwest Territories', country: 'Canada' },
    { id: 57, name: 'Nova Scotia', country: 'Canada' },
    { id: 58, name: 'Nunavut', country: 'Canada' },
    { id: 59, name: 'Ontario', country: 'Canada' },
    { id: 60, name: 'Prince Edward Island', country: 'Canada' },
    { id: 61, name: 'Quebec', country: 'Canada' },
    { id: 62, name: 'Saskatchewan', country: 'Canada' },
    { id: 63, name: 'Yukon', country: 'Canada' },
    
    // Australia
    { id: 64, name: 'New South Wales', country: 'Australia' },
    { id: 65, name: 'Queensland', country: 'Australia' },
    { id: 66, name: 'South Australia', country: 'Australia' },
    { id: 67, name: 'Tasmania', country: 'Australia' },
    { id: 68, name: 'Victoria', country: 'Australia' },
    { id: 69, name: 'Western Australia', country: 'Australia' },
    { id: 70, name: 'Northern Territory', country: 'Australia' },
    { id: 71, name: 'Australian Capital Territory', country: 'Australia' }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    country: ''
  });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter states based on search term
  const filteredStates = states.filter(state => 
    state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    state.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredStates.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStates.slice(indexOfFirstItem, indexOfLastItem);

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
      setStates(states.map(state => 
        state.id === currentId ? { ...formData, id: currentId } : state
      ));
    } else {
      const newState = {
        ...formData,
        id: states.length > 0 ? Math.max(...states.map(s => s.id)) + 1 : 1
      };
      setStates([...states, newState]);
    }
    resetForm();
  };

  const handleEdit = (state) => {
    setFormData({
      name: state.name,
      country: state.country
    });
    setIsEditMode(true);
    setCurrentId(state.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this state?')) {
      setStates(states.filter(state => state.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      country: ''
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

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>State </h2>
        <button 
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
        >
          <FiPlus /> Add State
        </button>
      </div>

      <div className="table-controls">
        <div className="search-input">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search states..."
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
            <h3>{isEditMode ? 'Edit' : 'Add New'} State</h3>
            <button className="close-btn" onClick={resetForm}>
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>State Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
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
              <th>State Name</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((state, index) => (
                <tr key={state.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{state.name}</td>
                  <td>{state.country}</td>
                  <td className="action-buttons">
                    <button 
                      className="btn-icon edit" 
                      onClick={() => handleEdit(state)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="btn-icon delete" 
                      onClick={() => handleDelete(state.id)}
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
                  No states found. Add a new state to get started.
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
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredStates.length)} of {filteredStates.length} entries
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default State;
