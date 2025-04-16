import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Catalogue from './components/Catalogue';
import About from './components/About';
import Contact from './components/Contact';
import AdminLayout from './components/AdminLayout';
import AdminLogin from './components/AdminLogin';
import AdminProducts from './components/AdminProducts';
import AdminQueries from './components/AdminQueries';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(() => {
    // Check localStorage on initial load
    const stored = localStorage.getItem('heroAnimated');
    return stored === 'true';
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save animation state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('heroAnimated', hasAnimated.toString());
  }, [hasAnimated]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const MainLayout = () => (
    <>
      <Navigation
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        isScrolled={isScrolled}
      />
      <Hero hasAnimated={hasAnimated} setHasAnimated={setHasAnimated} />
      <Catalogue />
      <About />
      <Contact />
    </>
  );

  return (
    <Router>
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminProducts />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="queries" element={<AdminQueries />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App; 