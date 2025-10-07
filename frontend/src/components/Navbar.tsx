import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="bg-white shadow-md py-4 px-6">
            <nav className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <svg className="w-8 h-8 text-indigo-500 transform " fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                    </svg>
                    <span className="text-gray-900 text-xl font-semibold">LinkShort</span>
                </Link>
                <div className="flex items-center space-x-6">
                    {/* <Link to="/features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</Link> */}
                    {/* <Link to="/pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</Link> */}
                    {/* <Link to="/analytics" className="text-gray-600 hover:text-purple-600 transition-colors">Analytics</Link> */}
                    {/* <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                        Sign In
                    </button> */}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;