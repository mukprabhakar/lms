import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiDownload, FiPrinter, FiEye, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import './DueList.css';

const DueList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState([]);
  
  // Sample data with 50 records
  const dueListData = [
    {
      invoiceNo: 'REC004365',
      admissionNo: 'ADM/2025/2099',
      studentName: 'Aarav Sharma',
      className: 'LKG',
      rollNo: '23',
      mobileNo: '9650334199',
      feeEnteredOn: 'Jul 26 2025 5:00AM',
      month: 'April',
      totalFee: '3690',
      paidAmount: '2000',
      outstandingBalance: '1690'
    },
    {
      invoiceNo: 'REC002461',
      admissionNo: 'ADM/2024/1886',
      studentName: 'Yash Pal',
      className: 'UKG',
      rollNo: '12',
      mobileNo: '8010829287',
      feeEnteredOn: 'Jul 16 2025 6:44AM',
      month: 'June',
      totalFee: '4200',
      paidAmount: '0',
      outstandingBalance: '4200'
    },
    {
      invoiceNo: 'REC003201',
      admissionNo: 'ADM/2025/2150',
      studentName: 'Priya Patel',
      className: '1st',
      rollNo: '5',
      mobileNo: '9876543210',
      feeEnteredOn: 'Aug 1 2025 9:15AM',
      month: 'July',
      totalFee: '3800',
      paidAmount: '3800',
      outstandingBalance: '0'
    },
    {
      invoiceNo: 'REC003202',
      admissionNo: 'ADM/2025/2151',
      studentName: 'Rahul Verma',
      className: '2nd',
      rollNo: '8',
      mobileNo: '9876543211',
      feeEnteredOn: 'Aug 1 2025 9:20AM',
      month: 'July',
      totalFee: '3950',
      paidAmount: '2000',
      outstandingBalance: '1950'
    },
    {
      invoiceNo: 'REC003203',
      admissionNo: 'ADM/2025/2152',
      studentName: 'Ananya Gupta',
      className: '3rd',
      rollNo: '15',
      mobileNo: '9876543212',
      feeEnteredOn: 'Aug 1 2025 9:25AM',
      month: 'July',
      totalFee: '4100',
      paidAmount: '0',
      outstandingBalance: '4100'
    },
    {
      invoiceNo: 'REC003204',
      admissionNo: 'ADM/2025/2153',
      studentName: 'Vikram Singh',
      className: '4th',
      rollNo: '22',
      mobileNo: '9876543213',
      feeEnteredOn: 'Aug 1 2025 9:30AM',
      month: 'July',
      totalFee: '4250',
      paidAmount: '4250',
      outstandingBalance: '0'
    },
    {
      invoiceNo: 'REC003205',
      admissionNo: 'ADM/2025/2154',
      studentName: 'Neha Reddy',
      className: '5th',
      rollNo: '7',
      mobileNo: '9876543214',
      feeEnteredOn: 'Aug 1 2025 9:35AM',
      month: 'July',
      totalFee: '4400',
      paidAmount: '3000',
      outstandingBalance: '1400'
    },
    {
      invoiceNo: 'REC003206',
      admissionNo: 'ADM/2025/2155',
      studentName: 'Arjun Mehta',
      className: '6th',
      rollNo: '14',
      mobileNo: '9876543215',
      feeEnteredOn: 'Aug 1 2025 9:40AM',
      month: 'July',
      totalFee: '4550',
      paidAmount: '0',
      outstandingBalance: '4550'
    },
    {
      invoiceNo: 'REC003207',
      admissionNo: 'ADM/2025/2156',
      studentName: 'Ishaani Nair',
      className: '7th',
      rollNo: '9',
      mobileNo: '9876543216',
      feeEnteredOn: 'Aug 1 2025 9:45AM',
      month: 'July',
      totalFee: '4700',
      paidAmount: '4700',
      outstandingBalance: '0'
    },
    {
      invoiceNo: 'REC003208',
      admissionNo: 'ADM/2025/2157',
      studentName: 'Kabir Malhotra',
      className: '8th',
      rollNo: '18',
      mobileNo: '9876543217',
      feeEnteredOn: 'Aug 1 2025 9:50AM',
      month: 'July',
      totalFee: '4850',
      paidAmount: '2000',
      outstandingBalance: '2850'
    },
    {
      invoiceNo: 'REC003209',
      admissionNo: 'ADM/2025/2158',
      studentName: 'Aanya Kapoor',
      className: '9th',
      rollNo: '3',
      mobileNo: '9876543218',
      feeEnteredOn: 'Aug 1 2025 9:55AM',
      month: 'July',
      totalFee: '5000',
      paidAmount: '0',
      outstandingBalance: '5000'
    },
    {
      invoiceNo: 'REC003210',
      admissionNo: 'ADM/2025/2159',
      studentName: 'Vivaan Choudhary',
      className: '10th',
      rollNo: '16',
      mobileNo: '9876543219',
      feeEnteredOn: 'Aug 1 2025 10:00AM',
      month: 'July',
      totalFee: '5200',
      paidAmount: '5200',
      outstandingBalance: '0'
    },
    {
      invoiceNo: 'REC003211',
      admissionNo: 'ADM/2025/2160',
      studentName: 'Anvi Joshi',
      className: '11th',
      rollNo: '11',
      mobileNo: '9876543220',
      feeEnteredOn: 'Aug 1 2025 10:05AM',
      month: 'July',
      totalFee: '5400',
      paidAmount: '3000',
      outstandingBalance: '2400'
    },
    {
      invoiceNo: 'REC003212',
      admissionNo: 'ADM/2025/2161',
      studentName: 'Aditya Rao',
      className: '12th',
      rollNo: '24',
      mobileNo: '9876543221',
      feeEnteredOn: 'Aug 1 2025 10:10AM',
      month: 'July',
      totalFee: '5600',
      paidAmount: '0',
      outstandingBalance: '5600'
    },
    {
      invoiceNo: 'REC003213',
      admissionNo: 'ADM/2025/2162',
      studentName: 'Ishaanvi Desai',
      className: 'LKG',
      rollNo: '2',
      mobileNo: '9876543222',
      feeEnteredOn: 'Aug 1 2025 10:15AM',
      month: 'July',
      totalFee: '3600',
      paidAmount: '3600',
      outstandingBalance: '0'
    },
    {
      invoiceNo: 'REC003214',
      admissionNo: 'ADM/2025/2163',
      studentName: 'Reyansh Iyer',
      className: 'UKG',
      rollNo: '9',
      mobileNo: '9876543223',
      feeEnteredOn: 'Aug 1 2025 10:20AM',
      month: 'July',
      totalFee: '3800',
      paidAmount: '2000',
      outstandingBalance: '1800'
    },
    {
      invoiceNo: 'REC003215',
      admissionNo: 'ADM/2025/2164',
      studentName: 'Saanvi Menon',
      className: '1st',
      rollNo: '17',
      mobileNo: '9876543224',
      feeEnteredOn: 'Aug 1 2025 10:25AM',
      month: 'July',
      totalFee: '4000',
      paidAmount: '0',
      outstandingBalance: '4000'
    },
    {
      invoiceNo: 'REC003216',
      admissionNo: 'ADM/2025/2165',
      studentName: 'Aarush Nanda',
      className: '2nd',
      rollNo: '6',
      mobileNo: '9876543225',
      feeEnteredOn: 'Aug 1 2025 10:30AM',
      month: 'July',
      totalFee: '4200',
      paidAmount: '4200',
      outstandingBalance: '0'
    },
    {
      invoiceNo: 'REC003217',
      admissionNo: 'ADM/2025/2166',
      studentName: 'Anika Khanna',
      className: '3rd',
      rollNo: '13',
      mobileNo: '9876543226',
      feeEnteredOn: 'Aug 1 2025 10:35AM',
      month: 'July',
      totalFee: '4400',
      paidAmount: '3000',
      outstandingBalance: '1400'
    },
    {
      invoiceNo: 'REC003218',
      admissionNo: 'ADM/2025/2167',
      studentName: 'Vihaan Malhotra',
      className: '4th',
      rollNo: '20',
      mobileNo: '9876543227',
      feeEnteredOn: 'Aug 1 2025 10:40AM',
      month: 'July',
      totalFee: '4600',
      paidAmount: '0',
      outstandingBalance: '4600'
    },
    {
      invoiceNo: 'REC003219',
      admissionNo: 'ADM/2025/2168',
      studentName: 'Pari Chawla',
      className: '5th',
      rollNo: '4',
      mobileNo: '9876543228',
      feeEnteredOn: 'Aug 1 2025 10:45AM',
      month: 'July',
      totalFee: '4800',
      paidAmount: '4800',
      outstandingBalance: '0'
    },
    {
      invoiceNo: 'REC003220',
      admissionNo: 'ADM/2025/2169',
      studentName: 'Atharv Kapoor',
      className: '6th',
      rollNo: '15',
      mobileNo: '9876543229',
      feeEnteredOn: 'Aug 1 2025 10:50AM',
      month: 'July',
      totalFee: '5000',
      paidAmount: '2000',
      outstandingBalance: '3000'
    },
    {
      invoiceNo: 'REC003221',
      admissionNo: 'ADM/2025/2170',
      studentName: 'Kiara Oberoi',
      className: '7th',
      rollNo: '10',
      mobileNo: '9876543230',
      feeEnteredOn: 'Aug 1 2025 10:55AM',
      month: 'July',
      totalFee: '5200',
      paidAmount: '0',
      outstandingBalance: '5200'
    },
    {
      invoiceNo: 'REC003222',
      admissionNo: 'ADM/2025/2171',
      studentName: 'Vedant Bajaj',
      className: '8th',
      rollNo: '19',
      mobileNo: '9876543231',
      feeEnteredOn: 'Aug 1 2025 11:00AM',
      month: 'July',
      totalFee: '5400',
      paidAmount: '5400',
      outstandingBalance: '0'
    },
    {
      invoiceNo: 'REC003223',
      admissionNo: 'ADM/2025/2172',
      studentName: 'Myra Saxena',
      className: '9th',
      rollNo: '1',
      mobileNo: '9876543232',
      feeEnteredOn: 'Aug 1 2025 11:05AM',
      month: 'July',
      totalFee: '5600',
      paidAmount: '3000',
      outstandingBalance: '2600'
    },
    {
      invoiceNo: 'REC003224',
      admissionNo: 'ADM/2025/2173',
      studentName: 'Ayaan Khurana',
      className: '10th',
      rollNo: '21',
      mobileNo: '9876543233',
      feeEnteredOn: 'Aug 1 2025 11:10AM',
      month: 'July',
      totalFee: '5800',
      paidAmount: '0',
      outstandingBalance: '5800'
    },
    {
      invoiceNo: 'REC003225',
      admissionNo: 'ADM/2025/2174',
      studentName: 'Amaira Choudhury',
      className: '11th',
      rollNo: '8',
      mobileNo: '9876543234',
      feeEnteredOn: 'Aug 1 2025 11:15AM',
      month: 'July',
      totalFee: '6000',
      paidAmount: '6000',
      outstandingBalance: '0'
    },
    {
      invoiceNo: 'REC003226',
      admissionNo: 'ADM/2025/2175',
      studentName: 'Kabir Malhotra',
      className: '12th',
      rollNo: '25',
      mobileNo: '9876543235',
      feeEnteredOn: 'Aug 1 2025 11:20AM',
      month: 'July',
      totalFee: '6200',
      paidAmount: '3000',
      outstandingBalance: '3200'
    },
    {
      invoiceNo: 'REC003227',
      admissionNo: 'ADM/2025/2176',
      studentName: 'Ananya Iyer',
      className: 'LKG',
      rollNo: '3',
      mobileNo: '9876543236',
      feeEnteredOn: 'Aug 1 2025 11:25AM',
      month: 'July',
      totalFee: '3700',
      paidAmount: '0',
      outstandingBalance: '3700'
    },
    {
      invoiceNo: 'REC003228',
      admissionNo: 'ADM/2025/2177',
      studentName: 'Arjun Kapoor',
      className: 'UKG',
      rollNo: '10',
      mobileNo: '9876543237',
      feeEnteredOn: 'Aug 1 2025 11:30AM',
      month: 'July',
      totalFee: '3900',
      paidAmount: '3900',
      outstandingBalance: '0'
    },
    {
      invoiceNo: 'REC003229',
      admissionNo: 'ADM/2025/2178',
      studentName: 'Ishita Nair',
      className: '1st',
      rollNo: '18',
      mobileNo: '9876543238',
      feeEnteredOn: 'Aug 1 2025 11:35AM',
      month: 'July',
      totalFee: '4100',
      paidAmount: '2000',
      outstandingBalance: '2100'
    },
    {
      invoiceNo: 'REC003230',
      admissionNo: 'ADM/2025/2179',
      studentName: 'Vivaan Choudhary',
      className: '2nd',
      rollNo: '7',
      mobileNo: '9876543239',
      feeEnteredOn: 'Aug 1 2025 11:40AM',
      month: 'July',
      totalFee: '4300',
      paidAmount: '0',
      outstandingBalance: '4300'
    },
    {
      invoiceNo: 'REC003231',
      admissionNo: 'ADM/2025/2180',
      studentName: 'Anvi Joshi',
      className: '3rd',
      rollNo: '14',
      mobileNo: '9876543240',
      feeEnteredOn: 'Aug 1 2025 11:45AM',
      month: 'July',
      totalFee: '4500',
      paidAmount: '4500',
      outstandingBalance: '0'
    },
    {
      invoiceNo: 'REC003232',
      admissionNo: 'ADM/2025/2181',
      studentName: 'Aditya Rao',
      className: '4th',
      rollNo: '21',
      mobileNo: '9876543241',
      feeEnteredOn: 'Aug 1 2025 11:50AM',
      month: 'July',
      totalFee: '4700',
      paidAmount: '3000',
      outstandingBalance: '1700'
    },
    {
      invoiceNo: 'REC003233',
      admissionNo: 'ADM/2025/2182',
      studentName: 'Ishaanvi Desai',
      className: '5th',
      rollNo: '5',
      mobileNo: '9876543242',
      feeEnteredOn: 'Aug 1 2025 11:55AM',
      month: 'July',
      totalFee: '4900',
      paidAmount: '0',
      outstandingBalance: '4900'
    },
    {
      invoiceNo: 'REC003234',
      admissionNo: 'ADM/2025/2183',
      studentName: 'Reyansh Iyer',
      className: '6th',
      rollNo: '16',
      mobileNo: '9876543243',
      feeEnteredOn: 'Aug 1 2025 12:00PM',
      month: 'July',
      totalFee: '5100',
      paidAmount: '5100',
      outstandingBalance: '0'
    },
    {
      invoiceNo: 'REC003235',
      admissionNo: 'ADM/2025/2184',
      studentName: 'Saanvi Menon',
      className: '7th',
      rollNo: '11',
      mobileNo: '9876543244',
      feeEnteredOn: 'Aug 1 2025 12:05PM',
      month: 'July',
      totalFee: '5300',
      paidAmount: '2000',
      outstandingBalance: '3300'
    },
    {
      invoiceNo: 'REC003236',
      admissionNo: 'ADM/2025/2185',
      studentName: 'Aarush Nanda',
      className: '8th',
      rollNo: '22',
      mobileNo: '9876543245',
      feeEnteredOn: 'Aug 1 2025 12:10PM',
      month: 'July',
      totalFee: '5500',
      paidAmount: '0',
      outstandingBalance: '5500'
    },
    {
      invoiceNo: 'REC003237',
      admissionNo: 'ADM/2025/2186',
      studentName: 'Anika Khanna',
      className: '9th',
      rollNo: '2',
      mobileNo: '9876543246',
      feeEnteredOn: 'Aug 1 2025 12:15PM',
      month: 'July',
      totalFee: '5700',
      paidAmount: '5700',
      outstandingBalance: '0'
    },
    {
      invoiceNo: 'REC003238',
      admissionNo: 'ADM/2025/2187',
      studentName: 'Vihaan Malhotra',
      className: '10th',
      rollNo: '19',
      mobileNo: '9876543247',
      feeEnteredOn: 'Aug 1 2025 12:20PM',
      month: 'July',
      totalFee: '5900',
      paidAmount: '3000',
      outstandingBalance: '2900'
    },
    {
      invoiceNo: 'REC003239',
      admissionNo: 'ADM/2025/2188',
      studentName: 'Pari Chawla',
      className: '11th',
      rollNo: '9',
      mobileNo: '9876543248',
      feeEnteredOn: 'Aug 1 2025 12:25PM',
      month: 'July',
      totalFee: '6100',
      paidAmount: '0',
      outstandingBalance: '6100'
    },
    {
      invoiceNo: 'REC003240',
      admissionNo: 'ADM/2025/2189',
      studentName: 'Atharv Kapoor',
      className: '12th',
      rollNo: '26',
      mobileNo: '9876543249',
      feeEnteredOn: 'Aug 1 2025 12:30PM',
      month: 'July',
      totalFee: '6300',
      paidAmount: '6300',
      outstandingBalance: '0'
    },
    {
      invoiceNo: 'REC003241',
      admissionNo: 'ADM/2025/2190',
      studentName: 'Kiara Oberoi',
      className: 'LKG',
      rollNo: '4',
      mobileNo: '9876543250',
      feeEnteredOn: 'Aug 1 2025 12:35PM',
      month: 'July',
      totalFee: '3800',
      paidAmount: '2000',
      outstandingBalance: '1800'
    },
    {
      invoiceNo: 'REC003242',
      admissionNo: 'ADM/2025/2191',
      studentName: 'Vedant Bajaj',
      className: 'UKG',
      rollNo: '11',
      mobileNo: '9876543251',
      feeEnteredOn: 'Aug 1 2025 12:40PM',
      month: 'July',
      totalFee: '4000',
      paidAmount: '0',
      outstandingBalance: '4000'
    },
    {
      invoiceNo: 'REC003243',
      admissionNo: 'ADM/2025/2192',
      studentName: 'Myra Saxena',
      className: '1st',
      rollNo: '19',
      mobileNo: '9876543252',
      feeEnteredOn: 'Aug 1 2025 12:45PM',
      month: 'July',
      totalFee: '4200',
      paidAmount: '4200',
      outstandingBalance: '0'
    },
    {
      invoiceNo: 'REC003244',
      admissionNo: 'ADM/2025/2193',
      studentName: 'Ayaan Khurana',
      className: '2nd',
      rollNo: '8',
      mobileNo: '9876543253',
      feeEnteredOn: 'Aug 1 2025 12:50PM',
      month: 'July',
      totalFee: '4400',
      paidAmount: '3000',
      outstandingBalance: '1400'
    },
    {
      invoiceNo: 'REC003245',
      admissionNo: 'ADM/2025/2194',
      studentName: 'Amaira Choudhury',
      className: '3rd',
      rollNo: '15',
      mobileNo: '9876543254',
      feeEnteredOn: 'Aug 1 2025 12:55PM',
      month: 'July',
      totalFee: '4600',
      paidAmount: '0',
      outstandingBalance: '4600'
    },
    {
      invoiceNo: 'REC003246',
      admissionNo: 'ADM/2025/2195',
      studentName: 'Kabir Malhotra',
      className: '4th',
      rollNo: '22',
      mobileNo: '9876543255',
      feeEnteredOn: 'Aug 1 2025 1:00PM',
      month: 'July',
      totalFee: '4800',
      paidAmount: '4800',
      outstandingBalance: '0'
    },
    {
      invoiceNo: 'REC003247',
      admissionNo: 'ADM/2025/2196',
      studentName: 'Ananya Iyer',
      className: '5th',
      rollNo: '6',
      mobileNo: '9876543256',
      feeEnteredOn: 'Aug 1 2025 1:05PM',
      month: 'July',
      totalFee: '5000',
      paidAmount: '2000',
      outstandingBalance: '3000'
    },
    {
      invoiceNo: 'REC003248',
      admissionNo: 'ADM/2025/2197',
      studentName: 'Arjun Kapoor',
      className: '6th',
      rollNo: '17',
      mobileNo: '9876543257',
      feeEnteredOn: 'Aug 1 2025 1:10PM',
      month: 'July',
      totalFee: '5200',
      paidAmount: '0',
      outstandingBalance: '5200'
    },
    {
      invoiceNo: 'REC003249',
      admissionNo: 'ADM/2025/2198',
      studentName: 'Ishita Nair',
      className: '7th',
      rollNo: '12',
      mobileNo: '9876543258',
      feeEnteredOn: 'Aug 1 2025 1:15PM',
      month: 'July',
      totalFee: '5400',
      paidAmount: '5400',
      outstandingBalance: '0'
    },
    {
      invoiceNo: 'REC003250',
      admissionNo: 'ADM/2025/2199',
      studentName: 'Vivaan Choudhary',
      className: '8th',
      rollNo: '23',
      mobileNo: '9876543259',
      feeEnteredOn: 'Aug 1 2025 1:20PM',
      month: 'July',
      totalFee: '5600',
      paidAmount: '3000',
      outstandingBalance: '2600'
    }
  ];

  useEffect(() => {
    const filtered = dueListData.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.invoiceNo.toLowerCase().includes(searchLower) ||
        item.admissionNo.toLowerCase().includes(searchLower) ||
        item.studentName.toLowerCase().includes(searchLower) ||
        item.className.toLowerCase().includes(searchLower) ||
        item.rollNo.toLowerCase().includes(searchLower) ||
        item.mobileNo.includes(searchTerm) ||
        item.feeEnteredOn.toLowerCase().includes(searchLower) ||
        item.month.toLowerCase().includes(searchLower) ||
        item.totalFee.includes(searchTerm) ||
        item.paidAmount.includes(searchTerm) ||
        item.outstandingBalance.includes(searchTerm)
      );
    });
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm, dueListData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

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
              <th>Total Fee (₹)</th>
              <th>Paid Amount (₹)</th>
              <th>Outstanding Balance (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
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
              ))
            ) : (
              <tr>
                <td colSpan="12" className="no-data">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <div className="pagination-info">
          Showing {filteredData.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
          {searchTerm && <span> (filtered from {dueListData.length} total entries)</span>}
        </div>
        <div className="pagination-controls">
          <button 
            className={`btn ${currentPage === 1 ? 'disabled' : ''}`} 
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
          >
            <FiChevronsLeft />
          </button>
          <button 
            className={`btn ${currentPage === 1 ? 'disabled' : ''}`} 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
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
                className={`btn ${currentPage === pageNum ? 'active' : ''}`}
                onClick={() => paginate(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button 
            className={`btn ${currentPage === totalPages ? 'disabled' : ''}`} 
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <FiChevronRight />
          </button>
          <button 
            className={`btn ${currentPage === totalPages ? 'disabled' : ''}`} 
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <FiChevronsRight />
          </button>
        </div>
        <div className="items-per-page">
          <label>
            Items per page:
            <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>
        <button className="btn-pagination" disabled>Previous</button>
        <span>Page 1 of 1</span>
        <button className="btn-pagination" disabled>Next</button>
      </div>
    </div>
  );
};

export default DueList;
