import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { getAllSchemes } from '../api/api';
import { toast } from 'react-toastify';
import {
  FaGlobe, FaSearch, FaBars, FaTimes,
  FaHome, FaThList, FaInfoCircle,
  FaShieldAlt
} from 'react-icons/fa';

const Navbar = () => {
  const {
    language, setLanguage, LANGUAGES, resetApp,
    setCurrentView, setSearchQuery, setSearchResults,
    setActiveExplorerTab
  } = useApp();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileMenu(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    try {
      const data = await getAllSchemes();
      const filtered = data.schemes.filter(s =>
        s.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        s.description.toLowerCase().includes(searchInput.toLowerCase()) ||
        s.category.toLowerCase().includes(searchInput.toLowerCase())
      );

      setSearchQuery(searchInput);
      setSearchResults(filtered);
      setCurrentView('search');
      setMobileMenu(false);
      setSearchInput('');
    } catch {
      toast.error('Search failed. Is backend running?');
    }
  };

  const scrollToExplorer = (tab) => {
    setCurrentView('home');
    setActiveExplorerTab(tab);
    setMobileMenu(false);

    setTimeout(() => {
      document.getElementById('scheme-explorer')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const navLinks = [
    {
      label: 'Home',
      icon: <FaHome />,
      action: () => { resetApp(); setMobileMenu(false); },
    },
    {
      label: 'Categories',
      icon: <FaThList />,
      action: () => scrollToExplorer('categories'),
    },
    {
      label: 'About',
      icon: <FaInfoCircle />,
      action: () => {
        setCurrentView('about');
        setMobileMenu(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
  ];

  return (
    <motion.nav
      style={{
        ...styles.navbar,
        ...(scrolled ? styles.navbarScrolled : {}),
      }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div style={styles.container}>

        <motion.div
          style={styles.brand}
          onClick={() => { resetApp(); setMobileMenu(false); }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div style={styles.logoIcon}>
            <FaShieldAlt style={{ fontSize: '16px', color: '#22c55e' }} />
          </div>
          <div style={styles.logoText}>
            <h1 style={styles.title}>
              <span style={styles.titleGreen}>Gov</span>Scheme
            </h1>
            <span style={styles.titleSub}>AI</span>
          </div>
        </motion.div>

        <form onSubmit={handleSearch} style={styles.searchForm}>
          <FaSearch style={styles.searchIcon} />
          <input
            style={styles.searchInput}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search schemes..."
          />
          {searchInput && (
            <motion.button
              type="button"
              onClick={() => setSearchInput('')}
              style={styles.clearBtn}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileTap={{ scale: 0.8 }}
            >
              <FaTimes />
            </motion.button>
          )}
        </form>

        <div style={styles.navLinks}>
          {navLinks.map(link => (
            <motion.button
              key={link.label}
              onClick={link.action}
              style={styles.navLink}
              whileHover={{ color: '#22c55e' }}
              whileTap={{ scale: 0.95 }}
            >
              {link.icon}
              <span>{link.label}</span>
            </motion.button>
          ))}
        </div>

        <div style={styles.langWrapper}>
          <FaGlobe style={styles.langIcon} />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={styles.langSelect}
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code} style={styles.langOption}>
                {l.flag} {l.native}
              </option>
            ))}
          </select>
        </div>

        <motion.button
          style={styles.menuBtn}
          onClick={() => setMobileMenu(!mobileMenu)}
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenu ? <FaTimes /> : <FaBars />}
        </motion.button>

      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            style={styles.mobileMenu}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSearch} style={styles.mobileSearchForm}>
              <FaSearch style={styles.searchIcon} />
              <input
                style={styles.mobileSearchInput}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search schemes..."
              />
            </form>

            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={link.action}
                style={styles.mobileLink}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                whileTap={{ scale: 0.98 }}
              >
                <span style={styles.mobileLinkIcon}>{link.icon}</span>
                {link.label}
              </motion.button>
            ))}

            <div style={styles.mobileLangRow}>
              <FaGlobe style={{ color: '#64748b', fontSize: '14px' }} />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={styles.mobileLangSelect}
              >
                {LANGUAGES.map(l => (
                  <option key={l.code} value={l.code} style={styles.langOption}>
                    {l.flag} {l.native}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    background: '#020617',
    borderBottom: '1px solid transparent',
    zIndex: 1000,
    transition: 'all 0.3s ease',
    fontFamily: 'Inter, sans-serif',
  },
  navbarScrolled: {
    background: 'rgba(2, 6, 23, 0.95)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid #1e293b',
    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
  },

  container: {
    maxWidth: '1300px',
    margin: '0 auto',
    padding: '14px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
  },

  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    color: 'white',
    textDecoration: 'none',
    flexShrink: 0,
  },
  logoIcon: {
    width: '34px',
    height: '34px',
    borderRadius: '10px',
    background: 'rgba(34,197,94,0.1)',
    border: '1px solid rgba(34,197,94,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 800,
    color: '#ffffff',
    margin: 0,
    letterSpacing: '-0.3px',
  },
  titleGreen: {
    color: '#22c55e',
  },
  titleSub: {
    fontSize: '12px',
    fontWeight: 700,
    color: '#22c55e',
    background: 'rgba(34,197,94,0.1)',
    padding: '1px 6px',
    borderRadius: '4px',
    border: '1px solid rgba(34,197,94,0.2)',
  },

  searchForm: {
    flex: 1,
    maxWidth: '400px',
    display: 'flex',
    alignItems: 'center',
    background: '#0f172a',
    borderRadius: '12px',
    padding: '0 14px',
    border: '1px solid #1e293b',
    transition: 'all 0.3s ease',
  },
  searchIcon: {
    color: '#475569',
    fontSize: '13px',
    flexShrink: 0,
  },
  searchInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#ffffff',
    padding: '10px 10px',
    fontSize: '13px',
    fontFamily: 'Inter, sans-serif',
  },
  clearBtn: {
    background: '#1e293b',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    width: '22px',
    height: '22px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    flexShrink: 0,
  },

  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  navLink: {
    background: 'transparent',
    border: 'none',
    color: '#94a3b8',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    borderRadius: '10px',
    transition: 'all 0.2s ease',
    fontFamily: 'Inter, sans-serif',
    whiteSpace: 'nowrap',
  },

  langWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#94a3b8',
    padding: '6px 12px',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '10px',
    flexShrink: 0,
  },
  langIcon: {
    fontSize: '13px',
    color: '#64748b',
  },
  langSelect: {
    background: 'transparent',
    border: 'none',
    color: '#e2e8f0',
    outline: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 600,
    fontFamily: 'Inter, sans-serif',
    maxWidth: '100px',
  },
  langOption: {
    background: '#0f172a',
    color: '#e2e8f0',
  },

  menuBtn: {
    display: 'none',
    background: '#0f172a',
    border: '1px solid #1e293b',
    color: '#94a3b8',
    fontSize: '18px',
    cursor: 'pointer',
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  mobileMenu: {
    padding: '12px 20px 20px',
    background: '#020617',
    borderTop: '1px solid #1e293b',
    overflow: 'hidden',
  },
  mobileSearchForm: {
    display: 'flex',
    alignItems: 'center',
    background: '#0f172a',
    borderRadius: '12px',
    padding: '0 14px',
    border: '1px solid #1e293b',
    marginBottom: '12px',
  },
  mobileSearchInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#ffffff',
    padding: '12px 10px',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
  },
  mobileLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '12px',
    color: '#e2e8f0',
    padding: '14px 16px',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: '8px',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.2s ease',
  },
  mobileLinkIcon: {
    color: '#22c55e',
    fontSize: '16px',
    width: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileLangRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '12px',
    marginTop: '4px',
  },
  mobileLangSelect: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: '#e2e8f0',
    outline: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: 'Inter, sans-serif',
  },
};

export default Navbar;