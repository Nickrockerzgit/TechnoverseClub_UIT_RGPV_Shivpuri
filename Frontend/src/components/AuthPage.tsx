
// import { useState, useEffect, useRef, SetStateAction } from "react";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import * as THREE from "three";
// import NET from "vanta/dist/vanta.net.min";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { Eye, EyeOff } from "lucide-react";
// import { useAuth } from "./AuthContext";

// const AuthPage = () => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [isForgotPassword, setIsForgotPassword] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
//   const [emailForReset, setEmailForReset] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const vantaRef = useRef(null);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   useEffect(() => {
//     vantaRef.current = NET({
//       el: "#vanta-bg",
//       THREE,
//       color: 0x6610f2,
//       backgroundColor: 0x141414,
//       points: 12,
//       maxDistance: 20,
//       spacing: 15,
//     });

//     return () => {
//       if (vantaRef.current) vantaRef.current.destroy();
//     };
//   }, []);

//   const toggleForm = () => setIsSignUp((prev) => !prev);
//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const handleChange = (e: { target: { name: any; value: any; }; }) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     try {
//       const url = isSignUp ? "http://localhost:5001/api/auth/signup" : "http://localhost:5001/api/auth/signin";
//       const { data } = await axios.post(url, formData);

//       toast.success(isSignUp ? "User successfully signed up! 🎉" : data.message);
      
//       // Update auth context with user data
//       login({
//         name: formData.name || formData.email.split('@')[0], // Use email username if name not provided
//         email: formData.email
//       });
      
//       setFormData({ name: "", email: "", phone: "", password: "" });
      
//       setTimeout(() => {
//         navigate("/joinus");
//       }, 1000);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong!");
//     }
//   };

//   const handleForgotPassword = async (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("http://localhost:5001/api/auth/forgot-password", { email: emailForReset, newPassword });
//       toast.success(data.message);
//       setEmailForReset("");
//       setNewPassword("");
//       setIsForgotPassword(false);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong!");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center relative">
//       <div id="vanta-bg" className="absolute inset-0 z-0"></div>

//       {isForgotPassword ? (
//         <motion.div
//           className="w-[90%] max-w-sm bg-white p-6 rounded-xl shadow-2xl z-10 relative"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>

//           <form onSubmit={handleForgotPassword}>
//             <FloatingInput
//               label="Email"
//               type="email"
//               id="reset-email"
//               name="email"
//               value={emailForReset}
//               onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmailForReset(e.target.value)}
//               placeholder="Enter your email"
//             />
//             <FloatingInput
//               label="New Password"
//               type="password"
//               id="new-password"
//               name="newPassword"
//               value={newPassword}
//               onChange={(e: { target: { value: SetStateAction<string>; }; }) => setNewPassword(e.target.value)}
//               placeholder="Enter your new password"
//             />

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold transition duration-300 hover:bg-purple-700 focus:ring-4 focus:ring-purple-500 shadow-md mt-3"
//             >
//               Reset Password
//             </motion.button>
//           </form>

//           <div className="text-center mt-3">
//             <p className="text-xs text-gray-500">
//               Remembered your password? {" "}
//               <Link to="#" onClick={() => setIsForgotPassword(false)} className="text-purple-600 hover:text-purple-800 transition duration-200">
//                 Sign In
//               </Link>
//             </p>
//           </div>
//         </motion.div>
//       ) : (
//         <motion.div
//           className="w-[90%] max-w-sm bg-white p-6 rounded-xl shadow-2xl z-10 relative"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="text-2xl font-bold text-center mb-4">{isSignUp ? "Sign Up" : "Sign In"}</h2>

//           <form onSubmit={handleSubmit}>
//             {isSignUp && (
//               <>
//                 <FloatingInput label="Full Name" type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" />
//                 <FloatingInput label="Phone Number" type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" />
//               </>
//             )}
//             <FloatingInput label="Email" type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
//             <PasswordInput id="password" name="password" value={formData.password} onChange={handleChange} showPassword={showPassword} toggleVisibility={togglePasswordVisibility} />

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold transition duration-300 hover:bg-purple-700 focus:ring-4 focus:ring-purple-500 shadow-md mt-3"
//             >
//               {isSignUp ? "Sign Up" : "Sign In"}
//             </motion.button>
//           </form>

//           <div className="text-center mt-3">
//             <p className="text-xs text-gray-500">
//               {isSignUp ? "Already have an account?" : "Don't have an account?"} {" "}
//               <Link to="#" onClick={toggleForm} className="text-purple-600 hover:text-purple-800 transition duration-200">
//                 {isSignUp ? "Sign In" : "Sign Up"}
//               </Link>
//             </p>
//             {!isSignUp && (
//               <p className="text-xs text-gray-500 mt-1">
//                 Forgot your password? {" "}
//                 <Link to="#" onClick={() => setIsForgotPassword(true)} className="text-purple-600 hover:text-purple-800 transition duration-200">
//                   Reset Password
//                 </Link>
//               </p>
//             )}
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// interface FloatingInputProps {
//   label: string;
//   type: string;
//   id: string;
//   name: string;
//   value: string;
//   onChange: (e: any) => void;
//   placeholder: string;
// }

// const FloatingInput = ({ label, type, id, name, value, onChange, placeholder }: FloatingInputProps) => (
//   <div className="mb-3">
//     <label htmlFor={id} className="block text-gray-700 font-medium">{label}</label>
//     <input type={type} id={id} name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
//   </div>
// );

// interface PasswordInputProps {
//   id: string;
//   name: string;
//   value: string;
//   onChange: (e: any) => void;
//   showPassword: boolean;
//   toggleVisibility: () => void;
// }

// const PasswordInput = ({ id, name, value, onChange, showPassword, toggleVisibility }: PasswordInputProps) => (
//   <div className="mb-3 relative">
//     <label htmlFor={id} className="block text-gray-700 font-medium">Password</label>
//     <div className="relative">
//       <input
//         type={showPassword ? "text" : "password"}
//         id={id}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder="Enter your password"
//         className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all pr-10"
//       />
//       <button
//         type="button"
//         onClick={toggleVisibility}
//         className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
//       >
//         {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//       </button>
//     </div>
//   </div>
// );

// export default AuthPage;











// // Updated AuthPage.jsx based on OTP + JWT backend logic

// import { useState, useEffect, useRef, SetStateAction } from "react";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import * as THREE from "three";
// import NET from "vanta/dist/vanta.net.min";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { Eye, EyeOff } from "lucide-react";
// import { useAuth } from "./AuthContext";

// const AuthPage = () => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [step, setStep] = useState<"form" | "otp">("form");
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
//   const [otp, setOtp] = useState("");
//   const [timer, setTimer] = useState(30);
//   const vantaRef = useRef(null);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   useEffect(() => {
//     vantaRef.current = NET({
//       el: "#vanta-bg",
//       THREE,
//       color: 0x6610f2,
//       backgroundColor: 0x141414,
//       points: 12,
//       maxDistance: 20,
//       spacing: 15,
//     });
//     return () => {
//       if (vantaRef.current) vantaRef.current.destroy();
//     };
//   }, []);

//   useEffect(() => {
//     if (step === "otp" && timer > 0) {
//       const interval = setInterval(() => setTimer((t) => t - 1), 1000);
//       return () => clearInterval(interval);
//     }
//   }, [step, timer]);

//   const toggleForm = () => setIsSignUp((prev) => !prev);
//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const handleChange = (e: { target: { name: any; value: any; }; }) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     try {
//       const url = isSignUp
//         ? "http://localhost:5001/api/auth/signup/send-otp"
//         : "http://localhost:5001/api/auth/login/send-otp";
//       await axios.post(url, formData);
//       toast.success("OTP sent to your email");
//       setStep("otp");
//       setTimer(30);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   const handleVerifyOtp = async (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     try {
//       const url = isSignUp
//         ? "http://localhost:5001/api/auth/signup/verify-otp"
//         : "http://localhost:5001/api/auth/login/verify-otp";
//       const { data } = await axios.post(url, { ...formData, otp });
//       toast.success(data.message);

//         // ✅ Store the JWT token in localStorage
//     localStorage.setItem("token", data.token);

//       login({
//         name: formData.name || formData.email.split("@")[0],
//         email: formData.email,
//       });

//       setFormData({ name: "", email: "", phone: "", password: "" });
//       setOtp("");
//       navigate("/joinus");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Invalid or expired OTP");
//     }
//   };

//   const handleResendOtp = async () => {
//     try {
//       const url = isSignUp
//         ? "http://localhost:5001/api/auth/signup/send-otp"
//         : "http://localhost:5001/api/auth/login/send-otp";
//       await axios.post(url, formData);
//       toast.success("OTP resent to your email");
//       setTimer(30);
//     } catch (err) {
//       toast.error("Failed to resend OTP");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center relative">
//       <div id="vanta-bg" className="absolute inset-0 z-0"></div>
//       <motion.div
//         className="w-[90%] max-w-sm bg-white p-6 rounded-xl shadow-2xl z-10 relative"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 className="text-2xl font-bold text-center mb-4">
//           {step === "form" ? (isSignUp ? "Sign Up" : "Sign In") : "Enter OTP"}
//         </h2>

//         {step === "form" ? (
//           <form onSubmit={handleSubmit}>
//             {isSignUp && (
//               <>
//                 <FloatingInput label="Full Name" type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" />
//                 <FloatingInput label="Phone Number" type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" />
//               </>
//             )}
//             <FloatingInput label="Email" type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
//             {isSignUp && (
//               <PasswordInput id="password" name="password" value={formData.password} onChange={handleChange} showPassword={showPassword} toggleVisibility={togglePasswordVisibility} />
//             )}

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold mt-3"
//             >
//               {isSignUp ? "Send OTP to Sign Up" : "Send OTP to Sign In"}
//             </motion.button>
//           </form>
//         ) : (
//           <form onSubmit={handleVerifyOtp}>
//             <FloatingInput label="OTP" type="text" id="otp" name="otp" value={otp} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setOtp(e.target.value)} placeholder="Enter OTP" />

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold mt-3"
//             >
//               Verify OTP
//             </motion.button>

//             {timer > 0 ? (
//               <p className="text-center text-sm mt-3 text-gray-600">Resend OTP in {timer}s</p>
//             ) : (
//               <button
//                 type="button"
//                 onClick={handleResendOtp}
//                 className="text-sm text-blue-600 hover:underline mt-3 block mx-auto"
//               >
//                 Resend OTP
//               </button>
//             )}
//           </form>
//         )}

//         <div className="text-center mt-3">
//           <p className="text-xs text-gray-500">
//             {isSignUp ? "Already have an account?" : "Don't have an account?"} {" "}
//             <Link to="#" onClick={() => { setIsSignUp(!isSignUp); setStep("form"); }} className="text-purple-600 hover:text-purple-800">
//               {isSignUp ? "Sign In" : "Sign Up"}
//             </Link>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// const FloatingInput = ({ label, type, id, name, value, onChange, placeholder }) => (
//   <div className="mb-3">
//     <label htmlFor={id} className="block text-gray-700 font-medium">{label}</label>
//     <input type={type} id={id} name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
//   </div>
// );

// const PasswordInput = ({ id, name, value, onChange, showPassword, toggleVisibility }) => (
//   <div className="mb-3 relative">
//     <label htmlFor={id} className="block text-gray-700 font-medium">Password</label>
//     <div className="relative">
//       <input
//         type={showPassword ? "text" : "password"}
//         id={id}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder="Enter your password"
//         className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
//       />
//       <button
//         type="button"
//         onClick={toggleVisibility}
//         className="absolute inset-y-0 right-3 flex items-center text-gray-500"
//       >
//         {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//       </button>
//     </div>
//   </div>
// );

// export default AuthPage;
























import { useState, useEffect, useRef, SetStateAction } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "./AuthContext";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState<"form" | "otp">("form");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const vantaRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    vantaRef.current = NET({
      el: "#vanta-bg",
      THREE,
      color: 0x6610f2,
      backgroundColor: 0x141414,
      points: 12,
      maxDistance: 20,
      spacing: 15,
    });
    return () => {
      if (vantaRef.current) vantaRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (step === "otp" && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const toggleForm = () => setIsSignUp((prev) => !prev);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const url = isSignUp
        ? "http://localhost:5001/api/auth/signup/send-otp"
        : "http://localhost:5001/api/auth/login/send-otp";
      await axios.post(url, formData);
      toast.success("OTP sent to your email");
      setStep("otp");
      setTimer(30);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleVerifyOtp = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const url = isSignUp
        ? "http://localhost:5001/api/auth/signup/verify-otp"
        : "http://localhost:5001/api/auth/login/verify-otp";
      const { data } = await axios.post(url, { ...formData, otp });
      toast.success(data.message);

      // ✅ Pass both user data AND token to the login function
      login(
        {
          name: formData.name || formData.email.split("@")[0],
          email: formData.email,
        },
        data.token // Pass the token as second parameter
      );

      setFormData({ name: "", email: "", phone: "", password: "" });
      setOtp("");
      navigate("/joinus");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired OTP");
    }
  };

  const handleResendOtp = async () => {
    try {
      const url = isSignUp
        ? "http://localhost:5001/api/auth/signup/send-otp"
        : "http://localhost:5001/api/auth/login/send-otp";
      await axios.post(url, formData);
      toast.success("OTP resent to your email");
      setTimer(30);
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div id="vanta-bg" className="absolute inset-0 z-0"></div>
      <motion.div
        className="w-[90%] max-w-sm bg-white p-6 rounded-xl shadow-2xl z-10 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          {step === "form" ? (isSignUp ? "Sign Up" : "Sign In") : "Enter OTP"}
        </h2>

        {step === "form" ? (
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <FloatingInput label="Full Name" type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" />
                <FloatingInput label="Phone Number" type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" />
              </>
            )}
            <FloatingInput label="Email" type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
            {isSignUp && (
              <PasswordInput id="password" name="password" value={formData.password} onChange={handleChange} showPassword={showPassword} toggleVisibility={togglePasswordVisibility} />
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold mt-3"
            >
              {isSignUp ? "Send OTP to Sign Up" : "Send OTP to Sign In"}
            </motion.button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <FloatingInput label="OTP" type="text" id="otp" name="otp" value={otp} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setOtp(e.target.value)} placeholder="Enter OTP" />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold mt-3"
            >
              Verify OTP
            </motion.button>

            {timer > 0 ? (
              <p className="text-center text-sm mt-3 text-gray-600">Resend OTP in {timer}s</p>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-sm text-blue-600 hover:underline mt-3 block mx-auto"
              >
                Resend OTP
              </button>
            )}
          </form>
        )}

        <div className="text-center mt-3">
          <p className="text-xs text-gray-500">
            {isSignUp ? "Already have an account?" : "Don't have an account?"} {" "}
            <Link to="#" onClick={() => { setIsSignUp(!isSignUp); setStep("form"); }} className="text-purple-600 hover:text-purple-800">
              {isSignUp ? "Sign In" : "Sign Up"}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

interface FloatingInputProps {
  label: string;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const FloatingInput = ({ label, type, id, name, value, onChange, placeholder }: FloatingInputProps) => (
  <div className="mb-3">
    <label htmlFor={id} className="block text-gray-700 font-medium">{label}</label>
    <input type={type} id={id} name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
  </div>
);

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  toggleVisibility: () => void;
}

const PasswordInput = ({ id, name, value, onChange, showPassword, toggleVisibility }: PasswordInputProps) => (
  <div className="mb-3 relative">
    <label htmlFor={id} className="block text-gray-700 font-medium">Password</label>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder="Enter your password"
        className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  </div>
);

export default AuthPage;