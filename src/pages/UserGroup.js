import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import './UserGroup.css';

const UserGroup = () => {
  // Sample data for user groups
  const [groups, setGroups] = useState([
    { id: 1, name: 'SuperAdmin', description: 'Has full access to all features' },
    { id: 2, name: 'Administrator', description: 'Can manage most features' },
    { id: 3, name: 'Student', description: 'Standard student access' },
    { id: 4, name: 'Teacher', description: 'Teacher access with course management' },
    { id: 5, name: 'Counsellors', description: 'Access to student counseling features' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState({
    id: null,
    name: '',
    description: ''
  });

  // Filter groups based on search term
  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentGroup(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentGroup.name.trim()) {
      alert('Group name is required');
      return;
    }

    if (currentGroup.id) {
      // Update existing group
      setGroups(groups.map(group => 
        group.id === currentGroup.id ? currentGroup : group
      ));
    } else {
      // Add new group
      const newGroup = {
        ...currentGroup,
        id: groups.length > 0 ? Math.max(...groups.map(g => g.id)) + 1 : 1
      };
      setGroups([...groups, newGroup]);
    }

    // Reset form
    setCurrentGroup({ id: null, name: '', description: '' });
    setIsModalOpen(false);
  };

  // Handle edit
  const handleEdit = (group) => {
    setCurrentGroup({ ...group });
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      setGroups(groups.filter(group => group.id !== id));
    }
  };

  return (
    <div className="user-group-container">
      <div className="page-header">
        <h2>User Groups</h2>
        <p>Manage user groups and their permissions</p>
      </div>

      <div className="user-group-actions">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setCurrentGroup({ id: null, name: '', description: '' });
            setIsModalOpen(true);
          }}
        >
          <FiPlus /> Add New Group
        </button>
      </div>

      <div className="user-group-table-container">
        <table className="user-group-table">
          <thead>
            <tr>
              <th>User Group Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGroups.length > 0 ? (
              filteredGroups.map(group => (
                <tr key={group.id}>
                  <td>
                    <div className="group-name">{group.name}</div>
                  </td>
                  <td>{group.description}</td>
                  <td className="actions">
                    <button 
                      className="btn-icon"
                      onClick={() => handleEdit(group)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="btn-icon danger"
                      onClick={() => handleDelete(group.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-results">
                  No groups found. Try a different search or add a new group.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{currentGroup.id ? 'Edit' : 'Add New'} User Group</h3>
              <button 
                className="close-btn"
                onClick={() => {
                  setIsModalOpen(false);
                  setCurrentGroup({ id: null, name: '', description: '' });
                }}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Group Name *</label>
                <input
                  type="text"
                  name="name"
                  value={currentGroup.name}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter group name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={currentGroup.description}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="3"
                  placeholder="Enter group description"
                ></textarea>
              </div>
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsModalOpen(false);
                    setCurrentGroup({ id: null, name: '', description: '' });
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {currentGroup.id ? 'Update' : 'Create'} Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGroup;
