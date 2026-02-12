import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FaGlobe, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { language, setLanguage, LANGUAGES, resetApp } = useApp();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* Brand */}
        <div style={styles.brand} onClick={resetApp}>
          <span style={styles.logo}>🏛️</span>
          <h1 style={styles.title}>
            GovScheme <span style={styles.aiBadge}>AI</span>
          </h1>
        </div>

        {/* Desktop Nav */}
        <div style={styles.navRight}>
          <div style={styles.langWrapper}>
            <FaGlobe style={styles.globeIcon} />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={styles.langSelect}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.native}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.statusDot}>
            <span style={styles.dot}></span>
            <span style={styles.statusText}>Live</span>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          style={styles.menuBtn}
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div style={styles.mobileMenu}>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              setMobileMenu(false);
            }}
            style={styles.mobileLangSelect}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.native}
              </option>
            ))}
          </select>
        </div>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    background: 'linear-gradient(135deg, #1e3a8a, #1e40af, #3730a3)',
    padding: '0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '14px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },
  logo: {
    fontSize: '30px',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
  },
  title: {
    fontSize: '22px',
    fontWeight: 800,
    color: 'white',
    letterSpacing: '-0.5px',
  },
  aiBadge: {
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    padding: '2px 10px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 900,
    letterSpacing: '1px',
    boxShadow: '0 2px 10px rgba(249, 115, 22, 0.4)',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  langWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255, 255, 255, 0.12)',
    padding: '8px 14px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  globeIcon: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '14px',
  },
  langSelect: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
  },
  statusDot: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(34, 197, 94, 0.15)',
    padding: '6px 12px',
    borderRadius: '50px',
    border: '1px solid rgba(34, 197, 94, 0.3)',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#22c55e',
    boxShadow: '0 0 8px #22c55e',
    animation: 'pulse 2s infinite',
  },
  statusText: {
    color: '#86efac',
    fontSize: '12px',
    fontWeight: 600,
  },
  menuBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '20px',
  },
  mobileMenu: {
    padding: '12px 24px 16px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  mobileLangSelect: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(255,255,255,0.1)',
    color: 'white',
    fontSize: '14px',
  },
};

export default Navbar;