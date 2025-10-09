import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // The exact list of navigation links, now including "News"
    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/dashboard", label: "Dashboard" },
        { to: "/talkai", label: "Talk AI" },
        { to: "/chatbot", label: "Chatbot" },
        { to: "/map", label: "Map" },
        { to: "/news", label: "News" },
        { to: "/about", label: "About" },
        { to: "/faq", label: "FAQs" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-gray-900 shadow-md border-b border-gray-700/50">
            <nav className="px-4 sm:px-6 lg:px-8"> 
                <div className="flex items-center justify-between h-16">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="flex items-center justify-center h-10 w-10 bg-cyan-500 rounded-full text-white text-xl font-bold group-hover:bg-cyan-400 transition-colors duration-300">
                            T
                        </div>
                        <span className="text-xl font-bold text-gray-100 group-hover:text-cyan-300 transition-colors duration-300">
                            Talk to the Tides
                        </span>
                    </Link>

                    {/* Right-side items container */}
                    <div className="flex items-center gap-6">
                        {/* Desktop Navigation Items */}
                        <ul className="hidden md:flex items-center space-x-6 text-gray-300 font-medium">
                            {navLinks.map((item) => (
                                <li key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        end={item.to === "/"}
                                        className={({ isActive }) =>
                                            `py-2 px-1 transition-colors duration-300 border-b-2 ${
                                                isActive
                                                    ? "text-cyan-400 border-cyan-400"
                                                    : "border-transparent hover:text-cyan-300"
                                            }`
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        
                        {/* Mobile menu button */}
                        <div className="md:hidden ml-4">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 p-2 rounded-md"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMenuOpen ? (
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                ) : (
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-3 pt-2">
                        <ul className="space-y-1">
                            {navLinks.map((item) => (
                                <li key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        end={item.to === "/"}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `block py-2 px-3 rounded-md text-base font-medium transition-colors duration-300 ${
                                                isActive
                                                    ? "text-white bg-cyan-600/50"
                                                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                                            }`
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header