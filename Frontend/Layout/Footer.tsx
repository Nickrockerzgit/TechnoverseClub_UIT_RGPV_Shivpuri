
import { motion } from "framer-motion";
import {
  Code2,
  Mail,
  Link as LinkIcon,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Disc,
} from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Events", to: "events" },
    { name: "Courses", to: "courses" },
  ];

  const helpLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms-and-conditions" },
    { name: "FAQs", to: "faq" },
    { name: "Vlogs", to: "vlogs" },
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Disc, href: "#", label: "Discord" },
  ];

  return (
    <footer className="bg-[#0B0B1F] pt-10 pb-4 sm:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center mb-6">
              <Code2 className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold text-white">
                Technovers
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering the next generation of tech innovators through
              learning, collaboration, and hands-on experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <ScrollLink
                    to={link.to}
                    smooth={true}
                    duration={500}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.name}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Help</h3>
            <ul className="space-y-4">
              {helpLinks.map((link, index) => (
                <li key={index}>
                  {link.path ? (
                    // 🔹 React Router Link for pages
                    <RouterLink
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </RouterLink>
                  ) : (
                    // 🔹 React Scroll Link for sections
                    <ScrollLink
                      to={link.to}
                      smooth={true}
                      duration={500}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {link.name}
                    </ScrollLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:contact@technovers.com"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5 mr-3" />
                  contact@technovers.com
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <LinkIcon className="h-5 w-5 mr-3" />
                  technovers.com
                </a>
              </li>
              <li>
                <div className="flex items-center text-gray-400">
                  <MapPin className="h-5 w-5 mr-3" />
                  Tech Hub, Innovation Street
                </div>
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

      <div className="mt-24 pt-10 bg-[#0B0B1F]">
               {/* Thin centered line */}
          <div className="mx-auto w-1/3 border-t-2 border-white/20 mb-4" />
              {/* Copyright text */}
              <p className="text-center text-gray-400">
              © {new Date().getFullYear()} Technovers. All rights reserved.
              </p>
         </div>
      </div>
    </footer>
  );
};

export default Footer;






