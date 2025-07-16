
// import  { SetStateAction, useState } from "react";
// import { FaUser, FaCog, FaSignOutAlt, FaTasks, FaBell } from "react-icons/fa";
// import { useAuth } from "../AuthContext"; 
// import { useNavigate } from "react-router-dom"; 
// import Profile from "./Profile";
// import Tasks from "./Tasks";
// import Notifications from "./Notifications";
// import Settings from "./Settings";

// const Dashboard = () => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();
  
//   const [activeModal, setActiveModal] = useState(null);

//   const handleLogout = () => {
//     logout(); 
//     navigate("/");
//   };

//   const openModal = (modalName: string | SetStateAction<null>) => {
//     setActiveModal(modalName);
//   };

//   const closeModal = () => {
//     setActiveModal(null);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-800 text-white p-6">
//         <h2 className="text-2xl font-bold mb-6">Technoverse</h2>
//         <ul>
//           <li className="mb-4">
//             <button 
//               onClick={() => openModal("profile")} 
//               className="flex items-center gap-2 text-lg hover:text-gray-400 w-full text-left"
//             >
//               <FaUser /> Profile
//             </button>
//           </li>
//           <li className="mb-4">
//             <button 
//               onClick={() => openModal("tasks")} 
//               className="flex items-center gap-2 text-lg hover:text-gray-400 w-full text-left"
//             >
//               <FaTasks /> Tasks
//             </button>
//           </li>
//           <li className="mb-4">
//             <button 
//               onClick={() => openModal("notifications")} 
//               className="flex items-center gap-2 text-lg hover:text-gray-400 w-full text-left"
//             >
//               <FaBell /> Notifications
//             </button>
//           </li>
//           <li className="mb-4">
//             <button 
//               onClick={() => openModal("settings")} 
//               className="flex items-center gap-2 text-lg hover:text-gray-400 w-full text-left"
//             >
//               <FaCog /> Settings
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 text-lg text-red-400 hover:text-red-600 w-full text-left"
//             >
//               <FaSignOutAlt /> Logout
//             </button>
//           </li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="p-6 bg-white shadow-md rounded-lg">
//             <h3 className="text-xl font-semibold">Profile Overview</h3>
//             <p className="text-gray-600">Manage your profile information.</p>
//             <button 
//               onClick={() => openModal("profile")} 
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               View Profile
//             </button>
//           </div>
//           <div className="p-6 bg-white shadow-md rounded-lg">
//             <h3 className="text-xl font-semibold">Pending Tasks</h3>
//             <p className="text-gray-600">Check your assigned tasks.</p>
//             <button 
//               onClick={() => openModal("tasks")} 
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               View Tasks
//             </button>
//           </div>
//           <div className="p-6 bg-white shadow-md rounded-lg">
//             <h3 className="text-xl font-semibold">Recent Notifications</h3>
//             <p className="text-gray-600">Stay updated with latest updates.</p>
//             <button 
//               onClick={() => openModal("notifications")} 
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               View Notifications
//             </button>
//           </div>
//         </div>
//       </main>

//       {/* Modals */}
//       <Profile isOpen={activeModal === "profile"} onClose={closeModal} />
//       <Tasks isOpen={activeModal === "tasks"} onClose={closeModal} />
//       <Notifications isOpen={activeModal === "notifications"} onClose={closeModal} />
//       <Settings isOpen={activeModal === "settings"} onClose={closeModal} />
//     </div>
//   );
// };

// export default Dashboard;













import  { useState } from 'react';
import { 
  User, 
  Settings, 
  LogOut, 
  CheckSquare, 
  Award, 
  Calendar,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { useNavigate } from "react-router-dom"; 
import { useAuth } from '../AuthContext';
import Profile from './Profile';
import Tasks from './Tasks';
import Notifications from './Notifications';
import SettingsComponent from './Settings';
import Certifications from './Certification';
import Events from './Events';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const openModal = (modalName: string) => {
    setActiveModal(modalName);
    setSidebarOpen(false);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const getUserInitial = () => {
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  const sidebarItems = [
    { id: 'profile', icon: User, label: 'Profile', onClick: () => openModal('profile') },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks', onClick: () => openModal('tasks') },
    { id: 'certifications', icon: Award, label: 'Certifications', onClick: () => openModal('certifications') },
    { id: 'events', icon: Calendar, label: 'Events', onClick: () => openModal('events') },
  ];

  const bottomItems = [
    { id: 'settings', icon: Settings, label: 'Settings', onClick: () => openModal('settings') },
    { id: 'logout', icon: LogOut, label: 'Logout', onClick: handleLogout, className: 'text-red-400 hover:text-red-300' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <h2 className="text-xl font-bold">Technoverse</h2>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-6">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={item.onClick}
                    className="flex items-center w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
                  >
                    <item.icon size={20} className="mr-3" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom items */}
          <div className="px-6 pb-6 border-t border-gray-700 pt-6">
            <ul className="space-y-2">
              {bottomItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={item.onClick}
                    className={`flex items-center w-full px-4 py-3 text-left transition-colors duration-200 rounded-lg ${
                      item.className || 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <item.icon size={20} className="mr-3" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 text-gray-600 hover:text-gray-900"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notification Bell */}
              <button
                onClick={() => openModal('notifications')}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              
              {/* User Profile */}
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {getUserInitial()}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Profile Overview Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm text-gray-500">Profile</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Overview</h3>
              <p className="text-gray-600 text-sm mb-4">Manage your profile information and settings.</p>
              <button
                onClick={() => openModal('profile')}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                View Profile
              </button>
            </div>

            {/* Tasks Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckSquare className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm text-gray-500">Tasks</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Tasks</h3>
              <p className="text-gray-600 text-sm mb-4">Check your assigned tasks and track progress.</p>
              <button
                onClick={() => openModal('tasks')}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                View Tasks
              </button>
            </div>

            {/* Certifications Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-sm text-gray-500">Certificates</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Certifications</h3>
              <p className="text-gray-600 text-sm mb-4">View and download your earned certificates.</p>
              <button
                onClick={() => openModal('certifications')}
                className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200"
              >
                View Certificates
              </button>
            </div>

            {/* Events Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm text-gray-500">Events</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Registered Events</h3>
              <p className="text-gray-600 text-sm mb-4">View events you've registered for.</p>
              <button
                onClick={() => openModal('events')}
                className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200"
              >
                View Events
              </button>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">5</div>
                  <div className="text-sm text-gray-600">Active Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">12</div>
                  <div className="text-sm text-gray-600">Certificates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">3</div>
                  <div className="text-sm text-gray-600">Events</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">85%</div>
                  <div className="text-sm text-gray-600">Progress</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <Profile isOpen={activeModal === 'profile'} onClose={closeModal} />
      <Tasks isOpen={activeModal === 'tasks'} onClose={closeModal} />
      <Notifications isOpen={activeModal === 'notifications'} onClose={closeModal} />
      <SettingsComponent isOpen={activeModal === 'settings'} onClose={closeModal} />
      <Certifications isOpen={activeModal === 'certifications'} onClose={closeModal} />
      <Events isOpen={activeModal === 'events'} onClose={closeModal} />
    </div>
  );
};

export default Dashboard;