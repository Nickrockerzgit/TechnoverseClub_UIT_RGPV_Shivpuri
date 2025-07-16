
// import { useState, useRef, useEffect } from "react";
// import { Link as ScrollLink } from "react-scroll";
// import { useNavigate } from "react-router-dom";
// import { Menu, X, LogOut, User, Sparkles, FileText, FileEdit, BadgeCheck ,ChevronDown} from "lucide-react";
// import { useAuth } from "../components/AuthContext";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showAIToolsDropdown, setShowAIToolsDropdown] = useState(false);
//   const { user, isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const aiDropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setShowDropdown(false);
//       }
//       if (aiDropdownRef.current && !aiDropdownRef.current.contains(event.target as Node)) {
//         setShowAIToolsDropdown(false);
//       }
//     };
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         setShowDropdown(false);
//         setShowAIToolsDropdown(false);
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleEscape);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

//   const handleLogout = () => {
//     logout();
//     setShowDropdown(false);
//     navigate("/");
//   };

//   const handleDashboard = () => {
//     setShowDropdown(false);
//     navigate("/dashboard");
//   };

//   const getInitial = () => {
//     if (!user) return "U";
//     return user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase();
//   };

//   const menuItems = [
//     { name: "Home", to: "home" },
//     { name: "About", to: "about" },
//     { name: "Events", to: "events" },
//     { name: "Vlogs", to: "vlogs" },
//     { name: "Courses", to: "courses" },
//   ];

//   return (
//     <nav className="fixed w-full bg-black/20 backdrop-blur-md z-50">
//       <div className="flex justify-between items-center px-6 py-3">
//         {/* Logo */}
//         <div className="flex items-center rounded-md bg-white p-1">
//           <img src="/Logo.png" alt="Technovers Logo" className="h-8 w-auto max-w-[7.25rem]" />
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center space-x-6">
//           {menuItems.map((item) => (
//             <ScrollLink
//               key={item.name}
//               to={item.to}
//               smooth={true}
//               duration={500}
//               className="text-gray-300 hover:text-white text-sm font-medium cursor-pointer hover:scale-105 transition-all"
//             >
//               {item.name}
//             </ScrollLink>
//           ))}

//           {isAuthenticated && (
//             <div className="relative" ref={aiDropdownRef}>
//               <button
//                 onClick={() => setShowAIToolsDropdown((prev) => !prev)}
//                 className="flex items-center space-x-1 bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition"
//               >
//                 <Sparkles className="h-4 w-4" />
//                 <span>AI Tools</span>
//                 <ChevronDown className="h-4 w-4 mr-2" />
//               </button>

//               {showAIToolsDropdown && (
//                 <div className="absolute right-0 mt-2 w-56 bg-black text-white rounded-md shadow-lg py-2 z-50">
//                   <button
//                     onClick={() => navigate("/resume-builder")}
//                     className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-800 transition"
//                   >
//                     <FileText className="h-4 w-4 mr-2" />
//                     Build Resume
//                   </button>
//                   <button
//                     onClick={() => navigate("/cover-letter")}
//                     className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-800 transition"
//                   >
//                     <FileEdit className="h-4 w-4 mr-2" />
//                     Cover Letter
//                   </button>
//                   <button
//                     onClick={() => navigate("/interview-prep")}
//                     className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-800 transition"
//                   >
//                     <BadgeCheck className="h-4 w-4 mr-2" />
//                     Interview Prep
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {isAuthenticated ? (
//             <AuthButtons
//               showDropdown={showDropdown}
//               setShowDropdown={setShowDropdown}
//               handleDashboard={handleDashboard}
//               handleLogout={handleLogout}
//               getInitial={getInitial}
//               dropdownRef={dropdownRef}
//             />
//           ) : (
//             <button
//               onClick={() => navigate("/auth")}
//               className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition"
//             >
//               Login
//             </button>
//           )}
//         </div>

//         {/* Mobile Menu */}
//         <div className="md:hidden">
//           <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
//             {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Dropdown (optional simplified version) */}
//       {isOpen && (
//         <div className="flex flex-col px-6 pb-4 space-y-3 bg-black/80 backdrop-blur-md md:hidden">
//           {menuItems.map((item) => (
//             <ScrollLink
//               key={item.name}
//               to={item.to}
//               smooth={true}
//               duration={500}
//               onClick={() => setIsOpen(false)}
//               className="text-gray-300 hover:text-white text-base font-medium cursor-pointer"
//             >
//               {item.name}
//             </ScrollLink>
//           ))}

//           {isAuthenticated && (
//             <>
//               <button
//                 onClick={() => {
//                   navigate("/resume-builder");
//                   setIsOpen(false);
//                 }}
//                 className="flex items-center w-full px-2 py-2 text-sm text-white hover:bg-white/10 rounded"
//               >
//                 <FileText className="h-4 w-4 mr-2" />
//                 Build Resume
//               </button>
//               <button
//                 onClick={() => {
//                   navigate("/cover-letter");
//                   setIsOpen(false);
//                 }}
//                 className="flex items-center w-full px-2 py-2 text-sm text-white hover:bg-white/10 rounded"
//               >
//                 <FileEdit className="h-4 w-4 mr-2" />
//                 Cover Letter
//               </button>
//               <button
//                 onClick={() => {
//                   navigate("/interview-prep");
//                   setIsOpen(false);
//                 }}
//                 className="flex items-center w-full px-2 py-2 text-sm text-white hover:bg-white/10 rounded"
//               >
//                 <BadgeCheck className="h-4 w-4 mr-2" />
//                 Interview Prep
//               </button>
//             </>
//           )}

//           {isAuthenticated ? (
//             <div className="mt-4">
//               <button
//                 onClick={() => {
//                   handleDashboard();
//                   setIsOpen(false);
//                 }}
//                 className="flex items-center w-full px-2 py-2 text-sm text-white hover:bg-white/10 rounded"
//               >
//                 <User className="h-4 w-4 mr-2" />
//                 Dashboard
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center w-full px-2 py-2 text-sm text-red-400 hover:bg-white/10 rounded"
//               >
//                 <LogOut className="h-4 w-4 mr-2" />
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <button
//               onClick={() => {
//                 navigate("/auth");
//                 setIsOpen(false);
//               }}
//               className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition mt-3"
//             >
//               Login
//             </button>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// // ----------------------------

// interface AuthButtonsProps {
//   showDropdown: boolean;
//   setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
//   handleDashboard: () => void;
//   handleLogout: () => void;
//   getInitial: () => string;
//   dropdownRef: React.RefObject<HTMLDivElement>;
// }

// const AuthButtons = ({
//   showDropdown,
//   setShowDropdown,
//   handleDashboard,
//   handleLogout,
//   getInitial,
//   dropdownRef,
// }: AuthButtonsProps) => {
//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={() => setShowDropdown(!showDropdown)}
//         className="flex items-center justify-center w-9 h-9 rounded-full bg-purple-600 text-white text-lg font-bold hover:bg-purple-700 transition-transform transform hover:scale-105"
//       >
//         {getInitial()}
//       </button>

//       {showDropdown && (
//         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
//           <button
//             onClick={handleDashboard}
//             className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             <User className="h-4 w-4 mr-2" />
//             Dashboard
//           </button>
//           <button
//             onClick={handleLogout}
//             className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//           >
//             <LogOut className="h-4 w-4 mr-2" />
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };




















import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link as ScrollLink, scroller } from "react-scroll";
import {
  Menu,
  X,
  LogOut,
  User,
  Sparkles,
  FileText,
  FileEdit,
  BadgeCheck,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../components/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAIToolsDropdown, setShowAIToolsDropdown] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const aiDropdownRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Events", to: "events" },
    { name: "Vlogs", to: "vlogs" },
    { name: "Courses", to: "courses" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (aiDropdownRef.current && !aiDropdownRef.current.contains(event.target as Node)) {
        setShowAIToolsDropdown(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowDropdown(false);
        setShowAIToolsDropdown(false);
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/");
  };

  const handleDashboard = () => {
    setShowDropdown(false);
    navigate("/dashboard");
  };

  const getInitial = () => {
    if (!user) return "U";
    return user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase();
  };

  const handleScrollOrNavigate = (target: string) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        scroller.scrollTo(target, {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
          offset: -70, // adjust based on navbar height
        });
      }, 300); // slight delay to wait for homepage to render
    } else {
      scroller.scrollTo(target, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -70,
      });
    }
  };

  return (
    <nav className="fixed w-full bg-black/20 backdrop-blur-md z-50">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="flex items-center rounded-md bg-white p-1 cursor-pointer" onClick={() => navigate("/")}>
          <img src="/Logo.png" alt="Technovers Logo" className="h-8 w-auto max-w-[7.25rem]" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleScrollOrNavigate(item.to)}
              className="text-gray-300 hover:text-white text-sm font-medium cursor-pointer hover:scale-105 transition-all bg-transparent"
            >
              {item.name}
            </button>
          ))}

          {isAuthenticated && (
            <div className="relative" ref={aiDropdownRef}>
              <button
                onClick={() => setShowAIToolsDropdown((prev) => !prev)}
                className="flex items-center space-x-1 bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition"
              >
                <Sparkles className="h-4 w-4" />
                <span>AI Tools</span>
                <ChevronDown className="h-4 w-4 mr-2" />
              </button>

              {showAIToolsDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-black text-white rounded-md shadow-lg py-2 z-50">
                  <button
                    onClick={() => navigate("/resume-builder")}
                    className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-800 transition"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Build Resume
                  </button>
                  <button
                    onClick={() => navigate("/cover-letter")}
                    className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-800 transition"
                  >
                    <FileEdit className="h-4 w-4 mr-2" />
                    Cover Letter
                  </button>
                  <button
                    onClick={() => navigate("/interview-prep")}
                    className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-800 transition"
                  >
                    <BadgeCheck className="h-4 w-4 mr-2" />
                    Interview Prep
                  </button>
                </div>
              )}
            </div>
          )}

          {isAuthenticated ? (
            <AuthButtons
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
              handleDashboard={handleDashboard}
              handleLogout={handleLogout}
              getInitial={getInitial}
              dropdownRef={dropdownRef}
            />
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="flex flex-col px-6 pb-4 space-y-3 bg-black/80 backdrop-blur-md md:hidden">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                handleScrollOrNavigate(item.to);
                setIsOpen(false);
              }}
              className="text-gray-300 hover:text-white text-base font-medium cursor-pointer"
            >
              {item.name}
            </button>
          ))}
          {/* ...other mobile buttons (same as above, omitted for brevity)... */}
          {isAuthenticated && (
            <>
              <button
                onClick={() => {
                  navigate("/resume-builder");
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-2 py-2 text-sm text-white hover:bg-white/10 rounded"
              >
                <FileText className="h-4 w-4 mr-2" />
                Build Resume
              </button>
              <button
                onClick={() => {
                  navigate("/cover-letter");
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-2 py-2 text-sm text-white hover:bg-white/10 rounded"
              >
                <FileEdit className="h-4 w-4 mr-2" />
                Cover Letter
              </button>
              <button
                onClick={() => {
                  navigate("/interview-prep");
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-2 py-2 text-sm text-white hover:bg-white/10 rounded"
              >
                <BadgeCheck className="h-4 w-4 mr-2" />
                Interview Prep
              </button>
            </>
          )}
{isAuthenticated ? (
            <div className="mt-4">
              <button
                onClick={() => {
                  handleDashboard();
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-2 py-2 text-sm text-white hover:bg-white/10 rounded"
              >
                <User className="h-4 w-4 mr-2" />
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-2 py-2 text-sm text-red-400 hover:bg-white/10 rounded"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                navigate("/auth");
                setIsOpen(false);
              }}
              className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition mt-3"
            >
              Login
            </button>
          )}
       
        </div>
      )}
    </nav>
  );
};

export default Navbar;


interface AuthButtonsProps {
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  handleDashboard: () => void;
  handleLogout: () => void;
  getInitial: () => string;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const AuthButtons = ({
  showDropdown,
  setShowDropdown,
  handleDashboard,
  handleLogout,
  getInitial,
  dropdownRef,
}: AuthButtonsProps) => {
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-purple-600 text-white text-lg font-bold hover:bg-purple-700 transition-transform transform hover:scale-105"
      >
        {getInitial()}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <button
            onClick={handleDashboard}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <User className="h-4 w-4 mr-2" />
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
