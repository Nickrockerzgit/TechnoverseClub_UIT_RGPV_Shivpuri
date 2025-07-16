
// import { useState, useEffect } from "react";
// import { FaCamera, FaEdit, FaKey, FaSpinner } from "react-icons/fa";

// const Profile = ({ isOpen, onClose }) => {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [profileData, setProfileData] = useState({
//     name: "",
//     email: "",
//     bio: "",
//     avatar: "",
//     phone: "",
//     location: "",
//     joinDate: ""
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [editedData, setEditedData] = useState({...profileData});
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const API_BASE_URL =  'http://localhost:5001';

//   // Get auth token from localStorage
//   const getAuthToken = () => {
//     return localStorage.getItem('token');
//   };

//   // API headers with auth token
//   const getAuthHeaders = () => {
//     const token = getAuthToken();
//     return {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     };
//   };

//   // Fetch profile data
//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/api/profile`, {
//         headers: getAuthHeaders()
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch profile');
//       }

//       const data = await response.json();
//       setProfileData(data.data);
//       setEditedData(data.data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//       setError('Failed to load profile data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update profile
//   const handleSaveProfile = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       setSuccess("");

//       const response = await fetch(`${API_BASE_URL}/api/profile/update`, {
//         method: 'PUT',
//         headers: getAuthHeaders(),
//         body: JSON.stringify(editedData)
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to update profile');
//       }

//       setProfileData({...editedData});
//       setIsEditing(false);
//       setSuccess('Profile updated successfully!');
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       setError(error.message || 'Failed to update profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle password change
//   const handlePasswordChange = async (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     setPasswordError("");
//     setSuccess("");

//     if (newPassword !== confirmPassword) {
//       setPasswordError("Passwords don't match");
//       return;
//     }

//     if (newPassword.length < 8) {
//       setPasswordError("Password must be at least 8 characters");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/api/profile/change-password`, {
//         method: 'PUT',
//         headers: getAuthHeaders(),
//         body: JSON.stringify({
//           currentPassword,
//           newPassword
//         })
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to change password');
//       }

//       setCurrentPassword("");
//       setNewPassword("");
//       setConfirmPassword("");
//       setSuccess("Password updated successfully!");
//     } catch (error) {
//       console.error('Error changing password:', error);
//       setPasswordError(error.message || 'Failed to change password');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle avatar upload
//   const handleAvatarChange = async (e: { target: { files: any[]; }; }) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file type
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//     if (!allowedTypes.includes(file.type)) {
//       setError('Please select a valid image file (JPEG, PNG, or GIF)');
//       return;
//     }

//     // Validate file size (5MB)
//     if (file.size > 2 * 1024 * 1024) {
//       setError('Image size must be less than 5MB');
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
      
//       const formData = new FormData();
//       formData.append('avatar', file);

//       const response = await fetch(`${API_BASE_URL}/api/profile/avatar`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${getAuthToken()}`
//         },
//         body: formData
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to upload avatar');
//       }

//       // Update avatar in state
//       const newAvatar = `${API_BASE_URL}${data.avatar}`;
//       setProfileData(prev => ({ ...prev, avatar: newAvatar }));
//       setEditedData(prev => ({ ...prev, avatar: newAvatar }));
//       setSuccess('Avatar updated successfully!');
//     } catch (error) {
//       console.error('Error uploading avatar:', error);
//       setError(error.message || 'Failed to upload avatar');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle input change
//   const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
//     const { name, value } = e.target;
//     setEditedData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Load profile data when component mounts
//   useEffect(() => {
//     if (isOpen) {
//       fetchProfile();
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center p-6 border-b">
//           <h2 className="text-2xl font-bold">User Profile</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 text-2xl"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Error/Success Messages */}
//         {error && (
//           <div className="mx-6 mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//             {error}
//           </div>
//         )}
//         {success && (
//           <div className="mx-6 mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
//             {success}
//           </div>
//         )}

//         <div className="flex flex-col md:flex-row">
//           {/* Sidebar */}
//           <div className="w-full md:w-1/3 bg-gray-50 p-8">
//             <div className="flex flex-col items-center mb-6">
//               <div className="relative">
//                 <img 
//                   // src={profileData.avatar || '/default-avatar.png'} 
//                   src={profileData.avatar ? `${API_BASE_URL}${profileData.avatar}` : '/default-avatar.png'}

//                   alt="Profile" 
//                   className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
//                 />
//                 {isEditing && (
//                   <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600">
//                     <FaCamera />
//                     <input 
//                       type="file" 
//                       className="hidden" 
//                       accept="image/*"
//                       onChange={handleAvatarChange}
//                     />
//                   </label>
//                 )}
//               </div>
//               <h3 className="text-xl font-semibold mt-4">{profileData.name}</h3>
//               <p className="text-gray-600">{profileData.email}</p>
//             </div>
            
//             <ul>
//               <li 
//                 className={`mb-2 p-2 rounded cursor-pointer ${activeTab === "profile" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-200"}`}
//                 onClick={() => setActiveTab("profile")}
//               >
//                 Profile Information
//               </li>
//               <li 
//                 className={`mb-2 p-2 rounded cursor-pointer ${activeTab === "security" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-200"}`}
//                 onClick={() => setActiveTab("security")}
//               >
//                 Security
//               </li>
//             </ul>
//           </div>
          
//           {/* Main Content */}
//           <div className="w-full md:w-3/4 p-6">
//             {loading && (
//               <div className="flex justify-center items-center py-8">
//                 <FaSpinner className="animate-spin text-2xl text-blue-500" />
//               </div>
//             )}

//             {!loading && activeTab === "profile" && (
//               <div>
//                 <div className="flex justify-between mb-6">
//                   <h3 className="text-xl font-semibold">Profile Information</h3>
//                   {!isEditing ? (
//                     <button 
//                       onClick={() => setIsEditing(true)}
//                       className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                     >
//                       <FaEdit /> Edit Profile
//                     </button>
//                   ) : (
//                     <div className="flex gap-2">
//                       <button 
//                         onClick={() => {
//                           setIsEditing(false);
//                           setEditedData({...profileData});
//                         }}
//                         className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
//                       >
//                         Cancel
//                       </button>
//                       <button 
//                         onClick={handleSaveProfile}
//                         disabled={loading}
//                         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
//                       >
//                         {loading ? <FaSpinner className="animate-spin" /> : 'Save Changes'}
//                       </button>
//                     </div>
//                   )}
//                 </div>
                
//                 {!isEditing ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <p className="text-gray-500 mb-1">Full Name</p>
//                       <p className="font-medium">{profileData.name}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500 mb-1">Email</p>
//                       <p className="font-medium">{profileData.email}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500 mb-1">Phone</p>
//                       <p className="font-medium">{profileData.phone}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500 mb-1">Location</p>
//                       <p className="font-medium">{profileData.location || 'Not specified'}</p>
//                     </div>
//                     <div className="md:col-span-2">
//                       <p className="text-gray-500 mb-1">Bio</p>
//                       <p className="font-medium">{profileData.bio || 'No bio available'}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500 mb-1">Member Since</p>
//                       <p className="font-medium">{profileData.joinDate}</p>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-gray-500 mb-1">Full Name *</label>
//                       <input 
//                         type="text" 
//                         name="name"
//                         value={editedData.name}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-500 mb-1">Email</label>
//                       <input 
//                         type="email" 
//                         name="email"
//                         value={editedData.email}
//                         disabled
//                         className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-500 mb-1">Phone *</label>
//                       <input 
//                         type="tel" 
//                         name="phone"
//                         value={editedData.phone}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-500 mb-1">Location</label>
//                       <input 
//                         type="text" 
//                         name="location"
//                         value={editedData.location}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="City, Country"
//                       />
//                     </div>
//                     <div className="md:col-span-2">
//                       <label className="block text-gray-500 mb-1">Bio</label>
//                       <textarea 
//                         name="bio"
//                         value={editedData.bio}
//                         onChange={handleInputChange}
//                         rows="3"
//                         maxLength="500"
//                         className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Tell us about yourself..."
//                       />
//                       <p className="text-sm text-gray-500 mt-1">
//                         {editedData.bio.length}/500 characters
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
            
//             {!loading && activeTab === "security" && (
//               <div>
//                 <h3 className="text-xl font-semibold mb-6">Change Password</h3>
//                 <form onSubmit={handlePasswordChange}>
//                   <div className="mb-4">
//                     <label className="block text-gray-500 mb-1">Current Password</label>
//                     <input 
//                       type="password" 
//                       value={currentPassword}
//                       onChange={(e) => setCurrentPassword(e.target.value)}
//                       className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-500 mb-1">New Password</label>
//                     <input 
//                       type="password" 
//                       value={newPassword}
//                       onChange={(e) => setNewPassword(e.target.value)}
//                       className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-500 mb-1">Confirm New Password</label>
//                     <input 
//                       type="password" 
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                   {passwordError && (
//                     <p className="text-red-500 mb-4">{passwordError}</p>
//                   )}
//                   <button 
//                     type="submit"
//                     disabled={loading}
//                     className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
//                   >
//                     {loading ? <FaSpinner className="animate-spin" /> : <FaKey />}
//                     {loading ? 'Updating...' : 'Update Password'}
//                   </button>
//                 </form>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;





















import React, { useState, useEffect } from 'react';
import { User, Camera, Edit, Key, Loader2, Save, X, MapPin, Calendar, Phone, Mail } from 'lucide-react';

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProfileData {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  phone: string;
  location: string;
  joinDate: string;
}

const Profile: React.FC<ProfileProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    bio: "",
    avatar: "",
    phone: "",
    location: "",
    joinDate: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<ProfileData>({...profileData});
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_BASE_URL = 'http://localhost:5001';

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // API headers with auth token
  const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  // Fetch profile data
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await fetch(`${API_BASE_URL}/api/profile`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setProfileData(data.data);
      setEditedData(data.data);
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch(`${API_BASE_URL}/api/profile/update`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(editedData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      setProfileData({...editedData});
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setError(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setSuccess("");
    setError("");

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/profile/change-password`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to change password');
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccess("Password updated successfully!");
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      console.error('Error changing password:', error);
      setPasswordError(error.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  // Handle avatar upload
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, or GIF)');
      return;
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size must be less than 2MB');
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch(`${API_BASE_URL}/api/profile/avatar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload avatar');
      }

      // Update avatar in state
      const newAvatar = `${API_BASE_URL}${data.avatar}`;
      setProfileData(prev => ({ ...prev, avatar: newAvatar }));
      setEditedData(prev => ({ ...prev, avatar: newAvatar }));
      setSuccess('Avatar updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      setError(error.message || 'Failed to upload avatar');
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Load profile data when component mounts
  useEffect(() => {
    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen]);

  // Clear messages when tab changes
  useEffect(() => {
    setError("");
    setSuccess("");
    setPasswordError("");
  }, [activeTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-3">
            <User className="w-7 h-7 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 rounded-lg hover:bg-white/50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            {error}
          </div>
        )}
        {success && (
          <div className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {success}
          </div>
        )}

        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="w-full lg:w-1/3 bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                {profileData.avatar ? (
                  <img 
                    src={profileData.avatar.startsWith('http') ? profileData.avatar : `${API_BASE_URL}${profileData.avatar}`}
                    alt="Profile" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    {profileData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                )}
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-3 rounded-full cursor-pointer hover:bg-blue-600 transition-colors duration-200 shadow-lg hover:shadow-xl">
                    <Camera className="w-4 h-4" />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </label>
                )}
              </div>
              <h3 className="text-xl font-semibold mt-4 text-gray-900">{profileData.name}</h3>
              <p className="text-gray-600 flex items-center gap-1 mt-1">
                <Mail className="w-4 h-4" />
                {profileData.email}
              </p>
              {profileData.location && (
                <p className="text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  {profileData.location}
                </p>
              )}
              {profileData.joinDate && (
                <p className="text-gray-500 flex items-center gap-1 mt-1">
                  <Calendar className="w-4 h-4" />
                  Member since {new Date(profileData.joinDate).toLocaleDateString()}
                </p>
              )}
            </div>
            
            <ul className="space-y-2">
              <li>
                <button
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    activeTab === "profile" 
                      ? "bg-blue-100 text-blue-600 font-medium shadow-sm" 
                      : "hover:bg-gray-200 text-gray-700 hover:shadow-sm"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  Profile Information
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    activeTab === "security" 
                      ? "bg-blue-100 text-blue-600 font-medium shadow-sm" 
                      : "hover:bg-gray-200 text-gray-700 hover:shadow-sm"
                  }`}
                  onClick={() => setActiveTab("security")}
                >
                  Security Settings
                </button>
              </li>
            </ul>
          </div>
          
          {/* Main Content */}
          <div className="w-full lg:w-2/3 p-8">
            {loading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
                <span className="ml-2 text-gray-600">Loading...</span>
              </div>
            )}

            {!loading && activeTab === "profile" && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900">Profile Information</h3>
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                      <Edit className="w-4 h-4" /> Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          setIsEditing(false);
                          setEditedData({...profileData});
                        }}
                        className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSaveProfile}
                        disabled={loading}
                        className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors duration-200 shadow-sm hover:shadow-md"
                      >
                        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
                
                {!isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <p className="text-gray-500 text-sm font-medium">Full Name</p>
                      <p className="text-lg font-semibold text-gray-900">{profileData.name}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-500 text-sm font-medium">Email</p>
                      <p className="text-lg font-semibold text-gray-900">{profileData.email}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-500 text-sm font-medium">Phone</p>
                      <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {profileData.phone || 'Not specified'}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-500 text-sm font-medium">Location</p>
                      <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {profileData.location || 'Not specified'}
                      </p>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <p className="text-gray-500 text-sm font-medium">Bio</p>
                      <p className="text-gray-900 leading-relaxed">{profileData.bio || 'No bio available'}</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        value={editedData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={editedData.email}
                        disabled
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Phone *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={editedData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Location</label>
                      <input 
                        type="text" 
                        name="location"
                        value={editedData.location}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                        placeholder="City, Country"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">Bio</label>
                      <textarea 
                        name="bio"
                        value={editedData.bio}
                        onChange={handleInputChange}
                        rows={4}
                        maxLength={500}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                        placeholder="Tell us about yourself..."
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        {editedData.bio.length}/500 characters
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {!loading && activeTab === "security" && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Key className="w-6 h-6 text-blue-600" />
                  <h3 className="text-2xl font-semibold text-gray-900">Change Password</h3>
                </div>
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Current Password</label>
                    <input 
                      type="password" 
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">New Password</label>
                    <input 
                      type="password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Confirm New Password</label>
                    <input 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      required
                    />
                  </div>
                  {passwordError && (
                    <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{passwordError}</p>
                  )}
                  <button 
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Key className="w-4 h-4" />}
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;



