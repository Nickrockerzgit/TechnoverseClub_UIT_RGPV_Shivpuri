
import React from 'react';
import {
  Terminal,
  Braces,
  Binary,
  Hash,
  Code,
  Zap,
  Cpu,
  Rocket,
  ArrowRight,
  Users,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Globe,
  
} from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import logo from "../assets/ChatGPT Image Jul 7, 2025, 05_11_30 PM.png";
import { useNavigate } from 'react-router-dom';
import Technobot3D from "./Technobot3d";


const SocialLinks: React.FC = () => {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Mail, href: '#', label: 'Email' },
    { icon: Globe, href: '#', label: 'Website' },
    { icon: FaDiscord, href: '#', label: 'Discord' }
  ];
 

  
  return (
    <div className="relative z-10 flex justify-center space-x-6 py-6">
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          className="group relative p-3 bg-white/10 backdrop-blur-sm rounded-full border border-purple-400/30 hover:border-purple-400/60 transition-all duration-300 hover:scale-110 hover:bg-white/20"
          aria-label={label}
        >
          <Icon 
            size={24} 
            className="text-purple-300 group-hover:text-white transition-colors duration-300" 
          />
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {label}
          </div>
        </a>
      ))}
    </div>
  );
};

const LandingPage: React.FC = () => {
  const navigate = useNavigate(); 

  const handleJoinClick = () => {
    navigate("/joinus");
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 opacity-300">
          <div className="grid-pattern animate-pulse"></div>
        </div>
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Lucide Icons */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[
          { icon: Terminal, position: 'top-20 left-10', delay: '0s' },
          { icon: Braces, position: 'top-40 right-16', delay: '1s' },
          { icon: Binary, position: 'bottom-32 left-20', delay: '2s' },
          { icon: Hash, position: 'bottom-20 right-12', delay: '3s' },
        ].map(({ icon: Icon, position, delay }, index) => (
          <div
            key={index}
            className={`absolute ${position} text-purple-400/30 animate-float-slow`}
            style={{ animationDelay: delay }}
          >
            <Icon size={32} />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="text-center pt-16 pb-2">
          <div className="flex flex-col items-center mb-12">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
              <div className="w-25 h-25 ">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h1 className="text-red-600 font-bold text-lg md:text-xl leading-tight text-center md:text-left px-4">
                <span className="block pl-5">
                  राजीव गांधी प्रौद्योगिकी विश्वविद्यालय शिवपुरी (म.प्र.), भारत
                </span>
                <span className="block mt-1">
                  Rajiv Gandhi Technical University Shivpuri (M.P.), INDIA
                </span>
              </h1>
            </div>
            <div className="text-center space-y-2">
              <div className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full backdrop-blur-sm border border-purple-400/30 inline-block">
                <span className="text-purple-200 text-sm font-medium">
                  Official Coding Club
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Technoverse Branding */}
        <main className="flex-1 flex flex-col justify-center -mt-16">
          <div className="text-center py-6">
            <div className="mb-8">
              <div className="relative inline-block px-4">
                <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                  TECHNOVERSE
                </h1>
                <div className="absolute -top-4 -left-4 text-purple-400 animate-bounce">
                  <Code size={24} />
                </div>
                <div className="absolute -top-4 -right-4 text-blue-400 animate-bounce" style={{ animationDelay: '0.5s' }}>
                  <Zap size={24} />
                </div>
                <div className="absolute -bottom-4 -left-4 text-pink-400 animate-bounce" style={{ animationDelay: '1s' }}>
                  <Cpu size={24} />
                </div>
                <div className="absolute -bottom-4 -right-4 text-purple-400 animate-bounce" style={{ animationDelay: '1.5s' }}>
                  <Rocket size={24} />
                </div>
              </div>

              <p className="text-lg sm:text-xl md:text-2xl text-purple-200 mt-4 font-light px-4">
                Where Code Meets Innovation
              </p>
              <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="max-w-2xl mx-auto px-4">
              <p className="text-base sm:text-lg md:text-xl text-purple-100 leading-relaxed">
                Join the future of technology. Learn, Build, and Innovate with the most passionate coders in the universe.
              </p>
            </div>
          </div>
        </main>
  
        {/* 👇 Social Links (Added above Join Button) */}
        <SocialLinks />

        {/* Join Button */}
        <div className="text-center py-4 px-6">
          <button  
            onClick={handleJoinClick}  
            className="group relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold text-base sm:text-lg rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
            <Users size={20} className="mr-2 sm:mr-3 group-hover:animate-pulse" />
            <span>Join Technoverse</span>
            <ArrowRight size={20} className="ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </button>

          <p className="text-purple-200 mt-4 text-sm sm:text-base">
            Ready to embark on your coding journey?
          </p>
        </div>

        <Technobot3D/>
          
      </div>
    </div>
  );
};

export default LandingPage;
function useState(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.');
}

