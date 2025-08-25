import React, { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './RouteManagement.css';

const RouteManagement = () => {
  // Sample data for routes
  const [routes, setRoutes] = useState([
    { id: 1, name: 'Rajeev chowk', description: 'Main Road Line' },
    { id: 2, name: 'Sohna Chowk', description: 'Main Line' },
    { id: 3, name: 'Rajender Nagar', description: 'Main Road' },
    { id: 4, name: 'Chandni Chowk', description: 'N/A' },
    { id: 5, name: 'Shahin Bagh', description: 'N/A' },
    { id: 6, name: 'Preet Vihar', description: 'N/A' },
    { id: 7, name: 'Taj Mahal Chowk', description: 'ggfgffd' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  // Filter routes based on search term
  const filteredRoutes = routes.filter(route => 
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current routes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRoutes = filteredRoutes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRoutes.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle delete confirmation
  const handleDeleteClick = (route) => {
    setSelectedRoute(route);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedRoute) {
      setRoutes(routes.filter(route => route.id !== selectedRoute.id));
      setShowDeleteModal(false);
      setSelectedRoute(null);
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
    <div className="route-management">
      <div className="page-header">
        <h2>Route Management</h2>
        <Link to="/transport/routes/add" className="btn btn-primary">
          <FiPlus /> Add New Route
        </Link>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search routes..."
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
                <th>#</th>
                <th>Route Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRoutes.length > 0 ? (
                currentRoutes.map((route, index) => (
                  <tr key={route.id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{route.name}</td>
                    <td>{route.description}</td>
                    <td>
                      <div className="action-buttons">
                        <Link 
                          to={`/transport/routes/edit/${route.id}`}
                          className="btn-icon btn-edit"
                          title="Edit Route"
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          className="btn-icon btn-delete"
                          onClick={() => handleDeleteClick(route)}
                          title="Delete Route"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">
                    No routes found. {searchTerm && 'Try a different search term.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <div className="pagination-info">
            Showing {filteredRoutes.length > 0 ? indexOfFirstItem + 1 : 0} to{' '}
            {Math.min(indexOfLastItem, filteredRoutes.length)} of {filteredRoutes.length} entries
            {searchTerm && ` (filtered from ${routes.length} total entries)`}
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm Deletion</h3>
              <button className="close-btn" onClick={() => setShowDeleteModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete the route "{selectedRoute?.name}"? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteManagement;
