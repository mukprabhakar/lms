import React, { useState } from 'react';
import { FiSave, FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import '../components/Table.css';
import './ClassTeacherMapping.css';

const ClassTeacherMapping = () => {
  // Sample classes data with subjects
  const classes = [
    { 
      id: 1, 
      name: 'Nursery', 
      sections: ['A', 'B'],
      subjects: ['English', 'Maths', 'EVS', 'Drawing', 'Rhymes', 'Story Telling']
    },
    { 
      id: 2, 
      name: 'LKG', 
      sections: ['A', 'B'],
      subjects: ['English', 'Maths', 'EVS', 'Drawing', 'Rhymes', 'Story Telling']
    },
    { 
      id: 3, 
      name: 'UKG', 
      sections: ['A', 'B'],
      subjects: ['English', 'Maths', 'EVS', 'Drawing', 'Hindi', 'Computer']
    },
    { 
      id: 4, 
      name: 'Class 1', 
      sections: ['A', 'B'],
      subjects: ['English', 'Maths', 'EVS', 'Hindi', 'Computer', 'Drawing']
    },
    { 
      id: 5, 
      name: 'Class 2', 
      sections: ['A', 'B'],
      subjects: ['English', 'Maths', 'EVS', 'Hindi', 'Computer', 'Drawing']
    },
    { 
      id: 6, 
      name: 'Class 3', 
      sections: ['A', 'B'],
      subjects: ['English', 'Maths', 'Science', 'Social Studies', 'Hindi', 'Computer']
    },
    { 
      id: 7, 
      name: 'Class 4', 
      sections: ['A', 'B'],
      subjects: ['English', 'Maths', 'Science', 'Social Studies', 'Hindi', 'Computer']
    },
    { 
      id: 8, 
      name: 'Class 5', 
      sections: ['A', 'B'],
      subjects: ['English', 'Maths', 'Science', 'Social Studies', 'Hindi', 'Computer']
    },
  ];

  // Sample teachers data with diverse names and subjects
  const teachers = [
    { id: 1, name: 'Aarav Sharma', employeeId: 'EMP001', subject: 'Mathematics' },
    { id: 2, name: 'Priya Patel', employeeId: 'EMP002', subject: 'Science' },
    { id: 3, name: 'Rahul Verma', employeeId: 'EMP003', subject: 'English' },
    { id: 4, name: 'Ananya Gupta', employeeId: 'EMP004', subject: 'Hindi' },
    { id: 5, name: 'Vikram Singh', employeeId: 'EMP005', subject: 'Social Studies' },
    { id: 6, name: 'Meera Nair', employeeId: 'EMP006', subject: 'Computer' },
    { id: 7, name: 'Arjun Reddy', employeeId: 'EMP007', subject: 'Physics' },
    { id: 8, name: 'Neha Kapoor', employeeId: 'EMP008', subject: 'Chemistry' },
    { id: 9, name: 'Aditya Iyer', employeeId: 'EMP009', subject: 'Biology' },
    { id: 10, name: 'Kavita Joshi', employeeId: 'EMP010', subject: 'EVS' },
    { id: 11, name: 'Rohan Malhotra', employeeId: 'EMP011', subject: 'Drawing' },
    { id: 12, name: 'Divya Choudhary', employeeId: 'EMP012', subject: 'Arts & Crafts' },
    { id: 13, name: 'Sandeep Kumar', employeeId: 'EMP013', subject: 'Music' },
    { id: 14, name: 'Pooja Mehta', employeeId: 'EMP014', subject: 'Dance' },
    { id: 15, name: 'Amitabh Trivedi', employeeId: 'EMP015', subject: 'History' },
  ];
  
  // Map subjects to their respective teachers for quick lookup
  const subjectTeacherMap = {};
  teachers.forEach(teacher => {
    subjectTeacherMap[teacher.subject] = teacher;
  });

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [classTeacherMappings, setClassTeacherMappings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Get class data for selected class
  const getClassData = () => {
    return classes.find(cls => cls.name === selectedClass) || {};
  };
  
  // Get sections for selected class
  const getSections = () => {
    return getClassData().sections || [];
  };
  
  // Get subjects for selected class
  const getSubjects = () => {
    return getClassData().subjects || [];
  };
  
  // Get teacher for a subject
  const getTeacherForSubject = (subject) => {
    return subjectTeacherMap[subject] || { name: 'Not Assigned', employeeId: 'N/A' };
  };

  // Handle class change
  const handleClassChange = (e) => {
    const className = e.target.value;
    setSelectedClass(className);
    setSelectedSection('');
    setSelectedTeacher('');
  };

  // Handle section change
  const handleSectionChange = (e) => {
    const section = e.target.value;
    setSelectedSection(section);
    
    // Load previously selected teacher for this class and section if any
    const existingMapping = classTeacherMappings.find(
      mapping => mapping.className === selectedClass && mapping.section === section
    );
    
    if (existingMapping) {
      setSelectedTeacher(existingMapping.teacherId);
    } else {
      setSelectedTeacher('');
    }
  };

  // Save class teacher mapping
  const saveMapping = () => {
    if (!selectedClass || !selectedSection) {
      alert('Please select class and section');
      return;
    }
    
    // Get all subject-teacher mappings from the form
    const subjectTeacherMappings = [];
    const form = document.getElementById('subjectTeacherForm');
    const formData = new FormData(form);
    
    // Collect all subject-teacher mappings
    for (let [subject, teacherId] of formData.entries()) {
      if (teacherId) {
        const teacher = teachers.find(t => t.id === parseInt(teacherId));
        if (teacher) {
          subjectTeacherMappings.push({
            subject,
            teacherId: teacher.id,
            teacherName: teacher.name,
            employeeId: teacher.employeeId
          });
        }
      }
    }
    
    if (subjectTeacherMappings.length === 0) {
      alert('Please assign at least one teacher to a subject');
      return;
    }
    
    // Remove existing mappings for this class and section
    const updatedMappings = classTeacherMappings.filter(
      mapping => !(mapping.className === selectedClass && mapping.section === selectedSection)
    );
    
    // Add new mappings
    subjectTeacherMappings.forEach(mapping => {
      updatedMappings.push({
        id: `${selectedClass}-${selectedSection}-${mapping.subject}`,
        className: selectedClass,
        section: selectedSection,
        ...mapping
      });
    });
    
    setClassTeacherMappings(updatedMappings);
    alert('Class teacher mappings saved successfully!');
  };

  // Filter class teacher mappings based on search term
  const filteredMappings = classTeacherMappings.filter(mapping => 
    Object.values(mapping).some(
      value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Group mappings by class and section
  const groupedMappings = classTeacherMappings.reduce((acc, mapping) => {
    const key = `${mapping.className}-${mapping.section}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(mapping);
    return acc;
  }, {});

  // Get current class teacher mappings for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGroupedMappings = Object.entries(groupedMappings).slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(Object.keys(groupedMappings).length / itemsPerPage);
  
  // Get unique teachers for dropdown
  const getTeachersForSubject = (subject) => {
    // Return teachers who teach this subject or have a matching subject
    return teachers.filter(teacher => 
      teacher.subject.toLowerCase() === subject.toLowerCase() ||
      teacher.subject.toLowerCase().includes(subject.toLowerCase()) ||
      subject.toLowerCase().includes(teacher.subject.toLowerCase())
    );
  };

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
        <h2>Class Teacher Mapping</h2>
      </div>

      <div className="class-teacher-selection-container">
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

        {selectedSection && (
          <form id="subjectTeacherForm" className="subject-teacher-form">
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Serial Number</th>
                    <th>Subject Name</th>
                    <th>Teacher</th>
                  </tr>
                </thead>
                <tbody>
                  {getSubjects().map((subject, index) => {
                    const availableTeachers = getTeachersForSubject(subject);
                    const currentMapping = classTeacherMappings.find(mapping => 
                      mapping.className === selectedClass && 
                      mapping.section === selectedSection &&
                      mapping.subject === subject
                    );
                    
                    return (
                      <tr key={index}>
                        <td>
                          <input 
                            type="checkbox" 
                            name={`select-${subject}`} 
                            defaultChecked={!!currentMapping}
                            className="subject-checkbox"
                          />
                        </td>
                        <td>{index + 1}</td>
                        <td>{subject}</td>
                        <td>
                          <select 
                            name={subject}
                            className="form-control teacher-select"
                            defaultValue={currentMapping ? currentMapping.teacherId : ''}
                          >
                            <option value="">-- Select Teacher --</option>
                            {availableTeachers.map(teacher => (
                              <option key={teacher.id} value={teacher.id}>
                                {teacher.name} ({teacher.employeeId})
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="form-group save-button-container">
              <button 
                type="button"
                className="btn btn-primary save-mapping-btn"
                onClick={saveMapping}
              >
                <FiSave /> Save Mappings
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="mapped-classes">
        <h3>Mapped Class Teachers</h3>
        <div className="table-controls">
          <div className="search-input">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search mappings..."
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
                <th>Class</th>
                <th>Section</th>
                <th>Subject</th>
                <th>Teacher Name</th>
                <th>Employee ID</th>
              </tr>
            </thead>
            <tbody>
              {currentGroupedMappings.length > 0 ? (
                currentGroupedMappings.map(([key, mappings]) => (
                  <React.Fragment key={key}>
                    {mappings.map((mapping, idx) => (
                      <tr key={`${key}-${idx}`}>
                        {idx === 0 && (
                          <td rowSpan={mappings.length} style={{ verticalAlign: 'middle' }}>
                            {mapping.className}
                          </td>
                        )}
                        {idx === 0 && (
                          <td rowSpan={mappings.length} style={{ verticalAlign: 'middle' }}>
                            {mapping.section}
                          </td>
                        )}
                        <td>{mapping.subject}</td>
                        <td>{mapping.teacherName}</td>
                        <td>{mapping.employeeId}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No class teacher mappings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
    </div>
  );
};

export default ClassTeacherMapping;
