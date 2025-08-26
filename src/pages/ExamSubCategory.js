import React, { useState } from 'react';
import { FiSave, FiX, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import './ExamSubCategory.css';

const ExamSubCategory = () => {
  // Form state
  const [formData, setFormData] = useState({
    classType: '',
    examType: '',
    subExam: '',
    minMarks: '',
    maxMarks: '',
    weightage: ''
  });

  // Table data
  const [examSubCategories, setExamSubCategories] = useState([
    // Sample data will go here
  ]);

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [totalWeightage, setTotalWeightage] = useState(0);

  // Class Type options
  const classTypes = [
    'Pre-Primary [Nur - UKG - LKG]',
    'Elementary [Class I - VIII]',
    'Secondary [Class IX & X]',
    'Senior Secondary [Class XI & XII]'
  ];

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update total weightage if weightage field changes
    if (name === 'weightage') {
      const weight = parseInt(value) || 0;
      setTotalWeightage(weight);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing record
      setExamSubCategories(examSubCategories.map(item => 
        item.id === editingId ? { ...formData, id: editingId } : item
      ));
    } else {
      // Add new record
      const newExamSubCategory = {
        ...formData,
        id: Date.now()
      };
      setExamSubCategories([...examSubCategories, newExamSubCategory]);
    }
    
    // Reset form
    resetForm();
  };

  // Handle edit
  const handleEdit = (id) => {
    const examToEdit = examSubCategories.find(item => item.id === id);
    setFormData({
      classType: examToEdit.classType,
      examType: examToEdit.examType,
      subExam: examToEdit.subExam,
      minMarks: examToEdit.minMarks,
      maxMarks: examToEdit.maxMarks,
      weightage: examToEdit.weightage
    });
    setEditingId(id);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this sub-category?')) {
      setExamSubCategories(examSubCategories.filter(item => item.id !== id));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      classType: '',
      examType: '',
      subExam: '',
      minMarks: '',
      maxMarks: '',
      weightage: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  // Get exam types based on class type
  const getExamTypes = () => {
    // This would typically come from an API or context
    return [
      'Unit Test',
      'Mid-Term',
      'Final Exam',
      'Pre-Board',
      'Practical',
      'Oral',
      'Project'
    ];
  };

  return (
    <div className="exam-sub-category-container">
      <div className="header">
        <h2>Exam Sub-Category</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <FiPlus /> Add New
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="form-container">
          <h3>{editingId ? 'Edit' : 'Add New'} Exam Sub-Category</h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Class Type <span className="required">*</span></label>
                <select
                  className="form-select"
                  name="classType"
                  value={formData.classType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Class Type</option>
                  {classTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-4 mb-3">
                <label className="form-label">Exam Type <span className="required">*</span></label>
                <select
                  className="form-select"
                  name="examType"
                  value={formData.examType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Exam Type</option>
                  {getExamTypes().map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-4 mb-3">
                <label className="form-label">Sub Exam <span className="required">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="subExam"
                  value={formData.subExam}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="col-md-3 mb-3">
                <label className="form-label">Min Marks</label>
                <input
                  type="number"
                  className="form-control"
                  name="minMarks"
                  value={formData.minMarks}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="col-md-3 mb-3">
                <label className="form-label">Max Marks</label>
                <input
                  type="number"
                  className="form-control"
                  name="maxMarks"
                  value={formData.maxMarks}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="col-md-3 mb-3">
                <label className="form-label">Weightage</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    name="weightage"
                    value={formData.weightage}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                  />
                  <span className="input-group-text">%</span>
                </div>
                <small className="text-muted">Weightage: {totalWeightage} out of 100</small>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
                <FiX /> Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <FiSave /> {editingId ? 'Update' : 'Save'}
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
              <th>Sub Exam</th>
              <th>Class Type</th>
              <th>Exam Type</th>
              <th>Min Marks</th>
              <th>Max Marks</th>
              <th>Weightage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {examSubCategories.length > 0 ? (
              examSubCategories.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.subExam}</td>
                  <td>{item.classType}</td>
                  <td>{item.examType}</td>
                  <td className="text-center">{item.minMarks || '-'}</td>
                  <td className="text-center">{item.maxMarks || '-'}</td>
                  <td className="text-center">{item.weightage}%</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <button 
                        className="btn btn-sm btn-outline-primary rounded-circle p-2 d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px' }}
                        onClick={() => handleEdit(item.id)}
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger rounded-circle p-2 d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px' }}
                        onClick={() => handleDelete(item.id)}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-muted">
                  <i className="fas fa-inbox me-2"></i>
                  No exam sub-categories found. Click 'Add New' to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamSubCategory;
