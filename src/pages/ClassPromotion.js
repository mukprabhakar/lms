import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiPlus, FiSearch } from 'react-icons/fi';

// Styles for the Class Promotion page
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    padding: '20px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#2c3e50',
    margin: '0 0 20px 0',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#4a5568',
  },
  select: {
    width: '100%',
    padding: '10px 15px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#4a5568',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%234a5568\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M6 9l6 6 6-6\'/%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    backgroundSize: '16px',
    '&:focus': {
      outline: 'none',
      borderColor: '#4299e1',
      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)',
    },
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    '&:hover': {
      backgroundColor: '#3d8b40',
    },
    '&:disabled': {
      backgroundColor: '#cbd5e0',
      cursor: 'not-allowed',
    },
  },
  searchBox: {
    position: 'relative',
    marginBottom: '20px',
  },
  searchInput: {
    width: '100%',
    padding: '10px 15px 10px 40px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '14px',
    '&:focus': {
      outline: 'none',
      borderColor: '#4299e1',
      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)',
    },
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#a0aec0',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid #e2e8f0',
  },
  tableHeaderCell: {
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#4a5568',
    fontSize: '13px',
    textTransform: 'uppercase',
  },
  tableCell: {
    padding: '14px 16px',
    color: '#4a5568',
    fontSize: '14px',
    borderBottom: '1px solid #e2e8f0',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  },
  actionButton: {
    padding: '6px 12px',
    backgroundColor: '#e2e8f0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
    fontSize: '12px',
    '&:hover': {
      backgroundColor: '#cbd5e0',
    },
  },
};

const ClassPromotion = () => {
  // Sample data for dropdowns
  const sessions = ['2023-2024', '2024-2025', '2025-2026'];
  const classes = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const sections = ['A', 'B', 'C', 'D'];

  // State for form fields
  const [formData, setFormData] = useState({
    fromSession: '',
    toSession: '',
    fromClass: '',
    toClass: '',
    fromSection: '',
    toSection: '',
  });

  // State for student list
  const [students, setStudents] = useState([
    { id: 1, admissionNo: 'ADM/2024/001', name: 'John Doe', currentClass: '5', currentSection: 'A', selected: false },
    { id: 2, admissionNo: 'ADM/2024/002', name: 'Jane Smith', currentClass: '5', currentSection: 'A', selected: false },
    { id: 3, admissionNo: 'ADM/2024/003', name: 'Bob Johnson', currentClass: '5', currentSection: 'B', selected: false },
  ]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle student selection
  const handleSelectStudent = (id) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, selected: !student.selected } : student
    ));
  };

  // Handle select all students
  const handleSelectAll = (e) => {
    setStudents(students.map(student => ({
      ...student,
      selected: e.target.checked
    })));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your promotion logic here
    console.log('Promotion data:', formData);
    console.log('Selected students:', students.filter(s => s.selected));
    alert('Students promoted successfully!');
  };

  // Check if form is valid
  const isFormValid = 
    formData.fromSession && 
    formData.toSession && 
    formData.fromClass && 
    formData.toClass && 
    formData.fromSection && 
    formData.toSection;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Class Promotion</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="fromSession">From Session</label>
              <select
                id="fromSession"
                name="fromSession"
                value={formData.fromSession}
                onChange={handleInputChange}
                style={styles.select}
                required
              >
                <option value="">Select Session</option>
                {sessions.map((session, index) => (
                  <option key={`from-${index}`} value={session}>{session}</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="toSession">To Session</label>
              <select
                id="toSession"
                name="toSession"
                value={formData.toSession}
                onChange={handleInputChange}
                style={styles.select}
                required
              >
                <option value="">Select Session</option>
                {sessions.map((session, index) => (
                  <option key={`to-${index}`} value={session}>{session}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="fromClass">From Class</label>
              <select
                id="fromClass"
                name="fromClass"
                value={formData.fromClass}
                onChange={handleInputChange}
                style={styles.select}
                required
              >
                <option value="">Select Class</option>
                {classes.map((cls, index) => (
                  <option key={`from-class-${index}`} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="toClass">To Class</label>
              <select
                id="toClass"
                name="toClass"
                value={formData.toClass}
                onChange={handleInputChange}
                style={styles.select}
                required
              >
                <option value="">Select Class</option>
                {classes.map((cls, index) => (
                  <option key={`to-class-${index}`} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="fromSection">From Section</label>
              <select
                id="fromSection"
                name="fromSection"
                value={formData.fromSection}
                onChange={handleInputChange}
                style={styles.select}
                required
              >
                <option value="">Select Section</option>
                {sections.map((section, index) => (
                  <option key={`from-section-${index}`} value={section}>{section}</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="toSection">To Section</label>
              <select
                id="toSection"
                name="toSection"
                value={formData.toSection}
                onChange={handleInputChange}
                style={styles.select}
                required
              >
                <option value="">Select Section</option>
                {sections.map((section, index) => (
                  <option key={`to-section-${index}`} value={section}>{section}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <button 
              type="submit" 
              style={styles.button}
              disabled={!isFormValid}
            >
              <FiPlus /> Search Students
            </button>
          </div>
        </form>
      </div>

      {formData.fromClass && formData.fromSection && (
        <div style={styles.card}>
          <h3 style={{ ...styles.title, fontSize: '18px' }}>Student List</h3>
          
          <div style={styles.searchBox}>
            <FiSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search students..."
              style={styles.searchInput}
            />
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.tableHeaderCell}>
                    <input 
                      type="checkbox" 
                      style={styles.checkbox}
                      onChange={handleSelectAll}
                      checked={students.length > 0 && students.every(s => s.selected)}
                    />
                  </th>
                  <th style={styles.tableHeaderCell}>Admission No</th>
                  <th style={styles.tableHeaderCell}>Student Name</th>
                  <th style={styles.tableHeaderCell}>Current Class</th>
                  <th style={styles.tableHeaderCell}>Section</th>
                  <th style={styles.tableHeaderCell}>Promote To</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td style={styles.tableCell}>
                      <input 
                        type="checkbox" 
                        style={styles.checkbox}
                        checked={student.selected}
                        onChange={() => handleSelectStudent(student.id)}
                      />
                    </td>
                    <td style={styles.tableCell}>{student.admissionNo}</td>
                    <td style={styles.tableCell}>{student.name}</td>
                    <td style={styles.tableCell}>{student.currentClass}</td>
                    <td style={styles.tableCell}>{student.currentSection}</td>
                    <td style={styles.tableCell}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <select
                          style={{
                            ...styles.select,
                            padding: '5px 10px',
                            fontSize: '13px',
                            width: 'auto',
                            minWidth: '80px',
                          }}
                          value={student.promoteToClass || formData.toClass}
                          onChange={(e) => {
                            const updatedStudents = students.map(s => 
                              s.id === student.id 
                                ? { ...s, promoteToClass: e.target.value } 
                                : s
                            );
                            setStudents(updatedStudents);
                          }}
                        >
                          {classes.map((cls, index) => (
                            <option key={`promote-${index}`} value={cls}>{cls}</option>
                          ))}
                        </select>
                        <span>Section</span>
                        <select
                          style={{
                            ...styles.select,
                            padding: '5px 10px',
                            fontSize: '13px',
                            width: 'auto',
                            minWidth: '70px',
                          }}
                          value={student.promoteToSection || formData.toSection}
                          onChange={(e) => {
                            const updatedStudents = students.map(s => 
                              s.id === student.id 
                                ? { ...s, promoteToSection: e.target.value } 
                                : s
                            );
                            setStudents(updatedStudents);
                          }}
                        >
                          {sections.map((section, index) => (
                            <option key={`section-${index}`} value={section}>{section}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              style={{
                ...styles.button,
                backgroundColor: '#3182ce',
                '&:hover': {
                  backgroundColor: '#2c5282',
                },
              }}
              disabled={!students.some(s => s.selected)}
              onClick={() => {
                const selected = students.filter(s => s.selected);
                console.log('Promoting students:', selected);
                alert(`${selected.length} student(s) will be promoted.`);
                // Add your promotion logic here
              }}
            >
              Promote Selected Students
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassPromotion;
