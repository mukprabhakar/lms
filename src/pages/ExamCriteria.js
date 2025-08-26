import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import './ExamCriteria.css';

const ExamCriteria = () => {
  // Form state
  const [formData, setFormData] = useState({
    classType: '',
    examType: '',
    examMode: 'Independent',
    independentSubcategory: '',
    examWeightage: '',
    independentWeightage: '',
    minMarks: '',
    maxMarks: ''
  });

  // Table data
  const [examCriteria, setExamCriteria] = useState([
    { 
      id: 1, 
      classType: 'Senior Secondary [Class XI & XII]', 
      examType: 'Mid-Term', 
      examMode: 'Independent',
      examWeightage: '30',
      independentWeightage: '100',
      minMarks: '0',
      maxMarks: '100'
    },
    { 
      id: 2, 
      classType: 'Elementary [Class I - VIII]', 
      examType: 'Finals', 
      examMode: 'Independent',
      examWeightage: '40',
      independentWeightage: '100',
      minMarks: '0',
      maxMarks: '100'
    },
    { 
      id: 3, 
      classType: 'Elementary [Class I - VIII]', 
      examType: 'First Term Exam', 
      examMode: 'Independent',
      examWeightage: '30',
      independentWeightage: '100',
      minMarks: '0',
      maxMarks: '100',
      independentSubcategory: 'Written'
    },
    { 
      id: 4, 
      classType: 'Secondary [Class IX & X]', 
      examType: 'Second Term Exam', 
      examMode: 'SubCategory',
      examWeightage: '35',
      independentWeightage: '70',
      minMarks: '0',
      maxMarks: '100',
      independentSubcategory: 'Practical'
    },
    { 
      id: 5, 
      classType: 'Secondary [Class IX & X]', 
      examType: 'First Term Exam', 
      examMode: 'Independent',
      examWeightage: '25',
      independentWeightage: '100',
      minMarks: '0',
      maxMarks: '75'
    },
    { 
      id: 6, 
      classType: 'Elementary [Class I - VIII]', 
      examType: 'First Term Exam', 
      examMode: 'SubCategory',
      examWeightage: '20',
      independentWeightage: '60',
      minMarks: '0',
      maxMarks: '80',
      independentSubcategory: 'Oral'
    },
    { 
      id: 7, 
      classType: 'Elementary [Class I - VIII]', 
      examType: 'First Term Exam', 
      examMode: 'Independent',
      examWeightage: '30',
      independentWeightage: '100',
      minMarks: '0',
      maxMarks: '100'
    },
    { 
      id: 8, 
      classType: 'Secondary [Class IX & X]', 
      examType: 'First Term Exam', 
      examMode: 'SubCategory',
      examWeightage: '25',
      independentWeightage: '70',
      minMarks: '0',
      maxMarks: '80',
      independentSubcategory: 'Project'
    },
    { 
      id: 9, 
      classType: 'Elementary [Class I - VIII]', 
      examType: 'Half Yearly Exam', 
      examMode: 'Independent',
      examWeightage: '30',
      independentWeightage: '100',
      minMarks: '0',
      maxMarks: '100'
    },
    { 
      id: 10, 
      classType: 'Pre-Primary [Nur - UKG - LKG]', 
      examType: 'Annual Exam', 
      examMode: 'Independent',
      examWeightage: '50',
      independentWeightage: '100',
      minMarks: '0',
      maxMarks: '50'
    },
    { 
      id: 11, 
      classType: 'Pre-Primary [Nur - UKG - LKG]', 
      examType: 'Pre-Primary', 
      examMode: 'Independent',
      examWeightage: '30',
      independentWeightage: '100',
      minMarks: '0',
      maxMarks: '50'
    },
    { 
      id: 12, 
      classType: 'Pre-Primary [Nur - UKG - LKG]', 
      examType: 'Annual Exam', 
      examMode: 'Independent',
      examWeightage: '50',
      independentWeightage: '100',
      minMarks: '0',
      maxMarks: '50'
    },
    { 
      id: 13, 
      classType: 'Pre-Primary [Nur - UKG - LKG]', 
      examType: 'Weekly Test', 
      examMode: 'Independent',
      examWeightage: '10',
      independentWeightage: '100',
      minMarks: '0',
      maxMarks: '20'
    },
    { 
      id: 14, 
      classType: 'Senior Secondary [Class XI & XII]', 
      examType: 'Practical Exam', 
      examMode: 'SubCategory',
      examWeightage: '25',
      independentWeightage: '50',
      minMarks: '0',
      maxMarks: '50',
      independentSubcategory: 'Lab Work'
    },
    { 
      id: 15, 
      classType: 'Secondary [Class IX & X]', 
      examType: 'Unit Test', 
      examMode: 'Independent',
      examWeightage: '10',
      independentWeightage: '100',
      minMarks: '0',
      maxMarks: '20'
    },
    { 
      id: 16, 
      classType: 'Elementary [Class I - VIII]', 
      examType: 'Activity Based', 
      examMode: 'SubCategory',
      examWeightage: '15',
      independentWeightage: '50',
      minMarks: '0',
      maxMarks: '30',
      independentSubcategory: 'Class Activity'
    },
    { 
      id: 17, 
      classType: 'Senior Secondary [Class XI & XII]', 
      examType: 'Pre-Board', 
      examMode: 'Independent',
      examWeightage: '35',
      independentWeightage: '100',
      minMarks: '0',
      maxMarks: '100'
    },
    { 
      id: 18, 
      classType: 'Secondary [Class IX & X]', 
      examType: 'Pre-Board', 
      examMode: 'Independent',
      examWeightage: '30',
      independentWeightage: '100',
      minMarks: '0',
      maxMarks: '100'
    },
    { 
      id: 19, 
      classType: 'Elementary [Class I - VIII]', 
      examType: 'Terminal Exam', 
      examMode: 'Independent',
      examWeightage: '25',
      independentWeightage: '100',
      minMarks: '0',
      maxMarks: '100'
    },
    { 
      id: 20, 
      classType: 'Pre-Primary [Nur - UKG - LKG]', 
      examType: 'Oral Test', 
      examMode: 'SubCategory',
      examWeightage: '20',
      independentWeightage: '50',
      minMarks: '0',
      maxMarks: '25',
      independentSubcategory: 'Recitation'
    }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update existing record
      setExamCriteria(examCriteria.map(item => 
        item.id === editingId ? { ...formData, id: editingId } : item
      ));
      setEditingId(null);
    } else {
      // Add new record
      const newExam = {
        ...formData,
        id: examCriteria.length > 0 ? Math.max(...examCriteria.map(item => item.id)) + 1 : 1
      };
      setExamCriteria([...examCriteria, newExam]);
    }
    resetForm();
  };

  const handleEdit = (exam) => {
    setFormData({
      classType: exam.classType,
      examType: exam.examType,
      examMode: exam.examMode,
      independentSubcategory: exam.independentSubcategory || '',
      examWeightage: exam.examWeightage || '',
      independentWeightage: exam.independentWeightage || '',
      minMarks: exam.minMarks || '',
      maxMarks: exam.maxMarks || ''
    });
    setEditingId(exam.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this exam criteria?')) {
      setExamCriteria(examCriteria.filter(item => item.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      classType: '',
      examType: '',
      examMode: 'Independent',
      independentSubcategory: '',
      examWeightage: '',
      independentWeightage: '',
      minMarks: '',
      maxMarks: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  // Options for dropdowns
  const classTypes = [
    'Pre-Primary [Nur - UKG - LKG]',
    'Elementary [Class I - VIII]',
    'Secondary [Class IX & X]',
    'Senior Secondary [Class XI & XII]'
  ];

  const examTypes = [
    'Weekly Test',
    'Monthly Test',
    'Half Yearly Exam',
    'Annual Exam',
    'First Term Exam',
    'Second Term Exam',
    'Mid-Term',
    'Finals',
    'Pre-Primary'
  ];

  return (
    <div className="exam-criteria-container">
      <div className="header">
        <h2>Exam Criteria</h2>
        <button 
          className="btn-primary" 
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <FiPlus /> Add Exam Criteria
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editingId ? 'Edit' : 'Add New'} Exam Criteria</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Class Type <span className="required">*</span></label>
                <select 
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

              <div className="form-group">
                <label>Exam Type <span className="required">*</span></label>
                <select 
                  name="examType" 
                  value={formData.examType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Exam Type</option>
                  {examTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Exam Mode <span className="required">*</span></label>
                <select 
                  name="examMode" 
                  value={formData.examMode}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Independent">Independent</option>
                  <option value="SubCategory">Sub Category</option>
                </select>
              </div>

              {formData.examMode === 'SubCategory' && (
                <div className="form-group">
                  <label>Independent Subcategory</label>
                  <input 
                    type="text" 
                    name="independentSubcategory" 
                    value={formData.independentSubcategory}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <div className="form-group">
                <label>Exam Weightage</label>
                <input 
                  type="number" 
                  name="examWeightage" 
                  value={formData.examWeightage}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Independent Weightage</label>
                <input 
                  type="number" 
                  name="independentWeightage" 
                  value={formData.independentWeightage}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Min Marks <span className="required">*</span></label>
                <input 
                  type="number" 
                  name="minMarks" 
                  value={formData.minMarks}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Max Marks <span className="required">*</span></label>
                <input 
                  type="number" 
                  name="maxMarks" 
                  value={formData.maxMarks}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={resetForm}>
                <FiX /> Cancel
              </button>
              <button type="submit" className="btn-save">
                <FiSave /> {editingId ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-responsive" style={{ overflowX: 'auto' }}>
        <table className="table table-bordered table-hover" style={{ minWidth: '100%' }}>
          <thead className="table-light">
            <tr>
              <th style={{ width: '5%' }}>#</th>
              <th style={{ minWidth: '250px' }}>Class Type</th>
              <th style={{ minWidth: '200px' }}>Exam Type</th>
              <th style={{ width: '150px' }}>Exam Mode</th>
              <th style={{ width: '120px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {examCriteria.length > 0 ? (
              examCriteria.map((exam, index) => (
                <tr key={exam.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{exam.classType}</td>
                  <td>{exam.examType}</td>
                  <td className="text-center">
                    <span className={`badge ${exam.examMode === 'Independent' ? 'bg-primary' : 'bg-success'}`}>
                      {exam.examMode}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <button 
                        className="btn btn-sm btn-outline-primary rounded-circle p-2 d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px' }}
                        onClick={() => handleEdit(exam.id)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger rounded-circle p-2 d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px' }}
                        onClick={() => handleDelete(exam.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-muted">
                  <i className="fas fa-inbox me-2"></i>
                  No exam criteria found. Click 'Add New' to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamCriteria;
