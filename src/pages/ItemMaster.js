import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../components/Table.css';

const ItemMaster = () => {
  // Sample data for items
  const [items, setItems] = useState([
    { id: 1, name: 'pant 26', code: 'CP0003', purchasedPrice: 'N/A', quantity: 17, purchaseDate: 'N/A' },
    { id: 2, name: 'Shirt 26', code: 'CP0004', purchasedPrice: 'N/A', quantity: 9, purchaseDate: 'N/A' },
    { id: 3, name: 'HINDI - Akshar Mala', code: 'CP0006', purchasedPrice: 'N/A', quantity: 148, purchaseDate: 'N/A' },
    { id: 4, name: 'ENGLISH Alphabet', code: 'CP0007', purchasedPrice: 'N/A', quantity: 224, purchaseDate: 'N/A' },
    { id: 5, name: 'Hindi - Akshar Suman', code: 'CP0008', purchasedPrice: 'N/A', quantity: 142, purchaseDate: 'N/A' },
    { id: 6, name: '1 to 50 Active Number', code: 'CP0009', purchasedPrice: 'N/A', quantity: 200, purchaseDate: 'N/A' },
    { id: 7, name: 'Capital Letter Writing', code: 'CP0010', purchasedPrice: 'N/A', quantity: 200, purchaseDate: 'N/A' },
    { id: 8, name: 'Rhymes', code: 'CP0011', purchasedPrice: 'N/A', quantity: 200, purchaseDate: 'N/A' },
    { id: 9, name: 'Drawing Creative', code: 'CP0012', purchasedPrice: 'N/A', quantity: 200, purchaseDate: 'N/A' },
    { id: 10, name: 'Dairy', code: 'CP0013', purchasedPrice: 'N/A', quantity: 200, purchaseDate: 'N/A' },
    { id: 11, name: 'Copies', code: 'CP0014', purchasedPrice: 'N/A', quantity: 'N/A', purchaseDate: 'N/A' },
    { id: 12, name: 'Hindi - shabad sugandha', code: 'CP0015', purchasedPrice: 'N/A', quantity: 60, purchaseDate: 'N/A' },
    { id: 13, name: 'Hindi - Shabad Suman', code: 'CP0016', purchasedPrice: 'N/A', quantity: 60, purchaseDate: 'N/A' },
    { id: 14, name: 'Maths Skill', code: 'CP0017', purchasedPrice: 'N/A', quantity: 60, purchaseDate: 'N/A' },
    { id: 15, name: 'Number Book 1 to 100', code: 'CP0018', purchasedPrice: 'N/A', quantity: 60, purchaseDate: 'N/A' },
    { id: 16, name: 'English in motion', code: 'CP0019', purchasedPrice: 'N/A', quantity: 60, purchaseDate: 'N/A' },
    { id: 17, name: 'Capital Small ABC', code: 'CP0020', purchasedPrice: 'N/A', quantity: 60, purchaseDate: 'N/A' },
    { id: 18, name: 'Picture Gallery', code: 'CP0021', purchasedPrice: 'N/A', quantity: 60, purchaseDate: 'N/A' },
    { id: 19, name: 'Rhymes B', code: 'CP0022', purchasedPrice: 'N/A', quantity: 60, purchaseDate: 'N/A' },
    { id: 20, name: 'LKG - Drawing Creative', code: 'CP0023', purchasedPrice: 'N/A', quantity: 60, purchaseDate: 'N/A' },
    { id: 21, name: 'LKG Dairy', code: 'CP0024', purchasedPrice: 'N/A', quantity: 60, purchaseDate: 'N/A' },
    { id: 22, name: 'ENGLISH READER (1)', code: 'CP0034', purchasedPrice: 'N/A', quantity: 35, purchaseDate: 'N/A' },
    { id: 23, name: 'COMPOSITE MATHEMATICS(1)', code: 'CP0035', purchasedPrice: 'N/A', quantity: 35, purchaseDate: 'N/A' },
    { id: 24, name: 'NUCLEAR SCIENCE', code: 'CP0036', purchasedPrice: 'N/A', quantity: 35, purchaseDate: 'N/A' },
    { id: 25, name: 'GENERAL KNOWLEDGE', code: 'CP0038', purchasedPrice: 'N/A', quantity: 35, purchaseDate: 'N/A' },
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    code: '',
    purchasedPrice: '',
    quantity: '',
    purchaseDate: ''
  });
  
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState({
    name: '',
    code: '',
    purchasedPrice: '',
    quantity: '',
    purchaseDate: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter items based on search term
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

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

  // Add new item
  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.name.trim() && newItem.code.trim()) {
      const newItemObj = {
        id: Date.now(),
        name: newItem.name.trim(),
        code: newItem.code.trim(),
        purchasedPrice: newItem.purchasedPrice || 'N/A',
        quantity: newItem.quantity || 'N/A',
        purchaseDate: newItem.purchaseDate || 'N/A'
      };
      setItems([...items, newItemObj]);
      setNewItem({ name: '', code: '', purchasedPrice: '', quantity: '', purchaseDate: '' });
      setShowAddForm(false);
    }
  };

  // Start editing
  const startEditing = (item) => {
    setEditingId(item.id);
    setEditValue({
      name: item.name,
      code: item.code,
      purchasedPrice: item.purchasedPrice,
      quantity: item.quantity,
      purchaseDate: item.purchaseDate
    });
  };

  // Save edited item
  const saveEdit = (id) => {
    if (editValue.name.trim() && editValue.code.trim()) {
      setItems(
        items.map(item =>
          item.id === id 
            ? { ...item, ...editValue }
            : item
        )
      );
      setEditingId(null);
    }
  };

  // Delete item
  const deleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (dateString === 'N/A') return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Item Master</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Item Master</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Item List</h3>
                  <div className="card-tools">
                    <div className="input-group input-group-sm" style={{ width: 250 }}>
                      <input
                        type="text"
                        name="table_search"
                        className="form-control float-right"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                      <div className="input-group-append">
                        <button type="submit" className="btn btn-default">
                          <i className="fas fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body table-responsive p-0">
                  <table className="table table-hover text-nowrap">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Item Code</th>
                        <th>Purchased Price</th>
                        <th>Current Quantity</th>
                        <th>Purchase Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((item) => (
                          <tr key={item.id}>
                            <td>
                              {editingId === item.id ? (
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={editValue.name}
                                  onChange={(e) => setEditValue({...editValue, name: e.target.value})}
                                  onBlur={() => saveEdit(item.id)}
                                  onKeyPress={(e) => e.key === 'Enter' && saveEdit(item.id)}
                                  autoFocus
                                />
                              ) : (
                                item.name
                              )}
                            </td>
                            <td>
                              {editingId === item.id ? (
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={editValue.code}
                                  onChange={(e) => setEditValue({...editValue, code: e.target.value})}
                                  onBlur={() => saveEdit(item.id)}
                                  onKeyPress={(e) => e.key === 'Enter' && saveEdit(item.id)}
                                />
                              ) : (
                                item.code
                              )}
                            </td>
                            <td>
                              {editingId === item.id ? (
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={editValue.purchasedPrice}
                                  onChange={(e) => setEditValue({...editValue, purchasedPrice: e.target.value})}
                                  onBlur={() => saveEdit(item.id)}
                                  onKeyPress={(e) => e.key === 'Enter' && saveEdit(item.id)}
                                />
                              ) : (
                                item.purchasedPrice
                              )}
                            </td>
                            <td>
                              {editingId === item.id ? (
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                  value={editValue.quantity}
                                  onChange={(e) => setEditValue({...editValue, quantity: e.target.value})}
                                  onBlur={() => saveEdit(item.id)}
                                  onKeyPress={(e) => e.key === 'Enter' && saveEdit(item.id)}
                                />
                              ) : (
                                item.quantity
                              )}
                            </td>
                            <td>
                              {editingId === item.id ? (
                                <input
                                  type="date"
                                  className="form-control form-control-sm"
                                  value={editValue.purchaseDate}
                                  onChange={(e) => setEditValue({...editValue, purchaseDate: e.target.value})}
                                  onBlur={() => saveEdit(item.id)}
                                />
                              ) : (
                                formatDate(item.purchaseDate)
                              )}
                            </td>
                            <td>
                              <div className="btn-group">
                                {editingId === item.id ? (
                                  <button
                                    className="btn btn-sm btn-success"
                                    onClick={() => saveEdit(item.id)}
                                    title="Save"
                                  >
                                    <i className="fas fa-check"></i>
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => startEditing(item)}
                                    title="Edit"
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
                                )}
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => deleteItem(item.id)}
                                  title="Delete"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            {searchTerm 
                              ? 'No items match your search. Try a different term.'
                              : 'No items found. Add a new item to get started.'
                            }
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="card-footer clearfix">
                  <div className="float-left">
                    <div className="dataTables_info">
                      Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredItems.length)} of {filteredItems.length} entries
                    </div>
                  </div>
                  <div className="float-right">
                    <ul className="pagination pagination-sm m-0">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={prevPage} disabled={currentPage === 1}>
                          <FiChevronLeft />
                        </button>
                      </li>
                      
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
                          <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(pageNumber)}>
                              {pageNumber}
                            </button>
                          </li>
                        );
                      })}
                      
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={nextPage} disabled={currentPage === totalPages}>
                          <FiChevronRight />
                        </button>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="float-right mr-3">
                    <div className="input-group input-group-sm" style={{ width: 150 }}>
                      <div className="input-group-append">
                        <span className="input-group-text">Items per page:</span>
                      </div>
                      <select 
                        className="form-control"
                        value={itemsPerPage}
                        onChange={(e) => {
                          setItemsPerPage(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Item Button */}
              <div className="mb-3">
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowAddForm(!showAddForm)}
                >
                  <FiPlus /> {showAddForm ? 'Cancel' : 'Add New Item'}
                </button>
              </div>

              {/* Add Item Form */}
              {showAddForm && (
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Add New Item</h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleAddItem}>
                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Item Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              value={newItem.name}
                              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                              required
                              autoFocus
                            />
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="form-group">
                            <label>Item Code *</label>
                            <input
                              type="text"
                              className="form-control"
                              value={newItem.code}
                              onChange={(e) => setNewItem({...newItem, code: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="form-group">
                            <label>Purchased Price</label>
                            <input
                              type="number"
                              step="0.01"
                              className="form-control"
                              value={newItem.purchasedPrice}
                              onChange={(e) => setNewItem({...newItem, purchasedPrice: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="form-group">
                            <label>Quantity</label>
                            <input
                              type="number"
                              className="form-control"
                              value={newItem.quantity}
                              onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="form-group">
                            <label>Purchase Date</label>
                            <input
                              type="date"
                              className="form-control"
                              value={newItem.purchaseDate}
                              onChange={(e) => setNewItem({...newItem, purchaseDate: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="col-md-1 d-flex align-items-end">
                          <button type="submit" className="btn btn-success mb-3">
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ItemMaster;
