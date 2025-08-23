import React, { useState } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiPlus } from 'react-icons/fi';
import { format, parse } from 'date-fns';
import '../components/Table.css';

const Enquiry = () => {
  // Sample enquiry data
  const [enquiries, setEnquiries] = useState([
    {
      id: 1,
      enquiryNo: 'ENQ25S0060',
      enquiryDate: '20/07/2025',
      studentName: 'Aarav Sharma',
      fatherName: 'Rahul Sharma',
      email: 'aarav.sharma@example.com',
      contactNo: '9876543210',
      className: '4',
      status: 'New'
    },
    {
      id: 2,
      enquiryNo: 'ENQ25S0059',
      enquiryDate: '18/07/2025',
      studentName: 'Ishaan Patel',
      fatherName: 'Vikram Patel',
      email: 'ishaan.p@example.com',
      contactNo: '8765432109',
      className: '5',
      status: 'Follow Up'
    },
    {
      id: 3,
      enquiryNo: 'ENQ25S0058',
      enquiryDate: '17/07/2025',
      studentName: 'Ananya Gupta',
      fatherName: 'Rajesh Gupta',
      email: 'ananya.g@example.com',
      contactNo: '7654321098',
      className: '3',
      status: 'New'
    },
    {
      id: 4,
      enquiryNo: 'ENQ25S0057',
      enquiryDate: '15/07/2025',
      studentName: 'Bob',
      fatherName: 'Adam',
      email: 'N/A',
      contactNo: '5675545534',
      className: '3',
      status: 'N/A'
    },
    {
      id: 5,
      enquiryNo: 'ENQ25S0056',
      enquiryDate: '14/07/2025',
      studentName: 'Priya Singh',
      fatherName: 'Amit Singh',
      email: 'priya.s@example.com',
      contactNo: '6543210987',
      className: '2',
      status: 'Converted'
    },
    {
      id: 6,
      enquiryNo: 'ENQ25S0055',
      enquiryDate: '12/07/2025',
      studentName: 'Rahul Mehta',
      fatherName: 'Sanjay Mehta',
      email: 'rahul.m@example.com',
      contactNo: '5432109876',
      className: '7',
      status: 'Follow Up'
    },
    {
      id: 7,
      enquiryNo: 'ENQ25S0054',
      enquiryDate: '10/07/2025',
      studentName: 'Sneha Reddy',
      fatherName: 'Arun Reddy',
      email: 'sneha.r@example.com',
      contactNo: '4321098765',
      className: 'UKG',
      status: 'New'
    },
    {
      id: 8,
      enquiryNo: 'ENQ25S0053',
      enquiryDate: '09/07/2025',
      studentName: 'Vikram Joshi',
      fatherName: 'Prakash Joshi',
      email: 'vikram.j@example.com',
      contactNo: '3210987654',
      className: '1',
      status: 'Converted'
    },
    {
      id: 9,
      enquiryNo: 'ENQ25S0052',
      enquiryDate: '08/07/2025',
      studentName: 'Neha Kapoor',
      fatherName: 'Raj Kapoor',
      email: 'neha.k@example.com',
      contactNo: '2109876543',
      className: '6',
      status: 'New'
    },
    {
      id: 10,
      enquiryNo: 'ENQ25S0051',
      enquiryDate: '08/07/2025',
      studentName: 'Rohan Malhotra',
      fatherName: 'Amit Malhotra',
      email: 'rohan.m@example.com',
      contactNo: '1098765432',
      className: '4',
      status: 'Follow Up'
    },
    {
      id: 11,
      enquiryNo: 'ENQ25S0050',
      enquiryDate: '08/07/2025',
      studentName: 'aaaaaaaaaaaaa',
      fatherName: 'dddd',
      email: 'N/A',
      contactNo: '4567890325',
      className: '3',
      status: 'N/A'
    },
    {
      id: 12,
      enquiryNo: 'ENQ25S0049',
      enquiryDate: '08/07/2025',
      studentName: 'Shifa',
      fatherName: 'Ahmad',
      email: 'abc@gmail.com',
      contactNo: '97984372896',
      className: '3',
      status: 'N/A'
    },
    {
      id: 13,
      enquiryNo: 'ENQ25S0048',
      enquiryDate: '26/06/2025',
      studentName: 'rayyan',
      fatherName: 'shayaan',
      email: 'rayyan@gmai.com',
      contactNo: '8484046946',
      className: '6',
      status: 'N/A'
    },
    {
      id: 14,
      enquiryNo: 'ENQ25S0047',
      enquiryDate: '17/06/2025',
      studentName: 'Hiba',
      fatherName: 'Ayaz',
      email: 'N/A',
      contactNo: '5689759864',
      className: 'Nur',
      status: 'N/A'
    },
    {
      id: 15,
      enquiryNo: 'ENQ25S0046',
      enquiryDate: '15/06/2025',
      studentName: 'Arjun Kumar',
      fatherName: 'Ravi Kumar',
      email: 'arjun.k@example.com',
      contactNo: '9876543210',
      className: '5',
      status: 'Converted'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter enquiries based on search term
  const filteredEnquiries = enquiries.filter(enquiry => {
    const searchLower = searchTerm.toLowerCase();
    return (
      enquiry.enquiryNo.toLowerCase().includes(searchLower) ||
      enquiry.studentName.toLowerCase().includes(searchLower) ||
      enquiry.fatherName.toLowerCase().includes(searchLower) ||
      enquiry.email.toLowerCase().includes(searchLower) ||
      enquiry.contactNo.includes(searchTerm) ||
      enquiry.className.toLowerCase().includes(searchLower)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEnquiries.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Format date to dd/MM/yyyy
  const formatDate = (dateString) => {
    try {
      const date = parse(dateString, 'dd/MM/yyyy', new Date());
      return format(date, 'dd/MM/yyyy');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header-top">
          <h1>Enquiry</h1>
          <div className="header-actions">
            <div className="entity-count">
              <span>{enquiries.length}</span>
            </div>
            <button className="btn btn-primary">
              <FiPlus /> Add New
            </button>
          </div>
        </div>
        <div className="search-container">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search enquiries..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      <div className="table-actions">
        <div className="items-per-page">
          <label>Show</label>
          <select 
            value={itemsPerPage} 
            onChange={handleItemsPerPageChange}
            className="page-select"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span>entries</span>
        </div>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Enquiry No.</th>
              <th>Enquiry Date</th>
              <th>Student Name</th>
              <th>Father Name</th>
              <th>Email-Id</th>
              <th>Contact No.</th>
              <th>Class</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((enquiry) => (
                <tr key={enquiry.id}>
                  <td>{enquiry.enquiryNo}</td>
                  <td>{formatDate(enquiry.enquiryDate)}</td>
                  <td>{enquiry.studentName}</td>
                  <td>{enquiry.fatherName}</td>
                  <td>{enquiry.email}</td>
                  <td>{enquiry.contactNo}</td>
                  <td>{enquiry.className}</td>
                  <td>
                    <span className="status-badge">{enquiry.status}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn btn-sm btn-primary"
                        title="View Details"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-info">
          Showing {filteredEnquiries.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredEnquiries.length)} of {filteredEnquiries.length} entries
        </div>
        
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              title="First Page"
            >
              <FiChevronsLeft />
            </button>
            <button 
              className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
              title="Previous Page"
            >
              <FiChevronLeft />
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => paginate(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
              title="Next Page"
            >
              <FiChevronRight />
            </button>
            <button 
              className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              title="Last Page"
            >
              <FiChevronsRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enquiry;
