import React, { useState } from 'react';
import { 
  FiSearch, FiChevronLeft, FiChevronRight, 
  FiChevronsLeft, FiChevronsRight, FiPlus,
  FiEdit2, FiTrash2, FiFileText, FiUser, FiCheck, 
  FiX, FiPrinter, FiDownload, FiEye, FiXCircle
} from 'react-icons/fi';

// Styles for the Admission page
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
  },
  header: {
    padding: '20px',
    borderBottom: '1px solid #e9ecef',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#2c3e50',
    margin: '0 0 15px 0',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '20px',
  },
  searchBox: {
    position: 'relative',
    width: '400px',
    maxWidth: '100%',
  },
  searchInput: {
    width: '100%',
    padding: '10px 15px 10px 40px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#777',
  },
  addButton: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #e9ecef',
  },
  tableHeaderCell: {
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#495057',
    fontSize: '14px',
    textTransform: 'uppercase',
  },
  tableCell: {
    padding: '14px 16px',
    color: '#495057',
    fontSize: '14px',
    borderBottom: '1px solid #e9ecef',
  },
  actionCell: {
    display: 'flex',
    gap: '8px',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    color: '#2196F3',
    '&:hover': {
      backgroundColor: 'rgba(33, 150, 243, 0.1)',
    },
  },
  deleteButton: {
    color: '#f44336',
    '&:hover': {
      backgroundColor: 'rgba(244, 67, 54, 0.1)',
    },
  },
  documentButton: {
    color: '#4CAF50',
    '&:hover': {
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
    },
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    borderTop: '1px solid #e9ecef',
    flexWrap: 'wrap',
    gap: '15px',
  },
  paginationInfo: {
    color: '#6c757d',
    fontSize: '14px',
  },
  paginationControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  itemsPerPage: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginRight: '15px',
  },
  select: {
    padding: '6px 8px',
    borderRadius: '4px',
    border: '1px solid #ced4da',
    backgroundColor: 'white',
    fontSize: '14px',
  },
  paginationButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  pageButton: {
    padding: '6px 12px',
    border: '1px solid #dee2e6',
    backgroundColor: 'white',
    color: '#007bff',
    cursor: 'pointer',
    borderRadius: '4px',
    minWidth: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:disabled': {
      color: '#6c757d',
      cursor: 'not-allowed',
      backgroundColor: '#e9ecef',
      borderColor: '#dee2e6',
    },
    '&:hover:not(:disabled)': {
      backgroundColor: '#f8f9fa',
    },
  },
  documentBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    minWidth: '80px',
    justifyContent: 'center',
    backgroundColor: '#e3f2fd',
    color: '#1565c0',
  },
};

// Document Viewer Modal Component
const DocumentViewer = ({ isOpen, onClose, documents }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '80%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          <FiXCircle />
        </button>
        
        <h3 style={{ marginTop: 0, color: '#333' }}>Student Documents</h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          {documents.map((doc, index) => (
            <div key={index} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              textAlign: 'center'
            }}>
              <div style={{
                height: '200px',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '10px',
                borderRadius: '4px',
                border: '1px dashed #ccc'
              }}>
                <FiFileText size={48} color="#666" />
              </div>
              <div style={{ fontWeight: '500', marginBottom: '10px' }}>{doc.name}</div>
              <button style={{
                padding: '6px 12px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                margin: '0 auto'
              }}>
                <FiDownload size={14} /> Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ID Card Generator Component
const IDCardGenerator = ({ isOpen, onClose, student }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '400px',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          <FiXCircle />
        </button>
        
        <div style={{
          border: '2px solid #e0e0e0',
          borderRadius: '10px',
          padding: '20px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            borderBottom: '1px solid #e0e0e0',
            paddingBottom: '10px'
          }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12px', color: '#666' }}>ID: {student.admissionNo}</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2c3e50' }}>SCHOOL NAME</div>
              <div style={{ fontSize: '10px', color: '#666' }}>City, State, Country</div>
            </div>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: '2px solid #fff',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
              <FiUser size={40} color="#666" />
            </div>
          </div>
          
          <div style={{ textAlign: 'left', marginBottom: '20px' }}>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '12px', color: '#666' }}>Name</div>
              <div style={{ fontSize: '16px', fontWeight: '500' }}>{student.studentName}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#666' }}>Class</div>
                <div style={{ fontSize: '14px' }}>{student.className}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#666' }}>DOB</div>
                <div style={{ fontSize: '14px' }}>01/01/2010</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#666' }}>Blood Group</div>
                <div style={{ fontSize: '14px' }}>O+</div>
              </div>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '12px', color: '#666' }}>Address</div>
              <div style={{ fontSize: '12px' }}>123 Street, City, State, Country</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#666' }}>Contact</div>
                <div style={{ fontSize: '12px' }}>{student.mobileNo}</div>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '100px',
                  height: '40px',
                  backgroundColor: '#f0f0f0',
                  marginBottom: '5px'
                }}></div>
                <div style={{ fontSize: '10px' }}>Principal's Signature</div>
              </div>
            </div>
          </div>
          
          <div style={{
            backgroundColor: '#2c3e50',
            color: 'white',
            padding: '5px',
            fontSize: '10px',
            borderRadius: '4px',
            marginTop: '10px'
          }}>
            School Address: 123 School St, City, State | Phone: (123) 456-7890 | Email: info@school.edu
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
          gap: '10px'
        }}>
          <button 
            onClick={() => window.print()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FiPrinter size={16} /> Print ID Card
          </button>
          <button 
            onClick={() => {}}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FiDownload size={16} /> Download
          </button>
        </div>
      </div>
    </div>
  );
};

const Admission = () => {
  // State for modals
  const [documentModal, setDocumentModal] = useState({
    isOpen: false,
    student: null
  });
  
  const [idCardModal, setIdCardModal] = useState({
    isOpen: false,
    student: null
  });

  // Sample document data
  const sampleDocuments = [
    { name: 'Aadhar Card (Front)' },
    { name: 'Aadhar Card (Back)' },
    { name: 'Transfer Certificate' },
    { name: 'Birth Certificate' },
    { name: 'Passport Size Photo' },
    { name: 'Address Proof' }
  ];

  // Sample data
  const [admissions, setAdmissions] = useState([
    { id: 1, admissionNo: 'ADM/2025/0490', studentName: 'sddsds', className: '3', mobileNo: '8765432189', admissionForm: true, identityCard: false },
    { id: 2, admissionNo: 'ADM/2025/0489', studentName: 'Addy', className: '2', mobileNo: '4433443343', admissionForm: true, identityCard: true },
    { id: 3, admissionNo: 'ADM/2025/0484', studentName: 'KARUNA', className: '2', mobileNo: '9268655510', admissionForm: true, identityCard: true },
    { id: 4, admissionNo: 'ADM/2025/0483', studentName: 'Barry', className: '6', mobileNo: '3333333333', admissionForm: true, identityCard: false },
    { id: 5, admissionNo: 'ADM/2025/0482', studentName: 'Wasim', className: '4', mobileNo: '2222222222', admissionForm: true, identityCard: true },
    { id: 6, admissionNo: 'ADM/2025/0433', studentName: 'Sourav', className: 'UKG', mobileNo: '9876485278', admissionForm: true, identityCard: true },
    { id: 7, admissionNo: 'ADM/2025/0411', studentName: 'Shahrukh khan', className: '5', mobileNo: '9786543200', admissionForm: true, identityCard: false },
    { id: 8, admissionNo: 'ADM/2025/0410', studentName: 'Ajay', className: '3', mobileNo: '9798654320', admissionForm: true, identityCard: true },
    { id: 9, admissionNo: 'ADM/2025/0409', studentName: 'Sony', className: 'Nur', mobileNo: '9871195060', admissionForm: true, identityCard: true },
    { id: 10, admissionNo: 'ADM/2025/0408', studentName: 'Muhammad', className: 'Nur', mobileNo: '9871115065', admissionForm: true, identityCard: false },
    { id: 11, admissionNo: 'ADM/2025/0407', studentName: 'Tony', className: '2', mobileNo: '9871115063', admissionForm: true, identityCard: true },
    { id: 12, admissionNo: 'ADM/2025/0406', studentName: 'Ben', className: '2', mobileNo: '9879868765', admissionForm: true, identityCard: true },
    { id: 13, admissionNo: 'ADM/2025/0404', studentName: 'William', className: '3', mobileNo: '9879868765', admissionForm: true, identityCard: false },
    { id: 14, admissionNo: 'ADM/2025/0402', studentName: 'Bob', className: '3', mobileNo: '9879868765', admissionForm: true, identityCard: true },
    { id: 15, admissionNo: 'ADM/2025/0401', studentName: 'Binod', className: '3', mobileNo: '9871115060', admissionForm: true, identityCard: true },
    { id: 16, admissionNo: 'ADM/2025/0400', studentName: 'Ejaz', className: '3', mobileNo: '9786543210', admissionForm: true, identityCard: false },
    { id: 17, admissionNo: 'ADM/2025/0399', studentName: 'AARAV', className: '2', mobileNo: '9953323710', admissionForm: true, identityCard: true },
    { id: 18, admissionNo: 'ADM/2025/0398', studentName: 'Rubina', className: '3', mobileNo: '8765890765', admissionForm: true, identityCard: true },
    { id: 19, admissionNo: 'ADM/2025/0397', studentName: 'hiba', className: '4', mobileNo: '8975898989', admissionForm: true, identityCard: false },
    { id: 20, admissionNo: 'ADM/2025/0395', studentName: 'AnualStudent', className: '2', mobileNo: '9871115060', admissionForm: true, identityCard: true },
    { id: 21, admissionNo: 'ADM/2025/0394', studentName: 'Student', className: '1', mobileNo: '9871115060', admissionForm: true, identityCard: true },
    { id: 22, admissionNo: 'ADM/2025/0389', studentName: 'newStudent1', className: '1', mobileNo: '9871115060', admissionForm: true, identityCard: false },
    { id: 23, admissionNo: 'ADM/2025/0378', studentName: 'Maria', className: '1', mobileNo: '8527441343', admissionForm: true, identityCard: true },
    { id: 24, admissionNo: 'ADM/2025/0377', studentName: 'Suhana', className: '3', mobileNo: '9754321894', admissionForm: true, identityCard: true },
    { id: 25, admissionNo: 'ADM/2025/0376', studentName: 'Madhuri', className: '3', mobileNo: '8989898989', admissionForm: true, identityCard: false },
    { id: 26, admissionNo: 'ADM/2025/0331', studentName: 'Jaya', className: 'Nur', mobileNo: '9871115060', admissionForm: true, identityCard: true },
    { id: 27, admissionNo: 'ADM/2025/0330', studentName: 'YANSH', className: 'Nur', mobileNo: '9879868765', admissionForm: true, identityCard: true },
    { id: 28, admissionNo: 'ADM/2025/0326', studentName: 'Mohammad', className: 'Nur', mobileNo: '8862995850', admissionForm: true, identityCard: false },
    { id: 29, admissionNo: 'ADM/2025/0325', studentName: 'Mohammad', className: 'Nur', mobileNo: '8862995850', admissionForm: true, identityCard: true },
    { id: 30, admissionNo: 'ADM/2025/0324', studentName: 'Mohammad', className: 'Nur', mobileNo: '8862995850', admissionForm: true, identityCard: true },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter admissions based on search term
  const filteredAdmissions = admissions.filter(admission => {
    const searchLower = searchTerm.toLowerCase();
    return (
      admission.admissionNo.toLowerCase().includes(searchLower) ||
      admission.studentName.toLowerCase().includes(searchLower) ||
      admission.className.toLowerCase().includes(searchLower) ||
      admission.mobileNo.includes(searchTerm)
    );
  });

  // Get current admissions for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAdmissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAdmissions.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Render document status with view button
  const renderDocumentStatus = (hasDocument, student) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{
        ...styles.documentBadge,
        backgroundColor: hasDocument ? '#e3f2fd' : '#ffebee',
        color: hasDocument ? '#1565c0' : '#c62828'
      }}>
        {hasDocument ? (
          <>
            <FiCheck size={14} /> Submitted
          </>
        ) : (
          <>
            <FiX size={14} /> Pending
          </>
        )}
      </span>
      {hasDocument && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setDocumentModal({ isOpen: true, student });
          }}
          style={{
            ...styles.iconButton,
            color: '#2196F3',
            '&:hover': {
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
            },
          }}
          title="View Documents"
        >
          <FiEye size={16} />
        </button>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.tableContainer}>
        <div style={styles.header}>
          <h2 style={styles.title}>Admission Details</h2>
          <div style={styles.searchContainer}>
            <div style={styles.searchBox}>
              <FiSearch style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by admission no, name, class, or mobile..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                style={styles.searchInput}
              />
            </div>
            <button style={styles.addButton}>
              <FiPlus /> Add New Admission
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Admission No</th>
                <th style={styles.tableHeaderCell}>Student Name</th>
                <th style={styles.tableHeaderCell}>Class</th>
                <th style={styles.tableHeaderCell}>Mobile No</th>
                <th style={styles.tableHeaderCell}>Admission Form</th>
                <th style={styles.tableHeaderCell}>Identity Card</th>
                <th style={styles.tableHeaderCell}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((admission) => (
                  <tr key={admission.id}>
                    <td style={styles.tableCell}>
                      <span style={{ fontFamily: 'monospace', fontWeight: '500' }}>
                        {admission.admissionNo}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiUser size={16} color="#6c757d" />
                        {admission.studentName}
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={{
                        backgroundColor: '#e9f7ef',
                        color: '#0a5c36',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                      }}>
                        {admission.className}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <a href={`tel:${admission.mobileNo}`} style={{ color: '#2196F3', textDecoration: 'none' }}>
                        {admission.mobileNo}
                      </a>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        marginBottom: '4px',
                        flexDirection: 'column'
                      }}>
                        {admission.admissionForm && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              window.print(); // This will trigger the browser's print dialog
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#4CAF50',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              backgroundColor: 'rgba(76, 175, 80, 0.1)',
                              '&:hover': {
                                backgroundColor: 'rgba(76, 175, 80, 0.2)'
                              }
                            }}
                            title="Print Admission Form"
                          >
                            <FiPrinter size={14} style={{ marginRight: '4px' }} /> Print
                          </button>
                        )}
                        {renderDocumentStatus(admission.admissionForm, admission)}
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        marginBottom: '4px',
                        flexDirection: 'column'
                      }}>
                        {admission.identityCard && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setIdCardModal({ isOpen: true, student: admission });
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#2196F3',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              backgroundColor: 'rgba(33, 150, 243, 0.1)',
                              '&:hover': {
                                backgroundColor: 'rgba(33, 150, 243, 0.2)'
                              }
                            }}
                            title="Generate ID Card"
                          >
                            <FiFileText size={14} style={{ marginRight: '4px' }} /> Generate
                          </button>
                        )}
                        {renderDocumentStatus(admission.identityCard, admission)}
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.actionCell}>
                        <button 
                          style={{ ...styles.iconButton, ...styles.editButton }}
                          title="Edit Admission"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button 
                          style={{ ...styles.iconButton, ...styles.documentButton }}
                          title="View Documents"
                        >
                          <FiFileText size={16} />
                        </button>
                        <button 
                          style={{ ...styles.iconButton, ...styles.deleteButton }}
                          title="Delete Admission"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
                    No admission records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={styles.pagination}>
          <div style={styles.paginationInfo}>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredAdmissions.length)} of {filteredAdmissions.length} entries
          </div>
          <div style={styles.paginationControls}>
            <div style={styles.itemsPerPage}>
              <span>Show</span>
              <select 
                value={itemsPerPage} 
                onChange={handleItemsPerPageChange}
                style={styles.select}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>entries</span>
            </div>
            
            <div style={styles.paginationButtons}>
              <button 
                onClick={() => paginate(1)} 
                disabled={currentPage === 1}
                title="First Page"
                style={styles.pageButton}
              >
                <FiChevronsLeft />
              </button>
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                title="Previous Page"
                style={styles.pageButton}
              >
                <FiChevronLeft />
              </button>
              <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages || 1}</span>
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === totalPages || totalPages === 0}
                title="Next Page"
                style={styles.pageButton}
              >
                <FiChevronRight />
              </button>
              <button 
                onClick={() => paginate(totalPages)} 
                disabled={currentPage === totalPages || totalPages === 0}
                title="Last Page"
                style={styles.pageButton}
              >
                <FiChevronsRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Document Viewer Modal */}
      <DocumentViewer 
        isOpen={documentModal.isOpen}
        onClose={() => setDocumentModal({ isOpen: false, student: null })}
        documents={sampleDocuments}
      />
      
      {/* ID Card Generator Modal */}
      <IDCardGenerator 
        isOpen={idCardModal.isOpen}
        onClose={() => setIdCardModal({ isOpen: false, student: null })}
        student={idCardModal.student || {}}
      />
    </div>
  );
};

export default Admission;
