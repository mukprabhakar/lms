import React, { useState } from 'react';
import './FeeGeneration.css';

const FeeGeneration = () => {
  // Sample data for dropdowns
  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  const sessions = ['2023-2024', '2024-2025', '2025-2026'];
  
  // Sample charge data with amounts
  const [charges, setCharges] = useState([
    { id: 1, name: 'Exam Fees', type: 'Monthly', amount: 0 },
    { id: 2, name: 'ID Card', type: 'Monthly', amount: 0 },
    { id: 3, name: 'Lab Fees', type: 'Monthly', amount: 0 },
    { id: 4, name: 'Monthly Fees', type: 'Monthly', amount: 0 },
    { id: 5, name: 'Transport', type: 'Monthly', amount: 0 },
  ]);

  // Handle charge amount change
  const handleAmountChange = (id, value) => {
    setCharges(charges.map(charge => 
      charge.id === id ? { ...charge, amount: parseFloat(value) || 0 } : charge
    ));
  };

  // Months data
  const months = [
    'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December', 'January', 'February', 'March'
  ];

  // State management
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSession, setSelectedSession] = useState('');

  // State for modal and summary
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState({
    totalAmount: 0,
    chargeBreakdown: []
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedClass || !selectedSession) {
      alert('Please select both Class and Session');
      return;
    }

    // Calculate total amount and prepare breakdown
    const chargeBreakdown = charges.map(charge => ({
      name: charge.name,
      amount: charge.amount,
      type: charge.type
    }));

    const totalAmount = charges.reduce((sum, charge) => sum + (charge.amount || 0), 0);
    
    setSummaryData({
      totalAmount,
      chargeBreakdown,
      selectedClass,
      selectedSession,
      selectedMonths: months // For now showing all months, can be filtered based on selection
    });
    
    setShowSummary(true);
  };

  // Handle reset
  const handleReset = () => {
    setSelectedClass('');
    setSelectedSession('');
  };

  return (
    <div className="fee-generation">
      <div className="page-header">
        <h1>Generate Fee</h1>
      </div>

      <div className="fee-generation-container">
        <h2>Fee Generation</h2>
        
        {/* Class and Session Selection */}
        <div className="selection-row">
          <div className="form-group">
            <label>Class</label>
            <select 
              className="form-control"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              required
            >
              <option value="">Select Class</option>
              {classes.map((cls, index) => (
                <option key={index} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Session</label>
            <select 
              className="form-control"
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              required
            >
              <option value="">Select Session</option>
              {sessions.map((session, index) => (
                <option key={index} value={session}>{session}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Months Selection */}
        <div className="months-section">
          <h3>Select Months</h3>
          <div className="months-grid">
            {months.map((month, index) => (
              <div key={index} className="month-checkbox">
                <input 
                  type="checkbox" 
                  id={`month-${index}`} 
                  className="month-checkbox-input"
                />
                <label htmlFor={`month-${index}`} className="month-label">
                  {month}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Charges Table */}
        <div className="charges-tables">
          {months.map((month, monthIndex) => (
            <div key={monthIndex} className="monthly-charges">
              <h3>{month}</h3>
              <div className="table-responsive">
                <table className="charges-table">
                  <thead>
                    <tr>
                      <th>Charge Name</th>
                      <th>Charge Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {charges.map((charge) => (
                      <tr key={charge.id}>
                        <td>{charge.name}</td>
                        <td>{charge.type}</td>
                        <td className="charge-amount-cell">
                          <div className="charge-amount-input">
                            <span className="currency-symbol">₹</span>
                            <input
                              type="number"
                              value={charge.amount}
                              onChange={(e) => handleAmountChange(charge.id, e.target.value)}
                              min="0"
                              step="0.01"
                              className="amount-input"
                              placeholder="0.00"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Generate Fee
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={handleReset}
          >
            Reset Fee
          </button>
        </div>

        {/* Summary Modal */}
        {showSummary && (
          <div className="modal-overlay">
            <div className="summary-modal">
              <div className="modal-header">
                <h2>Fee Summary</h2>
                <button 
                  className="close-btn"
                  onClick={() => setShowSummary(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="summary-details">
                  <div className="detail-row">
                    <span className="detail-label">Class:</span>
                    <span className="detail-value">{summaryData.selectedClass}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Session:</span>
                    <span className="detail-value">{summaryData.selectedSession}</span>
                  </div>
                  
                  <div className="charges-summary">
                    <h3>Charges Breakdown</h3>
                    <table className="summary-table">
                      <thead>
                        <tr>
                          <th>Charge Name</th>
                          <th>Type</th>
                          <th>Amount (₹)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {summaryData.chargeBreakdown.map((charge, index) => (
                          <tr key={index}>
                            <td>{charge.name}</td>
                            <td>{charge.type}</td>
                            <td className="text-right">{charge.amount.toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="total-row">
                          <td colSpan="2"><strong>Total Amount</strong></td>
                          <td className="text-right">
                            <strong>₹{summaryData.totalAmount.toFixed(2)}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowSummary(false)}
                >
                  Close
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    // Handle final fee generation here
                    alert('Fee generated successfully!');
                    setShowSummary(false);
                  }}
                >
                  Confirm & Generate
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeeGeneration;
