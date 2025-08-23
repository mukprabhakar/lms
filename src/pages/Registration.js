import React, { useState } from 'react';
import { 
  FiSearch, FiChevronLeft, FiChevronRight, 
  FiChevronsLeft, FiChevronsRight, FiPlus, 
  FiEdit2, FiTrash2, FiFilter, FiDownload, 
  FiPrinter, FiRefreshCw, FiCalendar 
} from 'react-icons/fi';
import { format } from 'date-fns';
import '../components/Table.css';

// Add custom styles for the Registration page
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '15px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#2c3e50',
    margin: 0,
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  button: {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    border: '1px solid #ddd',
  },
  searchContainer: {
    position: 'relative',
    width: '300px',
    maxWidth: '100%',
  },
  searchBox: {
    width: '100%',
    padding: '10px 15px 10px 40px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
    transition: 'border-color 0.3s ease',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#777',
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
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
    letterSpacing: '0.5px',
  },
  tableRow: {
    borderBottom: '1px solid #e9ecef',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#f8f9fa',
    },
  },
  tableCell: {
    padding: '14px 16px',
    color: '#495057',
    fontSize: '14px',
  },
  actionCell: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-start',
  },
  editButton: {
    color: '#2196F3',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: 'rgba(33, 150, 243, 0.1)',
    },
  },
  deleteButton: {
    color: '#f44336',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: 'rgba(244, 67, 54, 0.1)',
    },
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: 'white',
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
  activePage: {
    backgroundColor: '#007bff',
    color: 'white',
    borderColor: '#007bff',
    '&:hover': {
      backgroundColor: '#0069d9',
    },
  },
  statusBadge: {
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  statusActive: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  statusInactive: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
};

const Registration = () => {
  // Sample registration data
  const [registrations, setRegistrations] = useState([
    {
      id: 1,
      studentName: 'Rahul Sharma',
      className: '5',
      mobileNo: '9876543210',
      registrationNo: 'REG25S0045',
      registrationDate: '08/22/2025',
      registrationFee: '500.00'
    },
    {
      id: 2,
      studentName: 'Priya Patel',
      className: '3',
      mobileNo: '8765432109',
      registrationNo: 'REG25S0044',
      registrationDate: '08/21/2025',
      registrationFee: '500.00'
    },
    {
      id: 3,
      studentName: 'Amit Kumar',
      className: '7',
      mobileNo: '7654321098',
      registrationNo: 'REG25S0043',
      registrationDate: '08/20/2025',
      registrationFee: '750.00'
    },
    {
      id: 4,
      studentName: 'Sneha Gupta',
      className: 'Nur',
      mobileNo: '6543210987',
      registrationNo: 'REG25S0042',
      registrationDate: '08/19/2025',
      registrationFee: '300.00'
    },
    {
      id: 5,
      studentName: 'Vikram Singh',
      className: '2',
      mobileNo: '5432109876',
      registrationNo: 'REG25S0041',
      registrationDate: '08/18/2025',
      registrationFee: '500.00'
    },
    {
      id: 6,
      studentName: 'Ananya Reddy',
      className: '4',
      mobileNo: '4321098765',
      registrationNo: 'REG25S0040',
      registrationDate: '08/17/2025',
      registrationFee: '500.00'
    },
    {
      id: 7,
      studentName: 'Rohan Malhotra',
      className: '6',
      mobileNo: '3210987654',
      registrationNo: 'REG25S0039',
      registrationDate: '08/16/2025',
      registrationFee: '750.00'
    },
    {
      id: 8,
      studentName: 'Meera Iyer',
      className: '1',
      mobileNo: '2109876543',
      registrationNo: 'REG25S0038',
      registrationDate: '08/15/2025',
      registrationFee: '500.00'
    },
    {
      id: 9,
      studentName: 'Arjun Kapoor',
      className: 'UKG',
      mobileNo: '1098765432',
      registrationNo: 'REG25S0037',
      registrationDate: '08/14/2025',
      registrationFee: '300.00'
    },
    {
      id: 10,
      studentName: 'Neha Verma',
      className: 'LKG',
      mobileNo: '9871115060',
      registrationNo: 'REG25S0036',
      registrationDate: '08/13/2025',
      registrationFee: '300.00'
    },
    {
      id: 11,
      studentName: 'Aarav Desai',
      className: 'Nur',
      mobileNo: '5986748269',
      registrationNo: 'REG25S0035',
      registrationDate: '08/12/2025',
      registrationFee: '300.00'
    },
    {
      id: 12,
      studentName: 'Ishaan Nair',
      className: '5',
      mobileNo: '9871115061',
      registrationNo: 'REG25S0034',
      registrationDate: '08/11/2025',
      registrationFee: '500.00'
    },
    {
      id: 13,
      studentName: 'Kavya Menon',
      className: '3',
      mobileNo: '9871115062',
      registrationNo: 'REG25S0033',
      registrationDate: '08/10/2025',
      registrationFee: '500.00'
    },
    {
      id: 14,
      studentName: 'Vivaan Khanna',
      className: '2',
      mobileNo: '9871115063',
      registrationNo: 'REG25S0032',
      registrationDate: '08/09/2025',
      registrationFee: '500.00'
    },
    {
      id: 15,
      studentName: 'Anika Joshi',
      className: '4',
      mobileNo: '9871115064',
      registrationNo: 'REG25S0031',
      registrationDate: '08/08/2025',
      registrationFee: '500.00'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter registrations based on search term
  const filteredRegistrations = registrations.filter(registration => {
    const searchLower = searchTerm.toLowerCase();
    return (
      registration.studentName.toLowerCase().includes(searchLower) ||
      registration.className.toLowerCase().includes(searchLower) ||
      registration.mobileNo.includes(searchTerm) ||
      registration.registrationNo.toLowerCase().includes(searchLower)
    );
  });

  // Get current registrations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRegistrations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return parseFloat(amount).toFixed(2);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <div style={styles.tableContainer}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e9ecef' }}>
          <div style={{ ...styles.header, flexDirection: 'column', alignItems: 'flex-start', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <h2 style={styles.title}>Student Details</h2>
              <div style={styles.actionButtons}>
                <button 
                  style={{ ...styles.button, ...styles.primaryButton }}
                  onClick={() => {/* Add new registration logic */}}
                >
                  <FiPlus /> Add New
                </button>
              </div>
            </div>
            <div style={{ width: '100%', display: 'flex', gap: '10px' }}>
              <div style={{ ...styles.searchContainer, width: '400px', maxWidth: '100%' }}>
                <FiSearch style={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search by name, class, or registration no..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={styles.searchBox}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Student Name</th>
                <th style={styles.tableHeaderCell}>Class</th>
                <th style={styles.tableHeaderCell}>Mobile No.</th>
                <th style={styles.tableHeaderCell}>Registration No.</th>
                <th style={styles.tableHeaderCell}>Registration Date</th>
                <th style={{ ...styles.tableHeaderCell, textAlign: 'right' }}>Registration Fee</th>
                <th style={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((registration) => (
                  <tr key={registration.id} style={styles.tableRow}>
                    <td style={{ ...styles.tableCell, fontWeight: '500' }}>{registration.studentName}</td>
                    <td style={styles.tableCell}>
                      <span style={{
                        backgroundColor: '#e9f7ef',
                        color: '#0a5c36',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                      }}>
                        {registration.className}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <a href={`tel:${registration.mobileNo}`} style={{ color: '#2196F3', textDecoration: 'none' }}>
                        {registration.mobileNo}
                      </a>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={{ 
                        backgroundColor: '#e3f2fd', 
                        padding: '4px 8px', 
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                        fontSize: '13px'
                      }}>
                        {registration.registrationNo}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FiCalendar size={14} color="#6c757d" />
                        {registration.registrationDate}
                      </span>
                    </td>
                    <td style={{ ...styles.tableCell, textAlign: 'right', fontWeight: '600', color: '#2e7d32' }}>
                      ₹{formatCurrency(registration.registrationFee)}
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.actionCell}>
                        <button 
                          style={styles.editButton}
                          title="Edit Registration"
                          onClick={() => {/* Edit logic */}}
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button 
                          style={styles.deleteButton}
                          title="Delete Registration"
                          onClick={() => {/* Delete logic */}}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#6c757d' }}>
                    No registration records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={styles.paginationContainer}>
          <div style={styles.paginationInfo}>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredRegistrations.length)} of {filteredRegistrations.length} entries
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
    </div>
  );
};

export default Registration;
