import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import './ItemCategory.css';

const ItemCategory = () => {
  // Sample data for categories
  const [categories, setCategories] = useState([
    // General Categories
    { id: 1, name: 'Goods', description: 'General goods and merchandise' },
    { id: 2, name: 'Dresses', description: 'Clothing and apparel items' },
    { id: 3, name: 'Books', description: 'Educational and reference books' },
    { id: 4, name: 'Copies', description: 'Printed materials and stationery' },
    { id: 5, name: 'Christmas Items', description: 'Seasonal holiday gifts and decor' },
    
    // Office & School Supplies
    { id: 6, name: 'Office Supplies', description: 'General office stationery' },
    { id: 7, name: 'Writing Instruments', description: 'Pens, pencils, and markers' },
    { id: 8, name: 'Paper Products', description: 'Printing and writing paper' },
    { id: 9, name: 'Filing & Storage', description: 'Folders, binders, and organizers' },
    { id: 10, name: 'Desk Accessories', description: 'Desk organizers and supplies' },
    
    // Electronics
    { id: 11, name: 'Computers', description: 'Desktops and laptops' },
    { id: 12, name: 'Peripherals', description: 'Keyboards, mice, and other devices' },
    { id: 13, name: 'Networking', description: 'Routers, switches, and cables' },
    { id: 14, name: 'Audio/Video', description: 'Speakers, headphones, and displays' },
    { id: 15, name: 'Mobile Devices', description: 'Tablets and smartphones' },
    
    // Furniture & Equipment
    { id: 16, name: 'Office Furniture', description: 'Desks, chairs, and cabinets' },
    { id: 17, name: 'Classroom Furniture', description: 'Student desks and chairs' },
    { id: 18, name: 'Storage Solutions', description: 'Shelving and storage units' },
    { id: 19, name: 'Whiteboards', description: 'Whiteboards and accessories' },
    { id: 20, name: 'Projectors', description: 'Projection equipment and screens' },
    
    // Cleaning & Maintenance
    { id: 21, name: 'Cleaning Supplies', description: 'Cleaning chemicals and tools' },
    { id: 22, name: 'Janitorial', description: 'Maintenance and cleaning equipment' },
    { id: 23, name: 'Breakroom', description: 'Kitchen and breakroom supplies' },
    { id: 24, name: 'Safety Equipment', description: 'First aid and safety gear' },
    { id: 25, name: 'Maintenance Tools', description: 'Repair and maintenance tools' },
    
    // School & Educational
    { id: 26, name: 'Art Supplies', description: 'Art and craft materials' },
    { id: 27, name: 'Science Lab', description: 'Laboratory equipment and supplies' },
    { id: 28, name: 'Sports Equipment', description: 'Athletic and recreational gear' },
    { id: 29, name: 'Musical Instruments', description: 'Instruments and accessories' },
    { id: 30, name: 'Library Books', description: 'Fiction and reference books' },
    
    // Technology & Software
    { id: 31, name: 'Software', description: 'Licensed software applications' },
    { id: 32, name: 'Subscriptions', description: 'Digital service subscriptions' },
    { id: 33, name: 'Cloud Services', description: 'Online storage and services' },
    { id: 34, name: 'Security', description: 'Security software and hardware' },
    { id: 35, name: 'Accessories', description: 'Device accessories and add-ons' },
    
    // Facility & Operations
    { id: 36, name: 'HVAC', description: 'Heating and cooling equipment' },
    { id: 37, name: 'Lighting', description: 'Light fixtures and bulbs' },
    { id: 38, name: 'Plumbing', description: 'Plumbing supplies and fixtures' },
    { id: 39, name: 'Electrical', description: 'Electrical components and supplies' },
    { id: 40, name: 'Signage', description: 'Directional and informational signs' },
    
    // Seasonal & Events
    { id: 41, name: 'Holiday Decor', description: 'Seasonal decorations' },
    { id: 42, name: 'Event Supplies', description: 'Party and event materials' },
    { id: 43, name: 'Awards & Trophies', description: 'Recognition items' },
    { id: 44, name: 'Gifts & Giveaways', description: 'Promotional items' },
    { id: 45, name: 'Catering Supplies', description: 'Food service items' },
    
    // Miscellaneous
    { id: 46, name: 'Lost & Found', description: 'Unclaimed items' },
    { id: 47, name: 'Donations', description: 'Donated items' },
    { id: 48, name: 'Recycling', description: 'Recyclable materials' },
    { id: 49, name: 'Damaged Goods', description: 'Items needing repair' },
    { id: 50, name: 'Archives', description: 'Historical and archived items' }
  ]);

  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState({ name: '', description: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current categories
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle previous & next
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Add new category
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.name.trim()) {
      const newCat = {
        id: Date.now(),
        name: newCategory.name.trim(),
        description: newCategory.description.trim()
      };
      setCategories([...categories, newCat]);
      setNewCategory({ name: '', description: '' });
      setShowAddForm(false);
    }
  };

  // Start editing
  const startEditing = (category) => {
    setEditingId(category.id);
    setEditValue({ name: category.name, description: category.description });
  };

  // Save edited category
  const saveEdit = (id) => {
    if (editValue.name.trim()) {
      setCategories(
        categories.map(cat =>
          cat.id === id 
            ? { ...cat, name: editValue.name.trim(), description: editValue.description.trim() }
            : cat
        )
      );
      setEditingId(null);
    }
  };

  // Delete category
  const deleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="item-category-container">
      <div className="page-header">
        <div>
          <h2>Item Category Master</h2>
          <p>Manage your inventory categories</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          <FiPlus /> Add Category
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
          <FiSearch className="search-icon" />
        </div>
      </div>

      {/* Add Category Form */}
      {showAddForm && (
        <div className="add-category-form">
          <h3>Add New Category</h3>
          <form onSubmit={handleAddCategory}>
            <div className="form-group">
              <label>Category Name</label>
              <input
                type="text"
                className="form-control"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                placeholder="Enter category name"
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                value={newCategory.description}
                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                placeholder="Enter description (optional)"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories Table */}
      <div className="categories-table-container">
        <table className="categories-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.length > 0 ? (
              currentCategories.map((category) => (
                <tr key={category.id}>
                  <td>
                    {editingId === category.id ? (
                      <input
                        type="text"
                        className="form-control inline-edit"
                        value={editValue.name}
                        onChange={(e) => setEditValue({...editValue, name: e.target.value})}
                        onBlur={() => saveEdit(category.id)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') saveEdit(category.id);
                        }}
                        autoFocus
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  <td>
                    {editingId === category.id ? (
                      <input
                        type="text"
                        className="form-control inline-edit"
                        value={editValue.description}
                        onChange={(e) => setEditValue({...editValue, description: e.target.value})}
                        onBlur={() => saveEdit(category.id)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') saveEdit(category.id);
                        }}
                      />
                    ) : (
                      category.description
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon"
                        onClick={() => startEditing(category)}
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="btn-icon danger"
                        onClick={() => deleteCategory(category.id)}
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-data">
                  {searchTerm 
                    ? 'No categories match your search. Try a different term.'
                    : 'No categories found. Add a new category to get started.'
                  }
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredCategories.length > itemsPerPage && (
        <div className="pagination-container">
          <div className="pagination">
            <button 
              onClick={prevPage} 
              disabled={currentPage === 1}
              className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
            >
              &laquo; Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`page-btn ${currentPage === pageNumber ? 'active' : ''}`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            <button 
              onClick={nextPage} 
              disabled={currentPage === totalPages}
              className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
            >
              Next &raquo;
            </button>
            
            <div className="page-info">
              Page {currentPage} of {totalPages}
            </div>
          </div>
          
          <div className="items-per-page">
            <span>Items per page: </span>
            <select 
              value={itemsPerPage} 
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="items-select"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemCategory;
