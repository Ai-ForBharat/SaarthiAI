import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import SchemeCard from './SchemeCard';
import SchemeModal from './SchemeModal';
import { FaRedo, FaFilter, FaHome, FaSortAmountDown } from 'react-icons/fa';

const Results = () => {
  const { results, totalMatches, resetApp, setCurrentView } = useApp();
  const [filter, setFilter] = useState('all');
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [sortBy, setSortBy] = useState('default');

  // 🔥 CLASSIFY SCHEMES INTO CENTRAL / STATE
  const classifiedResults = useMemo(() => {
    return results.map(scheme => {
      // Check if scheme already has a type
      if (scheme.type === 'central' || scheme.type === 'state') return scheme;

      // Auto-classify based on scheme data
      const name = (scheme.scheme_name || scheme.name || '').toLowerCase();
      const desc = (scheme.description || '').toLowerCase();
      const ministry = (scheme.ministry || scheme.department || '').toLowerCase();
      const level = (scheme.level || '').toLowerCase();

      // Check for state-level indicators
      const stateKeywords = [
        'state', 'pradesh', 'rajya', 'mukhyamantri', 'cm ',
        'chief minister', 'state government', 'state govt',
        // State names
        'andhra', 'arunachal', 'assam', 'bihar', 'chhattisgarh',
        'goa', 'gujarat', 'haryana', 'himachal', 'jharkhand',
        'karnataka', 'kerala', 'madhya pradesh', 'maharashtra',
        'manipur', 'meghalaya', 'mizoram', 'nagaland', 'odisha',
        'punjab', 'rajasthan', 'sikkim', 'tamil nadu', 'telangana',
        'tripura', 'uttar pradesh', 'uttarakhand', 'west bengal',
        'delhi', 'jammu', 'kashmir', 'ladakh', 'chandigarh',
        'puducherry', 'lakshadweep', 'andaman'
      ];

      const centralKeywords = [
        'pradhan mantri', 'pm ', 'pm-', 'national', 'central',
        'bharat', 'india', 'government of india', 'goi',
        'ministry of', 'union', 'centrally sponsored',
        'ayushman', 'jan dhan', 'mudra', 'ujjwala', 'swachh',
        'digital india', 'make in india', 'skill india',
        'atal', 'nehru', 'gandhi', 'indira', 'rajiv'
      ];

      const combined = `${name} ${desc} ${ministry} ${level}`;

      if (level === 'central' || level === 'national') {
        return { ...scheme, type: 'central' };
      }
      if (level === 'state') {
        return { ...scheme, type: 'state' };
      }

      const isCentral = centralKeywords.some(kw => combined.includes(kw));
      const isState = stateKeywords.some(kw => combined.includes(kw));

      if (isCentral && !isState) return { ...scheme, type: 'central' };
      if (isState && !isCentral) return { ...scheme, type: 'state' };
      if (isCentral && isState) return { ...scheme, type: 'central' }; // default to central if both match

      // Default: classify as central
      return { ...scheme, type: 'central' };
    });
  }, [results]);

  // Filter
  const filteredResults = useMemo(() => {
    let filtered = filter === 'all'
      ? classifiedResults
      : classifiedResults.filter(s => s.type === filter);

    // Sort
    if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) =>
        (a.scheme_name || a.name || '').localeCompare(b.scheme_name || b.name || '')
      );
    }

    return filtered;
  }, [classifiedResults, filter, sortBy]);

  const centralCount = classifiedResults.filter(s => s.type === 'central').length;
  const stateCount = classifiedResults.filter(s => s.type === 'state').length;

  const goHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section style={styles.fullPage}>
      {/* Background decorations */}
      <div style={styles.bgDecor1} />
      <div style={styles.bgDecor2} />
      <div style={styles.bgDecor3} />

      <div style={styles.container}>

        {/* Top Nav */}
        <motion.div
          style={styles.topNav}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.button
            onClick={goHome}
            style={styles.backHomeBtn}
            whileHover={{ scale: 1.05, background: '#1e293b' }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHome /> Back to Home
          </motion.button>
        </motion.div>

        {/* Header Card */}
        <motion.div
          style={styles.headerCard}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div style={styles.headerLeft}>
            <motion.div
              style={styles.headerIcon}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
            >
              📋
            </motion.div>
            <div>
              <h2 style={styles.title}>Your Eligible Schemes</h2>
              <p style={styles.count}>
                Found <strong style={styles.countHighlight}>{totalMatches}</strong> schemes matching your profile
              </p>
            </div>
          </div>
          <div style={styles.headerActions}>
            <motion.button
              style={styles.searchAgainBtn}
              onClick={resetApp}
              whileHover={{ scale: 1.05, boxShadow: '0 6px 20px rgba(59,130,246,0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRedo /> Search Again
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          style={styles.statsRow}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {[
            { label: 'Total Schemes', value: totalMatches, icon: '📊', color: '#22c55e' },
            { label: 'Central Govt', value: centralCount, icon: '🇮🇳', color: '#3b82f6' },
            { label: 'State Govt', value: stateCount, icon: '🏛️', color: '#8b5cf6' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              style={{
                ...styles.statCard,
                ...(filter !== 'all' && filter === stat.label.toLowerCase().split(' ')[0]
                  ? styles.statCardActive
                  : {}),
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.03, borderColor: stat.color }}
            >
              <span style={styles.statIcon}>{stat.icon}</span>
              <span style={{ ...styles.statNum, color: stat.color }}>{stat.value}</span>
              <span style={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Filter + Sort Bar */}
        <motion.div
          style={styles.filterBar}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div style={styles.filterLeft}>
            <FaFilter style={{ color: '#64748b', fontSize: '13px' }} />
            <span style={styles.filterLabel}>Filter:</span>
            <div style={styles.filterBtns}>
              {[
                { key: 'all', label: 'All', emoji: '📊', count: classifiedResults.length },
                { key: 'central', label: 'Central', emoji: '🇮🇳', count: centralCount },
                { key: 'state', label: 'State', emoji: '🏛️', count: stateCount },
              ].map(f => (
                <motion.button
                  key={f.key}
                  style={{
                    ...styles.filterBtn,
                    ...(filter === f.key ? styles.filterBtnActive : {}),
                  }}
                  onClick={() => setFilter(f.key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {f.emoji} {f.label}
                  <span style={{
                    ...styles.filterCount,
                    ...(filter === f.key ? styles.filterCountActive : {}),
                  }}>
                    {f.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          <div style={styles.sortSection}>
            <FaSortAmountDown style={{ color: '#64748b', fontSize: '12px' }} />
            <select
              style={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default Order</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </motion.div>

        {/* Results Info */}
        <motion.div
          style={styles.resultsInfo}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span style={styles.resultsInfoText}>
            Showing <strong style={{ color: '#22c55e' }}>{filteredResults.length}</strong> of {classifiedResults.length} schemes
            {filter !== 'all' && (
              <span style={styles.activeFilterTag}>
                {filter === 'central' ? '🇮🇳 Central Government' : '🏛️ State Government'}
                <button
                  style={styles.clearFilterBtn}
                  onClick={() => setFilter('all')}
                >
                  ✕
                </button>
              </span>
            )}
          </span>
        </motion.div>

        {/* === CLASSIFIED SECTIONS VIEW === */}
        {filter === 'all' ? (
          <>
            {/* Central Schemes Section */}
            {centralCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div style={styles.sectionHeader}>
                  <div style={styles.sectionHeaderLeft}>
                    <span style={styles.sectionEmoji}>🇮🇳</span>
                    <div>
                      <h3 style={styles.sectionTitle}>Central Government Schemes</h3>
                      <p style={styles.sectionSubtitle}>
                        {centralCount} scheme{centralCount !== 1 ? 's' : ''} from Government of India
                      </p>
                    </div>
                  </div>
                  <motion.button
                    style={styles.viewAllBtn}
                    onClick={() => setFilter('central')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View All →
                  </motion.button>
                </div>

                <div style={styles.grid}>
                  {classifiedResults
                    .filter(s => s.type === 'central')
                    .map((scheme, index) => (
                      <motion.div
                        key={scheme.id || `central-${index}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * Math.min(index, 6), duration: 0.4 }}
                      >
                        <SchemeCard
                          scheme={scheme}
                          index={index}
                          onViewDetails={setSelectedScheme}
                        />
                      </motion.div>
                    ))}
                </div>

                <div style={styles.sectionDivider} />
              </motion.div>
            )}

            {/* State Schemes Section */}
            {stateCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div style={styles.sectionHeader}>
                  <div style={styles.sectionHeaderLeft}>
                    <span style={styles.sectionEmoji}>🏛️</span>
                    <div>
                      <h3 style={styles.sectionTitle}>State Government Schemes</h3>
                      <p style={styles.sectionSubtitle}>
                        {stateCount} scheme{stateCount !== 1 ? 's' : ''} from your State Government
                      </p>
                    </div>
                  </div>
                  <motion.button
                    style={styles.viewAllBtn}
                    onClick={() => setFilter('state')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View All →
                  </motion.button>
                </div>

                <div style={styles.grid}>
                  {classifiedResults
                    .filter(s => s.type === 'state')
                    .map((scheme, index) => (
                      <motion.div
                        key={scheme.id || `state-${index}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * Math.min(index, 6), duration: 0.4 }}
                      >
                        <SchemeCard
                          scheme={scheme}
                          index={index}
                          onViewDetails={setSelectedScheme}
                        />
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* If no schemes at all */}
            {centralCount === 0 && stateCount === 0 && (
              <motion.div
                style={styles.empty}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div style={styles.emptyIcon}>😔</div>
                <h3 style={styles.emptyTitle}>No schemes found</h3>
                <p style={styles.emptyText}>Try searching with different details</p>
                <motion.button
                  style={styles.emptyBtn}
                  onClick={resetApp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaRedo /> Search Again
                </motion.button>
              </motion.div>
            )}
          </>
        ) : (
          /* === FILTERED VIEW (Central only / State only) === */
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {filteredResults.length > 0 ? (
                  <div style={styles.grid}>
                    {filteredResults.map((scheme, index) => (
                      <motion.div
                        key={scheme.id || `${filter}-${index}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * Math.min(index, 10), duration: 0.4 }}
                      >
                        <SchemeCard
                          scheme={scheme}
                          index={index}
                          onViewDetails={setSelectedScheme}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    style={styles.empty}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div style={styles.emptyIcon}>
                      {filter === 'central' ? '🇮🇳' : '🏛️'}
                    </div>
                    <h3 style={styles.emptyTitle}>
                      No {filter === 'central' ? 'Central' : 'State'} Government schemes found
                    </h3>
                    <p style={styles.emptyText}>
                      {filter === 'central'
                        ? 'No central government schemes matched your profile. Check state schemes instead.'
                        : 'No state government schemes matched your profile. Check central schemes instead.'}
                    </p>
                    <div style={styles.emptyActions}>
                      <motion.button
                        style={styles.emptyBtn}
                        onClick={() => setFilter('all')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Show All Schemes
                      </motion.button>
                      <motion.button
                        style={styles.emptyBtnOutline}
                        onClick={() => setFilter(filter === 'central' ? 'state' : 'central')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View {filter === 'central' ? '🏛️ State' : '🇮🇳 Central'} Schemes
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        )}

        {/* Bottom CTA */}
        {classifiedResults.length > 0 && (
          <motion.div
            style={styles.bottomCta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <p style={styles.bottomCtaText}>
              Not finding what you need? Try searching with different details.
            </p>
            <div style={styles.bottomCtaBtns}>
              <motion.button
                style={styles.bottomCtaBtn}
                onClick={resetApp}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(34,197,94,0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                <FaRedo /> Search Again
              </motion.button>
              <motion.button
                style={styles.bottomCtaBtnOutline}
                onClick={goHome}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaHome /> Go Home
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {selectedScheme && (
        <SchemeModal
          scheme={selectedScheme}
          onClose={() => setSelectedScheme(null)}
        />
      )}
    </section>
  );
};

const styles = {
  /* FULL PAGE DARK BACKGROUND */
  fullPage: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #020617 0%, #0f172a 30%, #0f172a 70%, #020617 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  bgDecor1: {
    position: 'absolute',
    top: '-200px',
    right: '-200px',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgDecor2: {
    position: 'absolute',
    bottom: '-150px',
    left: '-150px',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgDecor3: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    height: '800px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: 'clamp(24px, 4vw, 40px) clamp(12px, 3vw, 20px)',
    position: 'relative',
    zIndex: 1,
  },

  /* Top Nav */
  topNav: {
    marginBottom: '20px',
  },
  backHomeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 18px',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '50px',
    color: '#94a3b8',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.3s ease',
  },

  /* Header Card */
  headerCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    marginBottom: 'clamp(20px, 4vw, 28px)',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: 'clamp(16px, 3vw, 20px)',
    padding: 'clamp(20px, 4vw, 28px)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  headerIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))',
    border: '2px solid rgba(34,197,94,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    flexShrink: 0,
  },
  title: {
    fontSize: 'clamp(20px, 4vw, 26px)',
    fontWeight: 800,
    color: '#ffffff',
    margin: 0,
  },
  count: {
    color: '#94a3b8',
    fontSize: 'clamp(13px, 2.5vw, 15px)',
    marginTop: '4px',
  },
  countHighlight: {
    color: '#22c55e',
    fontSize: 'clamp(16px, 3vw, 20px)',
    fontWeight: 900,
  },
  headerActions: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  searchAgainBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: 'clamp(10px, 2vw, 12px) clamp(20px, 3vw, 28px)',
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    border: 'none',
    color: '#ffffff',
    borderRadius: '12px',
    fontSize: 'clamp(13px, 2.5vw, 14px)',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
  },

  /* Stats Row */
  statsRow: {
    display: 'flex',
    gap: 'clamp(10px, 2vw, 16px)',
    marginBottom: 'clamp(20px, 4vw, 28px)',
    flexWrap: 'wrap',
  },
  statCard: {
    flex: 1,
    minWidth: '120px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '16px',
    padding: 'clamp(14px, 3vw, 20px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  statCardActive: {
    borderColor: '#22c55e',
    boxShadow: '0 4px 20px rgba(34,197,94,0.2)',
  },
  statIcon: { fontSize: '22px' },
  statNum: {
    fontSize: 'clamp(24px, 4vw, 32px)',
    fontWeight: 900,
  },
  statLabel: {
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#64748b',
    fontWeight: 600,
  },

  /* Filter + Sort Bar */
  filterBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'clamp(10px, 2vw, 16px)',
    marginBottom: 'clamp(8px, 2vw, 12px)',
    flexWrap: 'wrap',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '16px',
    padding: 'clamp(12px, 2.5vw, 16px) clamp(16px, 3vw, 24px)',
  },
  filterLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  filterLabel: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  filterBtns: {
    display: 'flex',
    gap: 'clamp(6px, 1.5vw, 8px)',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 2.5vw, 18px)',
    border: '2px solid #1e293b',
    borderRadius: '50px',
    background: '#020617',
    fontSize: 'clamp(12px, 2.5vw, 13px)',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.3s ease',
    color: '#94a3b8',
  },
  filterBtnActive: {
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: '#ffffff',
    borderColor: '#22c55e',
    boxShadow: '0 4px 15px rgba(34,197,94,0.3)',
  },
  filterCount: {
    background: 'rgba(255,255,255,0.1)',
    padding: '1px 8px',
    borderRadius: '50px',
    fontSize: 'clamp(10px, 2vw, 11px)',
    fontWeight: 700,
    color: '#64748b',
  },
  filterCountActive: {
    background: 'rgba(255,255,255,0.25)',
    color: '#ffffff',
  },
  sortSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  sortSelect: {
    padding: '6px 12px',
    background: '#020617',
    border: '2px solid #1e293b',
    borderRadius: '8px',
    color: '#94a3b8',
    fontSize: '12px',
    fontWeight: 600,
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer',
    outline: 'none',
  },

  /* Results Info */
  resultsInfo: {
    marginBottom: 'clamp(16px, 3vw, 24px)',
    paddingLeft: '4px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
  },
  resultsInfoText: {
    fontSize: '13px',
    color: '#64748b',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  activeFilterTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '3px 12px',
    background: 'rgba(34,197,94,0.1)',
    border: '1px solid rgba(34,197,94,0.3)',
    borderRadius: '50px',
    fontSize: '12px',
    color: '#22c55e',
    fontWeight: 600,
  },
  clearFilterBtn: {
    background: 'none',
    border: 'none',
    color: '#22c55e',
    fontSize: '12px',
    cursor: 'pointer',
    padding: '0 2px',
    fontWeight: 700,
  },

  /* Section Headers (for classified view) */
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'clamp(16px, 3vw, 20px)',
    marginTop: 'clamp(8px, 2vw, 12px)',
    padding: 'clamp(16px, 3vw, 24px)',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '16px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  sectionHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  sectionEmoji: {
    fontSize: 'clamp(28px, 5vw, 36px)',
    flexShrink: 0,
  },
  sectionTitle: {
    fontSize: 'clamp(16px, 3.5vw, 20px)',
    fontWeight: 800,
    color: '#ffffff',
    margin: 0,
  },
  sectionSubtitle: {
    fontSize: 'clamp(12px, 2.5vw, 13px)',
    color: '#64748b',
    marginTop: '2px',
  },
  viewAllBtn: {
    padding: '8px 18px',
    background: 'rgba(34,197,94,0.1)',
    border: '1px solid rgba(34,197,94,0.3)',
    borderRadius: '50px',
    color: '#22c55e',
    fontSize: '13px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.3s ease',
  },
  sectionDivider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #1e293b, transparent)',
    margin: 'clamp(24px, 5vw, 40px) 0',
  },

  /* Grid */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(280px, 80vw, 340px), 1fr))',
    gap: 'clamp(14px, 3vw, 20px)',
  },

  /* Empty State */
  empty: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: 'clamp(50px, 10vw, 80px) 20px',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '20px',
  },
  emptyIcon: {
    fontSize: '56px',
    marginBottom: '16px',
  },
  emptyTitle: {
    fontSize: 'clamp(18px, 4vw, 22px)',
    fontWeight: 700,
    color: '#e2e8f0',
    marginBottom: '8px',
  },
  emptyText: {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '24px',
    maxWidth: '400px',
    margin: '0 auto 24px',
    lineHeight: 1.6,
  },
  emptyActions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  emptyBtn: {
    padding: '12px 28px',
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  emptyBtnOutline: {
    padding: '12px 28px',
    background: 'transparent',
    color: '#94a3b8',
    border: '2px solid #1e293b',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
  },

  /* Bottom CTA */
  bottomCta: {
    textAlign: 'center',
    marginTop: 'clamp(30px, 5vw, 50px)',
    padding: 'clamp(24px, 4vw, 36px)',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
  },
  bottomCtaText: {
    fontSize: 'clamp(13px, 2.5vw, 15px)',
    color: '#94a3b8',
    marginBottom: '16px',
  },
  bottomCtaBtns: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  bottomCtaBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50px',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
  },
  bottomCtaBtnOutline: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 32px',
    background: 'transparent',
    color: '#94a3b8',
    border: '2px solid #1e293b',
    borderRadius: '50px',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
  },
};

export default Results;