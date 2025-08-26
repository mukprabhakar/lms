import React, { useState } from 'react';
import { FiDownload, FiPrinter, FiX } from 'react-icons/fi';
import './InventoryReport.css';

const InventoryReport = () => {
  // Sample data
  const categories = ['All Categories', 'Stationery', 'Electronics', 'Furniture', 'Lab Equipment'];
  const vendors = ['All Vendors', 'ABC Suppliers', 'XYZ Corp', 'Global Electronics', 'Office Plus'];
  
  // State for each report
  const [stockIssueFilters, setStockIssueFilters] = useState({
    fromDate: '',
    toDate: ''
  });

  const [stockReturnFilters, setStockReturnFilters] = useState({
    fromDate: '',
    toDate: ''
  });

  const [stockSummaryFilters, setStockSummaryFilters] = useState({
    category: '',
    fromDate: '',
    toDate: ''
  });

  const [stockMovementFilters, setStockMovementFilters] = useState({
    fromDate: '',
    toDate: ''
  });

  const [vendorPurchaseFilters, setVendorPurchaseFilters] = useState({
    vendor: '',
    fromDate: '',
    toDate: ''
  });

  // Handle form submissions
  const handleSubmit = (e, reportType) => {
    e.preventDefault();
    console.log(`Generating ${reportType} report`);
    // API call would go here
  };

  // Export to CSV functions
  const exportToCSV = (reportType) => {
    console.log(`Exporting ${reportType} to CSV`);
    // CSV export logic would go here
  };

  // Clear form fields
  const clearFields = (setter, initialState) => {
    setter(initialState);
  };

  // Report Section Component
  const ReportSection = ({ 
    title, 
    filters, 
    setFilters, 
    showCategory = false, 
    showVendor = false 
  }) => (
    <div className="report-section">
      <h2>{title}</h2>
      <form onSubmit={(e) => handleSubmit(e, title)} className="report-form">
        <div className="form-row">
          {showCategory && (
            <div className="form-group">
              <label>Category</label>
              <select 
                className="form-control" 
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {showVendor && (
            <div className="form-group">
              <label>Vendor</label>
              <select 
                className="form-control" 
                value={filters.vendor}
                onChange={(e) => setFilters({...filters, vendor: e.target.value})}
              >
                {vendors.map((vendor, index) => (
                  <option key={index} value={vendor}>
                    {vendor}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div className="form-group">
            <label>From Date</label>
            <input 
              type="date" 
              className="form-control" 
              value={filters.fromDate}
              onChange={(e) => setFilters({...filters, fromDate: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>To Date</label>
            <input 
              type="date" 
              className="form-control" 
              value={filters.toDate}
              min={filters.fromDate}
              onChange={(e) => setFilters({...filters, toDate: e.target.value})}
            />
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <FiPrinter /> Generate Report
          </button>
          <button 
            type="button" 
            className="btn btn-outline-primary"
            onClick={() => exportToCSV(title)}
          >
            <FiDownload /> Download CSV
          </button>
          <button 
            type="button" 
            className="btn btn-outline-secondary"
            onClick={() => {
              const initialState = {
                fromDate: '',
                toDate: '',
                ...(showCategory && { category: '' }),
                ...(showVendor && { vendor: '' })
              };
              if (title === 'Stock Issue Report') {
                clearFields(setStockIssueFilters, initialState);
              } else if (title === 'Stock Return Report') {
                clearFields(setStockReturnFilters, initialState);
              } else if (title === 'Stock Summary Report') {
                clearFields(setStockSummaryFilters, { category: '', fromDate: '', toDate: '' });
              } else if (title === 'Vendor Purchase Report') {
                clearFields(setVendorPurchaseFilters, { vendor: '', fromDate: '', toDate: '' });
              } else {
                clearFields(setStockMovementFilters, initialState);
              }
            }}
          >
            <FiX /> Clear Fields
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="inventory-report">
      <h1>Inventory Reports</h1>
      
      {/* Stock Issue Report */}
      <ReportSection 
        title="Stock Issue Report"
        filters={stockIssueFilters}
        setFilters={setStockIssueFilters}
      />
      
      {/* Stock Return Report */}
      <ReportSection 
        title="Stock Return Report"
        filters={stockReturnFilters}
        setFilters={setStockReturnFilters}
      />
      
      {/* Stock Summary Report */}
      <ReportSection 
        title="Stock Summary Report"
        filters={stockSummaryFilters}
        setFilters={setStockSummaryFilters}
        showCategory={true}
      />
      
      {/* Stock Movement Report */}
      <ReportSection 
        title="Stock Movement Report"
        filters={stockMovementFilters}
        setFilters={setStockMovementFilters}
      />
      
      {/* Vendor Purchase Report */}
      <ReportSection 
        title="Vendor Purchase Report"
        filters={vendorPurchaseFilters}
        setFilters={setVendorPurchaseFilters}
        showVendor={true}
      />
    </div>
  );
};

export default InventoryReport;
