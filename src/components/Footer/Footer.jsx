import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  // Split the navigation links into two arrays for a two-column layout
  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/faq", label: "FAQs" },
  ];

  const resourceLinks = [
    { to: "/talkai", label: "Talk AI" },
    { to: "/chatbot", label: "Chatbot" },
    { to: "/map", label: "Map" },
  ];
  
  // Reusable function for NavLink classes
  const getNavLinkClass = ({ isActive }) => 
    `transition-colors duration-300 hover:text-cyan-300 ${isActive ? 'text-cyan-400 font-medium' : 'text-gray-400'}`;

  return (
    <footer className="bg-gray-900 border-t border-gray-700/50 text-gray-400">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Branding & About Section (Larger Section) */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
                <div className="flex items-center justify-center h-10 w-10 bg-cyan-500 rounded-full text-white text-xl font-bold group-hover:bg-cyan-400 transition-colors duration-300">
                    A
                </div>
                <span className="text-xl font-bold text-gray-100 group-hover:text-cyan-300 transition-colors duration-300">
                    Argo Floats
                </span>
            </Link>
            <p className="text-sm max-w-xs">
              An AI-powered conversational interface for ocean data discovery, democratizing access to ARGO float data.
            </p>
          </div>
          
          {/* Spacer for alignment on large screens */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Quick Links Section */}
          <div className="lg:col-span-2">
            <h4 className="text-md font-semibold text-gray-200 tracking-wider uppercase mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <NavLink to={link.to} end={link.to === "/"} className={getNavLinkClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources Section */}
          <div className="lg:col-span-2">
            <h4 className="text-md font-semibold text-gray-200 tracking-wider uppercase mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              {resourceLinks.map(link => (
                <li key={link.to}>
                  <NavLink to={link.to} className={getNavLinkClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="lg:col-span-2">
            <h4 className="text-md font-semibold text-gray-200 tracking-wider uppercase mb-4">Connect</h4>
             <div className="flex space-x-5">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors duration-300"><FaTwitter size={22} /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors duration-300"><FaLinkedin size={22} /></a>
             </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-gray-700/50 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} FloatChat, All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;