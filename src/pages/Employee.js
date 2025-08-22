import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiFilter } from 'react-icons/fi';
import '../components/Table.css';
import { format } from 'date-fns';

const Employee = () => {
  // Sample data - in a real app, this would come from an API
  const [employees, setEmployees] = useState([
    {
      id: 1,
      employeeCode: 'EMP25S0054',
      name: 'Khusi Verma',
      mobileNo: '2343332312',
      email: 'Khusi@verma.com',
      department: 'Driver',
      designation: 'Driver',
      dateOfJoining: new Date('2025-07-11'),
    },
    {
      id: 2,
      employeeCode: 'EMP25S0053',
      name: 'Rani Kumari',
      mobileNo: '2321111111',
      email: 'rani@kumari.com',
      department: 'Teacher',
      designation: 'Class teacher',
      dateOfJoining: new Date('2025-07-01'),
    },
    {
      id: 3,
      employeeCode: 'EMP25S0047',
      name: 'ROSHNI',
      mobileNo: '9871115069',
      email: 'roshni@school.com',
      department: 'Teacher',
      designation: 'Class teacher',
      dateOfJoining: new Date('2025-07-09'),
    },
    {
      id: 4,
      employeeCode: 'EMP25S0040',
      name: 'Shayan Khan',
      mobileNo: '9573516921',
      email: 'shayan@school.com',
      department: 'Teacher',
      designation: 'Class teacher',
      dateOfJoining: new Date('2025-06-04'),
    },
    {
      id: 5,
      employeeCode: 'EMP25S0038',
      name: 'Ramu Kumar',
      mobileNo: '8987979771',
      email: 'ramu@school.com',
      department: 'Driver',
      designation: 'Driver',
      dateOfJoining: new Date('2020-12-13'),
    },
    {
      id: 6,
      employeeCode: 'EMP25S0037',
      name: 'Sarah Ali',
      mobileNo: '9785636335',
      email: 'sarah@school.com',
      department: 'Teacher',
      designation: 'Class teacher',
      dateOfJoining: new Date('2025-02-24'),
    },
    {
      id: 7,
      employeeCode: 'EMP25S0032',
      name: 'Jasmine Kaur',
      mobileNo: '9899525984',
      email: 'jasmine@school.com',
      department: 'Teacher',
      designation: 'Class teacher',
      dateOfJoining: new Date('2024-12-31'),
    },
    {
      id: 8,
      employeeCode: 'EMP25S0025',
      name: 'Amit Sharma',
      mobileNo: '9876543210',
      email: 'amit@school.com',
      department: 'Administration',
      designation: 'Principal',
      dateOfJoining: new Date('2020-01-15'),
    },
    {
      id: 9,
      employeeCode: 'EMP25S0026',
      name: 'Priya Patel',
      mobileNo: '8765432109',
      email: 'priya@school.com',
      department: 'Administration',
      designation: 'Vice Principal',
      dateOfJoining: new Date('2020-02-20'),
    },
    {
      id: 10,
      employeeCode: 'EMP25S0027',
      name: 'Rajesh Kumar',
      mobileNo: '7654321098',
      email: 'rajesh@school.com',
      department: 'Teacher',
      designation: 'Senior Teacher',
      dateOfJoining: new Date('2021-03-10'),
    },
    {
      id: 11,
      employeeCode: 'EMP25S0028',
      name: 'Meena Devi',
      mobileNo: '6543210987',
      email: 'meena@school.com',
      department: 'Teacher',
      designation: 'Class teacher',
      dateOfJoining: new Date('2021-04-05'),
    },
    {
      id: 12,
      employeeCode: 'EMP25S0029',
      name: 'Vikram Singh',
      mobileNo: '9870123456',
      email: 'vikram@school.com',
      department: 'Sports',
      designation: 'Sports Teacher',
      dateOfJoining: new Date('2021-05-15'),
    },
    {
      id: 13,
      employeeCode: 'EMP25S0030',
      name: 'Anjali Mehta',
      mobileNo: '8901234567',
      email: 'anjali@school.com',
      department: 'Teacher',
      designation: 'Class teacher',
      dateOfJoining: new Date('2021-06-20'),
    },
    {
      id: 14,
      employeeCode: 'EMP25S0031',
      name: 'Rahul Verma',
      mobileNo: '9012345678',
      email: 'rahul@school.com',
      department: 'IT',
      designation: 'Computer Teacher',
      dateOfJoining: new Date('2021-07-25'),
    },
    {
      id: 15,
      employeeCode: 'EMP25S0033',
      name: 'Neha Gupta',
      mobileNo: '9123456789',
      email: 'neha@school.com',
      department: 'Teacher',
      designation: 'Class teacher',
      dateOfJoining: new Date('2021-08-30'),
    },
    {
      id: 16,
      employeeCode: 'EMP25S0034',
      name: 'Suresh Reddy',
      mobileNo: '9234567890',
      email: 'suresh@school.com',
      department: 'Teacher',
      designation: 'Class teacher',
      dateOfJoining: new Date('2021-09-10'),
    },
    {
      id: 17,
      employeeCode: 'EMP25S0035',
      name: 'Pooja Iyer',
      mobileNo: '9345678901',
      email: 'pooja@school.com',
      department: 'Teacher',
      designation: 'Class teacher',
      dateOfJoining: new Date('2021-10-15'),
    },
    {
      id: 18,
      employeeCode: 'EMP25S0036',
      name: 'Arjun Kapoor',
      mobileNo: '9456789012',
      email: 'arjun@school.com',
      department: 'Teacher',
      designation: 'Class teacher',
      dateOfJoining: new Date('2021-11-20'),
    },
    {
      id: 19,
      employeeCode: 'EMP25S0039',
      name: 'Kavita Joshi',
      mobileNo: '9567890123',
      email: 'kavita@school.com',
      department: 'Teacher',
      designation: 'Class teacher',
      dateOfJoining: new Date('2021-12-25'),
    },
    {
      id: 20,
      employeeCode: 'EMP25S0041',
      name: 'Ravi Shastri',
      mobileNo: '9678901234',
      email: 'ravi@school.com',
      department: 'Sports',
      designation: 'Cricket Coach',
      dateOfJoining: new Date('2022-01-05'),
    },
    {
      id: 21,
      employeeCode: 'EMP25S0042',
      name: 'Sunita Rao',
      mobileNo: '9789012345',
      email: 'sunita@school.com',
      department: 'Teacher',
      designation: 'Class teacher',
      dateOfJoining: new Date('2022-02-10'),
    },
    {
      id: 22,
      employeeCode: 'EMP25S0043',
      name: 'Vijay Malhotra',
      mobileNo: '9890123456',
      email: 'vijay@school.com',
      department: 'Administration',
      designation: 'Accountant',
      dateOfJoining: new Date('2022-03-15'),
    },
    {
      id: 23,
      employeeCode: 'EMP25S0044',
      name: 'Anita Desai',
      mobileNo: '9901234567',
      email: 'anita@school.com',
      department: 'Teacher',
      designation: 'Class teacher',
      dateOfJoining: new Date('2022-04-20'),
    },
    {
      id: 24,
      employeeCode: 'EMP25S0045',
      name: 'Rahul Dravid',
      mobileNo: '9012345678',
      email: 'rahuld@school.com',
      department: 'Sports',
      designation: 'Cricket Coach',
      dateOfJoining: new Date('2022-05-25'),
    },
    {
      id: 25,
      employeeCode: 'EMP25S0046',
      name: 'Priyanka Chopra',
      mobileNo: '9123456789',
      email: 'priyanka@school.com',
      department: 'Teacher',
      designation: 'Dance Teacher',
      dateOfJoining: new Date('2022-06-30'),
    },
    {
      id: 26,
      employeeCode: 'EMP25S0048',
      name: 'Amitabh Bachchan',
      mobileNo: '9234567890',
      email: 'amitabh@school.com',
      department: 'Teacher',
      designation: 'Drama Teacher',
      dateOfJoining: new Date('2022-07-05'),
    },
    {
      id: 27,
      employeeCode: 'EMP25S0049',
      name: 'Deepika Padukone',
      mobileNo: '9345678901',
      email: 'deepika@school.com',
      department: 'Teacher',
      designation: 'Yoga Instructor',
      dateOfJoining: new Date('2022-08-10'),
    },
    {
      id: 28,
      employeeCode: 'EMP25S0050',
      name: 'Shah Rukh Khan',
      mobileNo: '9456789012',
      email: 'srk@school.com',
      department: 'Teacher',
      designation: 'Drama Teacher',
      dateOfJoining: new Date('2022-09-15'),
    },
    {
      id: 29,
      employeeCode: 'EMP25S0051',
      name: 'Aishwarya Rai',
      mobileNo: '9567890123',
      email: 'aishwarya@school.com',
      department: 'Teacher',
      designation: 'Art Teacher',
      dateOfJoining: new Date('2022-10-20'),
    },
    {
      id: 30,
      employeeCode: 'EMP25S0052',
      name: 'Hrithik Roshan',
      mobileNo: '9678901234',
      email: 'hrithik@school.com',
      department: 'Teacher',
      designation: 'Dance Teacher',
      dateOfJoining: new Date('2022-11-25'),
    },
    {
      id: 31,
      employeeCode: 'EMP25S0055',
      name: 'Alia Bhatt',
      mobileNo: '9789012345',
      email: 'alia@school.com',
      department: 'Teacher',
      designation: 'Class teacher',
      dateOfJoining: new Date('2022-12-30'),
    },
    {
      id: 32,
      employeeCode: 'EMP25S0056',
      name: 'Ranveer Singh',
      mobileNo: '9890123456',
      email: 'ranveer@school.com',
      department: 'Teacher',
      designation: 'Class teacher',
      dateOfJoining: new Date('2023-01-05'),
    },
    {
      id: 33,
      employeeCode: 'EMP25S0057',
      name: 'Kareena Kapoor',
      mobileNo: '9901234567',
      email: 'kareena@school.com',
      department: 'Teacher',
      designation: 'Class teacher',
      dateOfJoining: new Date('2023-02-10'),
    },
    {
      id: 34,
      employeeCode: 'EMP25S0058',
      name: 'Ranbir Kapoor',
      mobileNo: '9012345678',
      email: 'ranbir@school.com',
      department: 'Teacher',
      designation: 'Class teacher',
      dateOfJoining: new Date('2023-03-15'),
    },
    {
      id: 35,
      employeeCode: 'EMP25S0059',
      name: 'Katrina Kaif',
      mobileNo: '9123456789',
      email: 'katrina@school.com',
      department: 'Teacher',
      designation: 'Class teacher',
      dateOfJoining: new Date('2023-04-20'),
    },
  ]);

  const [formData, setFormData] = useState({
    employeeCode: '',
    name: '',
    mobileNo: '',
    email: '',
    department: '',
    designation: '',
    dateOfJoining: new Date().toISOString().split('T')[0],
  });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee => 
    employee.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.mobileNo.includes(searchTerm) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditMode) {
      setEmployees(employees.map(emp => 
        emp.id === currentId ? { ...formData, id: currentId } : emp
      ));
    } else {
      const newEmployee = {
        ...formData,
        id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1,
        dateOfJoining: new Date(formData.dateOfJoining)
      };
      setEmployees([...employees, newEmployee]);
    }
    resetForm();
  };

  const handleEdit = (employee) => {
    setFormData({
      employeeCode: employee.employeeCode,
      name: employee.name,
      mobileNo: employee.mobileNo,
      email: employee.email,
      department: employee.department,
      designation: employee.designation,
      dateOfJoining: format(employee.dateOfJoining, 'yyyy-MM-dd'),
    });
    setIsEditMode(true);
    setCurrentId(employee.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      employeeCode: '',
      name: '',
      mobileNo: '',
      email: '',
      department: '',
      designation: '',
      dateOfJoining: new Date().toISOString().split('T')[0],
    });
    setIsFormOpen(false);
    setIsEditMode(false);
    setCurrentId(null);
  };


  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Sort employees by date of joining (newest first)
  const sortedEmployees = [...currentItems].sort((a, b) => 
    new Date(b.dateOfJoining) - new Date(a.dateOfJoining)
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Employees</h2>
        <button 
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
        >
          <FiPlus /> Add Employee
        </button>
      </div>

      <div className="table-controls">
        <div className="search-input">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        
        <div className="items-per-page">
          <label>Items per page:</label>
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
        </div>
      </div>

      {isFormOpen && (
        <div className="form-container">
          <div className="form-header">
            <h3>{isEditMode ? 'Edit' : 'Add New'} Employee</h3>
            <button className="close-btn" onClick={resetForm}>
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Employee Code</label>
                <input
                  type="text"
                  name="employeeCode"
                  value={formData.employeeCode}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                  placeholder="e.g., EMP25S0001"
                />
              </div>
              
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                  placeholder="Employee's full name"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                  placeholder="10-digit mobile number"
                  pattern="[0-9]{10}"
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="off"
                  placeholder="employee@example.com"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                  placeholder="e.g., Teacher, Driver"
                />
              </div>
              
              <div className="form-group">
                <label>Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                  placeholder="e.g., Class teacher, Driver"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Date of Joining</label>
                <input
                  type="date"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                {/* Empty div for alignment */}
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {isEditMode ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee Code</th>
              <th>Employee Name</th>
              <th>Mobile No.</th>
              <th>Email-id</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Date of Joining</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.length > 0 ? (
              sortedEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.employeeCode}</td>
                  <td>{employee.name}</td>
                  <td>{employee.mobileNo}</td>
                  <td className={!employee.email ? 'text-muted' : ''}>
                    {employee.email || 'N/A'}
                  </td>
                  <td>{employee.department}</td>
                  <td>{employee.designation}</td>
                  <td>{format(employee.dateOfJoining, 'dd/MM/yyyy')}</td>
                  <td className="action-buttons">
                    <button 
                      className="btn-icon edit" 
                      onClick={() => handleEdit(employee)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="btn-icon delete" 
                      onClick={() => handleDelete(employee.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">
                  No employees found. Add a new employee to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={() => paginate(1)} 
              disabled={currentPage === 1}
              className="page-nav"
            >
              &laquo;
            </button>
            <button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
              className="page-nav"
            >
              &lsaquo;
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around current page
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
                  onClick={() => paginate(pageNum)}
                  className={`page-number ${currentPage === pageNum ? 'active' : ''}`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className="page-nav"
            >
              &rsaquo;
            </button>
            <button 
              onClick={() => paginate(totalPages)} 
              disabled={currentPage === totalPages}
              className="page-nav"
            >
              &raquo;
            </button>
            
            <div className="page-info">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredEmployees.length)} of {filteredEmployees.length} entries
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employee;
