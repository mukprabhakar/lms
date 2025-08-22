import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import '../components/Table.css';

const Nationality = () => {
  // Sample data - in a real app, this would come from an API
  const [nationalities, setNationalities] = useState([
    { id: 1, name: 'Indian' },
    { id: 2, name: 'American' },
    { id: 3, name: 'British' },
    { id: 4, name: 'Canadian' },
    { id: 5, name: 'Australian' },
    { id: 6, name: 'Chinese' },
    { id: 7, name: 'Japanese' },
    { id: 8, name: 'Russian' },
    { id: 9, name: 'French' },
    { id: 10, name: 'German' },
    { id: 11, name: 'Italian' },
    { id: 12, name: 'Spanish' },
    { id: 13, name: 'Brazilian' },
    { id: 14, name: 'Mexican' },
    { id: 15, name: 'South African' },
    { id: 16, name: 'Nigerian' },
    { id: 17, name: 'Egyptian' },
    { id: 18, name: 'Saudi Arabian' },
    { id: 19, name: 'Turkish' },
    { id: 20, name: 'Iranian' },
    { id: 21, name: 'Iraqi' },
    { id: 22, name: 'Afghan' },
    { id: 23, name: 'Pakistani' },
    { id: 24, name: 'Bangladeshi' },
    { id: 25, name: 'Sri Lankan' },
    { id: 26, name: 'Nepalese' },
    { id: 27, name: 'Bhutanese' },
    { id: 28, name: 'Maldivian' },
    { id: 29, name: 'Indonesian' },
    { id: 30, name: 'Malaysian' },
    { id: 31, name: 'Singaporean' },
    { id: 32, name: 'Thai' },
    { id: 33, name: 'Vietnamese' },
    { id: 34, name: 'Filipino' },
    { id: 35, name: 'South Korean' },
    { id: 36, name: 'North Korean' },
    { id: 37, name: 'Mongolian' },
    { id: 38, name: 'Kazakh' },
    { id: 39, name: 'Uzbek' },
    { id: 40, name: 'Turkmen' },
  ]);

  const [formData, setFormData] = useState({
    name: ''
  });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter nationalities based on search term
  const filteredNationalities = nationalities.filter(nationality => 
    nationality.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredNationalities.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNationalities.slice(indexOfFirstItem, indexOfLastItem);

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
      setNationalities(nationalities.map(nat => 
        nat.id === currentId ? { ...formData, id: currentId } : nat
      ));
    } else {
      const newNationality = {
        ...formData,
        id: nationalities.length > 0 ? Math.max(...nationalities.map(n => n.id)) + 1 : 1
      };
      setNationalities([...nationalities, newNationality]);
    }
    resetForm();
  };

  const handleEdit = (nationality) => {
    setFormData({
      name: nationality.name
    });
    setIsEditMode(true);
    setCurrentId(nationality.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this nationality?')) {
      setNationalities(nationalities.filter(nat => nat.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: ''
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

  // Sort nationalities alphabetically
  const sortedNationalities = [...currentItems].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Nationality</h2>
        <button 
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
        >
          <FiPlus /> Add Nationality
        </button>
      </div>

      <div className="table-controls">
        <div className="search-input">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search nationalities..."
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
            <h3>{isEditMode ? 'Edit' : 'Add New'} Nationality</h3>
            <button className="close-btn" onClick={resetForm}>
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nationality Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                autoComplete="off"
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
              <th>Nationality</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedNationalities.length > 0 ? (
              sortedNationalities.map((nationality, index) => (
                <tr key={nationality.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{nationality.name}</td>
                  <td className="action-buttons">
                    <button 
                      className="btn-icon edit" 
                      onClick={() => handleEdit(nationality)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="btn-icon delete" 
                      onClick={() => handleDelete(nationality.id)}
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
                  No nationalities found. Add a new nationality to get started.
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
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredNationalities.length)} of {filteredNationalities.length} entries
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nationality;
