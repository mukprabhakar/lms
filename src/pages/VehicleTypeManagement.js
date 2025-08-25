import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import './VehicleTypeManagement.css';

const VehicleTypeManagement = () => {
  // Sample data for vehicle types
  const [vehicleTypes, setVehicleTypes] = useState([
    { id: 1, name: 'Mini Bus', description: 'Small capacity school bus' },
    { id: 2, name: 'Bus', description: 'Standard school bus' },
    { id: 3, name: 'Electric Auto', description: 'Electric three-wheeler' },
    { id: 4, name: 'School Van', description: 'Van for school transportation' },
    { id: 5, name: 'Electric Bus', description: 'Environment friendly electric bus' },
    { id: 6, name: 'Auto', description: 'Three-wheeler vehicle' },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ id: null, name: '', description: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVehicleType, setNewVehicleType] = useState({ name: '', description: '' });
  const [searchTerm, setSearchTerm] = useState('');

  // Handle edit
  const handleEdit = (vehicleType) => {
    setEditingId(vehicleType.id);
    setEditForm({
      id: vehicleType.id,
      name: vehicleType.name,
      description: vehicleType.description
    });
  };

  // Handle save
  const handleSave = (e) => {
    e.preventDefault();
    const updatedTypes = vehicleTypes.map(type => 
      type.id === editForm.id 
        ? { ...type, name: editForm.name, description: editForm.description }
        : type
    );
    setVehicleTypes(updatedTypes);
    setEditingId(null);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle type?')) {
      setVehicleTypes(vehicleTypes.filter(type => type.id !== id));
    }
  };

  // Handle add new vehicle type
  const handleAdd = (e) => {
    e.preventDefault();
    const newType = {
      id: vehicleTypes.length > 0 ? Math.max(...vehicleTypes.map(t => t.id)) + 1 : 1,
      name: newVehicleType.name,
      description: newVehicleType.description
    };
    setVehicleTypes([...vehicleTypes, newType]);
    setNewVehicleType({ name: '', description: '' });
    setShowAddForm(false);
  };

  // Filter vehicle types based on search term
  const filteredTypes = vehicleTypes.filter(type =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    type.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="vehicle-type-management">
      <div className="page-header">
        <h2>Vehicle Type Management</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search vehicle types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>Vehicle Types</h3>
          <button 
            className="add-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <FiPlus /> Add Vehicle Type
          </button>
        </div>

        {/* Add New Vehicle Type Form */}
        {showAddForm && (
          <form className="add-form" onSubmit={handleAdd}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Vehicle Type Name"
                value={newVehicleType.name}
                onChange={(e) => setNewVehicleType({...newVehicleType, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Description"
                value={newVehicleType.description}
                onChange={(e) => setNewVehicleType({...newVehicleType, description: e.target.value})}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                <FiSave /> Save
              </button>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => setShowAddForm(false)}
              >
                <FiX /> Cancel
              </button>
            </div>
          </form>
        )}

        <table>
          <thead>
            <tr>
              <th>Vehicle Type</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTypes.length > 0 ? (
              filteredTypes.map((type) => (
                <tr key={type.id}>
                  <td>
                    {editingId === type.id ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="edit-input"
                      />
                    ) : (
                      type.name
                    )}
                  </td>
                  <td>
                    {editingId === type.id ? (
                      <input
                        type="text"
                        value={editForm.description}
                        onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                        className="edit-input"
                      />
                    ) : (
                      type.description
                    )}
                  </td>
                  <td className="actions">
                    {editingId === type.id ? (
                      <>
                        <button 
                          className="save-btn" 
                          onClick={handleSave}
                          title="Save"
                        >
                          <FiSave />
                        </button>
                        <button 
                          className="cancel-btn" 
                          onClick={() => setEditingId(null)}
                          title="Cancel"
                        >
                          <FiX />
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          className="edit-btn" 
                          onClick={() => handleEdit(type)}
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button 
                          className="delete-btn" 
                          onClick={() => handleDelete(type.id)}
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-data">
                  No vehicle types found. Add a new vehicle type to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleTypeManagement;
