import React, { useState } from 'react';
import { FiSearch, FiFilter, FiDownload, FiPrinter, FiEye } from 'react-icons/fi';
import './DueList.css';

const DueList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data - in a real app, this would come from an API
  const dueListData = [
    {
      invoiceNo: 'REC004365',
      admissionNo: 'ADM/2025/2099',
      studentName: 'samad',
      className: 'LKG',
      rollNo: '23',
      mobileNo: '9650334199',
      feeEnteredOn: 'Jul 26 2025 5:00AM',
      month: 'April',
      totalFee: '3690',
      paidAmount: '0',
      outstandingBalance: '3690'
    },
    {
      invoiceNo: 'REC002461',
      admissionNo: 'ADM/2024/1886',
      studentName: 'YASH PAL',
      className: 'LKG',
      rollNo: '1',
      mobileNo: '8010829287',
      feeEnteredOn: 'Jul 16 2025 6:44AM',
      month: 'June',
      totalFee: '3440',
      paidAmount: '0',
      outstandingBalance: '3440'
    },
    // Add more sample data as needed
  ];

  const filteredData = dueListData.filter(item => 
    Object.values(item).some(
      val => String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="due-list-container">
      <div className="page-header">
        <h2>Due List</h2>
        <div className="actions">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by any field..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-filter">
            <FiFilter /> Filter
          </button>
          <button className="btn btn-export">
            <FiDownload /> Export
          </button>
          <button className="btn btn-print">
            <FiPrinter /> Print
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="due-list-table">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Admission No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Roll No</th>
              <th>Mobile No</th>
              <th>Fee Entered On</th>
              <th>Month</th>
              <th>Total Fee</th>
              <th>Paid Amount</th>
              <th>Outstanding Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.invoiceNo}</td>
                <td>{item.admissionNo}</td>
                <td>{item.studentName}</td>
                <td>{item.className}</td>
                <td>{item.rollNo}</td>
                <td>{item.mobileNo}</td>
                <td>{item.feeEnteredOn}</td>
                <td>{item.month}</td>
                <td>₹{item.totalFee}</td>
                <td>₹{item.paidAmount}</td>
                <td className={item.outstandingBalance > 0 ? 'text-danger' : 'text-success'}>
                  ₹{item.outstandingBalance}
                </td>
                <td>
                  <button className="btn-action" title="View Details">
                    <FiEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button className="btn-pagination" disabled>Previous</button>
        <span>Page 1 of 1</span>
        <button className="btn-pagination" disabled>Next</button>
      </div>
    </div>
  );
};

export default DueList;
