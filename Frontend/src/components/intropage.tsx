
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import videoSrc from "./assets/0_Business Meeting_Presentation_3840x2160.mp4";

const IntroPage: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-900 to-black text-white px-10 relative overflow-hidden">
      {/* Animated Star Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black z-0">
        <div className="stars"></div>
      </div>

      {/* Left Side */}
      <div className="w-1/2 space-y-6 z-10">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600">Welcome to Technoverse</h1>
        <p className="text-xl text-gray-400">Join our innovative coding community where we transform ideas into reality through technology and creativity.</p>
        {/* Social Media Icons */}
        <div className="flex space-x-6 mt-4">
          {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
            <Icon
              key={index}
              className="text-3xl cursor-pointer transition transform hover:scale-125 hover:text-blue-500"
            />
          ))}
        </div>
      </div>

      {/* Right Side - Video */}
     <div className="w-1/2 flex justify-center z-10">
      <video
        autoPlay
        loop
        muted
        className="object-cover w-full h-full rounded-lg shadow-xl">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    </div>
  );
};

export default IntroPage;

























// import React from "react";
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
// // Import video directly using the import statement
// import videoSrc from "./assets/0_Business Meeting_Presentation_3840x2160.mp4";

// const IntroPage: React.FC = () => {
//   return (
//     <div className="h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-900 to-black text-white px-10 relative overflow-hidden">
//       {/* Left Side */}
//       <div className="w-1/2 space-y-6 z-10">
//         <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600">Welcome to Technoverse</h1>
//         <p className="text-xl text-gray-400">Join our innovative coding community where we transform ideas into reality through technology and creativity.</p>
//         {/* Social Media Icons */}
//         <div className="flex space-x-6 mt-4">
//           {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
//             <Icon
//               key={index}
//               className="text-3xl cursor-pointer transition transform hover:scale-125 hover:text-blue-500"
//             />
//           ))}
//         </div>
//       </div>

//       {/* Right Side - Video */}
//       <div className="w-1/2 flex justify-center z-10">
//         <video
//           autoPlay
//           loop
//           muted
//           className="object-cover w-full h-full rounded-lg shadow-xl"
//         >
//           <source src={videoSrc} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </div>
//     </div>
//   );
// };

// export default IntroPage;
