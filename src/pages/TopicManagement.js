import React, { useState, useEffect } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiPlus } from 'react-icons/fi';
import '../components/Table.css';
import './TopicManagement.css';

const TopicManagement = () => {
  // Sample data for topics
  const initialTopics = [
    { id: 1, className: 'Nur', topicName: 'Orange', subjectName: 'Chemistry', lessonName: 'test' },
    { id: 2, className: 'Nur', topicName: 'Mountains', subjectName: 'Drawing', lessonName: 'Scenery' },
    { id: 3, className: '-', topicName: 'Alzebra', subjectName: 'Chemistry', lessonName: 'string' },
    { id: 4, className: '-', topicName: 'edfdsa', subjectName: 'Chemistry', lessonName: 'mkijkmokok' },
    { id: 5, className: '-', topicName: 'Factorial', subjectName: 'Chemistry', lessonName: 'mkijkmokok' },
    { id: 6, className: '-', topicName: 'The Article', subjectName: 'Chemistry', lessonName: 'string' },
    { id: 7, className: '1', topicName: 'Global Warming', subjectName: 'Enviroment', lessonName: 'mkijkmokok' },
    { id: 8, className: '1', topicName: 'Vowel', subjectName: 'Eng', lessonName: 'string' },
    { id: 9, className: '1', topicName: 'JavaScript', subjectName: 'Eng', lessonName: 'string' },
  ];

  const [topics, setTopics] = useState(initialTopics);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState({
    id: null,
    className: '',
    topicName: '',
    subjectName: '',
    lessonName: ''
  });

  // Available classes for dropdown
  const classes = ['-', 'Nur', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  // Filter topics based on search term
  const filteredTopics = topics.filter(topic => 
    Object.values(topic).some(
      value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Get current topics for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTopics = filteredTopics.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTopics.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle page size change
  const handlePageSizeChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Handle input changes for add/edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTopic(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open add new topic modal
  const openAddModal = () => {
    setCurrentTopic({
      id: null,
      className: '',
      topicName: '',
      subjectName: '',
      lessonName: ''
    });
    setIsAddModalOpen(true);
  };

  // Open edit topic modal
  const openEditModal = (topic) => {
    setCurrentTopic(topic);
    setIsEditModalOpen(true);
  };

  // Save new topic
  const saveTopic = (e) => {
    e.preventDefault();
    const newTopic = {
      ...currentTopic,
      id: topics.length > 0 ? Math.max(...topics.map(t => t.id)) + 1 : 1
    };
    setTopics([...topics, newTopic]);
    setIsAddModalOpen(false);
  };

  // Update existing topic
  const updateTopic = (e) => {
    e.preventDefault();
    setTopics(topics.map(topic => 
      topic.id === currentTopic.id ? currentTopic : topic
    ));
    setIsEditModalOpen(false);
  };

  // Delete topic
  const deleteTopic = (id) => {
    if (window.confirm('Are you sure you want to delete this topic?')) {
      setTopics(topics.filter(topic => topic.id !== id));
    }
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  const maxPageNumbers = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);
  
  if (endPage - startPage + 1 < maxPageNumbers) {
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Topic Management</h2>
        <button className="btn btn-primary" onClick={openAddModal}>
          <FiPlus /> Add Topic
        </button>
      </div>

      <div className="table-controls">
        <div className="search-input">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="items-per-page">
          <label>Rows per page:</label>
          <select 
            value={itemsPerPage} 
            onChange={handlePageSizeChange}
            className="page-select"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Topic Name</th>
              <th>Subject Name</th>
              <th>Lesson Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTopics.length > 0 ? (
              currentTopics.map(topic => (
                <tr key={topic.id}>
                  <td>{topic.className}</td>
                  <td>{topic.topicName}</td>
                  <td>{topic.subjectName}</td>
                  <td>{topic.lessonName}</td>
                  <td className="action-buttons">
                    <button 
                      className="btn-icon btn-edit"
                      onClick={() => openEditModal(topic)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="btn-icon btn-delete"
                      onClick={() => deleteTopic(topic.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No topics found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredTopics.length > 0 && (
        <div className="pagination">
          <div className="pagination-info">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTopics.length)} of {filteredTopics.length} entries
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
              onClick={() => paginate(Math.max(1, currentPage - 1))} 
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
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))} 
              disabled={currentPage === totalPages}
              title="Next Page"
            >
              <FiChevronRight />
            </button>
            <button 
              className="page-button" 
              onClick={() => paginate(totalPages)} 
              disabled={currentPage === totalPages}
              title="Last Page"
            >
              <FiChevronsRight />
            </button>
          </div>
        </div>
      )}

      {/* Add Topic Modal */}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Topic</h3>
              <button className="close-btn" onClick={() => setIsAddModalOpen(false)}>×</button>
            </div>
            <form onSubmit={saveTopic}>
              <div className="form-group">
                <label>Class Name</label>
                <select
                  name="className"
                  value={currentTopic.className}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Topic Name</label>
                <input
                  type="text"
                  name="topicName"
                  value={currentTopic.topicName}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Subject Name</label>
                <input
                  type="text"
                  name="subjectName"
                  value={currentTopic.subjectName}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Lesson Name</label>
                <input
                  type="text"
                  name="lessonName"
                  value={currentTopic.lessonName}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Topic Modal */}
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Topic</h3>
              <button className="close-btn" onClick={() => setIsEditModalOpen(false)}>×</button>
            </div>
            <form onSubmit={updateTopic}>
              <div className="form-group">
                <label>Class Name</label>
                <select
                  name="className"
                  value={currentTopic.className}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Topic Name</label>
                <input
                  type="text"
                  name="topicName"
                  value={currentTopic.topicName}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Subject Name</label>
                <input
                  type="text"
                  name="subjectName"
                  value={currentTopic.subjectName}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Lesson Name</label>
                <input
                  type="text"
                  name="lessonName"
                  value={currentTopic.lessonName}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicManagement;
