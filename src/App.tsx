import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Hero from './components/Hero';
import Catalogue from './components/Catalogue';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import { AdminAuthProvider, useAdminAuth } from './contexts/AdminAuthContext';
import { motion } from 'framer-motion';

const Navigation: React.FC = () => {
  return (
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
                to="/#top"
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-indigo-500 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/#catalogue"
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
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAdminAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

const HomePage: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(() => {
    const stored = localStorage.getItem('hasAnimated');
    return stored ? JSON.parse(stored) : false;
  });
  const location = useLocation();
  const heroRef = useRef<HTMLDivElement>(null);
  const catalogueRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasAnimated) {
      localStorage.setItem('hasAnimated', 'true');
    }
  }, [hasAnimated]);

  useEffect(() => {
    // Handle hash navigation
    const hash = location.hash;
    if (hash === '#top' && heroRef.current) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (hash === '#catalogue' && catalogueRef.current) {
      catalogueRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (hash === '#contact' && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <>
      <div ref={heroRef} id="top">
        <Hero hasAnimated={hasAnimated} setHasAnimated={setHasAnimated} />
      </div>
      <div ref={catalogueRef} id="catalogue">
        <Catalogue />
      </div>
      <div ref={contactRef} id="contact">
        <Contact />
      </div>
    </>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {!isAdminRoute && <Navigation />}
      <div className={!isAdminRoute ? "pt-16" : ""}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Catalogue showAll={true} />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AdminAuthProvider>
        <AppContent />
      </AdminAuthProvider>
    </Router>
  );
};

export default App; 