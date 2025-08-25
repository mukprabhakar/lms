
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiHome, FiUsers, FiUser, FiBookOpen, FiDollarSign, 
  FiCalendar, FiBook, FiClock, FiAward, FiLayers, 
  FiFileText, FiSettings, FiChevronDown, FiChevronRight, FiMenu,
  FiTruck, FiMonitor, FiGlobe, FiMapPin, FiMap, FiTag, 
  FiGrid, FiBarChart2, FiPackage, FiShield, FiLock, 
  FiMessageSquare, FiMail, FiBell, FiHelpCircle, FiList
} from 'react-icons/fi';
import logo from '../logo.svg';

const Sidebar = () => {
  const navigate = useNavigate();
  // Initialize with all menus closed by default
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menu, hasSubmenu = true, path = '/dashboard') => {
    if (hasSubmenu) {
      setOpenMenus(prev => ({
        ...prev,
        [menu]: !prev[menu]
      }));
    } else {
      // If it's a direct link, navigate to the path
      navigate(path);
    }
  };

  // Icons for different submenu categories
  const getSubmenuIcon = (text) => {
    const lowerText = text.toLowerCase();
    
    // More specific matches first
    if (lowerText.includes('class')) return <FiBook />;
    if (lowerText.includes('section')) return <FiGrid />;
    if (lowerText.includes('subject')) return <FiBookOpen />;
    if (lowerText.includes('staff')) return <FiUsers />;
    if (lowerText.includes('student')) return <FiUser />;
    if (lowerText.includes('attendance')) return <FiCalendar />;
    if (lowerText.includes('exam')) return <FiAward />;
    if (lowerText.includes('result')) return <FiBarChart2 />;
    if (lowerText.includes('fee')) return <FiDollarSign />;
    if (lowerText.includes('transport')) return <FiTruck />;
    if (lowerText.includes('hostel')) return <FiHome />;
    if (lowerText.includes('library')) return <FiBook />;
    if (lowerText.includes('inventory')) return <FiPackage />;
    if (lowerText.includes('report')) return <FiFileText />;
    if (lowerText.includes('settings') || lowerText.includes('setting')) return <FiSettings />;
    if (lowerText.includes('role')) return <FiShield />;
    if (lowerText.includes('permission')) return <FiLock />;
    if (lowerText.includes('sms')) return <FiMessageSquare />;
    if (lowerText.includes('email')) return <FiMail />;
    if (lowerText.includes('notification')) return <FiBell />;
    if (lowerText.includes('country')) return <FiGlobe />;
    if (lowerText.includes('state')) return <FiMapPin />;
    if (lowerText.includes('city')) return <FiMap />;
    if (lowerText.includes('department')) return <FiLayers />;
    if (lowerText.includes('designation')) return <FiAward />;
    if (lowerText.includes('category')) return <FiTag />;
    if (lowerText.includes('user')) return <FiUser />;
    if (lowerText.includes('time') || lowerText.includes('schedule')) return <FiClock />;
    if (lowerText.includes('message') || lowerText.includes('chat')) return <FiMessageSquare />;
    if (lowerText.includes('payment') || lowerText.includes('transaction')) return <FiDollarSign />;
    if (lowerText.includes('academic') || lowerText.includes('education')) return <FiBookOpen />;
    if (lowerText.includes('admin') || lowerText.includes('administrator')) return <FiShield />;
    if (lowerText.includes('system')) return <FiSettings />;
    if (lowerText.includes('log') || lowerText.includes('history')) return <FiFileText />;
    if (lowerText.includes('profile') || lowerText.includes('account')) return <FiUser />;
    if (lowerText.includes('help') || lowerText.includes('support')) return <FiHelpCircle />;
    if (lowerText.includes('dashboard') || lowerText.includes('home')) return <FiHome />;
    if (lowerText.includes('calendar') || lowerText.includes('event')) return <FiCalendar />;

    // Default icon if no match found
    return <FiList />;
  };

  // Add Dashboard as the first menu item
  const menuItems = [
    { 
      title: 'Dashboard', 
      icon: <FiHome />,
      link: '/dashboard'
    },
    { 
      title: 'Master', 
      icon: <FiSettings />,
      submenu: [
        { title: 'Country', path: '/master/country' },
        { title: 'State', path: '/master/state' },
        { title: 'City', path: '/master/city' },
        { title: 'Department', path: '/master/department' },
        { title: 'Designation', path: '/master/designation' },
        { title: 'Organisation', path: '/master/organization' },
        { title: 'Branch', path: '/master/branch' },
        { title: 'Section Master', path: '/master/section' },
        { title: 'Nationality', path: '/master/nationality' },
        { title: 'Class Type', path: '/master/class-type' },
        { title: 'Payment Method', path: '/master/payment-method' },
        { title: 'Religion', path: '/master/religion' },
        { title: 'Occupation', path: '/master/occupation' },
        { title: 'Caste', path: '/master/caste' },
        { title: 'Purpose', path: '/master/purpose' },
        { title: 'Stream', path: '/master/stream' }
      ]
    },
    { 
      title: 'Staff Details', 
      icon: <FiUsers />,
      submenu: [
        { title: 'Employee', path: '/staff/employee' },
        { title: 'User', path: '/staff/user' },
        { title: 'Employee Attendance', path: '/attendance/employee' }
      ]
    },
    { 
      title: 'Enquiry', 
      icon: <FiUser />,
      submenu: [
        { title: 'Enquiry', path: '/enquiry' },
        { title: 'Follow Up', path: '/enquiry/follow-up' },
        { title: 'Registration', path: '/registration' }
      ]
    },
    { 
      title: 'Admission', 
      icon: <FiBookOpen />,
      submenu: [
        { title: 'Admission', path: '/admission' },
        { title: 'Class Promotion', path: '/class-promotion' }
      ]
    },
    { 
      title: 'Fee Management', 
      icon: <FiDollarSign />,
      submenu: [
        { title: 'Class Details', path: '/fee-management/class-details' },
        { title: 'Fine Class Charge', path: '/fee-management/fine-class-charge' },
        { title: 'Fee Generation', path: '/fee-management/fee-generation' },
        { title: 'Concession', path: '/fee-management/concession' }
      ]
    },
    { 
      title: 'Fee', 
      icon: <FiDollarSign />,
      submenu: ['Fee Deposit', 'Due List']
    },
    { 
      title: 'Classroom Management', 
      icon: <FiBook />,
      submenu: [
        { title: 'Subject Master', path: '/academics/subject-master' },
        { title: 'Class Mapping', path: '/academics/class-mapping' },
        { title: 'Class Teacher Mapping', path: '/academics/class-teacher-mapping' },
        { title: 'Lesson Management', path: '/academics/lesson-management' },
        { title: 'Topic Management', path: '/academics/topic-management' }
      ]
    },
    { 
      title: 'Time Table', 
      icon: <FiClock />,
      submenu: [
        { title: 'Time Period', path: '/academics/time-period-management' },
        { title: 'Create Time Table', path: '/academics/time-table' }
      ]
    },
    { 
      title: 'Student Details', 
      icon: <FiUser />,
      submenu: ['Admit Card', 'Student TC', 'Student User', 'Attendance']
    },
    { 
      title: 'Assignment', 
      icon: <FiFileText />,
      submenu: ['Assignment Create', 'Assignment View']
    },
    { 
      title: 'Examination', 
      icon: <FiAward />,
      submenu: [
        'Examination Criteria', 'Exam Sub Category', 'Exam'
      ]
    },
    { 
      title: 'Result', 
      icon: <FiLayers />,
      submenu: ['Result Generation', 'Get Result']
    },
    { 
      title: 'Inventory', 
      icon: <FiLayers />,
      submenu: [
        { title: 'Stock Locations', path: '/inventory/stock-locations' },
        { title: 'Item Categories', path: '/inventory/item-categories' },
        { title: 'Item Master', path: '/inventory/items' },
        { title: 'Vendor Master', path: '/inventory/vendors' },
        { title: 'Stock Inward', path: '/inventory/stock-inward' },
        { title: 'Stock Return', path: '/inventory/stock-return' },
        { title: 'Stock Insurance', path: '/inventory/stock-insurance' }
      ]
    },
    { 
      title: 'Transportation', 
      icon: <FiTruck />,
      submenu: [
        'Vehicle Management',
        'Route Management',
        'Driver Vehicle Assign',
        'Route Vehicle Mapping',
        'Vehicle Type Management'
      ]
    },
    { 
      title: 'Reports', 
      icon: <FiFileText />,
      submenu: [
        'Payment Report',
        'Admission Report',
        'Inventory Report',
        'Attendance Report'
      ]
    },
    { 
      title: 'Settings', 
      icon: <FiSettings />,
      submenu: [
        { title: 'WhatsApp API', path: '/settings/whatsapp-api' },
        { title: 'Message Template', path: '/settings/message-template' }
      ]
    },
    { 
      title: 'C-Panel', 
      icon: <FiMonitor />,
      submenu: [
        { title: 'User Groups', path: '/user-management/user-groups' }
      ]
    },
  ];

  return (
    <div className="sidebar open">
      <div className="sidebar-header">
        <div className="school-logo">
          <img src={logo} alt="School Logo" />
          <h2>JEEVAN ADARSH VIDYALAYA</h2>
        </div>
      </div>
      
      <div className="sidebar-menu">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className={`menu-item ${openMenus[item.title] ? 'open' : ''}`}
          >
            <div 
              className="menu-title"
              onClick={() => {
                if (item.submenu) {
                  toggleMenu(item.title);
                } else if (item.link) {
                  navigate(item.link);
                  // No need to toggle sidebar as it's always open
                }
              }}
            >
              <div className="menu-title-content">
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-text">{item.title}</span>
              </div>
              {item.submenu && (
                <span className="menu-arrow">
                  {openMenus[item.title] ? <FiChevronDown /> : <FiChevronRight />}
                </span>
              )}
            </div>
            
            {item.submenu && (
              <div className="submenu">
                {item.submenu.map((subItem, subIndex) => {
                  const isObject = typeof subItem === 'object';
                  const subItemText = isObject ? subItem.title : subItem;
                  const subItemPath = isObject ? subItem.path : `#${subItemText.toLowerCase().replace(/\s+/g, '-')}`;
                  const subIcon = getSubmenuIcon(subItemText);
                  
                  return (
                    <a 
                      key={subIndex} 
                      href={subItemPath}
                      className="submenu-item"
                      onClick={(e) => {
                        if (isObject && subItem.path) {
                          e.preventDefault();
                          navigate(subItem.path);
                        }
                      }}
                    >
                      <span className="submenu-icon">{subIcon}</span>
                      <span className="submenu-text">{subItemText}</span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
