import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getAllSchemes } from '../api/api';
import { toast } from 'react-toastify';
import {
  FaGlobe, FaSearch, FaBars, FaTimes, FaHome,
  FaThList, FaLandmark, FaMapMarkedAlt,
  FaQuestionCircle, FaInfoCircle
} from 'react-icons/fa';

const Navbar = () => {
  const {
    language, setLanguage, LANGUAGES, resetApp,
    setCurrentView, setSearchQuery, setSearchResults,
    setActiveExplorerTab
  } = useApp();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  // ========== SEARCH ==========
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
    } catch (err) {
      toast.error('Search failed. Is backend running?');
    }
  };

  // ========== SCROLL TO EXPLORER + SWITCH TAB ==========
  const scrollToExplorer = (tab) => {
    setCurrentView('home');
    setActiveExplorerTab(tab);
    setMobileMenu(false);
    setTimeout(() => {
      document.getElementById('scheme-explorer')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 150);
  };

  // ========== NAV LINKS ==========
  const navLinks = [
    {
      label: 'Home',
      icon: <FaHome />,
      action: () => {
        resetApp();
        setMobileMenu(false);
      }
    },
    {
      label: 'Categories',
      icon: <FaThList />,
      action: () => scrollToExplorer('categories')
    },
    {
      label: 'Central',
      icon: <FaLandmark />,
      action: () => scrollToExplorer('central')
    },
    {
      label: 'States',
      icon: <FaMapMarkedAlt />,
      action: () => scrollToExplorer('states')
    },
    {
      label: 'FAQ',
      icon: <FaQuestionCircle />,
      action: () => {
        setCurrentView('faq');
        setMobileMenu(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      label: 'About',
      icon: <FaInfoCircle />,
      action: () => {
        setCurrentView('about');
        setMobileMenu(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
  ];

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>

        {/* ========== BRAND ========== */}
        <div style={styles.brand} onClick={() => { resetApp(); setMobileMenu(false); }}>
          <span style={{ fontSize: '28px' }}>🏛️</span>
          <h1 style={styles.title}>
            GovScheme<span style={styles.aiBadge}>AI</span>
          </h1>
        </div>

        {/* ========== SEARCH BAR ========== */}
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <FaSearch style={styles.searchIcon} />
          <input
            style={styles.searchInput}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search schemes..."
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput('')}
              style={styles.clearBtn}
            >
              <FaTimes />
            </button>
          )}
        </form>

        {/* ========== DESKTOP NAV LINKS ========== */}
        <div style={styles.navLinks}>
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={link.action}
              style={styles.navLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
              }}
            >
              {link.icon} <span>{link.label}</span>
            </button>
          ))}
        </div>

        {/* ========== LANGUAGE SELECTOR ========== */}
        <div style={styles.langWrapper}>
          <FaGlobe style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={styles.langSelect}
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>
                {l.flag} {l.native}
              </option>
            ))}
          </select>
        </div>

        {/* ========== MOBILE MENU TOGGLE ========== */}
        <button
          style={styles.menuBtn}
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ========== MOBILE MENU ========== */}
      {mobileMenu && (
        <div style={styles.mobileMenu}>

          {/* Mobile Search */}
          <form
            onSubmit={handleSearch}
            style={{ ...styles.searchForm, width: '100%', maxWidth: '100%', marginBottom: '12px' }}
          >
            <FaSearch style={styles.searchIcon} />
            <input
              style={styles.searchInput}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search schemes..."
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput('')}
                style={styles.clearBtn}
              >
                <FaTimes />
              </button>
            )}
          </form>

          {/* Mobile Nav Links */}
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={link.action}
              style={styles.mobileLink}
            >
              <span style={styles.mobileLinkIcon}>{link.icon}</span>
              {link.label}
            </button>
          ))}

          {/* Mobile Language Selector */}
          <div style={styles.mobileLangWrapper}>
            <FaGlobe style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }} />
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                setMobileMenu(false);
              }}
              style={styles.mobileLangSelect}
            >
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.native}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </nav>
  );
};

const styles = {
  // ===== NAVBAR =====
  navbar: {
    background: 'linear-gradient(135deg, #1e3a8a, #1e40af, #3730a3)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 4px 30px rgba(0,0,0,0.2)',
  },
  container: {
    maxWidth: '1300px',
    margin: '0 auto',
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },

  // ===== BRAND =====
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    flexShrink: 0,
  },
  title: {
    fontSize: '20px',
    fontWeight: 800,
    color: 'white',
    letterSpacing: '-0.5px',
  },
  aiBadge: {
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    padding: '1px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 900,
    marginLeft: '4px',
  },

  // ===== SEARCH =====
  searchForm: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(255,255,255,0.12)',
    borderRadius: '10px',
    padding: '0 12px',
    border: '1px solid rgba(255,255,255,0.15)',
    flex: 1,
    maxWidth: '320px',
    transition: 'all 0.3s ease',
  },
  searchIcon: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '14px',
    flexShrink: 0,
  },
  searchInput: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    padding: '10px 10px',
    fontSize: '13px',
    width: '100%',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
  },
  clearBtn: {
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.5)',
    cursor: 'pointer',
    fontSize: '12px',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.2s',
  },

  // ===== DESKTOP NAV LINKS =====
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
  },
  navLink: {
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.8)',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    transition: 'all 0.2s ease',
    fontFamily: 'Inter, sans-serif',
    whiteSpace: 'nowrap',
  },

  // ===== LANGUAGE SELECTOR =====
  langWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(255,255,255,0.1)',
    padding: '7px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.15)',
    flexShrink: 0,
  },
  langSelect: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
  },

  // ===== MOBILE TOGGLE =====
  menuBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '22px',
    cursor: 'pointer',
    padding: '4px',
  },

  // ===== MOBILE MENU =====
  mobileMenu: {
    padding: '12px 20px 16px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(0,0,0,0.1)',
  },
  mobileLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '12px 14px',
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.9)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    borderRadius: '10px',
    fontFamily: 'Inter, sans-serif',
    textAlign: 'left',
    transition: 'background 0.2s',
  },
  mobileLinkIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
  },
  mobileLangWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '12px',
    padding: '12px 14px',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.12)',
  },
  mobileLangSelect: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
  },
};

export default Navbar;