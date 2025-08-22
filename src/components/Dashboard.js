import React, { useState } from 'react';
import { FiUsers, FiUserCheck, FiCalendar, FiDollarSign, FiHome, FiPieChart, FiBarChart2, FiDollarSign as FiDollar } from 'react-icons/fi';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Dashboard.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Data for the dashboard
const dashboardData = {
  summary: [
    { 
      title: 'Login', 
      items: [
        { label: 'Total', value: '1,249' },
        { label: 'Today', value: '9' },
        { label: 'Weekly', value: '46' },
        { label: 'Monthly', value: '1,249' }
      ],
      icon: <FiUsers />,
      color: '#4e73df'
    },
    { 
      title: 'Admissions', 
      items: [
        { label: 'Total', value: '252' },
        { label: 'Today', value: '0' },
        { label: 'Weekly', value: '0' },
        { label: 'Monthly', value: '8' }
      ],
      icon: <FiUserCheck />,
      color: '#1cc88a'
    },
    { 
      title: 'Follow Ups', 
      items: [
        { label: 'Total', value: '0' },
        { label: 'Today', value: '0' },
        { label: 'Missed', value: '0' },
        { label: 'Monthly', value: '0' }
      ],
      icon: <FiCalendar />,
      color: '#36b9cc'
    },
    { 
      title: 'Due', 
      items: [
        { label: 'Total', value: '0' },
        { label: 'Today', value: '0' },
        { label: 'Weekly', value: '1' },
        { label: 'Monthly', value: '3' }
      ],
      icon: <FiDollarSign />,
      color: '#f6c23e'
    }
  ],
  attendance: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Present',
        data: [85, 88, 90, 92],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Absent',
        data: [15, 12, 10, 8],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  },
  attendancePie: {
    labels: ['Present', 'Absent', 'Late', 'Leave'],
    datasets: [
      {
        data: [75, 15, 5, 5],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderWidth: 1,
      },
    ],
  },
  amountCollection: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Amount Collected',
        data: [12000, 19000, 15000, 25000, 20000, 22000],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  },
  unpaidRecords: [
    {
      receiptNo: 'REC006409',
      admissionNo: 'ADM/2025/2091',
      studentName: 'Rahul Kumar',
      className: 'Nur',
      rollNo: '90',
      mobileNo: '9650334199',
      email: 'alex@example.com',
      paymentMonth: 'January',
      session: '2025-2026',
      totalFee: 1500,
      paidAmount: 0
    },
    {
      receiptNo: 'REC006408',
      admissionNo: 'ADM/2025/2090',
      studentName: 'Suyyash KUMAR',
      className: 'Nur',
      rollNo: '89',
      mobileNo: '9650334199',
      email: 'alex@example.com',
      paymentMonth: 'January',
      session: '2025-2026',
      totalFee: 1500,
      paidAmount: 0
    },
    // Add more records as needed
  ]
};

const Dashboard = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [frequency, setFrequency] = useState('monthly');
  const [currentSession, setCurrentSession] = useState('2023-24');

  const classes = ['All', 'Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const frequencies = ['Daily', 'Weekly', 'Monthly'];
  const sessions = ['2022-23', '2023-24', '2024-25'];

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-title">
          <FiHome className="header-icon" />
          <h1>Dashboard</h1>
        </div>
        <div className="session-selector">
          <label>Session:</label>
          <select 
            value={currentSession}
            onChange={(e) => setCurrentSession(e.target.value)}
          >
            {sessions.map(session => (
              <option key={session} value={session}>{session}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        {dashboardData.summary.map((card, index) => (
          <div key={index} className="summary-card">
            <div className="card-header">
              <h2>{card.title}</h2>
              <div className="icon" style={{ backgroundColor: card.color }}>
                {card.icon}
              </div>
            </div>
            <div className="card-content">
              {card.items.map((item, idx) => (
                <div key={idx} className="stat-item">
                  <span className="label">{item.label}</span>
                  <span className="value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Attendance Overview */}
      <div className="chart-container">
        <div className="chart-header">
          <h3>Attendance Overview</h3>
          <div className="chart-controls">
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="select-control"
            >
              {classes.map(cls => (
                <option key={cls} value={cls.toLowerCase()}>
                  {cls === 'all' ? 'All Classes' : `Class ${cls}`}
                </option>
              ))}
            </select>
            <select 
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="select-control"
            >
              {frequencies.map(freq => (
                <option key={freq.toLowerCase()} value={freq.toLowerCase()}>
                  {freq}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="chart-wrapper">
          <Bar 
            data={dashboardData.attendance}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  stacked: true,
                  grid: {
                    display: false
                  },
                  ticks: {
                    maxRotation: 45,
                    minRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 10
                  }
                },
                y: {
                  stacked: true,
                  max: 100,
                  grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                  },
                  title: {
                    display: true,
                    text: 'Percentage (%)',
                    padding: { bottom: 10 }
                  },
                  ticks: {
                    stepSize: 20
                  }
                }
              },
              plugins: {
                legend: {
                  position: 'top',
                  align: 'end',
                  labels: {
                    boxWidth: 12,
                    padding: 15,
                    usePointStyle: true,
                    pointStyle: 'circle'
                  }
                },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  titleFont: {
                    size: 13,
                    weight: 'bold'
                  },
                  bodyFont: {
                    size: 13
                  },
                  padding: 10,
                  displayColors: true,
                  callbacks: {
                    label: function(context) {
                      return `${context.dataset.label}: ${context.parsed.y}%`;
                    }
                  }
                }
              },
              layout: {
                padding: {
                  top: 10,
                  right: 10,
                  bottom: 10,
                  left: 10
                }
              }
            }}
          />
        </div>
      </div>

      {/* Unpaid Records Table */}
      <div className="unpaid-records">
        <div className="section-header">
          <FiDollarSign className="section-icon" />
          <h2>Current Session Unpaid Record</h2>
        </div>
        <div className="table-responsive">
          <div className="table-container" style={{ overflowY: 'auto', maxHeight: '300px' }}>
            <table className="unpaid-table">
              <thead>
                <tr>
                  <th>Receipt No.</th>
                  <th>Admission No.</th>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Roll No.</th>
                  <th>Mobile No.</th>
                  <th>Payment Month</th>
                  <th>Total Fee</th>
                  <th>Paid</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.unpaidRecords.map((record, index) => (
                  <tr key={index}>
                    <td>{record.receiptNo}</td>
                    <td>{record.admissionNo}</td>
                    <td className="student-name">{record.studentName}</td>
                    <td>{record.className}</td>
                    <td>{record.rollNo}</td>
                    <td>{record.mobileNo}</td>
                    <td>{record.paymentMonth}</td>
                    <td>₹{record.totalFee}</td>
                    <td>₹{record.paidAmount}</td>
                    <td className={record.totalFee - record.paidAmount > 0 ? 'unpaid' : 'paid'}>
                      ₹{record.totalFee - record.paidAmount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Total Attendance Pie Chart */}
      <div className="chart-container full-width">
        <div className="chart-header">
          <h3>Total Attendance</h3>
          <FiPieChart className="chart-icon" />
        </div>
        <div className="chart-wrapper">
          <Pie 
            data={dashboardData.attendancePie}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'right',
                },
              },
            }}
          />
        </div>
      </div>

      {/* Amount Collection Chart */}
      <div className="chart-container full-width">
        <div className="chart-header">
          <h3>Amount Collection</h3>
          <FiDollar className="chart-icon" />
        </div>
        <div className="chart-wrapper">
          <Line 
            data={{
              ...dashboardData.amountCollection,
              datasets: dashboardData.amountCollection.datasets.map(dataset => ({
                ...dataset,
                borderColor: '#4a6cf7',
                backgroundColor: 'rgba(74, 108, 247, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: '#4a6cf7',
                pointBorderColor: '#fff',
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#4a6cf7',
                pointHoverBorderColor: '#fff',
                pointHitRadius: 10,
                pointBorderWidth: 2,
                tension: 0.3,
                fill: true
              }))
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                  },
                  title: {
                    display: true,
                    text: 'Amount (₹)'
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              },
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  titleFont: {
                    size: 14,
                    weight: 'bold'
                  },
                  bodyFont: {
                    size: 13
                  },
                  padding: 12,
                  displayColors: false,
                  callbacks: {
                    label: function(context) {
                      return `₹${context.parsed.y.toLocaleString()}`;
                    }
                  }
                }
              },
              interaction: {
                intersect: false,
                mode: 'index'
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
