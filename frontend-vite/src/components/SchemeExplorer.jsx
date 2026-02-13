import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  FaThList, FaMapMarkedAlt, FaLandmark,
  FaChevronDown, FaChevronUp, FaMapMarkerAlt, FaSearch
} from 'react-icons/fa';

const SchemeExplorer = () => {
  const {
    CATEGORIES, MINISTRIES, STATE_DATA,
    activeExplorerTab, setActiveExplorerTab
  } = useApp();

  const activeTab = activeExplorerTab;
  const setActiveTab = setActiveExplorerTab;

  const [showAll, setShowAll] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const tabs = [
    { key: 'categories', label: 'Categories', icon: <FaThList />, color: '#3b82f6' },
    { key: 'states', label: 'States/UTs', icon: <FaMapMarkedAlt />, color: '#f97316' },
    { key: 'central', label: 'Central Ministries', icon: <FaLandmark />, color: '#8b5cf6' },
  ];

  const getFilteredData = () => {
    const query = searchFilter.toLowerCase();
    if (activeTab === 'categories') {
      const filtered = CATEGORIES.filter(c => c.name.toLowerCase().includes(query));
      return showAll ? filtered : filtered.slice(0, 10);
    }
    if (activeTab === 'states') {
      const filtered = STATE_DATA.filter(s => s.name.toLowerCase().includes(query));
      return showAll ? filtered : filtered.slice(0, 12);
    }
    if (activeTab === 'central') {
      const filtered = MINISTRIES.filter(m => m.name.toLowerCase().includes(query));
      return showAll ? filtered : filtered.slice(0, 9);
    }
    return [];
  };

  const getTotalCount = () => {
    if (activeTab === 'categories') return CATEGORIES.length;
    if (activeTab === 'states') return STATE_DATA.length;
    if (activeTab === 'central') return MINISTRIES.length;
    return 0;
  };

  const getDefaultVisible = () => {
    if (activeTab === 'categories') return 10;
    if (activeTab === 'states') return 12;
    if (activeTab === 'central') return 9;
    return 10;
  };

  const filteredData = getFilteredData();
  const activeTabData = tabs.find(t => t.key === activeTab);

  return (
    <section id="scheme-explorer" style={styles.section}>
      <div style={styles.container}>

        {/* ========== HEADER ========== */}
        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span style={styles.label}>🔍 Explore Schemes</span>
          <h2 style={styles.heading}>
            Discover Government Schemes <br />
            <span style={{ color: activeTabData.color }}>Your Way</span>
          </h2>
        </motion.div>

        {/* ========== TABS ========== */}
        <div style={styles.tabsWrapper}>
          <div style={styles.tabsContainer}>
            {tabs.map((tab) => (
              <motion.button
                key={tab.key}
                style={{
                  ...styles.tab,
                  ...(activeTab === tab.key ? {
                    background: `linear-gradient(135deg, ${tab.color}, ${tab.color}dd)`,
                    color: 'white',
                    borderColor: tab.color,
                    boxShadow: `0 4px 15px ${tab.color}40`,
                  } : {}),
                }}
                onClick={() => {
                  setActiveTab(tab.key);
                  setShowAll(false);
                  setSearchFilter('');
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span style={{
                  ...styles.tabCount,
                  background: activeTab === tab.key ? 'rgba(255,255,255,0.25)' : `${tab.color}15`,
                  color: activeTab === tab.key ? 'white' : tab.color,
                }}>
                  {tab.key === 'categories' ? CATEGORIES.length :
                    tab.key === 'states' ? STATE_DATA.length : MINISTRIES.length}
                </span>
              </motion.button>
            ))}
          </div>

          {/* ========== SEARCH WITHIN TAB ========== */}
          <div style={styles.searchBar}>
            <FaSearch style={{ color: '#94a3b8', fontSize: '14px', flexShrink: 0 }} />
            <input
              style={styles.searchInput}
              placeholder={`Search ${activeTab === 'categories' ? 'categories' : activeTab === 'states' ? 'states' : 'ministries'}...`}
              value={searchFilter}
              onChange={(e) => {
                setSearchFilter(e.target.value);
                setShowAll(true);
              }}
            />
            {searchFilter && (
              <button
                onClick={() => { setSearchFilter(''); setShowAll(false); }}
                style={styles.clearSearch}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ========== CONTENT ========== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >

            {/* ===== CATEGORIES TAB ===== */}
            {activeTab === 'categories' && (
              <div style={styles.gridCategories}>
                {filteredData.map((cat, i) => (
                  <motion.div
                    key={cat.name}
                    style={styles.categoryCard}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={{
                      y: -6,
                      boxShadow: `0 12px 30px ${cat.color}20`,
                      borderColor: cat.color,
                    }}
                  >
                    <div style={{ ...styles.catIcon, background: `${cat.color}12` }}>
                      <span style={{ fontSize: '30px' }}>{cat.icon}</span>
                    </div>
                    <h3 style={styles.catName}>{cat.name}</h3>
                    <div style={{
                      ...styles.badge,
                      background: `${cat.color}12`,
                      color: cat.color,
                    }}>
                      {cat.count} Schemes
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* ===== STATES TAB ===== */}
            {activeTab === 'states' && (
              <div style={styles.gridStates}>
                {filteredData.map((state, i) => (
                  <motion.div
                    key={state.name}
                    style={styles.stateCard}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={{
                      y: -5,
                      boxShadow: '0 10px 30px rgba(249,115,22,0.12)',
                      borderColor: '#f97316',
                    }}
                  >
                    <div style={styles.stateTop}>
                      <div style={styles.stateIconBox}>
                        <FaMapMarkerAlt style={{ color: '#f97316', fontSize: '18px' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={styles.stateName}>{state.name}</h3>
                        <span style={styles.stateType}>
                          {state.type === 'UT' ? '🏛️ Union Territory' : '📍 State'}
                        </span>
                      </div>
                    </div>
                    <div style={styles.stateStats}>
                      {state.type === 'UT' ? (
                        <span style={{ ...styles.statBadge, background: '#fef3c7', color: '#92400e' }}>
                          {state.ut} UT Schemes
                        </span>
                      ) : (
                        <span style={{ ...styles.statBadge, background: '#dcfce7', color: '#16a34a' }}>
                          {state.state} State Schemes
                        </span>
                      )}
                      <span style={{ ...styles.statBadge, background: '#dbeafe', color: '#1e40af' }}>
                        {state.central} Central
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* ===== CENTRAL MINISTRIES TAB ===== */}
            {activeTab === 'central' && (
              <div style={styles.gridCentral}>
                {filteredData.map((ministry, i) => (
                  <motion.div
                    key={ministry.name}
                    style={styles.ministryCard}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={{
                      y: -5,
                      boxShadow: '0 10px 30px rgba(139,92,246,0.12)',
                      borderColor: '#8b5cf6',
                    }}
                  >
                    <div style={styles.ministryIcon}>
                      <FaLandmark style={{ fontSize: '20px', color: '#8b5cf6' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={styles.ministryName}>{ministry.name}</h3>
                    </div>
                    <span style={styles.ministryCount}>{ministry.count} Schemes</span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* ===== NO RESULTS ===== */}
            {filteredData.length === 0 && (
              <div style={styles.noResults}>
                <span style={{ fontSize: '48px', marginBottom: '16px', display: 'block' }}>😔</span>
                <p style={{ fontSize: '18px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                  No results found for "{searchFilter}"
                </p>
                <p style={{ fontSize: '14px', color: '#94a3b8' }}>
                  Try different keywords
                </p>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* ========== VIEW ALL / SHOW LESS BUTTON ========== */}
        {!searchFilter && getTotalCount() > getDefaultVisible() && (
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <motion.button
              style={{
                ...styles.viewAllBtn,
                background: `linear-gradient(135deg, ${activeTabData.color}, ${activeTabData.color}cc)`,
              }}
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAll ? (
                <><FaChevronUp /> Show Less</>
              ) : (
                <><FaChevronDown /> View All ({getTotalCount()})</>
              )}
            </motion.button>
          </div>
        )}

        {/* ========== SUMMARY STATS BAR ========== */}
        <motion.div
          style={styles.summaryBar}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { num: '7,500+', label: 'Total Schemes' },
            { num: '36', label: 'States & UTs' },
            { num: '22+', label: 'Ministries' },
            { num: '15', label: 'Categories' },
          ].map((item, i) => (
            <React.Fragment key={item.label}>
              {i > 0 && <div style={styles.summaryDivider} />}
              <div style={styles.summaryItem}>
                <span style={styles.summaryNum}>{item.num}</span>
                <span style={styles.summaryLabel}>{item.label}</span>
              </div>
            </React.Fragment>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

const styles = {
  // ===== SECTION =====
  section: {
    padding: '80px 24px',
    background: 'linear-gradient(180deg, #f8faff 0%, white 50%, #f8faff 100%)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  // ===== HEADER =====
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  label: {
    display: 'inline-block',
    background: '#eff6ff',
    color: '#3b82f6',
    padding: '6px 20px',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '16px',
  },
  heading: {
    fontSize: 'clamp(28px, 4vw, 42px)',
    fontWeight: 900,
    color: '#1e293b',
    lineHeight: 1.2,
  },

  // ===== TABS =====
  tabsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '36px',
  },
  tabsContainer: {
    display: 'flex',
    gap: '10px',
    background: 'white',
    padding: '8px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    border: '1px solid #e2e8f0',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    borderRadius: '12px',
    border: '2px solid transparent',
    background: 'transparent',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'Inter, sans-serif',
    color: '#64748b',
    whiteSpace: 'nowrap',
  },
  tabCount: {
    padding: '2px 10px',
    borderRadius: '50px',
    fontSize: '11px',
    fontWeight: 700,
  },

  // ===== SEARCH =====
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'white',
    padding: '10px 18px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
    transition: 'border-color 0.3s',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    width: '100%',
    fontFamily: 'Inter, sans-serif',
    color: '#1e293b',
    background: 'transparent',
  },
  clearSearch: {
    background: '#f1f5f9',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '12px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.2s',
  },

  // ===== CATEGORIES GRID =====
  gridCategories: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
  },
  categoryCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px 18px',
    textAlign: 'center',
    border: '2px solid #e2e8f0',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  catIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 14px',
  },
  catName: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: '10px',
    lineHeight: 1.3,
    minHeight: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 14px',
    borderRadius: '50px',
    fontSize: '12px',
    fontWeight: 700,
  },

  // ===== STATES GRID =====
  gridStates: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '14px',
  },
  stateCard: {
    background: 'white',
    borderRadius: '14px',
    padding: '18px',
    border: '2px solid #e2e8f0',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  stateTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  },
  stateIconBox: {
    width: '42px',
    height: '42px',
    borderRadius: '10px',
    background: '#fff7ed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stateName: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#1e293b',
    lineHeight: 1.2,
  },
  stateType: {
    fontSize: '11px',
    color: '#94a3b8',
    fontWeight: 500,
    marginTop: '2px',
    display: 'block',
  },
  stateStats: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  statBadge: {
    padding: '4px 12px',
    borderRadius: '50px',
    fontSize: '11px',
    fontWeight: 700,
  },

  // ===== CENTRAL GRID =====
  gridCentral: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '14px',
  },
  ministryCard: {
    background: 'white',
    borderRadius: '14px',
    padding: '18px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    border: '2px solid #e2e8f0',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  ministryIcon: {
    width: '46px',
    height: '46px',
    borderRadius: '12px',
    background: '#ede9fe',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  ministryName: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#1e293b',
    lineHeight: 1.3,
  },
  ministryCount: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#8b5cf6',
    background: '#ede9fe',
    padding: '4px 12px',
    borderRadius: '50px',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },

  // ===== NO RESULTS =====
  noResults: {
    textAlign: 'center',
    padding: '60px 20px',
  },

  // ===== VIEW ALL BUTTON =====
  viewAllBtn: {
    padding: '14px 32px',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'Inter, sans-serif',
    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
  },

  // ===== SUMMARY BAR =====
  summaryBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '32px',
    marginTop: '50px',
    padding: '24px 32px',
    background: 'linear-gradient(135deg, #1e3a8a, #3730a3)',
    borderRadius: '20px',
    flexWrap: 'wrap',
    boxShadow: '0 10px 30px rgba(30,64,175,0.2)',
  },
  summaryItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  },
  summaryNum: {
    fontSize: '28px',
    fontWeight: 900,
    color: '#fbbf24',
  },
  summaryLabel: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.7)',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  summaryDivider: {
    width: '1px',
    height: '40px',
    background: 'rgba(255,255,255,0.15)',
  },
};

export default SchemeExplorer;