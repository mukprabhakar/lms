import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import '../components/Table.css';

const City = () => {
  // Comprehensive list of cities - in a real app, this would come from an API
  const [cities, setCities] = useState([
    // India
    { id: 1, name: 'Mumbai', state: 'Maharashtra', country: 'India' },
    { id: 2, name: 'Delhi', state: 'Delhi', country: 'India' },
    { id: 3, name: 'Bangalore', state: 'Karnataka', country: 'India' },
    { id: 4, name: 'Hyderabad', state: 'Telangana', country: 'India' },
    { id: 5, name: 'Ahmedabad', state: 'Gujarat', country: 'India' },
    { id: 6, name: 'Chennai', state: 'Tamil Nadu', country: 'India' },
    { id: 7, name: 'Kolkata', state: 'West Bengal', country: 'India' },
    { id: 8, name: 'Pune', state: 'Maharashtra', country: 'India' },
    { id: 9, name: 'Jaipur', state: 'Rajasthan', country: 'India' },
    { id: 10, name: 'Lucknow', state: 'Uttar Pradesh', country: 'India' },
    
    // United States
    { id: 11, name: 'New York', state: 'New York', country: 'United States' },
    { id: 12, name: 'Los Angeles', state: 'California', country: 'United States' },
    { id: 13, name: 'Chicago', state: 'Illinois', country: 'United States' },
    { id: 14, name: 'Houston', state: 'Texas', country: 'United States' },
    { id: 15, name: 'Phoenix', state: 'Arizona', country: 'United States' },
    { id: 16, name: 'Philadelphia', state: 'Pennsylvania', country: 'United States' },
    { id: 17, name: 'San Antonio', state: 'Texas', country: 'United States' },
    { id: 18, name: 'San Diego', state: 'California', country: 'United States' },
    { id: 19, name: 'Dallas', state: 'Texas', country: 'United States' },
    { id: 20, name: 'San Jose', state: 'California', country: 'United States' },
    
    // United Kingdom
    { id: 21, name: 'London', state: 'England', country: 'United Kingdom' },
    { id: 22, name: 'Birmingham', state: 'England', country: 'United Kingdom' },
    { id: 23, name: 'Manchester', state: 'England', country: 'United Kingdom' },
    { id: 24, name: 'Glasgow', state: 'Scotland', country: 'United Kingdom' },
    { id: 25, name: 'Liverpool', state: 'England', country: 'United Kingdom' },
    
    // Canada
    { id: 26, name: 'Toronto', state: 'Ontario', country: 'Canada' },
    { id: 27, name: 'Montreal', state: 'Quebec', country: 'Canada' },
    { id: 28, name: 'Vancouver', state: 'British Columbia', country: 'Canada' },
    { id: 29, name: 'Calgary', state: 'Alberta', country: 'Canada' },
    { id: 30, name: 'Ottawa', state: 'Ontario', country: 'Canada' },
    
    // Australia
    { id: 31, name: 'Sydney', state: 'New South Wales', country: 'Australia' },
    { id: 32, name: 'Melbourne', state: 'Victoria', country: 'Australia' },
    { id: 33, name: 'Brisbane', state: 'Queensland', country: 'Australia' },
    { id: 34, name: 'Perth', state: 'Western Australia', country: 'Australia' },
    { id: 35, name: 'Adelaide', state: 'South Australia', country: 'Australia' },
    
    // Japan
    { id: 36, name: 'Tokyo', state: 'Tokyo', country: 'Japan' },
    { id: 37, name: 'Yokohama', state: 'Kanagawa', country: 'Japan' },
    { id: 38, name: 'Osaka', state: 'Osaka', country: 'Japan' },
    { id: 39, name: 'Nagoya', state: 'Aichi', country: 'Japan' },
    { id: 40, name: 'Sapporo', state: 'Hokkaido', country: 'Japan' }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    state: '',
    country: ''
  });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter cities based on search term
  const filteredCities = cities.filter(city => 
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCities.slice(indexOfFirstItem, indexOfLastItem);

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
      setCities(cities.map(city => 
        city.id === currentId ? { ...formData, id: currentId } : city
      ));
    } else {
      const newCity = {
        ...formData,
        id: cities.length > 0 ? Math.max(...cities.map(c => c.id)) + 1 : 1
      };
      setCities([...cities, newCity]);
    }
    resetForm();
  };

  const handleEdit = (city) => {
    setFormData({
      name: city.name,
      state: city.state,
      country: city.country
    });
    setIsEditMode(true);
    setCurrentId(city.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this city?')) {
      setCities(cities.filter(city => city.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      state: '',
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
        <h2>City</h2>
        <button 
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
        >
          <FiPlus /> Add City
        </button>
      </div>

      <div className="table-controls">
        <div className="search-input">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search cities..."
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
            <h3>{isEditMode ? 'Edit' : 'Add New'} City</h3>
            <button className="close-btn" onClick={resetForm}>
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>City Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
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
              <th>City Name</th>
              <th>State Name</th>
              <th>Country Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((city, index) => (
                <tr key={city.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{city.name}</td>
                  <td>{city.state}</td>
                  <td>{city.country}</td>
                  <td className="action-buttons">
                    <button 
                      className="btn-icon edit" 
                      onClick={() => handleEdit(city)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="btn-icon delete" 
                      onClick={() => handleDelete(city.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No cities found. Add a new city to get started.
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
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCities.length)} of {filteredCities.length} entries
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default City;
