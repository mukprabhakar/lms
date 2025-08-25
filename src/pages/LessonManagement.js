import React, { useState, useEffect } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiPlus } from 'react-icons/fi';
import '../components/Table.css';
import './LessonManagement.css';

const LessonManagement = () => {
  // Sample data for lessons
  const initialLessons = [
    { id: 1, lessonName: 'Vowels', className: 'LKG', content: 'a,e,i,o,u' },
    { id: 2, lessonName: 'vyakaran', className: 'LKG', content: 'varnan shabdo ka' },
    { id: 3, lessonName: 'algebra', className: 'LKG', content: 'x+y=12' },
    { id: 4, lessonName: 'Global warming', className: 'Nur', content: 'chapters to measure global warming and its effect.' },
    { id: 5, lessonName: 'Global warming 3', className: '1', content: 'glacier turned to water.' },
    { id: 6, lessonName: 'english chapter 1', className: '1', content: 'xyz' },
    { id: 7, lessonName: 'Logical Thinking', className: '1', content: 'test' },
    { id: 8, lessonName: 'Rain Rain', className: 'UKG', content: 'Rain Rain' },
    { id: 9, lessonName: 'Angles and Triangles', className: 'LKG', content: 'Need construction box' },
    { id: 10, lessonName: 'Scenery', className: 'Nur', content: 'painting' },
    { id: 11, lessonName: 'Einglish', className: '1', content: 'Adam Lession' },
    { id: 12, lessonName: 'Adams', className: '1', content: 'Here we have to study about Adams' },
  ];

  const [lessons, setLessons] = useState(initialLessons);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentLesson, setCurrentLesson] = useState({
    id: null,
    lessonName: '',
    className: '',
    content: ''
  });

  // Available classes for dropdown
  const classes = ['Nur', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  // Filter lessons based on search term
  const filteredLessons = lessons.filter(lesson => 
    Object.values(lesson).some(
      value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Get current lessons for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLessons = filteredLessons.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLessons.length / itemsPerPage);

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
    setCurrentLesson(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open add new lesson modal
  const openAddModal = () => {
    setCurrentLesson({
      id: null,
      lessonName: '',
      className: '',
      content: ''
    });
    setIsAddModalOpen(true);
  };

  // Open edit lesson modal
  const openEditModal = (lesson) => {
    setCurrentLesson(lesson);
    setIsEditModalOpen(true);
  };

  // Save new lesson
  const saveLesson = (e) => {
    e.preventDefault();
    const newLesson = {
      ...currentLesson,
      id: lessons.length > 0 ? Math.max(...lessons.map(l => l.id)) + 1 : 1
    };
    setLessons([...lessons, newLesson]);
    setIsAddModalOpen(false);
  };

  // Update existing lesson
  const updateLesson = (e) => {
    e.preventDefault();
    setLessons(lessons.map(lesson => 
      lesson.id === currentLesson.id ? currentLesson : lesson
    ));
    setIsEditModalOpen(false);
  };

  // Delete lesson
  const deleteLesson = (id) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      setLessons(lessons.filter(lesson => lesson.id !== id));
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
        <h2>Lesson Management</h2>
        <button className="btn btn-primary" onClick={openAddModal}>
          <FiPlus /> Add Lesson
        </button>
      </div>

      <div className="table-controls">
        <div className="search-input">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="items-per-page">
          <label>Items per page:</label>
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
              <th>Lesson Name</th>
              <th>Class</th>
              <th>Content</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentLessons.length > 0 ? (
              currentLessons.map(lesson => (
                <tr key={lesson.id}>
                  <td>{lesson.lessonName}</td>
                  <td>{lesson.className}</td>
                  <td className="content-cell">{lesson.content}</td>
                  <td className="action-buttons">
                    <button 
                      className="btn-icon btn-edit"
                      onClick={() => openEditModal(lesson)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="btn-icon btn-delete"
                      onClick={() => deleteLesson(lesson.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No lessons found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredLessons.length > 0 && (
        <div className="pagination">
          <div className="pagination-info">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredLessons.length)} of {filteredLessons.length} entries
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

      {/* Add Lesson Modal */}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Lesson</h3>
              <button className="close-btn" onClick={() => setIsAddModalOpen(false)}>×</button>
            </div>
            <form onSubmit={saveLesson}>
              <div className="form-group">
                <label>Lesson Name</label>
                <input
                  type="text"
                  name="lessonName"
                  value={currentLesson.lessonName}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Class</label>
                <select
                  name="className"
                  value={currentLesson.className}
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
                <label>Content</label>
                <textarea
                  name="content"
                  value={currentLesson.content}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="4"
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Lesson
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Lesson Modal */}
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Lesson</h3>
              <button className="close-btn" onClick={() => setIsEditModalOpen(false)}>×</button>
            </div>
            <form onSubmit={updateLesson}>
              <div className="form-group">
                <label>Lesson Name</label>
                <input
                  type="text"
                  name="lessonName"
                  value={currentLesson.lessonName}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Class</label>
                <select
                  name="className"
                  value={currentLesson.className}
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
                <label>Content</label>
                <textarea
                  name="content"
                  value={currentLesson.content}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="4"
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Lesson
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonManagement;
