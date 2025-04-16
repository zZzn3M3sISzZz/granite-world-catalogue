import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Hero from './components/Hero';
import Catalogue from './components/Catalogue';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import AdminPanel from './components/AdminPanel';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(() => {
    const stored = localStorage.getItem('hasAnimated');
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    if (!hasAnimated) {
      localStorage.setItem('hasAnimated', 'true');
    }
  }, [hasAnimated]);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <nav className="bg-white dark:bg-gray-800 shadow-lg fixed w-full z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    Granite World
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/"
                    className="border-transparent text-gray-500 dark:text-gray-300 hover:border-indigo-500 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/catalogue"
                    className="border-transparent text-gray-500 dark:text-gray-300 hover:border-indigo-500 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Catalogue
                  </Link>
                  <Link
                    to="/gallery"
                    className="border-transparent text-gray-500 dark:text-gray-300 hover:border-indigo-500 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Gallery
                  </Link>
                  <Link
                    to="/contact"
                    className="border-transparent text-gray-500 dark:text-gray-300 hover:border-indigo-500 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-16">
          <Routes>
            <Route path="/" element={
              <>
                <Hero hasAnimated={hasAnimated} setHasAnimated={setHasAnimated} />
                <Catalogue />
                <Contact />
              </>
            } />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App; 