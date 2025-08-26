import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiSearch, FiEdit2, FiTrash2, FiEye, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import './StudentUser.css';

const StudentUser = () => {
  // State for search, filters and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  
  // Sample data - in a real app, this would come from an API
  const users = [
    { id: 1, name: 'AARAV MISHRA', username: 'ADM/2025/0318', password: '9311132141', expiryDate: '7/15/2026 7:41:26 AM' },
    { id: 2, name: 'JAYA', username: 'ADM/2025/0321', password: '9310532441', expiryDate: '7/15/2026 7:41:26 AM' },
    { id: 3, name: 'RAGHAV KUMAR', username: 'ADM/2025/2002', password: '9090909573', expiryDate: '7/15/2026 7:41:26 AM' },
    { id: 4, name: 'Muhammad', username: 'IMP2203', password: '9871115065', expiryDate: '7/17/2026 1:51:40 AM' },
    { id: 5, name: 'Sony Tirkey', username: 'IMP2204', password: '9871195060', expiryDate: '7/17/2026 1:54:55 AM' },
    { id: 6, name: 'Ajay Mishra', username: 'IMP2205', password: '9798654320', expiryDate: '7/17/2026 7:13:45 AM' },
    { id: 7, name: 'Shahrukh khan Khan', username: 'IMP2206', password: '9786543200', expiryDate: '7/17/2026 8:00:17 AM' },
    { id: 8, name: 'JAYA', username: 'ADM/2025/0322', password: '9310532441', expiryDate: '7/25/2026 5:14:00 AM' },
    { id: 9, name: 'Jaya', username: 'ADM/2025/0331', password: '9871115060', expiryDate: '7/25/2026 5:14:01 AM' },
    { id: 10, name: 'Sourav', username: 'IMP2228', password: '9876485278', expiryDate: '7/26/2026 12:28:32 AM' },
    { id: 11, name: 'Wasim Akram', username: 'IMP2277', password: '2222222222', expiryDate: '8/4/2026 5:22:44 AM' },
    { id: 12, name: 'Barry Allen', username: 'IMP2278', password: '3333333333', expiryDate: '8/4/2026 9:44:38 PM' },
    { id: 13, name: 'KARUNA none', username: 'IMP2279', password: '9268655510', expiryDate: '8/11/2026 6:01:47 AM' },
    { id: 14, name: 'Addy Broke', username: 'IMP2284', password: '4433443343', expiryDate: '8/13/2026 12:29:21 AM' },
    { id: 15, name: 'sddsds dkdkdk', username: 'IMP2285', password: '8765432189', expiryDate: '8/13/2026 4:45:36 AM' },
    { id: 16, name: 'Rahul Sharma', username: 'ADM/2025/0401', password: '9876543210', expiryDate: '8/15/2026 9:30:00 AM' },
    { id: 17, name: 'Priya Patel', username: 'ADM/2025/0402', password: '9876543211', expiryDate: '8/15/2026 9:30:01 AM' },
    { id: 18, name: 'Amit Kumar', username: 'ADM/2025/0403', password: '9876543212', expiryDate: '8/15/2026 9:30:02 AM' },
    { id: 19, name: 'Neha Gupta', username: 'ADM/2025/0404', password: '9876543213', expiryDate: '8/15/2026 9:30:03 AM' },
    { id: 20, name: 'Vikram Singh', username: 'ADM/2025/0405', password: '9876543214', expiryDate: '8/15/2026 9:30:04 AM' },
    { id: 21, name: 'Ananya Desai', username: 'ADM/2025/0406', password: '9876543215', expiryDate: '8/16/2026 10:15:00 AM' },
    { id: 22, name: 'Rohan Mehta', username: 'ADM/2025/0407', password: '9876543216', expiryDate: '8/16/2026 10:15:01 AM' },
    { id: 23, name: 'Ishaan Patel', username: 'ADM/2025/0408', password: '9876543217', expiryDate: '8/16/2026 10:15:02 AM' },
    { id: 24, name: 'Kavya Reddy', username: 'ADM/2025/0409', password: '9876543218', expiryDate: '8/16/2026 10:15:03 AM' },
    { id: 25, name: 'Arjun Malhotra', username: 'ADM/2025/0410', password: '9876543219', expiryDate: '8/16/2026 10:15:04 AM' },
    { id: 26, name: 'Diya Sharma', username: 'ADM/2025/0411', password: '9876543220', expiryDate: '8/17/2026 11:00:00 AM' },
    { id: 27, name: 'Karan Kapoor', username: 'ADM/2025/0412', password: '9876543221', expiryDate: '8/17/2026 11:00:01 AM' },
    { id: 28, name: 'Meera Nair', username: 'ADM/2025/0413', password: '9876543222', expiryDate: '8/17/2026 11:00:02 AM' },
    { id: 29, name: 'Aryan Khanna', username: 'ADM/2025/0414', password: '9876543223', expiryDate: '8/17/2026 11:00:03 AM' },
    { id: 30, name: 'Anjali Joshi', username: 'ADM/2025/0415', password: '9876543224', expiryDate: '8/17/2026 11:00:04 AM' },
    { id: 31, name: 'Rishi Verma', username: 'ADM/2025/0416', password: '9876543225', expiryDate: '8/18/2026 2:30:00 PM' },
    { id: 32, name: 'Ishita Choudhary', username: 'ADM/2025/0417', password: '9876543226', expiryDate: '8/18/2026 2:30:01 PM' },
    { id: 33, name: 'Vivaan Agarwal', username: 'ADM/2025/0418', password: '9876543227', expiryDate: '8/18/2026 2:30:02 PM' },
    { id: 34, name: 'Myra Kapoor', username: 'ADM/2025/0419', password: '9876543228', expiryDate: '8/18/2026 2:30:03 PM' },
    { id: 35, name: 'Aarav Bhatia', username: 'ADM/2025/0420', password: '9876543229', expiryDate: '8/18/2026 2:30:04 PM' },
  ];
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination
  useEffect(() => {
    const calculatedTotalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    setTotalPages(calculatedTotalPages);
    if (currentPage > calculatedTotalPages && calculatedTotalPages > 0) {
      setCurrentPage(calculatedTotalPages);
    }
  }, [filteredUsers, itemsPerPage, currentPage]);
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };
  
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Maximum number of page buttons to show
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages are less than or equal to maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first page, last page, and pages around current page
      const halfMaxPages = Math.floor(maxPagesToShow / 2);
      
      // Always show first page
      pageNumbers.push(1);
      
      // Calculate start and end of the middle section
      let startPage = Math.max(2, currentPage - halfMaxPages);
      let endPage = Math.min(totalPages - 1, currentPage + halfMaxPages);
      
      // Adjust if we're at the start or end
      if (currentPage <= halfMaxPages + 1) {
        endPage = maxPagesToShow - 1; // -1 because we'll add the last page later
      } else if (currentPage >= totalPages - halfMaxPages) {
        startPage = totalPages - maxPagesToShow + 2; // +2 because we already added the first page
      }
      
      // Add ellipsis if needed
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        if (i > 1 && i < totalPages) {
          pageNumbers.push(i);
        }
      }
      
      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  // Toggle password visibility
  const togglePasswordVisibility = (id) => {
    setShowPassword(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle actions
  const handleView = (user) => {
    console.log('View user:', user);
    // In a real app, this would open a view modal or navigate to a view page
  };

  const handleEdit = (user) => {
    console.log('Edit user:', user);
    // In a real app, this would open an edit form
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log('Delete user with ID:', userId);
      // In a real app, this would call an API to delete the user
    }
  };

  return (
    <div className="student-user-container">
      <div className="header">
        <h2><FiUser className="header-icon" /> Student Users</h2>
        <div className="action-buttons">
          <Link to="/student/users" className="btn-primary">
            <FiUser /> User List
          </Link>
          <Link to="/student/users/add" className="btn-secondary">
            <FiUser /> Add New User
          </Link>
        </div>
      </div>

      <div className="search-section">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="results-section">
        <div className="table-responsive">
          <div className="table-header">
            <div className="items-per-page">
              <span>Show </span>
              <select 
                value={itemsPerPage} 
                onChange={handleItemsPerPageChange}
                className="per-page-selector"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span> entries</span>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>User Name</th>
                <th>Password</th>
                <th>Expiry Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td className="password-cell">
                      {showPassword[user.id] ? (
                        <span className="password-visible">{user.password}</span>
                      ) : (
                        <span className="password-hidden">••••••••</span>
                      )}
                      <button 
                        className="btn-toggle-password"
                        onClick={() => togglePasswordVisibility(user.id)}
                        title={showPassword[user.id] ? 'Hide Password' : 'Show Password'}
                      >
                        <FiEye />
                      </button>
                    </td>
                    <td>{formatDate(user.expiryDate)}</td>
                    <td className="actions">
                      <button 
                        className="btn-view"
                        onClick={() => handleView(user)}
                        title="View Details"
                      >
                        <FiEye />
                      </button>
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(user)}
                        title="Edit User"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(user.id)}
                        title="Delete User"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    {filteredUsers.length === 0 
                      ? 'No users found matching your search.'
                      : 'No users to display on this page.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/* Pagination */}
          <div className="pagination-container">
            <div className="pagination-info">
              Showing {filteredUsers.length === 0 ? 0 : indexOfFirstItem + 1} to 
              {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} entries
              {searchTerm && ` (filtered from ${users.length} total entries)`}
            </div>
            
            <div className="pagination-controls">
              <button 
                onClick={() => paginate(1)} 
                disabled={currentPage === 1}
                className="pagination-button"
                title="First Page"
              >
                <FiChevronsLeft />
              </button>
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                className="pagination-button"
                title="Previous Page"
              >
                <FiChevronLeft />
              </button>
              
              {getPageNumbers().map((number, index) => (
                <button
                  key={index}
                  onClick={() => typeof number === 'number' ? paginate(number) : null}
                  className={`pagination-button ${currentPage === number ? 'active' : ''} ${number === '...' ? 'ellipsis' : ''}`}
                  disabled={number === '...'}
                >
                  {number}
                </button>
              ))}
              
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === totalPages || totalPages === 0}
                className="pagination-button"
                title="Next Page"
              >
                <FiChevronRight />
              </button>
              <button 
                onClick={() => paginate(totalPages)} 
                disabled={currentPage === totalPages || totalPages === 0}
                className="pagination-button"
                title="Last Page"
              >
                <FiChevronsRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentUser;
