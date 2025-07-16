// import  { useState } from "react";
// import { FaSave, FaBell, FaLock, FaPalette, FaToggleOn, FaToggleOff } from "react-icons/fa";

// const Settings = ({ isOpen, onClose }) => {
//   const [activeTab, setActiveTab] = useState("general");
//   const [settings, setSettings] = useState({
//     // General Settings
//     language: "english",
//     timezone: "UTC+5:30",
//     dateFormat: "DD/MM/YYYY",
    
//     // Privacy Settings
//     profileVisibility: "public",
//     showEmail: true,
//     showPhone: false,
//     dataSharing: true,
    
//     // Notification Settings
//     emailNotifications: true,
//     smsNotifications: false,
//     pushNotifications: true,
//     taskReminders: true,
//     systemUpdates: true,
//     marketingEmails: false,
    
//     // Theme Settings
//     theme: "light",
//     primaryColor: "#3B82F6",
//     fontSize: "medium",
//     reducedMotion: false
//   });

//   const handleChange = (_section: string, setting: string, value: string | boolean) => {
//     setSettings({
//       ...settings,
//       [setting]: value
//     });
//   };

//   const handleSaveSettings = () => {
//     // Here you would typically make an API call to save the settings
//     alert("Settings saved successfully!");
//   };

//   const toggleTheme = () => {
//     const newTheme = settings.theme === "light" ? "dark" : "light";
//     setSettings({
//       ...settings,
//       theme: newTheme
//     });
//     // Here you would typically apply the theme to the application
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center p-6 border-b">
//           <h2 className="text-2xl font-bold">Settings</h2>
//           <button 
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             ✕
//           </button>
//         </div>
        
//         <div className="flex flex-col md:flex-row">
//           {/* Sidebar */}
//           <div className="w-full md:w-1/4 bg-gray-50 p-6">
//             <ul>
//               <li 
//                 className={`mb-2 p-2 rounded cursor-pointer ${activeTab === "general" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-200"}`}
//                 onClick={() => setActiveTab("general")}
//               >
//                 General
//               </li>
//               <li 
//                 className={`mb-2 p-2 rounded cursor-pointer ${activeTab === "privacy" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-200"}`}
//                 onClick={() => setActiveTab("privacy")}
//               >
//                 Privacy
//               </li>
//               <li 
//                 className={`mb-2 p-2 rounded cursor-pointer ${activeTab === "notifications" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-200"}`}
//                 onClick={() => setActiveTab("notifications")}
//               >
//                 Notifications
//               </li>
//               <li 
//                 className={`mb-2 p-2 rounded cursor-pointer ${activeTab === "theme" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-200"}`}
//                 onClick={() => setActiveTab("theme")}
//               >
//                 Theme
//               </li>
//             </ul>
//           </div>
          
//           {/* Main Content */}
//           <div className="w-full md:w-3/4 p-6">
//             {/* General Settings */}
//             {activeTab === "general" && (
//               <div>
//                 <h3 className="text-xl font-semibold mb-6">General Settings</h3>
                
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-gray-500 mb-2">Language</label>
//                     <select 
//                       value={settings.language}
//                       onChange={(e) => handleChange("general", "language", e.target.value)}
//                       className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="english">English</option>
//                       <option value="hindi">Hindi</option>
//                       <option value="spanish">Spanish</option>
//                       <option value="french">French</option>
//                       <option value="german">German</option>
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label className="block text-gray-500 mb-2">Time Zone</label>
//                     <select 
//                       value={settings.timezone}
//                       onChange={(e) => handleChange("general", "timezone", e.target.value)}
//                       className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="UTC+0">UTC+0 (London)</option>
//                       <option value="UTC+1">UTC+1 (Paris, Berlin)</option>
//                       <option value="UTC+5:30">UTC+5:30 (India)</option>
//                       <option value="UTC-5">UTC-5 (New York)</option>
//                       <option value="UTC-8">UTC-8 (Los Angeles)</option>
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label className="block text-gray-500 mb-2">Date Format</label>
//                     <select 
//                       value={settings.dateFormat}
//                       onChange={(e) => handleChange("general", "dateFormat", e.target.value)}
//                       className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="DD/MM/YYYY">DD/MM/YYYY</option>
//                       <option value="MM/DD/YYYY">MM/DD/YYYY</option>
//                       <option value="YYYY-MM-DD">YYYY-MM-DD</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {/* Privacy Settings */}
//             {activeTab === "privacy" && (
//               <div>
//                 <h3 className="text-xl font-semibold mb-6">Privacy Settings</h3>
                
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-gray-500 mb-2">Profile Visibility</label>
//                     <select 
//                       value={settings.profileVisibility}
//                       onChange={(e) => handleChange("privacy", "profileVisibility", e.target.value)}
//                       className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="public">Public (Everyone can see)</option>
//                       <option value="private">Private (Only you can see)</option>
//                       <option value="contacts">Contacts Only</option>
//                     </select>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h4 className="font-medium">Show Email Address</h4>
//                       <p className="text-sm text-gray-500">Allow others to see your email address</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input 
//                         type="checkbox" 
//                         checked={settings.showEmail}
//                         onChange={(e) => handleChange("privacy", "showEmail", e.target.checked)}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                     </label>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h4 className="font-medium">Show Phone Number</h4>
//                       <p className="text-sm text-gray-500">Allow others to see your phone number</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input 
//                         type="checkbox" 
//                         checked={settings.showPhone}
//                         onChange={(e) => handleChange("privacy", "showPhone", e.target.checked)}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                     </label>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h4 className="font-medium">Data Sharing</h4>
//                       <p className="text-sm text-gray-500">Allow us to use your data to improve our services</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input 
//                         type="checkbox" 
//                         checked={settings.dataSharing}
//                         onChange={(e) => handleChange("privacy", "dataSharing", e.target.checked)}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {/* Notification Settings */}
//             {activeTab === "notifications" && (
//               <div>
//                 <h3 className="text-xl font-semibold mb-6">Notification Settings</h3>
                
//                 <div className="space-y-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h4 className="font-medium">Email Notifications</h4>
//                       <p className="text-sm text-gray-500">Receive notifications via email</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input 
//                         type="checkbox" 
//                         checked={settings.emailNotifications}
//                         onChange={(e) => handleChange("notifications", "emailNotifications", e.target.checked)}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                     </label>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h4 className="font-medium">SMS Notifications</h4>
//                       <p className="text-sm text-gray-500">Receive notifications via SMS</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input 
//                         type="checkbox" 
//                         checked={settings.smsNotifications}
//                         onChange={(e) => handleChange("notifications", "smsNotifications", e.target.checked)}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                     </label>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h4 className="font-medium">Push Notifications</h4>
//                       <p className="text-sm text-gray-500">Receive push notifications in browser</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input 
//                         type="checkbox" 
//                         checked={settings.pushNotifications}
//                         onChange={(e) => handleChange("notifications", "pushNotifications", e.target.checked)}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                     </label>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h4 className="font-medium">Task Reminders</h4>
//                       <p className="text-sm text-gray-500">Receive reminders for upcoming tasks</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input 
//                         type="checkbox" 
//                         checked={settings.taskReminders}
//                         onChange={(e) => handleChange("notifications", "taskReminders", e.target.checked)}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                     </label>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h4 className="font-medium">System Updates</h4>
//                       <p className="text-sm text-gray-500">Receive notifications about system updates</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input 
//                         type="checkbox" 
//                         checked={settings.systemUpdates}
//                         onChange={(e) => handleChange("notifications", "systemUpdates", e.target.checked)}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                     </label>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h4 className="font-medium">Marketing Emails</h4>
//                       <p className="text-sm text-gray-500">Receive marketing and promotional emails</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input 
//                         type="checkbox" 
//                         checked={settings.marketingEmails}
//                         onChange={(e) => handleChange("notifications", "marketingEmails", e.target.checked)}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {/* Theme Settings */}
//             {activeTab === "theme" && (
//               <div>
//                 <h3 className="text-xl font-semibold mb-6">Theme Settings</h3>
                
//                 <div className="space-y-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h4 className="font-medium">Dark Mode</h4>
//                       <p className="text-sm text-gray-500">Switch between light and dark theme</p>
//                     </div>
//                     <button 
//                       onClick={toggleTheme}
//                       className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
//                     >
//                       {settings.theme === "light" ? (
//                         <>
//                           <FaToggleOff className="text-gray-500" /> Light
//                         </>
//                       ) : (
//                         <>
//                           <FaToggleOn className="text-blue-500" /> Dark
//                         </>
//                       )}
//                     </button>
//                   </div>
                  
//                   <div>
//                     <label className="block text-gray-500 mb-2">Primary Color</label>
//                     <div className="flex gap-4">
//                       <label className="cursor-pointer">
//                         <input 
//                           type="radio" 
//                           name="primaryColor" 
//                           value="#3B82F6" 
//                           checked={settings.primaryColor === "#3B82F6"}
//                           onChange={(e) => handleChange("theme", "primaryColor", e.target.value)}
//                           className="sr-only"
//                         />
//                         <div className="w-8 h-8 rounded-full bg-blue-500 ring-2 ring-offset-2 ring-transparent peer-checked:ring-gray-400"></div>
//                       </label>
//                       <label className="cursor-pointer">
//                         <input 
//                           type="radio" 
//                           name="primaryColor" 
//                           value="#10B981" 
//                           checked={settings.primaryColor === "#10B981"}
//                           onChange={(e) => handleChange("theme", "primaryColor", e.target.value)}
//                           className="sr-only"
//                         />
//                         <div className="w-8 h-8 rounded-full bg-green-500 ring-2 ring-offset-2 ring-transparent peer-checked:ring-gray-400"></div>
//                       </label>
//                       <label className="cursor-pointer">
//                         <input 
//                           type="radio" 
//                           name="primaryColor" 
//                           value="#EF4444" 
//                           checked={settings.primaryColor === "#EF4444"}
//                           onChange={(e) => handleChange("theme", "primaryColor", e.target.value)}
//                           className="sr-only"
//                         />
//                         <div className="w-8 h-8 rounded-full bg-red-500 ring-2 ring-offset-2 ring-transparent peer-checked:ring-gray-400"></div>
//                       </label>
//                       <label className="cursor-pointer">
//                         <input 
//                           type="radio" 
//                           name="primaryColor" 
//                           value="#F59E0B" 
//                           checked={settings.primaryColor === "#F59E0B"}
//                           onChange={(e) => handleChange("theme", "primaryColor", e.target.value)}
//                           className="sr-only"
//                         />
//                         <div className="w-8 h-8 rounded-full bg-yellow-500 ring-2 ring-offset-2 ring-transparent peer-checked:ring-gray-400"></div>
//                       </label>
//                       <label className="cursor-pointer">
//                         <input 
//                           type="radio" 
//                           name="primaryColor" 
//                           value="#8B5CF6" 
//                           checked={settings.primaryColor === "#8B5CF6"}
//                           onChange={(e) => handleChange("theme", "primaryColor", e.target.value)}
//                           className="sr-only"
//                         />
//                         <div className="w-8 h-8 rounded-full bg-purple-500 ring-2 ring-offset-2 ring-transparent peer-checked:ring-gray-400"></div>
//                       </label>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-gray-500 mb-2">Font Size</label>
//                     <select 
//                       value={settings.fontSize}
//                       onChange={(e) => handleChange("theme", "fontSize", e.target.value)}
//                       className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="small">Small</option>
//                       <option value="medium">Medium</option>
//                       <option value="large">Large</option>
//                     </select>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h4 className="font-medium">Reduced Motion</h4>
//                       <p className="text-sm text-gray-500">Minimize animations throughout the interface</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input 
//                         type="checkbox" 
//                         checked={settings.reducedMotion}
//                         onChange={(e) => handleChange("theme", "reducedMotion", e.target.checked)}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {/* Save Button */}
//             <div className="mt-8 flex justify-end">
//               <button 
//                 onClick={handleSaveSettings}
//                 className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 <FaSave /> Save Settings
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;
















import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Palette, Shield, Bell, Globe } from 'lucide-react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    language: "english",
    timezone: "UTC+5:30",
    dateFormat: "DD/MM/YYYY",
    profileVisibility: "public",
    showEmail: true,
    showPhone: false,
    dataSharing: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    taskReminders: true,
    systemUpdates: true,
    marketingEmails: false,
    theme: "light",
    primaryColor: "#3B82F6",
    fontSize: "medium",
    reducedMotion: false
  });

  const handleChange = (setting: string, value: string | boolean) => {
    setSettings({
      ...settings,
      [setting]: value
    });
  };

  const handleSaveSettings = () => {
    // Here you would typically make an API call to save the settings
    alert("Settings saved successfully!");
  };

  const toggleTheme = () => {
    const newTheme = settings.theme === "light" ? "dark" : "light";
    setSettings({
      ...settings,
      theme: newTheme
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <SettingsIcon className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-semibold w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
          >
            ×
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 bg-gray-50 p-6">
            <ul className="space-y-1">
              {[
                { id: "general", icon: Globe, label: "General" },
                { id: "privacy", icon: Shield, label: "Privacy" },
                { id: "notifications", icon: Bell, label: "Notifications" },
                { id: "theme", icon: Palette, label: "Theme" },
              ].map((tab) => (
                <li key={tab.id}>
                  <button
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors duration-200 ${
                      activeTab === tab.id 
                        ? "bg-blue-100 text-blue-600 font-medium" 
                        : "hover:bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4 p-6">
            {/* General Settings */}
            {activeTab === "general" && (
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-900">General Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Language</label>
                    <select 
                      value={settings.language}
                      onChange={(e) => handleChange("language", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Time Zone</label>
                    <select 
                      value={settings.timezone}
                      onChange={(e) => handleChange("timezone", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="UTC+0">UTC+0 (London)</option>
                      <option value="UTC+1">UTC+1 (Paris, Berlin)</option>
                      <option value="UTC+5:30">UTC+5:30 (India)</option>
                      <option value="UTC-5">UTC-5 (New York)</option>
                      <option value="UTC-8">UTC-8 (Los Angeles)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Date Format</label>
                    <select 
                      value={settings.dateFormat}
                      onChange={(e) => handleChange("dateFormat", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {/* Privacy Settings */}
            {activeTab === "privacy" && (
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Privacy Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Profile Visibility</label>
                    <select 
                      value={settings.profileVisibility}
                      onChange={(e) => handleChange("profileVisibility", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="public">Public (Everyone can see)</option>
                      <option value="private">Private (Only you can see)</option>
                      <option value="contacts">Contacts Only</option>
                    </select>
                  </div>
                  
                  {[
                    { key: "showEmail", title: "Show Email Address", desc: "Allow others to see your email address" },
                    { key: "showPhone", title: "Show Phone Number", desc: "Allow others to see your phone number" },
                    { key: "dataSharing", title: "Data Sharing", desc: "Allow us to use your data to improve our services" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={settings[item.key as keyof typeof settings] as boolean}
                          onChange={(e) => handleChange(item.key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Notification Settings</h3>
                
                <div className="space-y-4">
                  {[
                    { key: "emailNotifications", title: "Email Notifications", desc: "Receive notifications via email" },
                    { key: "smsNotifications", title: "SMS Notifications", desc: "Receive notifications via SMS" },
                    { key: "pushNotifications", title: "Push Notifications", desc: "Receive push notifications in browser" },
                    { key: "taskReminders", title: "Task Reminders", desc: "Receive reminders for upcoming tasks" },
                    { key: "systemUpdates", title: "System Updates", desc: "Receive notifications about system updates" },
                    { key: "marketingEmails", title: "Marketing Emails", desc: "Receive marketing and promotional emails" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={settings[item.key as keyof typeof settings] as boolean}
                          onChange={(e) => handleChange(item.key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Theme Settings */}
            {activeTab === "theme" && (
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Theme Settings</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Dark Mode</h4>
                      <p className="text-sm text-gray-600">Switch between light and dark theme</p>
                    </div>
                    <button 
                      onClick={toggleTheme}
                      className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                        settings.theme === "light" 
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      {settings.theme === "light" ? "Light" : "Dark"}
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-3">Primary Color</label>
                    <div className="flex gap-3">
                      {[
                        { value: "#3B82F6", color: "bg-blue-500" },
                        { value: "#10B981", color: "bg-green-500" },
                        { value: "#EF4444", color: "bg-red-500" },
                        { value: "#F59E0B", color: "bg-yellow-500" },
                        { value: "#8B5CF6", color: "bg-purple-500" },
                      ].map((colorOption) => (
                        <label key={colorOption.value} className="cursor-pointer">
                          <input 
                            type="radio" 
                            name="primaryColor" 
                            value={colorOption.value} 
                            checked={settings.primaryColor === colorOption.value}
                            onChange={(e) => handleChange("primaryColor", e.target.value)}
                            className="sr-only"
                          />
                          <div className={`w-10 h-10 rounded-full ${colorOption.color} ${
                            settings.primaryColor === colorOption.value 
                              ? "ring-4 ring-offset-2 ring-gray-400" 
                              : "hover:ring-2 hover:ring-offset-1 hover:ring-gray-300"
                          } transition-all duration-200`}></div>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Font Size</label>
                    <select 
                      value={settings.fontSize}
                      onChange={(e) => handleChange("fontSize", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Reduced Motion</h4>
                      <p className="text-sm text-gray-600">Minimize animations throughout the interface</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.reducedMotion}
                        onChange={(e) => handleChange("reducedMotion", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleSaveSettings}
                className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <Save className="w-4 h-4" /> Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;