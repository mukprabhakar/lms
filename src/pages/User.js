import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiEye, FiEyeOff, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import '../components/Table.css';

const User = () => {
  // Sample user data
  const [users, setUsers] = useState([
    { id: 1, role: 'Teacher', name: 'ROSHNI', username: 'Roshani', password: 'roshani@123', expiryDate: '2025-12-31' },
    { id: 2, role: 'Teacher', name: 'Navin', username: 'Navin', password: '12345', expiryDate: '2025-01-09' },
    { id: 3, role: 'Teacher', name: 'Rayan', username: 'rayan', password: 'superadmin', expiryDate: '2024-10-10' },
    { id: 4, role: 'Parent', name: 'demo', username: 'manish', password: 'demo@123', expiryDate: '2025-03-28' },
    { id: 5, role: 'Parent', name: 'STORY', username: 'manisha', password: 'manish', expiryDate: '2024-09-20' },
    { id: 6, role: 'Teacher', name: 'jasmine', username: 'jasmine', password: '@123456789', expiryDate: '2025-04-25' },
    { id: 7, role: 'Teacher', name: 'abhinav', username: 'abhinav', password: '@12345678', expiryDate: '2025-03-26' },
    { id: 8, role: 'Teacher', name: 'Sarah ali', username: 'sarah', password: '1234!Sarah', expiryDate: '2026-03-31' },
    { id: 9, role: 'Parent', name: 'AARAV MISHRA', username: 'P-ADM/2025/0318', password: '9311132141', expiryDate: '2026-07-15' },
    { id: 10, role: 'Parent', name: 'JAYA', username: 'P-ADM/2025/0321', password: '9310532441', expiryDate: '2026-07-15' },
    { id: 11, role: 'Teacher', name: 'RAJESH KUMAR', username: 'rajeshk', password: 'rajesh@2024', expiryDate: '2025-05-15' },
    { id: 12, role: 'Parent', name: 'PRIYA SHARMA', username: 'priyas', password: 'priya@1234', expiryDate: '2025-06-20' },
    { id: 13, role: 'Admin', name: 'ADMIN', username: 'admin', password: 'admin@123', expiryDate: '2026-12-31' },
    { id: 14, role: 'Teacher', name: 'AMIT PATEL', username: 'amitp', password: 'amit#2024', expiryDate: '2025-03-15' },
    { id: 15, role: 'Parent', name: 'NEHA GUPTA', username: 'nehag', password: 'neha$5678', expiryDate: '2025-07-10' },
    { id: 16, role: 'Teacher', name: 'VIKAS YADAV', username: 'vikasy', password: 'vikas@123', expiryDate: '2025-08-22' },
    { id: 17, role: 'Parent', name: 'SUNIL VERMA', username: 'sunilv', password: 'sunil@2024', expiryDate: '2025-09-30' },
    { id: 18, role: 'Teacher', name: 'POOJA SINGH', username: 'poojas', password: 'pooja#123', expiryDate: '2025-11-15' },
    { id: 19, role: 'Parent', name: 'RAHUL MEHTA', username: 'rahulm', password: 'rahul@2024', expiryDate: '2025-12-10' },
    { id: 20, role: 'Teacher', name: 'ANJALI KAPOOR', username: 'anjalik', password: 'anjali123', expiryDate: '2026-01-20' },
    { id: 21, role: 'Parent', name: 'SANJAY MISHRA', username: 'sanjaym', password: 'sanjay#2024', expiryDate: '2026-02-15' },
    { id: 22, role: 'Teacher', name: 'MEERA DESAI', username: 'meerad', password: 'meera@123', expiryDate: '2026-03-10' },
    { id: 23, role: 'Parent', name: 'ARUN KHANNA', username: 'arunk', password: 'arun@2024', expiryDate: '2026-04-25' },
    { id: 24, role: 'Teacher', name: 'KAVITA JOSHI', username: 'kavitaj', password: 'kavita#123', expiryDate: '2026-05-20' },
    { id: 25, role: 'Parent', name: 'DEEPAK SHARMA', username: 'deepaks', password: 'deepak@2024', expiryDate: '2026-06-15' }
  ]);

  const [formData, setFormData] = useState({
    role: 'Teacher',
    name: '',
    username: '',
    password: '',
    expiryDate: format(new Date(new Date().setFullYear(new Date().getFullYear() + 1)), 'yyyy-MM-dd'),
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === currentId ? { ...formData, id: currentId } : user
      ));
    } else {
      // Add new user
      const newUser = {
        ...formData,
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
      };
      setUsers([...users, newUser]);
    }
    resetForm();
  };

  // Handle edit
  const handleEdit = (user) => {
    setFormData({
      role: user.role,
      name: user.name,
      username: user.username,
      password: user.password,
      expiryDate: user.expiryDate
    });
    setCurrentId(user.id);
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      role: 'Teacher',
      name: '',
      username: '',
      password: '',
      expiryDate: format(new Date(new Date().setFullYear(new Date().getFullYear() + 1)), 'yyyy-MM-dd'),
    });
    setIsEditMode(false);
    setCurrentId(null);
    setIsFormOpen(false);
    setShowPassword({});
  };

  // Toggle password visibility
  const togglePasswordVisibility = (id) => {
    setShowPassword(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Format date to dd/MM/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return format(date, 'dd/MM/yyyy');
  };
  
  // Calculate status based on expiry date
  const getStatus = (expiryDate) => {
    if (!expiryDate) return 'Inactive';
    const expDate = new Date(expiryDate);
    return expDate < new Date() ? 'Expired' : 'Active';
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.role.toLowerCase().includes(searchLower) ||
      user.name.toLowerCase().includes(searchLower) ||
      user.username.toLowerCase().includes(searchLower)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="header">
        <div className="header-top">
          <h1>User</h1>
          <div className="header-actions">
            <div className="entity-count">
              <span>{users.length}</span>
            </div>
            <button 
              className="btn btn-primary" 
              onClick={() => {
                resetForm();
                setIsFormOpen(true);
              }}
            >
              <FiPlus /> Add New User
            </button>
          </div>
        </div>
        <div className="search-container">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      <div className="table-actions">
        <div className="items-per-page">
          <label>Show</label>
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
          <span>entries</span>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User Role</th>
              <th>Name</th>
              <th>Username</th>
              <th>Password</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((user, index) => {
                const expiryDate = new Date(user.expiryDate);
                const isExpired = expiryDate < new Date();
                const status = isExpired ? 'Expired' : 'Active';
                
                return (
                  <tr key={user.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{user.role}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td className="password-cell">
                      {showPassword[user.id] ? (
                        <span>{user.password}</span>
                      ) : (
                        <span>••••••••</span>
                      )}
                      <button 
                        className="icon-btn" 
                        onClick={() => togglePasswordVisibility(user.id)}
                        title={showPassword[user.id] ? 'Hide Password' : 'Show Password'}
                      >
                        {showPassword[user.id] ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </td>
                    <td className={isExpired ? 'expired' : ''}>
                      {format(expiryDate, 'dd/MM/yyyy')}
                    </td>
                    <td>
                      <span className={`status-badge ${status.toLowerCase()}`}>
                        {status}
                      </span>
                    </td>
                    <td className="actions">
                      <button 
                        className="icon-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(user);
                        }}
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        className="icon-btn danger" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(user.id);
                        }}
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="no-data">
                  <div className="no-data-content">
                    <p>No users found</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => {
                        resetForm();
                        setIsFormOpen(true);
                      }}
                    >
                      <FiPlus /> Add New User
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <div className="pagination-info">
          Showing {filteredUsers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} entries
        </div>
        
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              title="First Page"
            >
              <FiChevronsLeft />
            </button>
            <button 
              className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
              title="Previous Page"
            >
              <FiChevronLeft />
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
                  className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => paginate(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
              title="Next Page"
            >
              <FiChevronRight />
            </button>
            <button 
              className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              title="Last Page"
            >
              <FiChevronsRight />
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit User Form Modal */}
      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{isEditMode ? 'Edit User' : 'Add New User'}</h2>
              <button className="close-btn" onClick={resetForm}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Role <span className="required">*</span></label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  >
                    <option value="">Select Role</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Parent">Parent</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Name <span className="required">*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    placeholder="Enter full name"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Username <span className="required">*</span></label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    placeholder="Enter username"
                  />
                </div>
                
                <div className="form-group">
                  <label>Password <span className="required">*</span></label>
                  <div className="password-input-container">
                    <input
                      type={showPassword['form'] ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                      placeholder="Enter password"
                    />
                    <button 
                      type="button" 
                      className="toggle-password"
                      onClick={() => setShowPassword(prev => ({
                        ...prev,
                        form: !prev.form
                      }))}
                      title={showPassword['form'] ? 'Hide Password' : 'Show Password'}
                    >
                      {showPassword['form'] ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date <span className="required">*</span></label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    min={format(new Date(), 'yyyy-MM-dd')}
                  />
                </div>
                
                <div className="form-group">
                  <label>Status</label>
                  <select 
                    className="form-control"
                    disabled
                    value={formData.expiryDate && new Date(formData.expiryDate) < new Date() ? 'Expired' : 'Active'}
                  >
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-outline" 
                  onClick={resetForm}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  {isEditMode ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
