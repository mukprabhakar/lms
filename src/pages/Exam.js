import React, { useState } from 'react';
import { FiSave, FiX, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import './Exam.css';

const Exam = () => {
  // Form state
  const [formData, setFormData] = useState({
    session: '',
    examType: 'withSubject',
    examName: '',
    subExam: '',
    teacher: '',
    class: '',
    section: '',
    subject: ''
  });

  // Table data
  const [exams, setExams] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Sample data for dropdowns
  const sessions = ['2023-2024', '2024-2025', '2025-2026'];
  const examTypes = ['Unit Test', 'Mid-Term', 'Final Exam', 'Pre-Board', 'Practical', 'Oral', 'Project'];
  const teachers = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis'];
  const classes = ['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  const sections = ['A', 'B', 'C', 'D'];
  const subjects = ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science'];

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio' ? (checked ? value : '') : value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing record
      setExams(exams.map(item => 
        item.id === editingId ? { ...formData, id: editingId } : item
      ));
    } else {
      // Add new record
      const newExam = {
        ...formData,
        id: Date.now()
      };
      setExams([...exams, newExam]);
    }
    
    // Reset form
    resetForm();
  };

  // Handle edit
  const handleEdit = (id) => {
    const examToEdit = exams.find(item => item.id === id);
    setFormData({
      session: examToEdit.session,
      examType: examToEdit.examType,
      examName: examToEdit.examName,
      subExam: examToEdit.subExam,
      teacher: examToEdit.teacher,
      class: examToEdit.class,
      section: examToEdit.section,
      subject: examToEdit.subject
    });
    setEditingId(id);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      setExams(exams.filter(item => item.id !== id));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      session: '',
      examType: 'withSubject',
      examName: '',
      subExam: '',
      teacher: '',
      class: '',
      section: '',
      subject: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="exam-container">
      <div className="header">
        <h2>Exam Management</h2>
        {!showForm && (
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            <FiPlus /> Add New Exam
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="form-container">
          <h3>{editingId ? 'Edit' : 'Add New'} Exam</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Session <span className="required">*</span></label>
                <select
                  className="form-select"
                  name="session"
                  value={formData.session}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Session</option>
                  {sessions.map((session, index) => (
                    <option key={index} value={session}>{session}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Exam Type <span className="required">*</span></label>
                <div className="radio-group">
                  <div className={`radio-option ${formData.examType === 'withSubject' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      id="withSubject"
                      name="examType"
                      value="withSubject"
                      checked={formData.examType === 'withSubject'}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="withSubject">With Subject</label>
                  </div>
                  <div className={`radio-option ${formData.examType === 'withoutSubject' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      id="withoutSubject"
                      name="examType"
                      value="withoutSubject"
                      checked={formData.examType === 'withoutSubject'}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="withoutSubject">Without Subject</label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Exam Name <span className="required">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="examName"
                  value={formData.examName}
                  onChange={handleInputChange}
                  placeholder="Enter exam name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Sub Exam</label>
                <input
                  type="text"
                  className="form-control"
                  name="subExam"
                  value={formData.subExam}
                  onChange={handleInputChange}
                  placeholder="Enter sub exam name (if any)"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Teacher</label>
                <select
                  className="form-select"
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleInputChange}
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((teacher, index) => (
                    <option key={index} value={teacher}>{teacher}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Class</label>
                <select
                  className="form-select"
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                >
                  <option value="">Select Class</option>
                  {classes.map((cls, index) => (
                    <option key={index} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Section</label>
                <select
                  className="form-select"
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                >
                  <option value="">Select Section</option>
                  {sections.map((section, index) => (
                    <option key={index} value={section}>Section {section}</option>
                  ))}
                </select>
              </div>

              {formData.examType === 'withSubject' && (
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select
                    className="form-select"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-outline-secondary" 
                onClick={resetForm}
              >
                <FiX size={16} /> Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                <FiSave size={16} /> {editingId ? 'Update Exam' : 'Save Exam'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Session</th>
              <th>Exam Type</th>
              <th>Exam Name</th>
              <th>Sub Exam</th>
              <th>Teacher</th>
              <th>Class</th>
              <th>Section</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.length > 0 ? (
              exams.map((exam, index) => (
                <tr key={exam.id}>
                  <td>{index + 1}</td>
                  <td>{exam.session}</td>
                  <td>{exam.examType === 'withSubject' ? 'With Subject' : 'Without Subject'}</td>
                  <td>{exam.examName}</td>
                  <td>{exam.subExam || '-'}</td>
                  <td>{exam.teacher || '-'}</td>
                  <td>{exam.class || '-'}</td>
                  <td>{exam.section || '-'}</td>
                  <td>{exam.subject || (exam.examType === 'withSubject' ? 'Not Set' : '-')}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <button 
                        className="btn-action btn-edit"
                        onClick={() => handleEdit(exam.id)}
                        title="Edit Exam"
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button 
                        className="btn-action btn-delete"
                        onClick={() => handleDelete(exam.id)}
                        title="Delete Exam"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="empty-state">
                  <i className="fas fa-inbox"></i>
                  <p>No exams found. Click 'Add New Exam' to create one.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Exam;
