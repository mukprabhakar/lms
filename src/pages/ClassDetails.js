import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import '../components/Table.css';

const ClassDetails = () => {
  const [classes, setClasses] = useState([
    { id: 1, name: 'Nur', maxLecture: 4, minAge: 5, maxAge: 8 },
    { id: 2, name: 'LKG', maxLecture: 4, minAge: 4, maxAge: 6 },
    { id: 3, name: 'UKG', maxLecture: 4, minAge: 5, maxAge: 7 },
    { id: 4, name: '1', maxLecture: 4, minAge: 6, maxAge: 8 },
    { id: 5, name: '2', maxLecture: 4, minAge: 6, maxAge: 8 },
    { id: 6, name: '3', maxLecture: 5, minAge: 6, maxAge: 8 },
    { id: 7, name: '4', maxLecture: 4, minAge: 5, maxAge: 7 },
    { id: 8, name: '5', maxLecture: 4, minAge: 6, maxAge: 8 },
    { id: 9, name: '6', maxLecture: 4, minAge: 9, maxAge: 12 },
    { id: 10, name: 'Secondary', maxLecture: 4, minAge: 5, maxAge: 14 },
    { id: 11, name: 'Secondary class', maxLecture: 4, minAge: 4, maxAge: 14 },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    maxLecture: '',
    minAge: '',
    maxAge: ''
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter classes based on search term
  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.maxLecture.toString().includes(searchTerm) ||
    cls.minAge.toString().includes(searchTerm) ||
    cls.maxAge.toString().includes(searchTerm)
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClasses.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

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
      setClasses(classes.map(cls => 
        cls.id === currentId ? { ...formData, id: currentId } : cls
      ));
    } else {
      const newClass = {
        ...formData,
        id: classes.length > 0 ? Math.max(...classes.map(c => c.id)) + 1 : 1
      };
      setClasses([...classes, newClass]);
    }
    resetForm();
  };

  const handleEdit = (cls) => {
    setFormData({
      name: cls.name,
      maxLecture: cls.maxLecture,
      minAge: cls.minAge,
      maxAge: cls.maxAge
    });
    setIsEditMode(true);
    setCurrentId(cls.id);
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      maxLecture: '',
      minAge: '',
      maxAge: ''
    });
    setIsFormOpen(false);
    setIsEditMode(false);
    setCurrentId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter(cls => cls.id !== id));
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Class Details</h2>
        <button 
          className="btn btn-success"
          style={{ backgroundColor: '#28a745', color: 'white' }}
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
        >
          <FiPlus /> Add Class
        </button>
      </div>

      <div className="table-controls">
        <div className="search-input">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search classes..."
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
            <h3>{isEditMode ? 'Edit' : 'Add New'} Class</h3>
            <button className="close-btn" onClick={resetForm}>
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Class Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Max Lectures *</label>
              <input
                type="number"
                name="maxLecture"
                value={formData.maxLecture}
                onChange={handleInputChange}
                required
                min="1"
              />
            </div>
            <div className="form-group">
              <label>Min Age *</label>
              <input
                type="number"
                name="minAge"
                value={formData.minAge}
                onChange={handleInputChange}
                required
                min="1"
              />
            </div>
            <div className="form-group">
              <label>Max Age *</label>
              <input
                type="number"
                name="maxAge"
                value={formData.maxAge}
                onChange={handleInputChange}
                required
                min="1"
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
              <th>Class</th>
              <th>Max Lecture</th>
              <th>Min Age</th>
              <th>Max Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((cls, index) => (
                <tr key={cls.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{cls.name}</td>
                  <td>{cls.maxLecture}</td>
                  <td>{cls.minAge}</td>
                  <td>{cls.maxAge}</td>
                  <td className="action-buttons">
                    <button 
                      className="btn-icon edit" 
                      onClick={() => handleEdit(cls)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="btn-icon delete"
                      onClick={() => handleDelete(cls.id)}
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
                  No classes found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {filteredClasses.length > 0 && (
          <div className="pagination-container">
            <div className="page-info">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredClasses.length)} of {filteredClasses.length} entries
            </div>
            <div className="pagination">
              <button 
                className="page-nav" 
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
                title="First Page"
              >
                &laquo;
              </button>
              <button 
                className="page-nav" 
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                title="Previous Page"
              >
                &lsaquo;
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
                    className={`page-number ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => paginate(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button 
                className="page-nav" 
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                title="Next Page"
              >
                &rsaquo;
              </button>
              <button 
                className="page-nav" 
                onClick={() => paginate(totalPages)}
                disabled={currentPage === totalPages}
                title="Last Page"
              >
                &raquo;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassDetails;
