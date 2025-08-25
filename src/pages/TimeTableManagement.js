import React, { useState, useEffect } from 'react';
import { 
  FiSearch, 
  FiPlus, 
  FiTrash2, 
  FiChevronLeft, 
  FiChevronRight, 
  FiChevronsLeft, 
  FiChevronsRight,
  FiClock,
  FiCalendar,
  FiSave,
  FiX
} from 'react-icons/fi';
import '../components/Table.css';
import './TimeTableManagement.css';

const TimeTableManagement = () => {
  // Sample time slots data
  const initialTimeSlots = [
    { id: 1, startTime: '09:00 AM', endTime: '09:44 AM' },
    { id: 2, startTime: '10:00 AM', endTime: '11:00 AM' },
    { id: 3, startTime: '11:10 AM', endTime: '11:44 AM' },
    { id: 4, startTime: '11:50 AM', endTime: '12:30 PM' },
    { id: 5, startTime: '01:00 PM', endTime: '01:15 PM' },
    { id: 6, startTime: '01:30 PM', endTime: '02:00 PM' },
    { id: 7, startTime: '07:00 AM', endTime: '07:45 AM' },
  ];

  // Days of the week
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Initialize timetable data
  const [timeTable, setTimeTable] = useState(() => {
    const initialData = {};
    initialTimeSlots.forEach(slot => {
      days.forEach(day => {
        const key = `${day}-${slot.id}`;
        initialData[key] = { subject: '', teacher: '', class: '' };
      });
    });
    return initialData;
  });

  const [timeSlots, setTimeSlots] = useState(initialTimeSlots);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [isAddTimeSlotModalOpen, setIsAddTimeSlotModalOpen] = useState(false);
  const [newTimeSlot, setNewTimeSlot] = useState({ startTime: '', endTime: '' });
  const [editMode, setEditMode] = useState({ isEditing: false, cellId: null });
  const [editValue, setEditValue] = useState({ subject: '', teacher: '', class: '' });

  // Available classes and sections
  const classes = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const sections = ['A', 'B', 'C', 'D'];

  // Handle class change
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    // Here you would typically fetch the timetable for the selected class and section
  };

  // Handle section change
  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    // Here you would typically fetch the timetable for the selected class and section
  };

  // Handle input change in the timetable cells
  const handleCellClick = (day, slotId) => {
    const key = `${day}-${slotId}`;
    setEditMode({ isEditing: true, cellId: key });
    setEditValue(timeTable[key] || { subject: '', teacher: '', class: '' });
  };

  // Handle saving the edited cell
  const handleSaveCell = (e) => {
    e.preventDefault();
    if (editMode.cellId) {
      setTimeTable(prev => ({
        ...prev,
        [editMode.cellId]: { ...editValue }
      }));
      setEditMode({ isEditing: false, cellId: null });
    }
  };

  // Handle adding a new time slot
  const handleAddTimeSlot = (e) => {
    e.preventDefault();
    const newId = timeSlots.length > 0 ? Math.max(...timeSlots.map(slot => slot.id)) + 1 : 1;
    const updatedTimeSlots = [
      ...timeSlots,
      {
        id: newId,
        startTime: newTimeSlot.startTime,
        endTime: newTimeSlot.endTime
      }
    ];
    
    // Sort time slots
    updatedTimeSlots.sort((a, b) => {
      const timeToMinutes = (timeStr) => {
        const [time, period] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        return hours * 60 + minutes;
      };
      
      return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    });
    
    setTimeSlots(updatedTimeSlots);
    setIsAddTimeSlotModalOpen(false);
    setNewTimeSlot({ startTime: '', endTime: '' });
  };

  // Handle deleting a time slot
  const handleDeleteTimeSlot = (slotId) => {
    if (window.confirm('Are you sure you want to delete this time slot? This will remove all entries for this time slot.')) {
      setTimeSlots(timeSlots.filter(slot => slot.id !== slotId));
      
      // Remove entries for this time slot from the timetable
      const updatedTimeTable = { ...timeTable };
      days.forEach(day => {
        const key = `${day}-${slotId}`;
        delete updatedTimeTable[key];
      });
      setTimeTable(updatedTimeTable);
    }
  };

  // Render the edit modal
  const renderEditModal = () => (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Class Details</h3>
          <button className="close-btn" onClick={() => setEditMode({ isEditing: false, cellId: null })}>×</button>
        </div>
        <form onSubmit={handleSaveCell}>
          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              value={editValue.subject}
              onChange={(e) => setEditValue({...editValue, subject: e.target.value})}
              className="form-control"
              placeholder="Enter subject"
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Teacher</label>
            <input
              type="text"
              value={editValue.teacher}
              onChange={(e) => setEditValue({...editValue, teacher: e.target.value})}
              className="form-control"
              placeholder="Enter teacher name"
            />
          </div>
          <div className="form-group">
            <label>Class</label>
            <input
              type="text"
              value={editValue.class}
              onChange={(e) => setEditValue({...editValue, class: e.target.value})}
              className="form-control"
              placeholder="Enter class"
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setEditMode({ isEditing: false, cellId: null })}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Render the add time slot modal
  const renderAddTimeSlotModal = () => (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add New Time Slot</h3>
          <button className="close-btn" onClick={() => setIsAddTimeSlotModalOpen(false)}>×</button>
        </div>
        <form onSubmit={handleAddTimeSlot}>
          <div className="form-group">
            <label>Start Time</label>
            <div className="time-input-container">
              <input
                type="time"
                value={newTimeSlot.startTime}
                onChange={(e) => setNewTimeSlot({...newTimeSlot, startTime: e.target.value})}
                className="form-control"
                required
              />
              <FiClock className="time-icon" />
            </div>
          </div>
          <div className="form-group">
            <label>End Time</label>
            <div className="time-input-container">
              <input
                type="time"
                value={newTimeSlot.endTime}
                onChange={(e) => setNewTimeSlot({...newTimeSlot, endTime: e.target.value})}
                className="form-control"
                required
              />
              <FiClock className="time-icon" />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setIsAddTimeSlotModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Time Slot
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Format time to 12-hour format with AM/PM
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    
    // If already in 12-hour format, return as is
    if (timeStr.includes('AM') || timeStr.includes('PM')) {
      return timeStr;
    }
    
    // Convert 24-hour format to 12-hour format
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const twelveHour = hour % 12 || 12;
    
    return `${twelveHour}:${minutes} ${period}`;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2><FiCalendar /> Time Table Management</h2>
        <div className="header-actions">
          <div className="form-group inline">
            <label>Class:</label>
            <select 
              value={selectedClass} 
              onChange={handleClassChange}
              className="form-control"
            >
              <option value="">Select Class</option>
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          <div className="form-group inline">
            <label>Section:</label>
            <select 
              value={selectedSection} 
              onChange={handleSectionChange}
              className="form-control"
            >
              <option value="">Select Section</option>
              {sections.map(sec => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary">
            <FiSave /> Save Time Table
          </button>
        </div>
      </div>

      <div className="time-table-container">
        <table className="time-table">
          <thead>
            <tr>
              <th>Start Time</th>
              <th>End Time</th>
              {days.map(day => (
                <th key={day}>{day}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(slot => (
              <tr key={slot.id}>
                <td className="time-cell">{formatTime(slot.startTime)}</td>
                <td className="time-cell">{formatTime(slot.endTime)}</td>
                {days.map(day => {
                  const key = `${day}-${slot.id}`;
                  const cellData = timeTable[key] || {};
                  return (
                    <td 
                      key={key} 
                      className="timetable-cell"
                      onClick={() => handleCellClick(day, slot.id)}
                    >
                      {cellData.subject ? (
                        <div className="timetable-entry">
                          <div className="subject">{cellData.subject}</div>
                          <div className="details">
                            {cellData.teacher && <span>{cellData.teacher}</span>}
                            {cellData.class && <span>Class: {cellData.class}</span>}
                          </div>
                        </div>
                      ) : (
                        <div className="empty-cell">—</div>
                      )}
                    </td>
                  );
                })}
                <td className="action-cell">
                  <button 
                    className="btn-icon btn-delete"
                    onClick={() => handleDeleteTimeSlot(slot.id)}
                    title="Delete Time Slot"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="table-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => setIsAddTimeSlotModalOpen(true)}
          >
            <FiPlus /> Add Time Slot
          </button>
        </div>
      </div>

      {editMode.isEditing && renderEditModal()}
      {isAddTimeSlotModalOpen && renderAddTimeSlotModal()}
    </div>
  );
};

export default TimeTableManagement;
