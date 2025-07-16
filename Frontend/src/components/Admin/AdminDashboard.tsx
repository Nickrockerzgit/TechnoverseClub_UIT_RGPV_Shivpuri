
import { useEffect, useState } from 'react';
import { Users, Bell, ExternalLink, X, FileText, Check, X as XIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';

interface JoinRequest {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  college_name: string;
  course_stream: string;
  year_of_study: string;
  skills: string[];
  interests: string[];
  motivation: string;
  github_url: string;
  linkedin_url: string;
  website_url: string;
  team_preferences: string[];
  created_at: string;
  read?: boolean;
}

interface EventRegistration {
  id: number;
  team_name: string;
  team_leader_name: string;
  team_leader_email: string;
  team_leader_phone: string;
  members: string;
  category: string;
  project_name: string;
  project_description: string;
  github: string;
  linkedin: string;
  project_proposal: string | null;
  status?: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  read?: boolean;
}

function AdminDashboard() {
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<JoinRequest | null>(null);
  const [selectedRegistration, setSelectedRegistration] = useState<EventRegistration | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [showRegistrationsList, setShowRegistrationsList] = useState(false);
  const [showRegistrationNotifications, setShowRegistrationNotifications] = useState(false);
  
  const unreadCount = joinRequests.filter(req => !req.read).length;
  const unreadRegistrationsCount = eventRegistrations.filter(reg => !reg.read).length;
  
  const navigate = useNavigate();
  const location = useLocation();

  const isMainDashboard = location.pathname === '/admin';

  useEffect(() => {
    if (localStorage.getItem("isAdminAuthenticated") !== "true") {
      navigate("/admin-login");
    }
    fetchJoinRequests();
    fetchEventRegistrations();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/");
  };

  const fetchJoinRequests = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/join-us/data');
      const data = await response.json();
      setJoinRequests(data.map((req: JoinRequest) => ({
        ...req,
        skills: JSON.parse(req.skills as unknown as string),
        interests: JSON.parse(req.interests as unknown as string),
        team_preferences: JSON.parse(req.team_preferences as unknown as string),
        read: false
      })));
    } catch (error) {
      console.error('Error fetching join requests:', error);
    }
  };

  const fetchEventRegistrations = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/events/registrations');
      const data = await response.json();
      setEventRegistrations(data.map((reg: EventRegistration) => ({
        ...reg,
        status: reg.status || 'pending',
        read: false
      })));
    } catch (error) {
      console.error('Error fetching event registrations:', error);
    }
  };

  const handleRequestClick = (request: JoinRequest) => {
    setSelectedRequest(request);
    const updatedRequests = joinRequests.map(req =>
      req.id === request.id ? { ...req, read: true } : req
    );
    setJoinRequests(updatedRequests);
  };

  const handleRegistrationClick = (registration: EventRegistration) => {
    setSelectedRegistration(registration);
    const updatedRegistrations = eventRegistrations.map(reg =>
      reg.id === registration.id ? { ...reg, read: true } : reg
    );
    setEventRegistrations(updatedRegistrations);
  };

  const handleRegistrationAction = async (id: number, action: 'accept' | 'reject') => {
    try {
      // This would be an actual API call in production
      // await fetch(`http://localhost:5000/registrations/${id}/${action}`, {
      //   method: 'POST',
      // });
      
      // For now, just update the local state
      const updatedRegistrations = eventRegistrations.map(reg =>
        reg.id === id ? { ...reg, status: action === 'accept' ? 'accepted' : 'rejected' } : reg
      );
      setEventRegistrations(updatedRegistrations);
      
      if (selectedRegistration && selectedRegistration.id === id) {
        setSelectedRegistration({
          ...selectedRegistration,
          status: action === 'accept' ? 'accepted' : 'rejected'
        });
      }
    } catch (error) {
      console.error(`Error ${action}ing registration:`, error);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <nav className="w-64 h-screen bg-gray-800 text-white p-4 sticky top-0">
        <h2 className="text-xl mb-8">Admin Dashboard</h2>
        <ul>
          <li><Link to="/admin/carousel" className="block py-2 hover:bg-gray-700 rounded px-2 transition-colors">Carousel</Link></li>
          <li><Link to="/admin/team" className="block py-2 hover:bg-gray-700 rounded px-2 transition-colors">Team</Link></li>
          <li><Link to="/admin/events" className="block py-2 hover:bg-gray-700 rounded px-2 transition-colors">Events</Link></li>
          <li><Link to="/admin/vlogs" className="block py-2 hover:bg-gray-700 rounded px-2 transition-colors">Vlogs</Link></li>
          <li><Link to="/admin/sponsors" className="block py-2 hover:bg-gray-700 rounded px-2 transition-colors">Sponsors</Link></li>
        </ul>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100 relative">
        {isMainDashboard && (
          <>
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* User Data Card */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{joinRequests.length}</h3>
                    <p className="text-gray-600">Total Users</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowUserList(!showUserList)}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                  View User Data
                </button>
              </div>

              {/* Event Registrations Card */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-green-100 p-4 rounded-full">
                    <FileText className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{eventRegistrations.length}</h3>
                    <p className="text-gray-600">Event Registrations</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowRegistrationsList(!showRegistrationsList)}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
                >
                  View Registrations
                </button>
              </div>
            </div>

            {/* User List */}
            {showUserList && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">User List</h3>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {joinRequests.map((request) => (
                    <div
                      key={request.id}
                      onClick={() => handleRequestClick(request)}
                      className="bg-white rounded-lg shadow-lg p-4 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                      style={{
                        perspective: '1000px',
                        transform: 'translateZ(0)',
                      }}
                    >
                      <h4 className="font-bold text-lg mb-2">{request.full_name}</h4>
                      <p className="text-gray-600 text-sm mb-1">{request.email}</p>
                      <p className="text-gray-500 text-sm">{request.college_name}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {request.skills.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                          >
                            {skill}
                          </span>
                        ))}
                        {request.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                            +{request.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Event Registrations List */}
            {showRegistrationsList && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Event Registrations</h3>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {eventRegistrations.map((registration) => (
                    <div
                      key={registration.id}
                      onClick={() => handleRegistrationClick(registration)}
                      className={`bg-white rounded-lg shadow-lg p-4 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-l-4 ${
                        registration.status === 'accepted' ? 'border-green-500' : 
                        registration.status === 'rejected' ? 'border-red-500' : 'border-yellow-500'
                      }`}
                      style={{
                        perspective: '1000px',
                        transform: 'translateZ(0)',
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-lg mb-2">{registration.team_name}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${
                          registration.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                          registration.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {registration.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">Leader: {registration.team_leader_name}</p>
                      <p className="text-gray-500 text-sm">Project: {registration.project_name}</p>
                      <p className="text-gray-500 text-sm">Category: {registration.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notification Bells */}
            <div className="absolute top-4 right-4 flex space-x-4">
              {/* User Notifications */}
              <button
                className="relative p-2 hover:bg-gray-200 rounded-full"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowRegistrationNotifications(false);
                }}
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Event Registration Notifications */}
              <button
                className="relative p-2 hover:bg-gray-200 rounded-full"
                onClick={() => {
                  setShowRegistrationNotifications(!showRegistrationNotifications);
                  setShowNotifications(false);
                }}
              >
                <FileText className="w-6 h-6" />
                {unreadRegistrationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadRegistrationsCount}
                  </span>
                )}
              </button>
            </div>

            {/* User Notifications Panel */}
            {showNotifications && (
              <div className="absolute top-16 right-4 w-96 max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Join Requests</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {joinRequests.length > 0 ? (
                    joinRequests.map((request) => (
                      <div
                        key={request.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                          !request.read ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => handleRequestClick(request)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{request.full_name}</h4>
                            <p className="text-sm text-gray-600">{request.email}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
                            </p>
                          </div>
                          {!request.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">No join requests found</div>
                  )}
                </div>
              </div>
            )}

            {/* Event Registration Notifications Panel */}
            {showRegistrationNotifications && (
              <div className="absolute top-16 right-4 w-96 max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Event Registrations</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {eventRegistrations.length > 0 ? (
                    eventRegistrations.map((registration) => (
                      <div
                        key={registration.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                          !registration.read ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => handleRegistrationClick(registration)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{registration.team_name}</h4>
                            <p className="text-sm text-gray-600">
                              {registration.project_name} ({registration.category})
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {registration.created_at ? formatDistanceToNow(new Date(registration.created_at), { addSuffix: true }) : 'Recently'}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className={`text-xs px-2 py-1 rounded mr-2 ${
                              registration.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                              registration.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {registration.status}
                            </span>
                            {!registration.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">No event registrations found</div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* Selected Request Details */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 hover:scale-[1.02]">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">{selectedRequest.full_name}</h2>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-700">Contact Information</h3>
                      <p className="text-sm">Email: {selectedRequest.email}</p>
                      <p className="text-sm">Phone: {selectedRequest.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Education</h3>
                      <p className="text-sm">College: {selectedRequest.college_name}</p>
                      <p className="text-sm">Course: {selectedRequest.course_stream}</p>
                      <p className="text-sm">Year: {selectedRequest.year_of_study}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700">Skills</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedRequest.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700">Interests</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedRequest.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-100 text-purple-800 text-sm rounded"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700">Motivation</h3>
                    <p className="text-sm mt-1">{selectedRequest.motivation}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700">Portfolio Links</h3>
                    <div className="space-y-2 mt-1">
                      {selectedRequest.github_url && (
                        <a
                          href={selectedRequest.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-blue-600 hover:underline"
                        >
                          GitHub <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      )}
                      {selectedRequest.linkedin_url && (
                        <a
                          href={selectedRequest.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-blue-600 hover:underline"
                        >
                          LinkedIn <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      )}
                      {selectedRequest.website_url && (
                        <a
                          href={selectedRequest.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-blue-600 hover:underline"
                        >
                          Portfolio <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-700">Team Preferences</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedRequest.team_preferences.map((pref, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded"
                          >
                            {pref}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Selected Registration Details */}
        {selectedRegistration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 hover:scale-[1.02]">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedRegistration.team_name}</h2>
                    <span className={`text-xs px-2 py-1 rounded inline-block mt-1 ${
                      selectedRegistration.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                      selectedRegistration.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedRegistration.status}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedRegistration(null)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-700">Team Leader</h3>
                      <p className="text-sm">Name: {selectedRegistration.team_leader_name}</p>
                      <p className="text-sm">Email: {selectedRegistration.team_leader_email}</p>
                      <p className="text-sm">Phone: {selectedRegistration.team_leader_phone}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Project Details</h3>
                      <p className="text-sm">Name: {selectedRegistration.project_name}</p>
                      <p className="text-sm">Category: {selectedRegistration.category}</p>
                    </div>
                  </div>

                  <div>
                     <h3 className="font-semibold text-gray-700">Team Members</h3>
                       <ul className="text-sm mt-1 space-y-1">
                             {selectedRegistration.members.map((member: { name: string; role: string; email: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
                               <li key={index} className="border-b py-1">
                                  <span className="font-medium">{member.name.trim()}</span> - {member.role.trim()} 
                                 (<a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                                     {member.email}
                                   </a>)
                                 </li>
                             ))}
                    </ul>
                   </div> 


                  <div>
                    <h3 className="font-semibold text-gray-700">Project Description</h3>
                    <p className="text-sm mt-1">{selectedRegistration.project_description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700">Links</h3>
                    <div className="space-y-2 mt-1">
                      {selectedRegistration.github && (
                        <a
                          href={selectedRegistration.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-blue-600 hover:underline"
                        >
                          GitHub <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      )}
                      {selectedRegistration.linkedin && (
                        <a
                          href={selectedRegistration.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-blue-600 hover:underline"
                        >
                          LinkedIn <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      )}
                      {selectedRegistration.project_proposal && (
                        <a
                        href={`http://localhost:5000${selectedRegistration.project_proposal}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-blue-600 hover:underline"
                        >
                          Project Proposal <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 mt-6">
                    {selectedRegistration.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleRegistrationAction(selectedRegistration.id, 'reject')}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center"
                        >
                          <XIcon className="w-4 h-4 mr-1" /> Reject
                        </button>
                        <button
                          onClick={() => handleRegistrationAction(selectedRegistration.id, 'accept')}
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center"
                        >
                          <Check className="w-4 h-4 mr-1" /> Accept
                        </button>
                      </>
                    )}
                    {selectedRegistration.status === 'rejected' && (
                      <button
                        onClick={() => handleRegistrationAction(selectedRegistration.id, 'accept')}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center"
                      >
                        <Check className="w-4 h-4 mr-1" /> Accept Instead
                      </button>
                    )}
                    {selectedRegistration.status === 'accepted' && (
                      <button
                        onClick={() => handleRegistrationAction(selectedRegistration.id, 'reject')}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center"
                      >
                        <XIcon className="w-4 h-4 mr-1" /> Reject Instead
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Render the nested route content */}
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDashboard;























// import  { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
// import { Users, Bell, ExternalLink, X, Calendar, Check, X as XIcon } from 'lucide-react';
// import { formatDistanceToNow } from 'date-fns';

// interface JoinRequest {
//   id: number;
//   full_name: string;
//   email: string;
//   phone: string;
//   college_name: string;
//   course_stream: string;
//   year_of_study: string;
//   skills: string[];
//   interests: string[];
//   motivation: string;
//   github_url: string;
//   linkedin_url: string;
//   website_url: string;
//   availability: string[];
//   team_preferences: string[];
//   created_at: string;
//   read?: boolean;
// }

// interface EventRegistration {
//   id: number;
//   team_name: string;
//   team_leader_name: string;
//   team_leader_email: string;
//   team_leader_phone: string;
//   members: string;
//   category: string;
//   project_name: string;
//   project_description: string;
//   github: string;
//   linkedin: string;
//   project_proposal: string | null;
//   status: 'pending' | 'accepted' | 'rejected';
//   created_at: string;
//   read?: boolean;
// }

// function AdminDashboard() {
//   const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
//   const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([]);
//   const [selectedRequest, setSelectedRequest] = useState<JoinRequest | null>(null);
//   const [selectedRegistration, setSelectedRegistration] = useState<EventRegistration | null>(null);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showUserList, setShowUserList] = useState(false);
//   const [showEventRegistrations, setShowEventRegistrations] = useState(false);
  
//   const unreadCount = joinRequests.filter(req => !req.read).length;
//   const unreadRegistrationsCount = eventRegistrations.filter(reg => !reg.read).length;
//   const totalNotifications = unreadCount + unreadRegistrationsCount;
  
//   // Mock navigation and location for this example
//   const navigate = (path: string) => console.log(`Navigating to ${path}`);
//   const location = { pathname: '/admin' };
//   const isMainDashboard = location.pathname === '/admin';

//   useEffect(() => {
//     if (localStorage.getItem("isAdminAuthenticated") !== "true") {
//       navigate("/admin-login");
//     }
//     fetchJoinRequests();
//     fetchEventRegistrations();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("isAdminAuthenticated");
//     navigate("/");
//   };

//   const fetchJoinRequests = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/getJoinUsData');
//       const data = await response.json();
//       setJoinRequests(data.map((req: JoinRequest) => ({
//         ...req,
//         skills: JSON.parse(req.skills as unknown as string),
//         interests: JSON.parse(req.interests as unknown as string),
//         availability: JSON.parse(req.availability as unknown as string),
//         team_preferences: JSON.parse(req.team_preferences as unknown as string),
//         read: false
//       })));
//     } catch (error) {
//       console.error('Error fetching join requests:', error);
//     }
//   };

//   const fetchEventRegistrations = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/registrations');
//       const data = await response.json();
//       setEventRegistrations(data.map((reg: EventRegistration) => ({
//         ...reg,
//         status: reg.status || 'pending',
//         read: false
//       })));
//     } catch (error) {
//       console.error('Error fetching event registrations:', error);
//     }
//   };

//   const handleRequestClick = (request: JoinRequest) => {
//     setSelectedRequest(request);
//     setSelectedRegistration(null);
//     const updatedRequests = joinRequests.map(req =>
//       req.id === request.id ? { ...req, read: true } : req
//     );
//     setJoinRequests(updatedRequests);
//   };

//   const handleRegistrationClick = (registration: EventRegistration) => {
//     setSelectedRegistration(registration);
//     setSelectedRequest(null);
//     const updatedRegistrations = eventRegistrations.map(reg =>
//       reg.id === registration.id ? { ...reg, read: true } : reg
//     );
//     setEventRegistrations(updatedRegistrations);
//   };

//   const handleAcceptRegistration = async (id: number) => {
//     try {
//       // In a real implementation, you would call your API to update the status
//       // await fetch(`http://localhost:5000/registrations/${id}/accept`, {
//       //   method: 'PUT'
//       // });
      
//       // For now, we'll just update the local state
//       const updatedRegistrations = eventRegistrations.map(reg =>
//         reg.id === id ? { ...reg, status: 'accepted' } : reg
//       );
//       setEventRegistrations(updatedRegistrations);
      
//       if (selectedRegistration?.id === id) {
//         setSelectedRegistration({...selectedRegistration, status: 'accepted'});
//       }
//     } catch (error) {
//       console.error('Error accepting registration:', error);
//     }
//   };

//   const handleRejectRegistration = async (id: number) => {
//     try {
//       // In a real implementation, you would call your API to update the status
//       // await fetch(`http://localhost:5000/registrations/${id}/reject`, {
//       //   method: 'PUT'
//       // });
      
//       // For now, we'll just update the local state
//       const updatedRegistrations = eventRegistrations.map(reg =>
//         reg.id === id ? { ...reg, status: 'rejected' } : reg
//       );
//       setEventRegistrations(updatedRegistrations);
      
//       if (selectedRegistration?.id === id) {
//         setSelectedRegistration({...selectedRegistration, status: 'rejected'});
//       }
//     } catch (error) {
//       console.error('Error rejecting registration:', error);
//     }
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <nav className="w-64 h-screen bg-gray-800 text-white p-4 sticky top-0">
//         <h2 className="text-xl mb-8">Admin Dashboard</h2>
//         <ul>
//           <li><a href="/admin/carousel" className="block py-2 hover:bg-gray-700 rounded px-2 transition-colors">Carousel</a></li>
//           <li><a href="/admin/team" className="block py-2 hover:bg-gray-700 rounded px-2 transition-colors">Team</a></li>
//           <li><a href="/admin/events" className="block py-2 hover:bg-gray-700 rounded px-2 transition-colors">Events</a></li>
//           <li><a href="/admin/vlogs" className="block py-2 hover:bg-gray-700 rounded px-2 transition-colors">Vlogs</a></li>
//           <li><a href="/admin/sponsors" className="block py-2 hover:bg-gray-700 rounded px-2 transition-colors">Sponsors</a></li>
//         </ul>
//         <button
//           onClick={handleLogout}
//           className="mt-6 bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-colors"
//         >
//           Logout
//         </button>
//       </nav>

//       {/* Main Content */}
//       <main className="flex-1 p-8 bg-gray-100 relative">
//         {isMainDashboard && (
//           <>
//             {/* Dashboard Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//               {/* User Data Card */}
//               <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//                 <div className="flex items-center gap-4 mb-4">
//                   <div className="bg-blue-100 p-4 rounded-full">
//                     <Users className="w-8 h-8 text-blue-600" />
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-bold text-gray-800">{joinRequests.length}</h3>
//                     <p className="text-gray-600">Total Users</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => {
//                     setShowUserList(!showUserList);
//                     setShowEventRegistrations(false);
//                   }}
//                   className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
//                 >
//                   View User Data
//                 </button>
//               </div>

//               {/* Event Registrations Card */}
//               <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//                 <div className="flex items-center gap-4 mb-4">
//                   <div className="bg-green-100 p-4 rounded-full">
//                     <Calendar className="w-8 h-8 text-green-600" />
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-bold text-gray-800">{eventRegistrations.length}</h3>
//                     <p className="text-gray-600">Event Registrations</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => {
//                     setShowEventRegistrations(!showEventRegistrations);
//                     setShowUserList(false);
//                   }}
//                   className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
//                 >
//                   View Registrations
//                 </button>
//               </div>
//             </div>

//             {/* User List */}
//             {showUserList && (
//               <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//                 <h3 className="text-xl font-bold mb-4">User List</h3>
//                 <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//                   {joinRequests.map((request) => (
//                     <div
//                       key={request.id}
//                       onClick={() => handleRequestClick(request)}
//                       className="bg-white rounded-lg shadow-lg p-4 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
//                       style={{
//                         perspective: '1000px',
//                         transform: 'translateZ(0)',
//                       }}
//                     >
//                       <h4 className="font-bold text-lg mb-2">{request.full_name}</h4>
//                       <p className="text-gray-600 text-sm mb-1">{request.email}</p>
//                       <p className="text-gray-500 text-sm">{request.college_name}</p>
//                       <div className="mt-2 flex flex-wrap gap-1">
//                         {request.skills.slice(0, 3).map((skill, index) => (
//                           <span
//                             key={index}
//                             className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                         {request.skills.length > 3 && (
//                           <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
//                             +{request.skills.length - 3}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Event Registrations List */}
//             {showEventRegistrations && (
//               <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//                 <h3 className="text-xl font-bold mb-4">Event Registrations</h3>
//                 <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//                   {eventRegistrations.map((registration) => (
//                     <div
//                       key={registration.id}
//                       onClick={() => handleRegistrationClick(registration)}
//                       className={`bg-white rounded-lg shadow-lg p-4 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-l-4 ${
//                         registration.status === 'accepted' ? 'border-green-500' : 
//                         registration.status === 'rejected' ? 'border-red-500' : 'border-yellow-500'
//                       }`}
//                       style={{
//                         perspective: '1000px',
//                         transform: 'translateZ(0)',
//                       }}
//                     >
//                       <div className="flex justify-between items-start">
//                         <h4 className="font-bold text-lg mb-2">{registration.team_name}</h4>
//                         <span className={`text-xs px-2 py-1 rounded ${
//                           registration.status === 'accepted' ? 'bg-green-100 text-green-800' : 
//                           registration.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
//                         }`}>
//                           {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
//                         </span>
//                       </div>
//                       <p className="text-gray-600 text-sm mb-1">Leader: {registration.team_leader_name}</p>
//                       <p className="text-gray-500 text-sm">Project: {registration.project_name}</p>
//                       <p className="text-gray-500 text-sm">Category: {registration.category}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Notification Bell */}
//             <div className="absolute top-4 right-4">
//               <button
//                 className="relative p-2 hover:bg-gray-200 rounded-full"
//                 onClick={() => setShowNotifications(!showNotifications)}
//               >
//                 <Bell className="w-6 h-6" />
//                 {totalNotifications > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                     {totalNotifications}
//                   </span>
//                 )}
//               </button>
//             </div>

//             {/* Notifications Panel */}
//             {showNotifications && (
//               <div className="absolute top-16 right-4 w-96 max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-200 z-40">
//                 <div className="p-4 border-b border-gray-200">
//                   <h3 className="text-lg font-semibold">Notifications</h3>
//                 </div>
                
//                 {/* Join Requests Section */}
//                 {joinRequests.length > 0 && (
//                   <div>
//                     <div className="p-2 bg-gray-50 border-b border-gray-200">
//                       <h4 className="font-medium text-sm text-gray-700">Join Requests</h4>
//                     </div>
//                     <div className="divide-y divide-gray-200">
//                       {joinRequests.map((request) => (
//                         <div
//                           key={request.id}
//                           className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
//                             !request.read ? 'bg-blue-50' : ''
//                           }`}
//                           onClick={() => handleRequestClick(request)}
//                         >
//                           <div className="flex justify-between items-start">
//                             <div>
//                               <h4 className="font-medium">{request.full_name}</h4>
//                               <p className="text-sm text-gray-600">{request.email}</p>
//                               <p className="text-xs text-gray-500 mt-1">
//                                 {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
//                               </p>
//                             </div>
//                             {!request.read && (
//                               <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Event Registrations Section */}
//                 {eventRegistrations.length > 0 && (
//                   <div>
//                     <div className="p-2 bg-gray-50 border-b border-gray-200">
//                       <h4 className="font-medium text-sm text-gray-700">Event Registrations</h4>
//                     </div>
//                     <div className="divide-y divide-gray-200">
//                       {eventRegistrations.map((registration) => (
//                         <div
//                           key={registration.id}
//                           className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
//                             !registration.read ? 'bg-blue-50' : ''
//                           }`}
//                           onClick={() => handleRegistrationClick(registration)}
//                         >
//                           <div className="flex justify-between items-start">
//                             <div>
//                               <h4 className="font-medium">{registration.team_name}</h4>
//                               <p className="text-sm text-gray-600">{registration.project_name}</p>
//                               <div className="flex items-center mt-1">
//                                 <span className={`text-xs px-2 py-0.5 rounded mr-2 ${
//                                   registration.status === 'accepted' ? 'bg-green-100 text-green-800' : 
//                                   registration.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
//                                 }`}>
//                                   {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
//                                 </span>
//                                 <p className="text-xs text-gray-500">
//                                   {formatDistanceToNow(new Date(registration.created_at || Date.now()), { addSuffix: true })}
//                                 </p>
//                               </div>
//                             </div>
//                             {!registration.read && (
//                               <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </>
//         )}

//         {/* Selected Join Request Details */}
//         {selectedRequest && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 hover:scale-[1.02]">
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-4">
//                   <h2 className="text-2xl font-bold">{selectedRequest.full_name}</h2>
//                   <button
//                     onClick={() => setSelectedRequest(null)}
//                     className="p-1 hover:bg-gray-100 rounded-full"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <h3 className="font-semibold text-gray-700">Contact Information</h3>
//                       <p className="text-sm">Email: {selectedRequest.email}</p>
//                       <p className="text-sm">Phone: {selectedRequest.phone || 'Not provided'}</p>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-700">Education</h3>
//                       <p className="text-sm">College: {selectedRequest.college_name}</p>
//                       <p className="text-sm">Course: {selectedRequest.course_stream}</p>
//                       <p className="text-sm">Year: {selectedRequest.year_of_study}</p>
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="font-semibold text-gray-700">Skills</h3>
//                     <div className="flex flex-wrap gap-2 mt-1">
//                       {selectedRequest.skills.map((skill, index) => (
//                         <span
//                           key={index}
//                           className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
//                         >
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="font-semibold text-gray-700">Interests</h3>
//                     <div className="flex flex-wrap gap-2 mt-1">
//                       {selectedRequest.interests.map((interest, index) => (
//                         <span
//                           key={index}
//                           className="px-2 py-1 bg-purple-100 text-purple-800 text-sm rounded"
//                         >
//                           {interest}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="font-semibold text-gray-700">Motivation</h3>
//                     <p className="text-sm mt-1">{selectedRequest.motivation}</p>
//                   </div>

//                   <div>
//                     <h3 className="font-semibold text-gray-700">Portfolio Links</h3>
//                     <div className="space-y-2 mt-1">
//                       {selectedRequest.github_url && (
//                         <a
//                           href={selectedRequest.github_url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center text-sm text-blue-600 hover:underline"
//                         >
//                           GitHub <ExternalLink className="w-4 h-4 ml-1" />
//                         </a>
//                       )}
//                       {selectedRequest.linkedin_url && (
//                         <a
//                           href={selectedRequest.linkedin_url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center text-sm text-blue-600 hover:underline"
//                         >
//                           LinkedIn <ExternalLink className="w-4 h-4 ml-1" />
//                         </a>
//                       )}
//                       {selectedRequest.website_url && (
//                         <a
//                           href={selectedRequest.website_url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center text-sm text-blue-600 hover:underline"
//                         >
//                           Portfolio <ExternalLink className="w-4 h-4 ml-1" />
//                         </a>
//                       )}
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <h3 className="font-semibold text-gray-700">Availability</h3>
//                       <div className="flex flex-wrap gap-2 mt-1">
//                         {selectedRequest.availability.map((time, index) => (
//                           <span
//                             key={index}
//                             className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded"
//                           >
//                             {time}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-700">Team Preferences</h3>
//                       <div className="flex flex-wrap gap-2 mt-1">
//                         {selectedRequest.team_preferences.map((pref, index) => (
//                           <span
//                             key={index}
//                             className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded"
//                           >
//                             {pref}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Selected Event Registration Details */}
//         {selectedRegistration && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 hover:scale-[1.02]">
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h2 className="text-2xl font-bold">{selectedRegistration.team_name}</h2>
//                     <div className="flex items-center mt-1">
//                       <span className={`text-xs px-2 py-0.5 rounded ${
//                         selectedRegistration.status === 'accepted' ? 'bg-green-100 text-green-800' : 
//                         selectedRegistration.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
//                       }`}>
//                         {selectedRegistration.status.charAt(0).toUpperCase() + selectedRegistration.status.slice(1)}
//                       </span>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setSelectedRegistration(null)}
//                     className="p-1 hover:bg-gray-100 rounded-full"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <h3 className="font-semibold text-gray-700">Team Leader</h3>
//                       <p className="text-sm">Name: {selectedRegistration.team_leader_name}</p>
//                       <p className="text-sm">Email: {selectedRegistration.team_leader_email}</p>
//                       <p className="text-sm">Phone: {selectedRegistration.team_leader_phone}</p>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-700">Project Details</h3>
//                       <p className="text-sm">Name: {selectedRegistration.project_name}</p>
//                       <p className="text-sm">Category: {selectedRegistration.category}</p>
//                     </div>
//                   </div>

                 
//                   <div>
//                      <h3 className="font-semibold text-gray-700">Team Members</h3>
//                        <ul className="text-sm mt-1 space-y-1">
//                             {selectedRegistration.members.map((member: { name: string; role: string; email: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
//                                 <li key={index} className="border-b py-1">
//                                  <span className="font-medium">{member.name.trim()}</span> - {member.role.trim()} 
//                                  (<a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
//                                     {member.email}
//                                   </a>)
//                                 </li>
//                             ))}
//                         </ul>
//                   </div>


//                   <div>
//                     <h3 className="font-semibold text-gray-700">Project Description</h3>
//                     <p className="text-sm mt-1">{selectedRegistration.project_description}</p>
//                   </div>

//                   <div>
//                     <h3 className="font-semibold text-gray-700">Links</h3>
//                     <div className="space-y-2 mt-1">
//                       {selectedRegistration.github && (
//                         <a
//                           href={selectedRegistration.github}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center text-sm text-blue-600 hover:underline"
//                         >
//                           GitHub <ExternalLink className="w-4 h-4 ml-1" />
//                         </a>
//                       )}
//                       {selectedRegistration.linkedin && (
//                         <a
//                           href={selectedRegistration.linkedin}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center text-sm text-blue-600 hover:underline"
//                         >
//                           LinkedIn <ExternalLink className="w-4 h-4 ml-1" />
//                         </a>
//                       )}
//                       {selectedRegistration.project_proposal && (
//                         <a
//                         href={`http://localhost:5000${selectedRegistration.project_proposal}`}
//                           target="_blank"
//                            rel="noopener noreferrer"
//                           className="flex items-center text-sm text-blue-600 hover:underline"
//                         >
//                           Project Proposal <ExternalLink className="w-4 h-4 ml-1" />
//                         </a>
//                       )}
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex justify-end space-x-3 mt-6">
//                     {selectedRegistration.status === 'pending' && (
//                       <>
//                         <button
//                           onClick={() => handleRejectRegistration(selectedRegistration.id)}
//                           className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
//                         >
//                           <XIcon className="w-4 h-4 mr-2" />
//                           Reject
//                         </button>
//                         <button
//                           onClick={() => handleAcceptRegistration(selectedRegistration.id)}
//                           className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
//                         >
//                           <Check className="w-4 h-4 mr-2" />
//                           Accept
//                         </button>
//                       </>
//                     )}
//                     {selectedRegistration.status === 'rejected' && (
//                       <button
//                         onClick={() => handleAcceptRegistration(selectedRegistration.id)}
//                         className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
//                       >
//                         <Check className="w-4 h-4 mr-2" />
//                         Move to Accepted
//                       </button>
//                     )}
//                     {selectedRegistration.status === 'accepted' && (
//                       <button
//                         onClick={() => handleRejectRegistration(selectedRegistration.id)}
//                         className="flex items-center px-4 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
//                       >
//                         <XIcon className="w-4 h-4 mr-2" />
//                         Move to Waiting List
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;