import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import './StockLocation.css';

const StockLocation = () => {
  // Sample data for locations
  const [locations, setLocations] = useState([
    // Academic Areas
    { id: 1, name: 'Science Lab' },
    { id: 2, name: 'Physics Lab' },
    { id: 3, name: 'Chemistry Lab' },
    { id: 4, name: 'Biology Lab' },
    { id: 5, name: 'Computer Lab' },
    
    // Sports and Activities
    { id: 6, name: 'Sports Complex' },
    { id: 7, name: 'Indoor Stadium' },
    { id: 8, name: 'Swimming Pool' },
    { id: 9, name: 'Yoga Room' },
    { id: 10, name: 'Music Room' },
    { id: 11, name: 'Art Room' },
    { id: 12, name: 'Dance Studio' },
    
    // Common Areas
    { id: 13, name: 'Main Auditorium' },
    { id: 14, name: 'Mini Auditorium' },
    { id: 15, name: 'Library' },
    { id: 16, name: 'Cafeteria' },
    { id: 17, name: 'Staff Room' },
    { id: 18, name: 'Principal Office' },
    
    // Storage
    { id: 19, name: 'Main Store Room' },
    { id: 20, name: 'Stationery Store' },
    { id: 21, name: 'Sports Equipment Room' },
    { id: 22, name: 'Cleaning Supplies' },
    
    // Administrative
    { id: 23, name: 'Admin Office' },
    { id: 24, name: 'Accounts Department' },
    { id: 25, name: 'Reception' },
    
    // Maintenance
    { id: 26, name: 'Maintenance Room' },
    { id: 27, name: 'Generator Room' },
    { id: 28, name: 'Server Room' },
    
    // Classrooms (sample)
    { id: 29, name: 'Classroom A-101' },
    { id: 30, name: 'Classroom A-102' },
    { id: 31, name: 'Classroom B-201' },
    { id: 32, name: 'Classroom B-202' },
  ]);

  const [newLocation, setNewLocation] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter locations based on search term
  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current locations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLocations = filteredLocations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle previous & next
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Add new location
  const handleAddLocation = (e) => {
    e.preventDefault();
    if (newLocation.trim()) {
      const newLoc = {
        id: Date.now(),
        name: newLocation.trim(),
      };
      setLocations([...locations, newLoc]);
      setNewLocation('');
      setShowAddForm(false);
    }
  };

  // Start editing
  const startEditing = (location) => {
    setEditingId(location.id);
    setEditValue(location.name);
  };

  // Save edited location
  const saveEdit = (id) => {
    if (editValue.trim()) {
      setLocations(
        locations.map((loc) =>
          loc.id === id ? { ...loc, name: editValue.trim() } : loc
        )
      );
      setEditingId(null);
    }
  };

  // Delete location
  const deleteLocation = (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      setLocations(locations.filter((loc) => loc.id !== id));
    }
  };

  return (
    <div className="stock-location-container">
      <div className="page-header">
        <div>
          <h2>Stock Locations</h2>
          <p>Manage your inventory locations</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          <FiPlus /> Add Location
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <FiSearch className="search-icon" />
        </div>
      </div>

      {/* Add Location Form */}
      {showAddForm && (
        <div className="add-location-form">
          <h3>Add New Location</h3>
          <form onSubmit={handleAddLocation}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="Enter location name"
                required
                autoFocus
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Locations Table */}
      <div className="locations-table-container">
        <table className="locations-table">
          <thead>
            <tr>
              <th>Location Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentLocations.length > 0 ? (
              currentLocations.map((location) => (
                <tr key={location.id}>
                  <td>
                    {editingId === location.id ? (
                      <input
                        type="text"
                        className="form-control inline-edit"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={() => saveEdit(location.id)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') saveEdit(location.id);
                        }}
                        autoFocus
                      />
                    ) : (
                      location.name
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon"
                        onClick={() => startEditing(location)}
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="btn-icon danger"
                        onClick={() => deleteLocation(location.id)}
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="no-data">
                  {searchTerm 
                    ? 'No locations match your search. Try a different term.'
                    : 'No locations found. Add a new location to get started.'
                  }
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredLocations.length > itemsPerPage && (
        <div className="pagination-container">
          <div className="pagination">
            <button 
              onClick={prevPage} 
              disabled={currentPage === 1}
              className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
            >
              &laquo; Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show first page, last page, and pages around current page
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`page-btn ${currentPage === pageNumber ? 'active' : ''}`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            <button 
              onClick={nextPage} 
              disabled={currentPage === totalPages}
              className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
            >
              Next &raquo;
            </button>
            
            <div className="page-info">
              Page {currentPage} of {totalPages}
            </div>
          </div>
          
          <div className="items-per-page">
            <span>Items per page: </span>
            <select 
              value={itemsPerPage} 
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="items-select"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockLocation;
