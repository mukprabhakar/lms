import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { FiSearch, FiBell, FiMenu } from 'react-icons/fi';
import userImage from './user-avatar.png';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Country from './pages/Country';
import State from './pages/State';
import City from './pages/City';
import Department from './pages/Department';
import Designation from './pages/Designation';
import Organization from './pages/Organization';
import Branch from './pages/Branch';
import Section from './pages/Section';
import Nationality from './pages/Nationality';
import ClassType from './pages/ClassType';
import PaymentMethod from './pages/PaymentMethod';
import Religion from './pages/Religion';
import Occupation from './pages/Occupation';
import Caste from './pages/Caste';
import Purpose from './pages/Purpose';
import Stream from './pages/Stream';
import Employee from './pages/Employee';
import User from './pages/User';
import EmployeeAttendance from './pages/EmployeeAttendance';
import Enquiry from './pages/Enquiry';
import FollowUp from './pages/FollowUp';
import Registration from './pages/Registration';
import Admission from './pages/Admission';
import ClassPromotion from './pages/ClassPromotion';
import ClassDetails from './pages/ClassDetails';
import StockLocation from './pages/StockLocation';
import ItemCategory from './pages/ItemCategory';
import ItemMaster from './pages/ItemMaster';
import UserGroup from './pages/UserGroup';
import SubjectMaster from './pages/SubjectMaster';
import ClassMapping from './pages/ClassMapping';
import ClassTeacherMapping from './pages/ClassTeacherMapping';
import LessonManagement from './pages/LessonManagement';
import TopicManagement from './pages/TopicManagement';
import TimePeriodManagement from './pages/TimePeriodManagement';
import TimeTableManagement from './pages/TimeTableManagement';
import VehicleManagement from './pages/VehicleManagement';
import RouteManagement from './pages/RouteManagement';
import DriverVehicleAssignment from './pages/DriverVehicleAssignment';
import RouteVehicleMapping from './pages/RouteVehicleMapping';
import VehicleTypeManagement from './pages/VehicleTypeManagement';
import WhatsAppAPI from './pages/WhatsAppAPI';
import MessageTemplate from './pages/MessageTemplate';
import FeeDeposit from './pages/FeeDeposit';
import DueList from './pages/DueList';
// import FineClassCharge from './pages/FineClassCharge';
// import FeeGeneration from './pages/FeeGeneration';
import './components/Sidebar.css';
import './components/Dashboard.css';
import './components/Table.css';

function App() {
  // Sidebar is always open
  const sidebarOpen = true;

  return (
    <Router>
      <div className="app">
        <Sidebar isOpen={sidebarOpen} />
        
        <div className={`main-content ${!sidebarOpen ? 'expanded' : ''}`}>
          <nav className="navbar">
            <div className="navbar-left">
              <h1>Welcome Back</h1>
            </div>
            <div className="navbar-right">
              <div className="search-bar">
                <FiSearch className="search-icon" />
                <input type="text" placeholder="Search for form" />
              </div>
              <button className="notification-btn">
                <FiBell size={20} />
                <span className="notification-badge">3</span>
              </button>
              <div className="user-profile">
                <img src={userImage} alt="User" className="user-avatar" />
                <span className="user-name">Admin</span>
              </div>
            </div>
          </nav>
          
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/master/country" element={<Country />} />
            <Route path="/master/state" element={<State />} />
            <Route path="/master/city" element={<City />} />
            <Route path="/master/department" element={<Department />} />
            <Route path="/master/designation" element={<Designation />} />
            <Route path="/master/organization" element={<Organization />} />
            <Route path="/master/branch" element={<Branch />} />
              <Route path="/academics/class-mapping" element={<ClassMapping />} />
            <Route path="/academics/class-teacher-mapping" element={<ClassTeacherMapping />} />
            <Route path="/academics/lesson-management" element={<LessonManagement />} />
            <Route path="/academics/topic-management" element={<TopicManagement />} />
            <Route path="/academics/time-period-management" element={<TimePeriodManagement />} />
            <Route path="/academics/time-table" element={<TimeTableManagement />} />
            <Route path="/transport/vehicles" element={<VehicleManagement />} />
            <Route path="/transport/routes" element={<RouteManagement />} />
              <Route path="/transport/driver-assignments" element={<DriverVehicleAssignment />} />
              <Route path="/transport/route-mapping" element={<RouteVehicleMapping />} />
              <Route path="/transport/vehicle-types" element={<VehicleTypeManagement />} />
            <Route path="/academics/whatsapp-api" element={<WhatsAppAPI />} />
              <Route path="/academics/message-template" element={<MessageTemplate />} />
            <Route path="/master/nationality" element={<Nationality />} />
            <Route path="/master/class-type" element={<ClassType />} />
            <Route path="/master/payment-method" element={<PaymentMethod />} />
            <Route path="/master/religion" element={<Religion />} />
            <Route path="/master/occupation" element={<Occupation />} />
            <Route path="/master/caste" element={<Caste />} />
            <Route path="/master/purpose" element={<Purpose />} />
            <Route path="/master/stream" element={<Stream />} />
            <Route path="/staff/employee" element={<Employee />} />
            <Route path="/staff/user" element={<User />} />
            <Route path="/attendance/employee" element={<EmployeeAttendance />} />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/enquiry/follow-up" element={<FollowUp />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/admission" element={<Admission />} />
            <Route path="/class-promotion" element={<ClassPromotion />} />
            <Route path="/fee-management/class-details" element={<ClassDetails />} />
            <Route path="/fee-management/fee-deposit" element={<FeeDeposit />} />
            <Route path="/fee-management/due-list" element={<DueList />} />
            <Route path="/inventory/stock-locations" element={<StockLocation />} />
            <Route path="/inventory/item-categories" element={<ItemCategory />} />
            <Route path="/inventory/items" element={<ItemMaster />} />
            <Route path="/academics/subject-master" element={<SubjectMaster />} />
            <Route path="/user-management/user-groups" element={<UserGroup />} />
            {/* <Route path="/fee-management/fine-class-charge" element={<FineClassCharge />} />
            <Route path="/fee-management/fee-generation" element={<FeeGeneration />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
