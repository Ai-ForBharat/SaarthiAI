import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getAllSchemes } from '../api/api';
import { toast } from 'react-toastify';
import {
  FaGlobe, FaSearch, FaBars, FaTimes, FaHome,
  FaThList, FaLandmark, FaMapMarkedAlt,
  FaQuestionCircle, FaInfoCircle, FaMoon, FaSun
} from 'react-icons/fa';

const Navbar = () => {
  const {
    language, setLanguage, LANGUAGES, resetApp,
    setCurrentView, setSearchQuery, setSearchResults,
    setActiveExplorerTab, darkMode, toggleDarkMode
  } = useApp();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchInput, setSearchInput] = useState('');

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

  const scrollToExplorer = (tab) => {
    setCurrentView('home');
    setActiveExplorerTab(tab);
    setMobileMenu(false);
    setTimeout(() => {
      document.getElementById('scheme-explorer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const navLinks = [
    { label: 'Home', icon: <FaHome />, action: () => { resetApp(); setMobileMenu(false); } },
    { label: 'Categories', icon: <FaThList />, action: () => scrollToExplorer('categories') },
    { label: 'Central', icon: <FaLandmark />, action: () => scrollToExplorer('central') },
    { label: 'States', icon: <FaMapMarkedAlt />, action: () => scrollToExplorer('states') },
    { label: 'FAQ', icon: <FaQuestionCircle />, action: () => { setCurrentView('faq'); setMobileMenu(false); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { label: 'About', icon: <FaInfoCircle />, action: () => { setCurrentView('about'); setMobileMenu(false); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
  ];

  return (
    <nav style={{ ...s.navbar, background: 'var(--navbar-bg)' }}>
      <div style={s.container}>

        <div style={s.brand} onClick={() => { resetApp(); setMobileMenu(false); }}>
          <span style={{ fontSize: '28px' }}>🏛️</span>
          <h1 style={s.title}>GovScheme<span style={s.aiBadge}>AI</span></h1>
        </div>

        <form onSubmit={handleSearch} style={s.searchForm}>
          <FaSearch style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', flexShrink: 0 }} />
          <input style={s.searchInput} value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} placeholder="Search schemes..." />
          {searchInput && (
            <button type="button" onClick={() => setSearchInput('')} style={s.clearBtn}><FaTimes /></button>
          )}
        </form>

        <div style={s.navLinks}>
          {navLinks.map(link => (
            <button key={link.label} onClick={link.action} style={s.navLink}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}>
              {link.icon} <span>{link.label}</span>
            </button>
          ))}
        </div>

        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode} style={s.darkToggle} title={darkMode ? 'Light Mode' : 'Dark Mode'}>
          {darkMode ? <FaSun style={{ color: '#fbbf24' }} /> : <FaMoon style={{ color: 'rgba(255,255,255,0.8)' }} />}
        </button>

        {/* Language */}
        <div style={s.langWrapper}>
          <FaGlobe style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} />
          <select value={language} onChange={(e) => setLanguage(e.target.value)} style={s.langSelect}>
            {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.flag} {l.native}</option>)}
          </select>
        </div>

        <button style={s.menuBtn} onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div style={s.mobileMenu}>
          <form onSubmit={handleSearch} style={{ ...s.searchForm, width: '100%', maxWidth: '100%', marginBottom: '12px' }}>
            <FaSearch style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', flexShrink: 0 }} />
            <input style={s.searchInput} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search schemes..." />
          </form>

          {navLinks.map(link => (
            <button key={link.label} onClick={link.action} style={s.mobileLink}>
              <span style={s.mobileLinkIcon}>{link.icon}</span> {link.label}
            </button>
          ))}

          {/* Mobile Dark Mode */}
          <button onClick={() => { toggleDarkMode(); setMobileMenu(false); }} style={{ ...s.mobileLink, marginTop: '4px' }}>
            <span style={s.mobileLinkIcon}>{darkMode ? <FaSun /> : <FaMoon />}</span>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>

          <div style={s.mobileLangWrapper}>
            <FaGlobe style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }} />
            <select value={language} onChange={(e) => { setLanguage(e.target.value); setMobileMenu(false); }} style={s.mobileLangSelect}>
              {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.flag} {l.native}</option>)}
            </select>
          </div>
        </div>
      )}
    </nav>
  );
};

const s = {
  navbar: { position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 30px rgba(0,0,0,0.2)' },
  container: { maxWidth: '1300px', margin: '0 auto', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '12px' },
  brand: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flexShrink: 0 },
  title: { fontSize: '20px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' },
  aiBadge: { background: '#22c55e', padding: '1px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 900, marginLeft: '4px', color: 'white' },
  searchForm: { display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.12)', borderRadius: '10px', padding: '0 12px', border: '1px solid rgba(255,255,255,0.15)', flex: 1, maxWidth: '300px' },
  searchInput: { background: 'transparent', border: 'none', color: 'white', padding: '10px 10px', fontSize: '13px', width: '100%', outline: 'none', fontFamily: 'Inter, sans-serif' },
  clearBtn: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '12px', padding: '4px', display: 'flex', alignItems: 'center' },
  navLinks: { display: 'flex', alignItems: 'center', gap: '2px' },
  navLink: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', padding: '8px 10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' },
  darkToggle: { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '8px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', transition: 'all 0.3s', flexShrink: 0 },
  langWrapper: { display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', padding: '7px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 },
  langSelect: { background: 'transparent', border: 'none', color: 'white', fontSize: '12px', fontWeight: 500, cursor: 'pointer', outline: 'none', fontFamily: 'Inter, sans-serif' },
  menuBtn: { display: 'none', background: 'none', border: 'none', color: 'white', fontSize: '22px', cursor: 'pointer', padding: '4px' },
  mobileMenu: { padding: '12px 20px 16px', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.1)' },
  mobileLink: { display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px 14px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.9)', fontSize: '14px', fontWeight: 500, cursor: 'pointer', borderRadius: '10px', fontFamily: 'Inter, sans-serif', textAlign: 'left' },
  mobileLinkIcon: { width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' },
  mobileLangWrapper: { display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px', padding: '12px 14px', background: 'rgba(255,255,255,0.08)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)' },
  mobileLangSelect: { flex: 1, background: 'transparent', border: 'none', color: 'white', fontSize: '14px', fontWeight: 500, cursor: 'pointer', outline: 'none', fontFamily: 'Inter, sans-serif' },
};

export default Navbar;