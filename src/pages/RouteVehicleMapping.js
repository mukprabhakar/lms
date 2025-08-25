import React, { useState } from 'react';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiMap, FiTruck, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './RouteVehicleMapping.css';

const RouteVehicleMapping = () => {
  // Sample data for vehicles
  const [vehicles, setVehicles] = useState([
    { 
      id: 1, 
      registrationNo: 'KA01AB1234',
      makeModel: 'Tata Motors - Tata Starbus Sch',
      chassisNo: 'MA1TASCH001234',
      fuelType: 'CNG',
      manufacturingDate: '2025-05-31',
      assignedRoute: 'Route A'
    },
    { 
      id: 2, 
      registrationNo: 'KA02CD5678',
      makeModel: 'Mahindra Tourister School Bus',
      chassisNo: 'MAHTOUR567890',
      fuelType: 'Diesel',
      manufacturingDate: '2025-06-02',
      assignedRoute: 'Route B'
    },
    { 
      id: 3, 
      registrationNo: 'KA03EF9012',
      makeModel: 'Mahindra Auto',
      chassisNo: 'MAHATU901234',
      fuelType: 'Petrol',
      manufacturingDate: '2025-06-30',
      assignedRoute: 'Route C'
    },
    { 
      id: 4, 
      registrationNo: 'KA04GH3456',
      makeModel: 'Ashok Leyland School Bus',
      chassisNo: 'ASHLEY345678',
      fuelType: 'Diesel',
      manufacturingDate: '2025-07-08',
      assignedRoute: 'Route A'
    },
    { 
      id: 5, 
      registrationNo: 'KA05IJ7890',
      makeModel: 'Force Traveller',
      chassisNo: 'FORTRV789012',
      fuelType: 'Diesel',
      manufacturingDate: '2025-07-15',
      assignedRoute: 'Route B'
    },
    { 
      id: 6, 
      registrationNo: 'KA06KL2345',
      makeModel: 'BharatBenz School Bus',
      chassisNo: 'BHABEN234567',
      fuelType: 'Diesel',
      manufacturingDate: '2025-07-22',
      assignedRoute: ''
    },
    { 
      id: 7, 
      registrationNo: 'KA07MN6789',
      makeModel: 'Volvo School Bus',
      chassisNo: 'VOLVOS678901',
      fuelType: 'Diesel',
      manufacturingDate: '2025-08-05',
      assignedRoute: 'Route C'
    },
    { 
      id: 8, 
      registrationNo: 'KA08OP1234',
      makeModel: 'Eicher Skyline Pro',
      chassisNo: 'EICHSK123456',
      fuelType: 'CNG',
      manufacturingDate: '2025-08-12',
      assignedRoute: ''
    },
    { 
      id: 9, 
      registrationNo: 'KA09QR5678',
      makeModel: 'SML Isuzu School Bus',
      chassisNo: 'SMLISU567890',
      fuelType: 'Diesel',
      manufacturingDate: '2025-08-18',
      assignedRoute: 'Route A'
    },
    { 
      id: 10, 
      registrationNo: 'KA10ST9012',
      makeModel: 'Toyota School Bus',
      chassisNo: 'TOYOSB901234',
      fuelType: 'Hybrid',
      manufacturingDate: '2025-08-25',
      assignedRoute: 'Route B'
    },
    { 
      id: 11, 
      registrationNo: 'KA11UV3456',
      makeModel: 'Scania Metrolink Bus',
      chassisNo: 'SCANME345678',
      fuelType: 'Diesel',
      manufacturingDate: '2025-08-28',
      assignedRoute: 'Route C'
    },
    { 
      id: 12, 
      registrationNo: 'KA12WX7890',
      makeModel: 'Volkswagen School Van',
      chassisNo: 'VWSCHO789012',
      fuelType: 'Petrol',
      manufacturingDate: '2025-09-02',
      assignedRoute: 'Route A'
    },
    { 
      id: 13, 
      registrationNo: 'KA13YZ1234',
      makeModel: 'Mercedes-Benz School Bus',
      chassisNo: 'MERCED123456',
      fuelType: 'Diesel',
      manufacturingDate: '2025-09-08',
      assignedRoute: ''
    },
    { 
      id: 14, 
      registrationNo: 'KA14AB5678',
      makeModel: 'MAN Lion\'s School Bus',
      chassisNo: 'MANLIO567890',
      fuelType: 'CNG',
      manufacturingDate: '2025-09-12',
      assignedRoute: 'Route B'
    },
    { 
      id: 15, 
      registrationNo: 'KA15CD9012',
      makeModel: 'BYD Electric School Bus',
      chassisNo: 'BYDELC901234',
      fuelType: 'Electric',
      manufacturingDate: '2025-09-15',
      assignedRoute: ''
    }
  ]);

  // Sample route data
  const [routes, setRoutes] = useState([
    { id: 1, name: 'Route A', description: 'Downtown Route' },
    { id: 2, name: 'Route B', description: 'Uptown Route' },
    { id: 3, name: 'Route C', description: 'Suburban Route' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showUnassignModal, setShowUnassignModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState('');

  // Handle search
  const filteredVehicles = vehicles.filter(vehicle => 
    Object.values(vehicle).some(
      value => value && 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVehicles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle assign route
  const handleAssignRoute = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowAssignModal(true);
  };

  // Handle unassign route
  const handleUnassignRoute = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowUnassignModal(true);
  };

  // Confirm assign route
  const confirmAssignRoute = () => {
    if (!selectedRoute) return;
    
    const updatedVehicles = vehicles.map(vehicle => 
      vehicle.id === selectedVehicle.id 
        ? { ...vehicle, assignedRoute: selectedRoute }
        : vehicle
    );
    
    setVehicles(updatedVehicles);
    setShowAssignModal(false);
    setSelectedVehicle(null);
    setSelectedRoute('');
  };

  // Confirm unassign route
  const confirmUnassignRoute = () => {
    const updatedVehicles = vehicles.map(vehicle => 
      vehicle.id === selectedVehicle.id 
        ? { ...vehicle, assignedRoute: '' }
        : vehicle
    );
    
    setVehicles(updatedVehicles);
    setShowUnassignModal(false);
    setSelectedVehicle(null);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="route-vehicle-mapping">
      <div className="page-header">
        <h2>Vehicle List & Route Assignment</h2>
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Actions</th>
              <th>Registration No</th>
              <th>Make & Model</th>
              <th>Chassis No</th>
              <th>Fuel Type</th>
              <th>Manufacturing Date</th>
              <th>Assigned Route</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="actions">
                    {vehicle.assignedRoute ? (
                      <button 
                        className="unassign-btn"
                        onClick={() => handleUnassignRoute(vehicle)}
                        title="Unassign Route"
                      >
                        <FiX />
                      </button>
                    ) : (
                      <button 
                        className="assign-btn"
                        onClick={() => handleAssignRoute(vehicle)}
                        title="Assign Route"
                      >
                        <FiMap />
                      </button>
                    )}
                  </td>
                  <td>{vehicle.registrationNo}</td>
                  <td>{vehicle.makeModel}</td>
                  <td>{vehicle.chassisNo}</td>
                  <td>
                    <span className={`badge ${vehicle.fuelType.toLowerCase()}`}>
                      {vehicle.fuelType}
                    </span>
                  </td>
                  <td>{formatDate(vehicle.manufacturingDate)}</td>
                  <td>
                    {vehicle.assignedRoute || '-'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No vehicles found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredVehicles.length > itemsPerPage && (
        <div className="pagination">
          <button 
            onClick={() => paginate(1)} 
            disabled={currentPage === 1}
          >
            <FiChevronsLeft />
          </button>
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            <FiChevronLeft />
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                className={currentPage === pageNum ? 'active' : ''}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            <FiChevronRight />
          </button>
          <button 
            onClick={() => paginate(totalPages)} 
            disabled={currentPage === totalPages}
          >
            <FiChevronsRight />
          </button>
          
          <div className="items-per-page">
            <span>Items per page:</span>
            <select 
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      )}

      {/* Assign Route Modal */}
      {showAssignModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Assign Route</h3>
              <button onClick={() => setShowAssignModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <p>Assign a route to <strong>{selectedVehicle?.registrationNo}</strong> - {selectedVehicle?.makeModel}</p>
              <div className="form-group">
                <label>Select Route</label>
                <select 
                  className="form-control"
                  value={selectedRoute}
                  onChange={(e) => setSelectedRoute(e.target.value)}
                >
                  <option value="">-- Select a route --</option>
                  {routes.map(route => (
                    <option key={route.id} value={route.name}>
                      {route.name} - {route.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowAssignModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={confirmAssignRoute}
                disabled={!selectedRoute}
              >
                Assign Route
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unassign Route Modal */}
      {showUnassignModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Unassign Route</h3>
              <button onClick={() => setShowUnassignModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to unassign <strong>{selectedVehicle?.assignedRoute}</strong> from <strong>{selectedVehicle?.registrationNo}</strong>?</p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowUnassignModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={confirmUnassignRoute}
              >
                Unassign Route
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteVehicleMapping;
