import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiRefreshCw, FiEye } from 'react-icons/fi';
import './WhatsAppAPI.css';

const WhatsAppAPI = () => {
  // Sample data for WhatsApp API
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      apiKey: '576578678e6wkdhfjd',
      apiUrl: 'httsps',
      expiryDate: '7/10/2025',
      limitCount: 5,
      spentCount: 0,
      status: 'Active'
    },
    {
      id: 2,
      apiKey: '62709b45bdfb471b9f1450528637553a',
      apiUrl: 'http://api.wtap.sms4power.com/wapp/v2/api/send?',
      expiryDate: '10/23/2024',
      limitCount: 9900,
      spentCount: 248,
      status: 'Active'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentApi, setCurrentApi] = useState({
    id: null,
    apiKey: '',
    apiUrl: '',
    expiryDate: '',
    limitCount: '',
    status: 'Active'
  });
  const [viewMode, setViewMode] = useState(false);

  // Filter API keys based on search term
  const filteredApiKeys = apiKeys.filter(api => 
    api.apiKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
    api.apiUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    api.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentApi(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentApi.apiKey.trim() || !currentApi.apiUrl.trim()) {
      alert('API Key and API URL are required');
      return;
    }

    if (currentApi.id) {
      // Update existing API key
      setApiKeys(apiKeys.map(api => 
        api.id === currentApi.id ? currentApi : api
      ));
    } else {
      // Add new API key
      const newApi = {
        ...currentApi,
        id: apiKeys.length > 0 ? Math.max(...apiKeys.map(a => a.id)) + 1 : 1,
        spentCount: 0
      };
      setApiKeys([...apiKeys, newApi]);
    }

    // Reset form
    setCurrentApi({
      id: null,
      apiKey: '',
      apiUrl: '',
      expiryDate: '',
      limitCount: '',
      status: 'Active'
    });
    setIsModalOpen(false);
    setViewMode(false);
  };

  // Handle edit
  const handleEdit = (api) => {
    setCurrentApi({ ...api });
    setViewMode(false);
    setIsModalOpen(true);
  };

  // Handle view
  const handleView = (api) => {
    setCurrentApi({ ...api });
    setViewMode(true);
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this API key?')) {
      setApiKeys(apiKeys.filter(api => api.id !== id));
    }
  };

  // Handle refresh API key
  const handleRefresh = (id) => {
    if (window.confirm('Are you sure you want to refresh this API key?')) {
      const newKey = Math.random().toString(36).substring(2, 15) + 
                    Math.random().toString(36).substring(2, 15);
      
      setApiKeys(apiKeys.map(api => 
        api.id === id ? { ...api, apiKey: newKey } : api
      ));
    }
  };

  // Format date for input field
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const [month, day, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  // Parse date from input
  const parseInputDate = (inputDate) => {
    if (!inputDate) return '';
    const [year, month, day] = inputDate.split('-');
    return `${parseInt(month)}/${parseInt(day)}/${year}`;
  };

  return (
    <div className="whatsapp-api-container">
      <div className="page-header">
        <h2>WhatsApp API Management</h2>
        <p>Manage your WhatsApp API keys and configurations</p>
      </div>

      <div className="api-actions">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search API keys..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setCurrentApi({
              id: null,
              apiKey: '',
              apiUrl: '',
              expiryDate: '',
              limitCount: '',
              status: 'Active'
            });
            setViewMode(false);
            setIsModalOpen(true);
          }}
        >
          <FiPlus /> Add New API Key
        </button>
      </div>

      <div className="api-table-container">
        <table className="api-table">
          <thead>
            <tr>
              <th>API Key</th>
              <th>API URL</th>
              <th>Expiry Date</th>
              <th>Limit Count</th>
              <th>Spent Count</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApiKeys.length > 0 ? (
              filteredApiKeys.map(api => (
                <tr key={api.id}>
                  <td className="api-key-cell">
                    <div className="api-key">
                      {api.apiKey.substring(0, 8)}...
                      <span className="copy-icon" onClick={() => {
                        navigator.clipboard.writeText(api.apiKey);
                        alert('API key copied to clipboard!');
                      }}>⎘</span>
                    </div>
                  </td>
                  <td className="api-url">
                    <div className="truncate">{api.apiUrl}</div>
                  </td>
                  <td>{api.expiryDate}</td>
                  <td>{api.limitCount.toLocaleString()}</td>
                  <td>{api.spentCount.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${api.status.toLowerCase()}`}>
                      {api.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button 
                      className="btn-icon"
                      onClick={() => handleView(api)}
                      title="View"
                    >
                      <FiEye />
                    </button>
                    <button 
                      className="btn-icon"
                      onClick={() => handleEdit(api)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="btn-icon"
                      onClick={() => handleRefresh(api.id)}
                      title="Refresh Key"
                    >
                      <FiRefreshCw />
                    </button>
                    <button 
                      className="btn-icon danger"
                      onClick={() => handleDelete(api.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-results">
                  No API keys found. Try a different search or add a new API key.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit/View Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>
                {viewMode ? 'View' : currentApi.id ? 'Edit' : 'Add New'} 
                WhatsApp API {viewMode ? 'Details' : 'Key'}
              </h3>
              <button 
                className="close-btn"
                onClick={() => {
                  setIsModalOpen(false);
                  setViewMode(false);
                }}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>API Key {!viewMode && <span className="required">*</span>}</label>
                <div className="input-with-button">
                  <input
                    type={viewMode ? 'text' : 'password'}
                    name="apiKey"
                    value={currentApi.apiKey}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter API key"
                    required={!viewMode}
                    readOnly={viewMode || !!currentApi.id}
                  />
                  {viewMode && (
                    <button 
                      type="button" 
                      className="btn-icon"
                      onClick={() => {
                        navigator.clipboard.writeText(currentApi.apiKey);
                        alert('API key copied to clipboard!');
                      }}
                      title="Copy to clipboard"
                    >
                      ⎘
                    </button>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label>API URL {!viewMode && <span className="required">*</span>}</label>
                <input
                  type="text"
                  name="apiUrl"
                  value={currentApi.apiUrl}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter API URL"
                  required={!viewMode}
                  readOnly={viewMode}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formatDateForInput(currentApi.expiryDate)}
                    onChange={(e) => {
                      setCurrentApi(prev => ({
                        ...prev,
                        expiryDate: parseInputDate(e.target.value)
                      }));
                    }}
                    className="form-control"
                    disabled={viewMode}
                  />
                </div>
                
                <div className="form-group">
                  <label>Limit Count</label>
                  <input
                    type="number"
                    name="limitCount"
                    value={currentApi.limitCount}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter limit count"
                    min="0"
                    readOnly={viewMode}
                  />
                </div>
              </div>
              
              {currentApi.id && (
                <div className="form-group">
                  <label>Spent Count</label>
                  <input
                    type="number"
                    value={currentApi.spentCount}
                    className="form-control"
                    readOnly
                  />
                </div>
              )}
              
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={currentApi.status}
                  onChange={handleInputChange}
                  className="form-control"
                  disabled={viewMode}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              
              {!viewMode && (
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setIsModalOpen(false);
                      setViewMode(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {currentApi.id ? 'Update' : 'Create'} API Key
                  </button>
                </div>
              )}
              
              {viewMode && (
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {
                      setIsModalOpen(false);
                      setViewMode(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppAPI;
