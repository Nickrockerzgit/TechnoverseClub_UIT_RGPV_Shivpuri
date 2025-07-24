
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

//       // ✅ Pass both user data AND token to the login function
//       login(
//         {
//           name: formData.name || formData.email.split("@")[0],
//           email: formData.email,
//         },
//         data.token // Pass the token as second parameter
//       );

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

// interface FloatingInputProps {
//   label: string;
//   type: string;
//   id: string;
//   name: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   placeholder: string;
// }

// const FloatingInput = ({ label, type, id, name, value, onChange, placeholder }: FloatingInputProps) => (
//   <div className="mb-3">
//     <label htmlFor={id} className="block text-gray-700 font-medium">{label}</label>
//     <input type={type} id={id} name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
//   </div>
// );

// interface PasswordInputProps {
//   id: string;
//   name: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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















//after google auth code 
import { useState, useEffect, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, X, Mail } from "lucide-react";
import { useAuth } from "./AuthContext";
import GoogleSignIn from "./GoogleSignIn";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState<"form" | "otp">("form");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [forgotPasswordData, setForgotPasswordData] = useState({ email: "", newPassword: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    if (step === "otp" && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
    setStep("form");
    setFormData({ name: "", email: "", phone: "", password: "" });
    setOtp("");
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForgotPasswordChange = (e: { target: { name: any; value: any; }; }) => {
    setForgotPasswordData({ ...forgotPasswordData, [e.target.name]: e.target.value });
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
    } catch (err: any) {
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

      login(
        {
          name: formData.name || formData.email.split("@")[0],
          email: formData.email,
        },
        data.token
      );

      setFormData({ name: "", email: "", phone: "", password: "" });
      setOtp("");
      navigate("/joinus");
    } catch (err: any) {
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

  const handleForgotPassword = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/auth/forgot-password", forgotPasswordData);
      toast.success("Password updated successfully!");
      setShowForgotPassword(false);
      setForgotPasswordData({ email: "", newPassword: "" });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update password");
    }
  };

  const handleGoogleSuccess = (userData: any, token: string) => {
    login(userData, token);
    navigate("/joinus");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-700 to-blue-800"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/10 to-blue-500/20"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <motion.div
        className="w-[90%] max-w-sm bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl z-10 relative mt-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Welcome Message */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {step === "form" 
              ? (isSignUp ? "Create an Account" : "Welcome Back") 
              : "Verify Your Email"
            }
          </h1>
          <p className="text-gray-600">
            {step === "form" 
              ? (isSignUp 
                  ? "Join Technoverse and start your journey" 
                  : "Sign in to continue to your account"
                ) 
              : "Enter the OTP sent to your email"
            }
          </p>
        </div>

        {step === "form" ? (
          <>
            <form onSubmit={handleSubmit} className="space-y-1">
              {isSignUp && (
                <>
                  <FloatingInput 
                    label="Full Name" 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Enter your full name" 
                  />
                  <FloatingInput 
                    label="Phone Number" 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="Enter your phone number" 
                  />
                </>
              )}
              
              <FloatingInput 
                label="Email" 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Enter your email" 
              />
              
              {isSignUp && (
                <PasswordInput 
                  id="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  showPassword={showPassword} 
                  toggleVisibility={togglePasswordVisibility} 
                />
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-lg"
              >
                {isSignUp ? "Send OTP to Sign Up" : "Send OTP to Sign In"}
              </motion.button>
            </form>

            {/* Google Sign In */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-4">
                <GoogleSignIn onSuccess={handleGoogleSuccess} />
              </div>
            </div>

            {/* Forgot Password Link */}
            {!isSignUp && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-purple-600 hover:text-purple-800 hover:underline"
                >
                  Forgot your password?
                </button>
              </div>
            )}
          </>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <FloatingInput 
              label="OTP" 
              type="text" 
              id="otp" 
              name="otp" 
              value={otp} 
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setOtp(e.target.value)} 
              placeholder="Enter 6-digit OTP" 
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-lg"
            >
              Verify OTP
            </motion.button>

            {timer > 0 ? (
              <p className="text-center text-sm text-gray-600">
                Resend OTP in <span className="font-semibold text-purple-600">{timer}s</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-sm text-purple-600 hover:text-purple-800 hover:underline block mx-auto"
              >
                Resend OTP
              </button>
            )}
          </form>
        )}

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"} {" "}
            <button 
              onClick={toggleForm} 
              className="text-purple-600 hover:text-purple-800 font-semibold hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPassword && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowForgotPassword(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
                <button
                  onClick={() => setShowForgotPassword(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
                
                <div className="text-center mb-6">
                  <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Reset Password</h3>
                  <p className="text-gray-600">Enter your email and new password</p>
                </div>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <FloatingInput
                    label="Email"
                    type="email"
                    id="forgot-email"
                    name="email"
                    value={forgotPasswordData.email}
                    onChange={handleForgotPasswordChange}
                    placeholder="Enter your email"
                  />
                  <FloatingInput
                    label="New Password"
                    type="password"
                    id="forgot-password"
                    name="newPassword"
                    value={forgotPasswordData.newPassword}
                    onChange={handleForgotPasswordChange}
                    placeholder="Enter new password"
                  />
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-2.5 rounded-lg font-semibold transition-all duration-200"
                  >
                    Update Password
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
  <div className="space-y-1">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <input 
      type={type} 
      id={id} 
      name={name} 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" 
    />
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
  <div className="space-y-1">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">Password</label>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder="Enter your password"
        className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  </div>
);

export default AuthPage;