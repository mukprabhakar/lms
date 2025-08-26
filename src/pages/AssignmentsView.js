import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import '../components/Table.css';
import './AssignmentsView.css';

const AssignmentsView = () => {
  // Sample data for assignments
  const [assignments, setAssignments] = useState([
    { id: 1, class: 'Nur', subject: 'Test', creationDate: '07/10/2024', submissionDate: '09/10/2024' },
    { id: 2, class: 'Nur', subject: 'Test', creationDate: '01/10/2024', submissionDate: '03/10/2024' },
    { id: 3, class: 'Nur', subject: 'Eng', creationDate: '15/10/2024', submissionDate: '17/10/2024' },
    // ... more data as provided
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter assignments based on search term
  const filteredAssignments = assignments.filter(assignment => {
    return (
      assignment.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.creationDate.includes(searchTerm) ||
      assignment.submissionDate.includes(searchTerm)
    );
  });

  // Get current assignments
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssignments = filteredAssignments.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(assignments.filter(assignment => assignment.id !== id));
    }
  };

  return (
    <div className="assignments-container">
      <div className="header">
        <h2>Assignments</h2>
        <div className="action-buttons">
          <Link to="/academics/assignments/create" className="btn-primary">
            <FiPlus /> Create New Assignment
          </Link>
        </div>
      </div>

      <div className="search-bar">
        <div className="search-input">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Class</th>
              <th>Subject</th>
              <th>Assignment Creation Date</th>
              <th>Last Submission Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAssignments.length > 0 ? (
              currentAssignments.map((assignment, index) => (
                <tr key={assignment.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{assignment.class}</td>
                  <td>{assignment.subject}</td>
                  <td>{assignment.creationDate}</td>
                  <td>{assignment.submissionDate}</td>
                  <td className="actions">
                    <Link to={`/academics/assignments/edit/${assignment.id}`} className="btn-edit">
                      <FiEdit2 />
                    </Link>
                    <button 
                      onClick={() => handleDelete(assignment.id)} 
                      className="btn-delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No assignments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredAssignments.length > itemsPerPage && (
        <div className="pagination">
          <button 
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
          >
            <FiChevronLeft />
          </button>
          
          {Array.from({ length: Math.ceil(filteredAssignments.length / itemsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
          
          <button 
            onClick={() => paginate(
              currentPage < Math.ceil(filteredAssignments.length / itemsPerPage) 
                ? currentPage + 1 
                : currentPage
            )}
            disabled={currentPage === Math.ceil(filteredAssignments.length / itemsPerPage)}
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default AssignmentsView;
