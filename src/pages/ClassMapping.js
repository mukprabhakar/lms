import React, { useState, useEffect } from 'react';
import { FiPlus, FiSave, FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../components/Table.css';
import './ClassMapping.css';

const ClassMapping = () => {
  // Sample classes data
  const classes = [
    { id: 1, name: 'Nursery', sections: ['A', 'B'] },
    { id: 2, name: 'LKG', sections: ['A', 'B'] },
    { id: 3, name: 'UKG', sections: ['A', 'B'] },
    { id: 4, name: 'Class 1', sections: ['A', 'B'] },
    { id: 5, name: 'Class 2', sections: ['A', 'B'] },
    { id: 6, name: 'Class 3', sections: ['A', 'B'] },
    { id: 7, name: 'Class 4', sections: ['A', 'B'] },
    { id: 8, name: 'Class 5', sections: ['A', 'B'] },
  ];

  // Sample subjects data
  const allSubjects = [
    { id: 1, name: 'Social Science' },
    { id: 2, name: 'Physics' },
    { id: 3, name: 'Hindi' },
    { id: 4, name: 'Mathematics' },
    { id: 5, name: 'History' },
    { id: 6, name: 'Drawing' },
    { id: 7, name: 'Moral Science' },
    { id: 8, name: 'Economics' },
    { id: 9, name: 'Science' },
    { id: 10, name: 'English' },
  ];

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const [classMappings, setClassMappings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showSaveButton, setShowSaveButton] = useState(false);

  // Get sections for selected class
  const getSections = () => {
    const selectedClassData = classes.find(cls => cls.name === selectedClass);
    return selectedClassData ? selectedClassData.sections : [];
  };

  // Handle class change
  const handleClassChange = (e) => {
    const className = e.target.value;
    setSelectedClass(className);
    setSelectedSection('');
    setSelectedSubjects({});
    setShowSaveButton(false);
  };

  // Handle section change
  const handleSectionChange = (e) => {
    const section = e.target.value;
    setSelectedSection(section);
    setShowSaveButton(true);
    
    // Load previously selected subjects for this class and section if any
    const existingMapping = classMappings.find(
      mapping => mapping.className === selectedClass && mapping.section === section
    );
    
    if (existingMapping) {
      const selected = {};
      existingMapping.subjects.forEach(subject => {
        selected[subject.id] = true;
      });
      setSelectedSubjects(selected);
    } else {
      setSelectedSubjects({});
    }
  };

  // Toggle subject selection
  const toggleSubjectSelection = (subjectId) => {
    setSelectedSubjects(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId]
    }));
  };

  // Save class-subject mapping
  const saveMapping = () => {
    if (!selectedClass || !selectedSection) return;
    
    const selectedSubjectIds = Object.keys(selectedSubjects)
      .filter(id => selectedSubjects[id])
      .map(id => parseInt(id));
    
    const selectedSubjectsData = allSubjects.filter(
      subject => selectedSubjectIds.includes(subject.id)
    );
    
    // Update or add new mapping
    const updatedMappings = classMappings.filter(
      mapping => !(mapping.className === selectedClass && mapping.section === selectedSection)
    );
    
    updatedMappings.push({
      id: Date.now(),
      className: selectedClass,
      section: selectedSection,
      subjects: selectedSubjectsData,
      subjectCount: selectedSubjectsData.length
    });
    
    setClassMappings(updatedMappings);
    alert('Class-subject mapping saved successfully!');
  };

  // Filter class mappings based on search term
  const filteredMappings = classMappings.filter(mapping => 
    Object.values(mapping).some(
      value => value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Get current class mappings for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMappings = filteredMappings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMappings.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePageSizeChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
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
        <h2>Class-Subject Mapping</h2>
      </div>

      <div className="table-controls">
        <div className="search-input">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search class mappings..."
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

      <div className="class-selection-container">
        <div className="form-group">
          <label>Select Class</label>
          <select 
            className="form-control"
            value={selectedClass}
            onChange={handleClassChange}
          >
            <option value="">-- Select Class --</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.name}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        {selectedClass && (
          <div className="form-group">
            <label>Select Section</label>
            <select 
              className="form-control"
              value={selectedSection}
              onChange={handleSectionChange}
            >
              <option value="">-- Select Section --</option>
              {getSections().map((section, index) => (
                <option key={index} value={section}>
                  Section {section}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {selectedSection && (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Subject Name</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {allSubjects.map((subject, index) => (
                <tr key={subject.id}>
                  <td>{index + 1}</td>
                  <td>{subject.name}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={!!selectedSubjects[subject.id]}
                      onChange={() => toggleSubjectSelection(subject.id)}
                      className="subject-checkbox"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {showSaveButton && (
            <div className="save-button-container">
              <button 
                className="btn btn-primary" 
                onClick={saveMapping}
              >
                <FiSave /> Save Mapping
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mapped-classes">
        <h3>Mapped Classes</h3>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Section</th>
                <th>Number of Subjects</th>
              </tr>
            </thead>
            <tbody>
              {classMappings.length > 0 ? (
                classMappings.map((mapping, index) => (
                  <tr key={mapping.id}>
                    <td>{mapping.className}</td>
                    <td>{mapping.section}</td>
                    <td>{mapping.subjectCount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No class mappings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {filteredMappings.length > 0 && (
        <div className="pagination">
          <div className="pagination-info">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredMappings.length)} of {filteredMappings.length} entries
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

    </div>
  );
};

export default ClassMapping;
