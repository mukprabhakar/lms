import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import '../components/Table.css';

const SubjectMaster = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Social Science', shortName: 'S.sc', type: 'Theory', priority: 'High' },
    { id: 2, name: 'Physics', shortName: 'Phy', type: 'Theory', priority: 'High' },
    { id: 3, name: 'Hindi', shortName: 'Hin', type: 'Language', priority: 'High' },
    { id: 4, name: 'Mathematics', shortName: 'Math', type: 'Theory', priority: 'High' },
    { id: 5, name: 'History', shortName: 'His', type: 'Theory', priority: 'High' },
    { id: 6, name: 'Drawing', shortName: 'Draw', type: 'Practical', priority: 'Low' },
    { id: 7, name: 'Moral Science', shortName: 'M.sc', type: 'Theory', priority: 'Low' },
    { id: 8, name: 'Economics', shortName: 'Eco', type: 'Theory', priority: 'Low' },
    { id: 9, name: 'Science', shortName: 'Scn', type: 'Theory', priority: 'High' },
    { id: 10, name: 'English', shortName: 'Eng', type: 'Language', priority: 'High' },
    { id: 11, name: 'Chemistry', shortName: 'Chem', type: 'Theory', priority: 'High' },
    { id: 12, name: 'Biology', shortName: 'Bio', type: 'Theory', priority: 'High' },
    { id: 13, name: 'Computer Science', shortName: 'CS', type: 'Practical', priority: 'High' },
    { id: 14, name: 'Physical Education', shortName: 'PE', type: 'Practical', priority: 'Low' },
    { id: 15, name: 'Sanskrit', shortName: 'Skt', type: 'Language', priority: 'Medium' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    type: 'Theory',
    priority: 'High'
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Filter and sort subjects
  const filteredSubjects = subjects.filter(subject => 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.priority.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort subjects alphabetically
  const sortedSubjects = [...filteredSubjects].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedSubjects.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
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
      setSubjects(subjects.map(subject => 
        subject.id === currentId ? { ...formData, id: currentId } : subject
      ));
    } else {
      const newSubject = {
        ...formData,
        id: subjects.length > 0 ? Math.max(...subjects.map(s => s.id)) + 1 : 1
      };
      setSubjects([...subjects, newSubject]);
    }
    
    resetForm();
  };

  const handleEdit = (subject) => {
    setFormData({
      name: subject.name,
      shortName: subject.shortName,
      type: subject.type,
      priority: subject.priority
    });
    setIsEditMode(true);
    setCurrentId(subject.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      setSubjects(subjects.filter(subject => subject.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      shortName: '',
      type: 'Theory',
      priority: 'High'
    });
    setIsFormOpen(false);
    setIsEditMode(false);
    setCurrentId(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Subject Master</h2>
        <button 
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
        >
          <FiPlus /> Add Subject
        </button>
      </div>

      <div className="table-controls">
        <div className="search-input">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search subjects..."
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
            <h3>{isEditMode ? 'Edit' : 'Add New'} Subject</h3>
            <button className="close-btn" onClick={resetForm}>
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Subject Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                autoComplete="off"
                placeholder="e.g., Mathematics, Physics, etc."
              />
            </div>
            <div className="form-group">
              <label>Short Name</label>
              <input
                type="text"
                name="shortName"
                value={formData.shortName}
                onChange={handleInputChange}
                required
                autoComplete="off"
                placeholder="e.g., Math, Phy, etc."
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="Theory">Theory</option>
                <option value="Practical">Practical</option>
                <option value="Language">Language</option>
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select 
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
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
              <th>Subject Name</th>
              <th>Short Name</th>
              <th>Type</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((subject, index) => (
                <tr key={subject.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{subject.name}</td>
                  <td>{subject.shortName}</td>
                  <td>{subject.type}</td>
                  <td>
                    <span className={`badge ${
                      subject.priority === 'High' ? 'badge-danger' : 
                      subject.priority === 'Medium' ? 'badge-warning' : 'badge-secondary'
                    }`}>
                      {subject.priority}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button 
                      className="btn-icon edit" 
                      onClick={() => handleEdit(subject)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="btn-icon delete" 
                      onClick={() => handleDelete(subject.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  {searchTerm ? 'No matching subjects found' : 'No subjects available'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredSubjects.length > 0 && (
        <div className="pagination-container">
          <div className="pagination-info">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredSubjects.length)} of {filteredSubjects.length} entries
          </div>
          <div className="pagination">
            <button 
              onClick={() => paginate(1)} 
              disabled={currentPage === 1}
              className="pagination-arrow"
              title="First Page"
            >
              &laquo;
            </button>
            <button 
              onClick={() => paginate(Math.max(1, currentPage - 1))} 
              disabled={currentPage === 1}
              className="pagination-arrow"
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
                  onClick={() => paginate(pageNum)}
                  className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))} 
              disabled={currentPage === totalPages}
              className="pagination-arrow"
              title="Next Page"
            >
              &rsaquo;
            </button>
            <button 
              onClick={() => paginate(totalPages)} 
              disabled={currentPage === totalPages}
              className="pagination-arrow"
              title="Last Page"
            >
              &raquo;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectMaster;
