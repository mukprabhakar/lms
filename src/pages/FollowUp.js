import React, { useState } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiPlus, FiCalendar, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { format, parse, addDays } from 'date-fns';
import '../components/Table.css';

const FollowUp = () => {
  // Sample follow-up data
  const [followUps, setFollowUps] = useState([
    {
      id: 1,
      enquiryNo: 'ENQ24S0033',
      parentName: 'abdul',
      contactNo: '9871115064',
      enquiryDate: '20/06/2024',
      followUpDate: '25/07/2024',
      status: 'Pending',
      assignedTo: 'Staff',
      remarks: 'Need to discuss fees',
      followUpType: 'Call'
    },
    {
      id: 2,
      enquiryNo: 'ENQ24S0034',
      parentName: 'test',
      contactNo: '7870451234',
      enquiryDate: '25/06/2024',
      followUpDate: '30/07/2024',
      status: 'Pending',
      assignedTo: 'Staff',
      remarks: 'Interested in admission',
      followUpType: 'Email'
    },
    {
      id: 3,
      enquiryNo: 'ENQ24S0028',
      parentName: 'test father',
      contactNo: '9874567842',
      enquiryDate: '22/04/2024',
      followUpDate: '27/07/2024',
      status: 'Pending',
      assignedTo: 'Staff',
      remarks: 'Waiting for documents',
      followUpType: 'Call'
    },
    {
      id: 4,
      enquiryNo: 'ENQ25S0040',
      parentName: 'Manish',
      contactNo: '9871116060',
      enquiryDate: '27/02/2025',
      followUpDate: '03/08/2024',
      status: 'Pending',
      assignedTo: 'Staff',
      remarks: 'Need to visit school',
      followUpType: 'Visit'
    },
    {
      id: 5,
      enquiryNo: '0016',
      parentName: 'Vinay Pandey',
      contactNo: '9873140981',
      enquiryDate: '01/04/2023',
      followUpDate: '05/08/2024',
      status: 'Pending',
      assignedTo: 'Staff',
      remarks: 'Follow up required',
      followUpType: 'Call'
    },
    {
      id: 6,
      enquiryNo: '24S01',
      parentName: 'xyz',
      contactNo: '9898765544',
      enquiryDate: '12/02/2025',
      followUpDate: '10/08/2024',
      status: 'Pending',
      assignedTo: 'Staff',
      remarks: 'Need more information',
      followUpType: 'Email'
    },
    {
      id: 7,
      enquiryNo: 'ENQ25S0042',
      parentName: 'roshan',
      contactNo: '9871115065',
      enquiryDate: '03/04/2025',
      followUpDate: '15/08/2024',
      status: 'Pending',
      assignedTo: 'Staff',
      remarks: 'Interested in sports facilities',
      followUpType: 'Call'
    },
    {
      id: 8,
      enquiryNo: '0020',
      parentName: 'YOGESH',
      contactNo: '7982153248',
      enquiryDate: '05/04/2023',
      followUpDate: '20/08/2024',
      status: 'Pending',
      assignedTo: 'Staff',
      remarks: 'Waiting for scholarship details',
      followUpType: 'Call'
    },
    {
      id: 9,
      enquiryNo: 'ENQ24S0026',
      parentName: 'test',
      contactNo: '9876485278',
      enquiryDate: '29/03/2024',
      followUpDate: '25/08/2024',
      status: 'Pending',
      assignedTo: 'Staff',
      remarks: 'Need to discuss transport',
      followUpType: 'Call'
    },
    {
      id: 10,
      enquiryNo: 'ENQ25S0047',
      parentName: 'Ayaz',
      contactNo: '5689759864',
      enquiryDate: '17/06/2025',
      followUpDate: '30/08/2024',
      status: 'Pending',
      assignedTo: 'Staff',
      remarks: 'Need fee structure',
      followUpType: 'Email'
    },
    {
      id: 11,
      enquiryNo: 'ENQ25S0051',
      parentName: 'Amit Malhotra',
      contactNo: '1098765432',
      enquiryDate: '10/07/2025',
      followUpDate: '21/07/2025',
      status: 'Completed',
      assignedTo: 'Staff',
      remarks: 'Admission form given',
      followUpType: 'Email'
    },
    {
      id: 12,
      enquiryNo: 'ENQ25S0049',
      parentName: 'Ahmad',
      contactNo: '97984372896',
      enquiryDate: '05/07/2025',
      followUpDate: '19/07/2025',
      status: 'Pending',
      assignedTo: 'Staff',
      remarks: 'Need to discuss fees',
      followUpType: 'Call'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterType, setFilterType] = useState('pending');
  const [newFollowUp, setNewFollowUp] = useState({
    enquiryNo: '',
    followUpDate: format(new Date(), 'yyyy-MM-dd'),
    followUpTime: '10:00',
    followUpType: 'Call',
    remarks: '',
    status: 'Pending',
    assignedTo: 'Staff',
    parentName: '',
    mobile: '',
    enquiryDate: format(new Date(), 'dd/MM/yyyy')
  });

  // Filter follow-ups based on filter type and search term
  const filteredFollowUps = followUps.filter(followUp => {
    const searchLower = searchTerm.toLowerCase();
    const today = format(new Date(), 'dd/MM/yyyy');
    
    // Apply filter type
    if (filterType === 'current' && followUp.followUpDate !== today) {
      return false;
    } else if (filterType === 'pending' && followUp.status !== 'Pending') {
      return false;
    } else if (filterType === 'date' && !followUp.followUpDate) {
      return false;
    }
    
    // Apply search term
    return (
      followUp.enquiryNo.toLowerCase().includes(searchLower) ||
      (followUp.parentName && followUp.parentName.toLowerCase().includes(searchLower)) ||
      (followUp.contactNo && followUp.contactNo.includes(searchTerm)) ||
      (followUp.followUpDate && followUp.followUpDate.includes(searchTerm))
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredFollowUps.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFollowUps.slice(indexOfFirstItem, indexOfLastItem);

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

  // Handle input change for new follow-up
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFollowUp(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new follow-up
  const handleAddFollowUp = (e) => {
    e.preventDefault();
    // In a real app, you would validate the form and then save to the database
    const newFollowUpItem = {
      id: followUps.length + 1,
      enquiryNo: newFollowUp.enquiryNo,
      studentName: 'New Student',
      fatherName: 'Father Name',
      contactNo: '0000000000',
      email: 'email@example.com',
      className: 'N/A',
      lastFollowUp: format(new Date(), 'dd/MM/yyyy'),
      nextFollowUp: format(parse(newFollowUp.followUpDate, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy'),
      status: newFollowUp.status,
      remarks: newFollowUp.remarks,
      followUpType: newFollowUp.followUpType
    };

    setFollowUps([newFollowUpItem, ...followUps]);
    setShowAddModal(false);
    // Reset form
    setNewFollowUp({
      enquiryNo: '',
      followUpDate: format(new Date(), 'yyyy-MM-dd'),
      followUpTime: '10:00',
      followUpType: 'Call',
      remarks: '',
      status: 'Pending'
    });
  };

  // Update follow-up status
  const updateStatus = (id, status) => {
    setFollowUps(followUps.map(followUp => 
      followUp.id === id ? { ...followUp, status } : followUp
    ));
  };

  // Update follow-up type
  const updateFollowUpType = (id, type) => {
    setFollowUps(followUps.map(followUp => 
      followUp.id === id ? { ...followUp, followUpType: type } : followUp
    ));
  };

  // Update assigned to
  const updateAssignedTo = (id, assignedTo) => {
    setFollowUps(followUps.map(followUp => 
      followUp.id === id ? { ...followUp, assignedTo } : followUp
    ));
  };

  // View details
  const viewDetails = (id) => {
    // In a real app, this would navigate to a detailed view
    const followUp = followUps.find(f => f.id === id);
    alert(`Viewing details for ${followUp.enquiryNo}`);
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-badge success';
      case 'pending':
        return 'status-badge warning';
      default:
        return 'status-badge';
    }
  };

  // Get follow-up type icon
  const getFollowUpTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'call':
        return <FiPhone className="follow-up-icon call" />;
      case 'email':
        return <FiMail className="follow-up-icon email" />;
      case 'visit':
        return <FiCalendar className="follow-up-icon visit" />;
      default:
        return <FiClock className="follow-up-icon" />;
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header-top">
          <h1>Follow Up</h1>
          <div className="header-actions">
            <div className="entity-count">
              <span>{followUps.length}</span>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              <FiPlus /> Schedule Follow Up
            </button>
          </div>
        </div>
        <div className="search-container">
          <div className="filter-container" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div className="form-group" style={{ margin: 0, minWidth: '200px' }}>
              <select 
                className="form-control"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="current">Current Date</option>
                <option value="date">Selected Date</option>
              </select>
            </div>
            {filterType === 'date' && (
              <div className="form-group" style={{ margin: 0 }}>
                <input 
                  type="date" 
                  className="form-control"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            )}
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
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
              <th>Enquiry Code</th>
              <th>Parent Name</th>
              <th>Mobile</th>
              <th>Enquiry Date</th>
              <th>Follow Up Date</th>
              <th>Follow Up</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Remarks</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((followUp) => (
                <tr key={followUp.id}>
                  <td>{followUp.enquiryNo}</td>
                  <td>{followUp.parentName}</td>
                  <td>
                    <a href={`tel:${followUp.contactNo}`} className="contact-link">
                      <FiPhone className="icon" /> {followUp.contactNo}
                    </a>
                  </td>
                  <td>{followUp.enquiryDate}</td>
                  <td className={followUp.status === 'Pending' ? 'upcoming' : ''}>
                    {followUp.followUpDate}
                  </td>
                  <td>
                    <select 
                      className="form-control form-control-sm"
                      value={followUp.followUpType}
                      onChange={(e) => updateFollowUpType(followUp.id, e.target.value)}
                    >
                      <option value="Call">Call</option>
                      <option value="Email">Email</option>
                      <option value="Visit">Visit</option>
                    </select>
                  </td>
                  <td>
                    <select 
                      className="form-control form-control-sm"
                      value={followUp.status}
                      onChange={(e) => updateStatus(followUp.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td>
                    <select 
                      className="form-control form-control-sm"
                      value={followUp.assignedTo}
                      onChange={(e) => updateAssignedTo(followUp.id, e.target.value)}
                    >
                      <option value="Staff">Staff</option>
                      <option value="Admin">Admin</option>
                      <option value="Counselor">Counselor</option>
                    </select>
                  </td>
                  <td className="remarks">{followUp.remarks}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => viewDetails(followUp.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center">No follow-ups found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-info">
          Showing {filteredFollowUps.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredFollowUps.length)} of {filteredFollowUps.length} entries
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

      {/* Add Follow Up Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Schedule New Follow Up</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddModal(false)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleAddFollowUp}>
              <div className="form-group">
                <label>Enquiry No. *</label>
                <input
                  type="text"
                  name="enquiryNo"
                  value={newFollowUp.enquiryNo}
                  onChange={handleInputChange}
                  placeholder="Enter enquiry number"
                  required
                />
              </div>
              <div className="form-group">
                <label>Follow Up Date *</label>
                <input
                  type="date"
                  name="followUpDate"
                  value={newFollowUp.followUpDate}
                  onChange={handleInputChange}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  required
                />
              </div>
              <div className="form-group">
                <label>Follow Up Time *</label>
                <input
                  type="time"
                  name="followUpTime"
                  value={newFollowUp.followUpTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Follow Up Type *</label>
                <select
                  name="followUpType"
                  value={newFollowUp.followUpType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Call">Call</option>
                  <option value="Email">Email</option>
                  <option value="Visit">School Visit</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status *</label>
                <select
                  name="status"
                  value={newFollowUp.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="form-group">
                <label>Remarks</label>
                <textarea
                  name="remarks"
                  value={newFollowUp.remarks}
                  onChange={handleInputChange}
                  placeholder="Enter any remarks or notes"
                  rows="3"
                />
              </div>
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Follow Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowUp;
