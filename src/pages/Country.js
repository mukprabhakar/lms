import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import '../components/Table.css';

const Country = () => {
  const [countries, setCountries] = useState([
    { id: 1, name: 'Afghanistan', code: 'AF' },
    { id: 2, name: 'Albania', code: 'AL' },
    { id: 3, name: 'Algeria', code: 'DZ' },
    { id: 4, name: 'Andorra', code: 'AD' },
    { id: 5, name: 'Angola', code: 'AO' },
    { id: 6, name: 'Antigua and Barbuda', code: 'AG' },
    { id: 7, name: 'Argentina', code: 'AR' },
    { id: 8, name: 'Armenia', code: 'AM' },
    { id: 9, name: 'Australia', code: 'AU' },
    { id: 10, name: 'Austria', code: 'AT' },
    { id: 11, name: 'Azerbaijan', code: 'AZ' },
    { id: 12, name: 'Bahamas', code: 'BS' },
    { id: 13, name: 'Bahrain', code: 'BH' },
    { id: 14, name: 'Bangladesh', code: 'BD' },
    { id: 15, name: 'Barbados', code: 'BB' },
    { id: 16, name: 'Belarus', code: 'BY' },
    { id: 17, name: 'Belgium', code: 'BE' },
    { id: 18, name: 'Belize', code: 'BZ' },
    { id: 19, name: 'Benin', code: 'BJ' },
    { id: 20, name: 'Bhutan', code: 'BT' },
    { id: 21, name: 'Bolivia', code: 'BO' },
    { id: 22, name: 'Bosnia and Herzegovina', code: 'BA' },
    { id: 23, name: 'Botswana', code: 'BW' },
    { id: 24, name: 'Brazil', code: 'BR' },
    { id: 25, name: 'Brunei', code: 'BN' },
    { id: 26, name: 'Bulgaria', code: 'BG' },
    { id: 27, name: 'Burkina Faso', code: 'BF' },
    { id: 28, name: 'Burundi', code: 'BI' },
    { id: 29, name: 'Cabo Verde', code: 'CV' },
    { id: 30, name: 'Cambodia', code: 'KH' },
    { id: 31, name: 'Cameroon', code: 'CM' },
    { id: 32, name: 'Canada', code: 'CA' },
    { id: 33, name: 'Central African Republic', code: 'CF' },
    { id: 34, name: 'Chad', code: 'TD' },
    { id: 35, name: 'Chile', code: 'CL' },
    { id: 36, name: 'China', code: 'CN' },
    { id: 37, name: 'Colombia', code: 'CO' },
    { id: 38, name: 'Comoros', code: 'KM' },
    { id: 39, name: 'Congo', code: 'CG' },
    { id: 40, name: 'Costa Rica', code: 'CR' },
    { id: 41, name: 'Croatia', code: 'HR' },
    { id: 42, name: 'Cuba', code: 'CU' },
    { id: 43, name: 'Cyprus', code: 'CY' },
    { id: 44, name: 'Czech Republic', code: 'CZ' },
    { id: 45, name: 'Denmark', code: 'DK' },
    { id: 46, name: 'Djibouti', code: 'DJ' },
    { id: 47, name: 'Dominica', code: 'DM' },
    { id: 48, name: 'Dominican Republic', code: 'DO' },
    { id: 49, name: 'Ecuador', code: 'EC' },
    { id: 50, name: 'Egypt', code: 'EG' },
    { id: 51, name: 'El Salvador', code: 'SV' },
    { id: 52, name: 'Equatorial Guinea', code: 'GQ' },
    { id: 53, name: 'Eritrea', code: 'ER' },
    { id: 54, name: 'Estonia', code: 'EE' },
    { id: 55, name: 'Eswatini', code: 'SZ' },
    { id: 56, name: 'Ethiopia', code: 'ET' },
    { id: 57, name: 'Fiji', code: 'FJ' },
    { id: 58, name: 'Finland', code: 'FI' },
    { id: 59, name: 'France', code: 'FR' },
    { id: 60, name: 'Gabon', code: 'GA' },
    { id: 61, name: 'Gambia', code: 'GM' },
    { id: 62, name: 'Georgia', code: 'GE' },
    { id: 63, name: 'Germany', code: 'DE' },
    { id: 64, name: 'Ghana', code: 'GH' },
    { id: 65, name: 'Greece', code: 'GR' },
    { id: 66, name: 'Grenada', code: 'GD' },
    { id: 67, name: 'Guatemala', code: 'GT' },
    { id: 68, name: 'Guinea', code: 'GN' },
    { id: 69, name: 'Guinea-Bissau', code: 'GW' },
    { id: 70, name: 'Guyana', code: 'GY' },
    { id: 71, name: 'Haiti', code: 'HT' },
    { id: 72, name: 'Honduras', code: 'HN' },
    { id: 73, name: 'Hungary', code: 'HU' },
    { id: 74, name: 'Iceland', code: 'IS' },
    { id: 75, name: 'India', code: 'IN' },
    { id: 76, name: 'Indonesia', code: 'ID' },
    { id: 77, name: 'Iran', code: 'IR' },
    { id: 78, name: 'Iraq', code: 'IQ' },
    { id: 79, name: 'Ireland', code: 'IE' },
    { id: 80, name: 'Israel', code: 'IL' },
    { id: 81, name: 'Italy', code: 'IT' },
    { id: 82, name: 'Jamaica', code: 'JM' },
    { id: 83, name: 'Japan', code: 'JP' },
    { id: 84, name: 'Jordan', code: 'JO' },
    { id: 85, name: 'Kazakhstan', code: 'KZ' },
    { id: 86, name: 'Kenya', code: 'KE' },
    { id: 87, name: 'Kiribati', code: 'KI' },
    { id: 88, name: 'Korea, North', code: 'KP' },
    { id: 89, name: 'Korea, South', code: 'KR' },
    { id: 90, name: 'Kosovo', code: 'XK' },
    { id: 91, name: 'Kuwait', code: 'KW' },
    { id: 92, name: 'Kyrgyzstan', code: 'KG' },
    { id: 93, name: 'Laos', code: 'LA' },
    { id: 94, name: 'Latvia', code: 'LV' },
    { id: 95, name: 'Lebanon', code: 'LB' },
    { id: 96, name: 'Lesotho', code: 'LS' },
    { id: 97, name: 'Liberia', code: 'LR' },
    { id: 98, name: 'Libya', code: 'LY' },
    { id: 99, name: 'Liechtenstein', code: 'LI' },
    { id: 100, name: 'Lithuania', code: 'LT' },
    { id: 101, name: 'Luxembourg', code: 'LU' },
    { id: 102, name: 'Madagascar', code: 'MG' },
    { id: 103, name: 'Malawi', code: 'MW' },
    { id: 104, name: 'Malaysia', code: 'MY' },
    { id: 105, name: 'Maldives', code: 'MV' },
    { id: 106, name: 'Mali', code: 'ML' },
    { id: 107, name: 'Malta', code: 'MT' },
    { id: 108, name: 'Marshall Islands', code: 'MH' },
    { id: 109, name: 'Mauritania', code: 'MR' },
    { id: 110, name: 'Mauritius', code: 'MU' },
    { id: 111, name: 'Mexico', code: 'MX' },
    { id: 112, name: 'Micronesia', code: 'FM' },
    { id: 113, name: 'Moldova', code: 'MD' },
    { id: 114, name: 'Monaco', code: 'MC' },
    { id: 115, name: 'Mongolia', code: 'MN' },
    { id: 116, name: 'Montenegro', code: 'ME' },
    { id: 117, name: 'Morocco', code: 'MA' },
    { id: 118, name: 'Mozambique', code: 'MZ' },
    { id: 119, name: 'Myanmar', code: 'MM' },
    { id: 120, name: 'Namibia', code: 'NA' },
    { id: 121, name: 'Nauru', code: 'NR' },
    { id: 122, name: 'Nepal', code: 'NP' },
    { id: 123, name: 'Netherlands', code: 'NL' },
    { id: 124, name: 'New Zealand', code: 'NZ' },
    { id: 125, name: 'Nicaragua', code: 'NI' },
    { id: 126, name: 'Niger', code: 'NE' },
    { id: 127, name: 'Nigeria', code: 'NG' },
    { id: 128, name: 'North Macedonia', code: 'MK' },
    { id: 129, name: 'Norway', code: 'NO' },
    { id: 130, name: 'Oman', code: 'OM' },
    { id: 131, name: 'Pakistan', code: 'PK' },
    { id: 132, name: 'Palau', code: 'PW' },
    { id: 133, name: 'Palestine', code: 'PS' },
    { id: 134, name: 'Panama', code: 'PA' },
    { id: 135, name: 'Papua New Guinea', code: 'PG' },
    { id: 136, name: 'Paraguay', code: 'PY' },
    { id: 137, name: 'Peru', code: 'PE' },
    { id: 138, name: 'Philippines', code: 'PH' },
    { id: 139, name: 'Poland', code: 'PL' },
    { id: 140, name: 'Portugal', code: 'PT' },
    { id: 141, name: 'Qatar', code: 'QA' },
    { id: 142, name: 'Romania', code: 'RO' },
    { id: 143, name: 'Russia', code: 'RU' },
    { id: 144, name: 'Rwanda', code: 'RW' },
    { id: 145, name: 'Saint Kitts and Nevis', code: 'KN' },
    { id: 146, name: 'Saint Lucia', code: 'LC' },
    { id: 147, name: 'Saint Vincent and the Grenadines', code: 'VC' },
    { id: 148, name: 'Samoa', code: 'WS' },
    { id: 149, name: 'San Marino', code: 'SM' },
    { id: 150, name: 'Sao Tome and Principe', code: 'ST' },
    { id: 151, name: 'Saudi Arabia', code: 'SA' },
    { id: 152, name: 'Senegal', code: 'SN' },
    { id: 153, name: 'Serbia', code: 'RS' },
    { id: 154, name: 'Seychelles', code: 'SC' },
    { id: 155, name: 'Sierra Leone', code: 'SL' },
    { id: 156, name: 'Singapore', code: 'SG' },
    { id: 157, name: 'Slovakia', code: 'SK' },
    { id: 158, name: 'Slovenia', code: 'SI' },
    { id: 159, name: 'Solomon Islands', code: 'SB' },
    { id: 160, name: 'Somalia', code: 'SO' },
    { id: 161, name: 'South Africa', code: 'ZA' },
    { id: 162, name: 'South Sudan', code: 'SS' },
    { id: 163, name: 'Spain', code: 'ES' },
    { id: 164, name: 'Sri Lanka', code: 'LK' },
    { id: 165, name: 'Sudan', code: 'SD' },
    { id: 166, name: 'Suriname', code: 'SR' },
    { id: 167, name: 'Sweden', code: 'SE' },
    { id: 168, name: 'Switzerland', code: 'CH' },
    { id: 169, name: 'Syria', code: 'SY' },
    { id: 170, name: 'Taiwan', code: 'TW' },
    { id: 171, name: 'Tajikistan', code: 'TJ' },
    { id: 172, name: 'Tanzania', code: 'TZ' },
    { id: 173, name: 'Thailand', code: 'TH' },
    { id: 174, name: 'Timor-Leste', code: 'TL' },
    { id: 175, name: 'Togo', code: 'TG' },
    { id: 176, name: 'Tonga', code: 'TO' },
    { id: 177, name: 'Trinidad and Tobago', code: 'TT' },
    { id: 178, name: 'Tunisia', code: 'TN' },
    { id: 179, name: 'Turkey', code: 'TR' },
    { id: 180, name: 'Turkmenistan', code: 'TM' },
    { id: 181, name: 'Tuvalu', code: 'TV' },
    { id: 182, name: 'Uganda', code: 'UG' },
    { id: 183, name: 'Ukraine', code: 'UA' },
    { id: 184, name: 'United Arab Emirates', code: 'AE' },
    { id: 185, name: 'United Kingdom', code: 'GB' },
    { id: 186, name: 'United States', code: 'US' },
    { id: 187, name: 'Uruguay', code: 'UY' },
    { id: 188, name: 'Uzbekistan', code: 'UZ' },
    { id: 189, name: 'Vanuatu', code: 'VU' },
    { id: 190, name: 'Vatican City', code: 'VA' },
    { id: 191, name: 'Venezuela', code: 'VE' },
    { id: 192, name: 'Vietnam', code: 'VN' },
    { id: 193, name: 'Yemen', code: 'YE' },
    { id: 194, name: 'Zambia', code: 'ZM' },
    { id: 195, name: 'Zimbabwe', code: 'ZW' }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    code: ''
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter countries based on search term
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCountries.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

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
      // Update existing country
      setCountries(countries.map(country => 
        country.id === currentId ? { ...formData, id: currentId } : country
      ));
    } else {
      // Add new country
      const newCountry = {
        ...formData,
        id: countries.length > 0 ? Math.max(...countries.map(c => c.id)) + 1 : 1
      };
      setCountries([...countries, newCountry]);
    }
    resetForm();
  };

  const handleEdit = (country) => {
    setFormData({
      name: country.name,
      code: country.code
    });
    setIsEditMode(true);
    setCurrentId(country.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this country?')) {
      setCountries(countries.filter(country => country.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: ''
    });
    setIsFormOpen(false);
    setIsEditMode(false);
    setCurrentId(null);
  };


  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Country Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
        >
          <FiPlus /> Add Country
        </button>
      </div>

      <div className="table-controls">
        <div className="search-input">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
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
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {isFormOpen && (
        <div className="form-container">
          <div className="form-header">
            <h3>{isEditMode ? 'Edit' : 'Add New'} Country</h3>
            <button className="close-btn" onClick={resetForm}>
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Country Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Country Code *</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                required
                maxLength="3"
                style={{ textTransform: 'uppercase' }}
              />
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
              <th>#</th>
              <th>Country Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((country, index) => (
                <tr key={country.id}>
                  <td>{index + 1}</td>
                  <td>{country.name}</td>
                  <td className="action-buttons">
                    <button 
                      className="btn-icon edit" 
                      onClick={() => handleEdit(country)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="btn-icon delete"
                      onClick={() => handleDelete(country.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-data">
                  No countries found. Add a new country to get started.
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
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCountries.length)} of {filteredCountries.length} entries
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Country;
