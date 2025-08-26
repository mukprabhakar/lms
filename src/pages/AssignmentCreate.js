import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSave, FiX, FiPlus, FiUpload } from 'react-icons/fi';
import './AssignmentCreate.css';

const AssignmentCreate = () => {
  const [formData, setFormData] = useState({
    class: '',
    subject: '',
    title: '',
    description: '',
    creationDate: new Date().toISOString().split('T')[0],
    submissionDate: '',
    attachment: null
  });

  const [classes] = useState([
    'Nur', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ]);

  const [subjects] = useState([
    'English', 'Maths', 'Science', 'Physics', 'Chemistry', 'Biology', 
    'Social Studies', 'History', 'Geography', 'Computer', 'Hindi', 'Sanskrit',
    'Physical Education', 'Art', 'Music', 'Dance', 'Environmental Science'
  ]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Add API call here to save the assignment
  };

  return (
    <div className="assignment-create-container">
      <div className="header">
        <h2>Create New Assignment</h2>
        <div className="action-buttons">
          <Link to="/assignments" className="btn-cancel">
            <FiX /> Cancel
          </Link>
          <button type="button" className="btn-save" onClick={handleSubmit}>
            <FiSave /> Save Assignment
          </button>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Class <span className="required">*</span></label>
              <select 
                name="class" 
                value={formData.class}
                onChange={handleChange}
                required
              >
                <option value="">Select Class</option>
                {classes.map((cls, index) => (
                  <option key={index} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Subject <span className="required">*</span></label>
              <select 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select Subject</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Assignment Title <span className="required">*</span></label>
              <input 
                type="text" 
                name="title" 
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter assignment title"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Description</label>
              <textarea 
                name="description" 
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter assignment description"
                rows="4"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Creation Date</label>
              <input 
                type="date" 
                name="creationDate" 
                value={formData.creationDate}
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="form-group">
              <label>Last Submission Date <span className="required">*</span></label>
              <input 
                type="date" 
                name="submissionDate" 
                value={formData.submissionDate}
                onChange={handleChange}
                min={formData.creationDate}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Attachment</label>
              <div className="file-upload">
                <label className="file-upload-label">
                  <FiUpload className="upload-icon" />
                  {formData.attachment ? formData.attachment.name : 'Choose file to upload'}
                  <input 
                    type="file" 
                    name="attachment"
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                </label>
                {formData.attachment && (
                  <span className="file-name">
                    {formData.attachment.name}
                    <button 
                      type="button" 
                      className="btn-remove"
                      onClick={() => setFormData(prev => ({ ...prev, attachment: null }))}
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
              <p className="file-hint">Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentCreate;
