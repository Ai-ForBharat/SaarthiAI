import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  FaThList, FaMapMarkedAlt, FaLandmark,
  FaChevronDown, FaChevronUp, FaMapMarkerAlt,
  FaSearch, FaTimes, FaSeedling, FaUniversity,
  FaBriefcase, FaGraduationCap, FaHeartbeat,
  FaHome, FaBalanceScale, FaLaptopCode,
  FaTools, FaHandsHelping, FaMedal,
  FaCar, FaPlane, FaTint, FaFemale,
  FaMap, FaCity, FaFlag, FaMountain,
  FaWater, FaTree, FaSun, FaGlobeAsia
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

  const categoryIcons = {
    'Agriculture, Rural & Environment': <FaSeedling />,
    'Banking, Financial Services & Insurance': <FaUniversity />,
    'Business & Entrepreneurship': <FaBriefcase />,
    'Education & Learning': <FaGraduationCap />,
    'Health & Wellness': <FaHeartbeat />,
    'Housing & Shelter': <FaHome />,
    'Public Safety, Law & Justice': <FaBalanceScale />,
    'Science, IT & Communications': <FaLaptopCode />,
    'Skills & Employment': <FaTools />,
    'Social Welfare & Empowerment': <FaHandsHelping />,
    'Sports & Culture': <FaMedal />,
    'Transport & Infrastructure': <FaCar />,
    'Travel & Tourism': <FaPlane />,
    'Utility & Sanitation': <FaTint />,
    'Women and Child': <FaFemale />,
  };

  const stateIcons = {
    'Andaman and Nicobar Islands': <FaWater />,
    'Andhra Pradesh': <FaSun />,
    'Arunachal Pradesh': <FaMountain />,
    'Assam': <FaTree />,
    'Bihar': <FaMap />,
    'Chandigarh': <FaCity />,
    'Chhattisgarh': <FaTree />,
    'Dadra & Nagar Haveli and Daman & Diu': <FaWater />,
    'Delhi': <FaCity />,
    'Goa': <FaWater />,
    'Gujarat': <FaSun />,
    'Haryana': <FaSeedling />,
    'Himachal Pradesh': <FaMountain />,
    'Jammu and Kashmir': <FaMountain />,
    'Jharkhand': <FaTree />,
    'Karnataka': <FaMap />,
    'Kerala': <FaWater />,
    'Ladakh': <FaMountain />,
    'Lakshadweep': <FaWater />,
    'Madhya Pradesh': <FaMap />,
    'Maharashtra': <FaCity />,
    'Manipur': <FaMountain />,
    'Meghalaya': <FaMountain />,
    'Mizoram': <FaMountain />,
    'Nagaland': <FaMountain />,
    'Odisha': <FaWater />,
    'Puducherry': <FaWater />,
    'Punjab': <FaSeedling />,
    'Rajasthan': <FaSun />,
    'Sikkim': <FaMountain />,
    'Tamil Nadu': <FaMap />,
    'Telangana': <FaSun />,
    'Tripura': <FaTree />,
    'Uttar Pradesh': <FaMap />,
    'Uttarakhand': <FaMountain />,
    'West Bengal': <FaMap />,
  };

  const getCategoryIcon = (name) => {
    return categoryIcons[name] || <FaThList />;
  };

  const getStateIcon = (name) => {
    return stateIcons[name] || <FaGlobeAsia />;
  };

  const tabs = [
    { key: 'categories', label: 'Categories', icon: <FaThList /> },
    { key: 'states', label: 'States/UTs', icon: <FaMapMarkedAlt /> },
    { key: 'central', label: 'Central Ministries', icon: <FaLandmark /> },
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

  const getTabCount = (key) => {
    if (key === 'categories') return CATEGORIES.length;
    if (key === 'states') return STATE_DATA.length;
    if (key === 'central') return MINISTRIES.length;
    return 0;
  };

  const filteredData = getFilteredData();

  return (
    <section id="scheme-explorer" style={styles.section}>
      <div style={styles.bgDecor1} />
      <div style={styles.bgDecor2} />

      <div style={styles.container}>

        {/* HEADER */}
        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={styles.heading}>
            Discover Government Schemes{' '}
            <span style={{ color: '#f97316' }}>Your Way</span>
          </h2>
          <p style={styles.headerDesc}>
            Browse schemes by categories, states, or central ministries
          </p>
        </motion.div>

        {/* SEARCH + TABS */}
        <motion.div
          style={styles.controlsWrapper}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Search Bar */}
          <div style={styles.searchBar}>
            <FaSearch style={styles.searchIcon} />
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
              <motion.button
                onClick={() => { setSearchFilter(''); setShowAll(false); }}
                style={styles.clearSearch}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.8 }}
              >
                <FaTimes />
              </motion.button>
            )}
          </div>

          {/* Results count */}
          {searchFilter && (
            <motion.span
              style={styles.resultsCount}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Found <strong style={{ color: '#f97316' }}>{filteredData.length}</strong> results
            </motion.span>
          )}

          {/* Round Tab Buttons */}
          <div style={styles.tabsRow}>
            {tabs.map((tab, i) => (
              <motion.button
                key={tab.key}
                style={{
                  ...styles.roundTab,
                  ...(activeTab === tab.key ? styles.roundTabActive : {}),
                }}
                onClick={() => {
                  setActiveTab(tab.key);
                  setShowAll(false);
                  setSearchFilter('');
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <span style={{
                  ...styles.roundTabIcon,
                  ...(activeTab === tab.key ? styles.roundTabIconActive : {}),
                }}>
                  {tab.icon}
                </span>
                <span style={{
                  ...styles.roundTabLabel,
                  ...(activeTab === tab.key ? styles.roundTabLabelActive : {}),
                }}>
                  {tab.label}
                </span>
                <span style={{
                  ...styles.roundTabCount,
                  ...(activeTab === tab.key ? styles.roundTabCountActive : {}),
                }}>
                  {getTabCount(tab.key)}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >

            {/* CATEGORIES */}
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
                      boxShadow: '0 15px 40px rgba(0,0,0,0.06)',
                      borderColor: '#d1d5db',
                    }}
                  >
                    <div style={styles.catIcon}>
                      <span style={styles.catIconInner}>
                        {getCategoryIcon(cat.name)}
                      </span>
                    </div>
                    <h3 style={styles.catName}>{cat.name}</h3>
                    <div style={styles.catBadge}>
                      {cat.count} Schemes
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* STATES */}
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
                      boxShadow: '0 12px 35px rgba(59,130,246,0.08)',
                      borderColor: 'rgba(59,130,246,0.3)',
                    }}
                  >
                    <div style={styles.stateTop}>
                      <div style={styles.stateIconBox}>
                        <span style={styles.stateIconInner}>
                          {getStateIcon(state.name)}
                        </span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={styles.stateName}>{state.name}</h3>
                        <span style={styles.stateType}>
                          {state.type === 'UT' ? 'Union Territory' : 'State'}
                        </span>
                      </div>
                    </div>
                    <div style={styles.stateStats}>
                      {state.type === 'UT' ? (
                        <span style={styles.statBadgeBlue}>
                          {state.ut} UT Schemes
                        </span>
                      ) : (
                        <span style={styles.statBadgeBlue}>
                          {state.state} State Schemes
                        </span>
                      )}
                      <span style={styles.statBadgeBlue}>
                        {state.central} Central
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* CENTRAL MINISTRIES */}
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
                      boxShadow: '0 12px 35px rgba(139,92,246,0.08)',
                      borderColor: 'rgba(139,92,246,0.3)',
                    }}
                  >
                    <div style={styles.ministryIcon}>
                      <FaLandmark style={{ fontSize: '18px', color: '#8b5cf6' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={styles.ministryName}>{ministry.name}</h3>
                    </div>
                    <span style={styles.ministryCount}>{ministry.count} Schemes</span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* NO RESULTS */}
            {filteredData.length === 0 && (
              <motion.div
                style={styles.noResults}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h3 style={styles.noResultsTitle}>No results found</h3>
                <p style={styles.noResultsText}>
                  No matches for "<strong>{searchFilter}</strong>". Try different keywords.
                </p>
                <motion.button
                  style={styles.noResultsBtn}
                  onClick={() => { setSearchFilter(''); setShowAll(false); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear Search
                </motion.button>
              </motion.div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* VIEW ALL / SHOW LESS */}
        {!searchFilter && getTotalCount() > getDefaultVisible() && (
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <motion.button
              style={styles.viewAllBtn}
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(249,115,22,0.3)' }}
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

        {/* SUMMARY BAR */}
        <motion.div
          style={styles.summaryBar}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { num: '7,500+', label: 'Total Schemes', color: '#f97316' },
            { num: '36', label: 'States & UTs', color: '#3b82f6' },
            { num: '22+', label: 'Ministries', color: '#8b5cf6' },
            { num: '15', label: 'Categories', color: '#f59e0b' },
          ].map((item, i) => (
            <React.Fragment key={item.label}>
              {i > 0 && <div style={styles.summaryDivider} />}
              <motion.div
                style={styles.summaryItem}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <span style={{ ...styles.summaryNum, color: item.color }}>{item.num}</span>
                <span style={styles.summaryLabel}>{item.label}</span>
              </motion.div>
            </React.Fragment>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: 'clamp(60px, 10vw, 100px) 24px',
    background: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
  },

  bgDecor1: {
    position: 'absolute',
    top: '-150px',
    right: '-150px',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgDecor2: {
    position: 'absolute',
    bottom: '-100px',
    left: '-100px',
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)',
    pointerEvents: 'none',
  },

  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },

  /* Header */
  header: {
    textAlign: 'center',
    marginBottom: 'clamp(32px, 5vw, 44px)',
  },
  heading: {
    fontSize: 'clamp(26px, 4vw, 40px)',
    fontWeight: 800,
    color: '#1a1a1a',
    lineHeight: 1.2,
    marginBottom: '12px',
  },
  headerDesc: {
    fontSize: 'clamp(13px, 2.5vw, 15px)',
    color: '#6b7280',
    fontWeight: 500,
  },

  /* Controls Wrapper */
  controlsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '18px',
    marginBottom: '36px',
  },

  /* Search */
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: '#f9fafb',
    padding: '0 16px',
    borderRadius: '50px',
    border: '2px solid #e5e7eb',
    width: '100%',
    maxWidth: '460px',
    transition: 'border-color 0.3s',
  },
  searchIcon: {
    color: '#9ca3af',
    fontSize: '14px',
    flexShrink: 0,
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    width: '100%',
    fontFamily: 'Inter, sans-serif',
    color: '#1a1a1a',
    background: 'transparent',
    padding: '14px 0',
  },
  clearSearch: {
    background: '#e5e7eb',
    border: 'none',
    color: '#6b7280',
    cursor: 'pointer',
    fontSize: '10px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontFamily: 'Inter, sans-serif',
  },
  resultsCount: {
    fontSize: '13px',
    color: '#9ca3af',
    fontWeight: 500,
  },

  /* Round Tab Buttons */
  tabsRow: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  roundTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 24px',
    borderRadius: '50px',
    border: '2px solid #e5e7eb',
    background: '#ffffff',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'Inter, sans-serif',
    color: '#6b7280',
    whiteSpace: 'nowrap',
  },
  roundTabActive: {
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    borderColor: '#f97316',
    color: '#ffffff',
    boxShadow: '0 6px 24px rgba(249,115,22,0.25)',
  },
  roundTabIcon: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#9ca3af',
  },
  roundTabIconActive: {
    color: '#ffffff',
  },
  roundTabLabel: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#4b5563',
  },
  roundTabLabelActive: {
    color: '#ffffff',
  },
  roundTabCount: {
    padding: '2px 10px',
    borderRadius: '50px',
    fontSize: '11px',
    fontWeight: 700,
    background: '#f3f4f6',
    color: '#6b7280',
    border: '1px solid #e5e7eb',
  },
  roundTabCountActive: {
    background: 'rgba(255,255,255,0.2)',
    color: '#ffffff',
    border: '1px solid rgba(255,255,255,0.3)',
  },

  /* Categories Grid */
  gridCategories: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
    gap: '14px',
  },
  categoryCard: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '24px 18px',
    textAlign: 'center',
    border: '1px solid #e5e7eb',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
  },
  catIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px',
    background: '#f3f4f6',
    border: '1px solid #e5e7eb',
  },
  catIconInner: {
    fontSize: '22px',
    color: '#1a1a1a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  catName: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: '10px',
    lineHeight: 1.3,
    minHeight: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  catBadge: {
    display: 'inline-block',
    padding: '4px 14px',
    borderRadius: '50px',
    fontSize: '11px',
    fontWeight: 700,
    background: 'rgba(249,115,22,0.06)',
    color: '#f97316',
    border: '1px solid rgba(249,115,22,0.2)',
  },

  /* States Grid */
  gridStates: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '12px',
  },
  stateCard: {
    background: '#ffffff',
    borderRadius: '14px',
    padding: '16px',
    border: '1px solid #e5e7eb',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
  },
  stateTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  },
  stateIconBox: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#f3f4f6',
    border: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stateIconInner: {
    fontSize: '16px',
    color: '#1a1a1a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateName: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#1a1a1a',
    lineHeight: 1.2,
  },
  stateType: {
    fontSize: '11px',
    color: '#9ca3af',
    fontWeight: 500,
    marginTop: '2px',
    display: 'block',
  },
  stateStats: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  statBadgeBlue: {
    padding: '4px 12px',
    borderRadius: '50px',
    fontSize: '11px',
    fontWeight: 700,
    border: '1px solid rgba(59,130,246,0.2)',
    background: 'rgba(59,130,246,0.06)',
    color: '#3b82f6',
  },

  /* Central Grid */
  gridCentral: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '12px',
  },
  ministryCard: {
    background: '#ffffff',
    borderRadius: '14px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    border: '1px solid #e5e7eb',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
  },
  ministryIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'rgba(139,92,246,0.06)',
    border: '1px solid rgba(139,92,246,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  ministryName: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#1a1a1a',
    lineHeight: 1.3,
    margin: 0,
  },
  ministryCount: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#8b5cf6',
    background: 'rgba(139,92,246,0.06)',
    border: '1px solid rgba(139,92,246,0.2)',
    padding: '4px 12px',
    borderRadius: '50px',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },

  /* No Results */
  noResults: {
    textAlign: 'center',
    padding: 'clamp(40px, 8vw, 60px) 20px',
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '20px',
  },
  noResultsTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: '6px',
  },
  noResultsText: {
    fontSize: '13px',
    color: '#9ca3af',
    marginBottom: '18px',
  },
  noResultsBtn: {
    padding: '10px 24px',
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50px',
    fontSize: '13px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
  },

  /* View All Button */
  viewAllBtn: {
    padding: '14px 32px',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'Inter, sans-serif',
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    boxShadow: '0 6px 20px rgba(249,115,22,0.2)',
  },

  /* Summary Bar */
  summaryBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 'clamp(20px, 4vw, 40px)',
    marginTop: 'clamp(40px, 6vw, 60px)',
    padding: 'clamp(20px, 4vw, 28px) clamp(20px, 4vw, 36px)',
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '20px',
    flexWrap: 'wrap',
    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
  },
  summaryItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  },
  summaryNum: {
    fontSize: 'clamp(24px, 4vw, 30px)',
    fontWeight: 900,
  },
  summaryLabel: {
    fontSize: '11px',
    color: '#9ca3af',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  summaryDivider: {
    width: '1px',
    height: '36px',
    background: '#e5e7eb',
  },
};

export default SchemeExplorer;