import React, { useState } from 'react';
import { FiSearch, FiEdit2, FiCopy, FiEye, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import './MessageTemplate.css';

const MessageTemplate = () => {
  // Sample data for message templates
  const [templates, setTemplates] = useState([
    {
      id: 1,
      formName: 'DUE_REMINDER',
      templateText: `Reminder!!!

Dear {name},
This is a gentle reminder that your fee for {month} is due. Please find the details below:

Total Amount: {totalFee}
Paid Amount: {paidAmount}
Outstanding Balance: {OutstandingBalance}
Due Date: {dueDate}

To avoid any late fees, kindly make the payment by the due date.

For any queries, please get in touch with the school's administration at 898787687.

Thank you for your prompt attention to this matter.
Warm regards,

JEEVAN ADARSH VIDYALAYA.`,
      placeholders: ['name', 'month', 'totalFee', 'paidAmount', 'OutstandingBalance', 'dueDate']
    },
    {
      id: 2,
      formName: 'ADMISSION',
      templateText: `🌟 Admission Confirmation 🌟

Dear {name},

Congratulations! We are pleased to inform you that your admission to JEEVAN ADARSH VIDYALAYA has been successfully completed.

Here are the details of your admission:
Class : {class}
Section: {section}
Roll No: {rollNo}
Admission Date: {admissionDate}
Admission Number: {admissionNumber}

We are excited to welcome you to our school community! For any queries or further information, please contact us.

Warm regards,

JEEVAN ADARSH VIDYALAYA`,
      placeholders: ['name', 'class', 'section', 'rollNo', 'admissionDate', 'admissionNumber', 'schoolName']
    },
    {
      id: 3,
      formName: 'ENQUIRY',
      templateText: `🌟 Enquiry Confirmation 🌟

Dear {name},

Thank you for your interest in Gyanm Senior Secondary School! We have received your enquiry.

Enquiry Details:
Enquiry ID: {enquiryId}
Date: {enquiryDate}
Contact Number: {contactNo}
Class of Interest: {class}

Our team will reach out to you soon. For immediate assistance, please contact us at 9898989898.

Warm regards,
Gyanm Senior Secondary School`,
      placeholders: ['name', 'enquiryId', 'enquiryDate', 'contactNo', 'class']
    },
    {
      id: 4,
      formName: 'REGISTRATION',
      templateText: `🌟 Registration Confirmation 🌟

Dear {parentName},

Congratulations! The registration for {studentName} at Gyanm Senior Secondary School has been successfully completed.

Registration Details:
Class: {class}
Registration ID: {registrationId}
Registration Date: {registrationDate}
Contact Number: {contactNo}

We look forward to welcoming {studentName} to our school community! For any queries, please contact us at 89787676.

Warm regards,
Gyanm Senior Secondary School`,
      placeholders: ['parentName', 'studentName', 'class', 'registrationId', 'registrationDate', 'contactNo']
    },
    {
      id: 5,
      formName: 'DUESREMINDER',
      templateText: `🌟 Fee Dues Reminder 🌟

Dear {fathersName},

This is a reminder regarding the outstanding fee dues for {studentName} at JEEVAN ADARSH VIDYALAYA.

Dues Details:
Admission No: {admissionNo}
Month: {month}
Total Fee: {totalFee}
Paid Amount: {paidAmount}
Outstanding Balance: {outstandingBalance}
Contact Number: {mobileNo}

Please settle the outstanding balance at the earliest. For any queries, contact us, Ignore if you have already paid.

Warm regards,
JEEVAN ADARSH VIDYALAYA`,
      placeholders: ['fathersName', 'studentName', 'admissionNo', 'month', 'totalFee', 'paidAmount', 'outstandingBalance', 'mobileNo']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState({
    id: null,
    formName: '',
    templateText: '',
    placeholders: []
  });
  const [expandedTemplates, setExpandedTemplates] = useState({});

  // Filter templates based on search term
  const filteredTemplates = templates.filter(template =>
    template.formName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.templateText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTemplate(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentTemplate.formName.trim() || !currentTemplate.templateText.trim()) {
      alert('Form Name and Template Text are required');
      return;
    }

    if (currentTemplate.id) {
      // Update existing template
      setTemplates(templates.map(template => 
        template.id === currentTemplate.id ? currentTemplate : template
      ));
    } else {
      // Add new template
      const newTemplate = {
        ...currentTemplate,
        id: templates.length > 0 ? Math.max(...templates.map(t => t.id)) + 1 : 1,
        placeholders: extractPlaceholders(currentTemplate.templateText)
      };
      setTemplates([...templates, newTemplate]);
    }

    // Reset form
    setCurrentTemplate({
      id: null,
      formName: '',
      templateText: '',
      placeholders: []
    });
    setIsEditModalOpen(false);
  };

  // Extract placeholders from template text
  const extractPlaceholders = (text) => {
    const regex = /{([^}]+)}/g;
    const placeholders = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (!placeholders.includes(match[1])) {
        placeholders.push(match[1]);
      }
    }
    return placeholders;
  };

  // Handle edit
  const handleEdit = (template) => {
    setCurrentTemplate({ ...template });
    setIsEditModalOpen(true);
  };

  // Handle view
  const handleView = (template) => {
    setSelectedTemplate(template);
    setIsViewModalOpen(true);
  };

  // Handle template text change and update placeholders
  const handleTemplateTextChange = (e) => {
    const text = e.target.value;
    const placeholders = extractPlaceholders(text);
    
    setCurrentTemplate(prev => ({
      ...prev,
      templateText: text,
      placeholders
    }));
  };

  // Toggle template expansion
  const toggleTemplateExpand = (id) => {
    setExpandedTemplates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Copy template to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Template copied to clipboard!');
  };

  return (
    <div className="message-template-container">
      <div className="page-header">
        <h2>Message Templates</h2>
        <p>Manage your message templates for various communications</p>
      </div>

      <div className="template-actions">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setCurrentTemplate({
              id: null,
              formName: '',
              templateText: '',
              placeholders: []
            });
            setIsEditModalOpen(true);
          }}
        >
          + Add New Template
        </button>
      </div>

      <div className="templates-list">
        {filteredTemplates.length > 0 ? (
          <div className="templates-table">
            <div className="table-header">
              <div className="table-row">
                <div className="table-cell">Form Name</div>
                <div className="table-cell">Template Preview</div>
                <div className="table-cell actions-cell">Actions</div>
              </div>
            </div>
            <div className="table-body">
              {filteredTemplates.map(template => (
                <div key={template.id} className="template-item">
                  <div 
                    className="template-header"
                    onClick={() => toggleTemplateExpand(template.id)}
                  >
                    <div className="table-cell">
                      <span className="expand-icon">
                        {expandedTemplates[template.id] ? <FiChevronDown /> : <FiChevronRight />}
                      </span>
                      {template.formName}
                    </div>
                    <div className="table-cell preview">
                      {template.templateText.split('\n')[0].substring(0, 80)}...
                    </div>
                    <div className="table-cell actions-cell">
                      <button 
                        className="btn-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleView(template);
                        }}
                        title="View"
                      >
                        <FiEye />
                      </button>
                      <button 
                        className="btn-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(template);
                        }}
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        className="btn-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(template.templateText);
                        }}
                        title="Copy to clipboard"
                      >
                        <FiCopy />
                      </button>
                    </div>
                  </div>
                  {expandedTemplates[template.id] && (
                    <div className="template-details">
                      <div className="template-preview">
                        <h4>Template Preview:</h4>
                        <div className="template-text">
                          {template.templateText.split('\n').map((line, i) => (
                            <div key={i} className="template-line">
                              {line.split(/({[^}]+})/g).map((part, j) => {
                                if (part.startsWith('{') && part.endsWith('}')) {
                                  return <span key={j} className="placeholder">{part}</span>;
                                }
                                return part;
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="placeholders">
                        <h4>Placeholders:</h4>
                        <div className="placeholder-tags">
                          {template.placeholders.map((placeholder, index) => (
                            <span key={index} className="placeholder-tag">
                              {`{${placeholder}}`}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-results">
            No templates found. Try a different search or add a new template.
          </div>
        )}
      </div>

      {/* View Template Modal */}
      {isViewModalOpen && selectedTemplate && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>View Template: {selectedTemplate.formName}</h3>
              <button 
                className="close-btn"
                onClick={() => setIsViewModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label>Template Text</label>
                <div className="template-content">
                  {selectedTemplate.templateText.split('\n').map((line, i) => (
                    <div key={i} className="template-line">
                      {line.split(/({[^}]+})/g).map((part, j) => {
                        if (part.startsWith('{') && part.endsWith('}')) {
                          return <span key={j} className="placeholder">{part}</span>;
                        }
                        return part;
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Placeholders</label>
                <div className="placeholder-tags">
                  {selectedTemplate.placeholders.map((placeholder, index) => (
                    <span key={index} className="placeholder-tag">
                      {`{${placeholder}}`}
                    </span>
                  ))}
                </div>
              </div>
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setIsViewModalOpen(false)}
                >
                  Close
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => {
                    copyToClipboard(selectedTemplate.templateText);
                  }}
                >
                  <FiCopy /> Copy to Clipboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Add Template Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{currentTemplate.id ? 'Edit' : 'Add New'} Template</h3>
              <button 
                className="close-btn"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setCurrentTemplate({
                    id: null,
                    formName: '',
                    templateText: '',
                    placeholders: []
                  });
                }}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Form Name <span className="required">*</span></label>
                <input
                  type="text"
                  name="formName"
                  value={currentTemplate.formName}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter form name (e.g., DUE_REMINDER)"
                  required
                />
              </div>
              <div className="form-group">
                <label>Template Text <span className="required">*</span></label>
                <textarea
                  name="templateText"
                  value={currentTemplate.templateText}
                  onChange={handleTemplateTextChange}
                  className="form-control template-textarea"
                  rows={10}
                  placeholder="Enter your template text. Use {placeholder} for variables."
                  required
                />
                <div className="hint">
                  Use curly braces {} to define placeholders (e.g., {`{name}, {amount}`})
                </div>
              </div>
              
              {currentTemplate.placeholders.length > 0 && (
                <div className="form-group">
                  <label>Detected Placeholders</label>
                  <div className="placeholder-tags">
                    {currentTemplate.placeholders.map((placeholder, index) => (
                      <span key={index} className="placeholder-tag">
                        {`{${placeholder}}`}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setCurrentTemplate({
                      id: null,
                      formName: '',
                      templateText: '',
                      placeholders: []
                    });
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {currentTemplate.id ? 'Update' : 'Create'} Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageTemplate;
