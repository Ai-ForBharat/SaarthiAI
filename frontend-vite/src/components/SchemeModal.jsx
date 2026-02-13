import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes, FaInfoCircle, FaGift, FaBuilding,
  FaFileAlt, FaClipboardList, FaChartBar, FaExternalLinkAlt
} from 'react-icons/fa';

const SchemeModal = ({ scheme, onClose }) => {
  if (!scheme) return null;

  const score = scheme.match_score || 0;
  const scoreColor = score >= 80 ? '#22c55e' : score >= 60 ? '#eab308' : '#ef4444';

  return (
    <AnimatePresence>
      <motion.div
        style={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          style={styles.modal}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button style={styles.closeBtn} onClick={onClose}>
            <FaTimes />
          </button>

          {/* Header */}
          <span style={{
            ...styles.badge,
            background: scheme.type === 'central' ? '#dcfce7' : '#fef3c7',
            color: scheme.type === 'central' ? '#16a34a' : '#92400e',
          }}>
            {scheme.type === 'central' ? '🇮🇳 Central Government' : '🏛️ State Government'}
          </span>

          <h2 style={styles.title}>{scheme.name}</h2>
          {scheme.name_en && (
            <p style={{ color: 'var(--text-lighter)', fontSize: '13px', marginBottom: '20px' }}>
              ({scheme.name_en})
            </p>
          )}

          {/* Sections */}
          <Section icon={<FaInfoCircle color="#3b82f6" />} title="Description">
            <p>{scheme.description}</p>
          </Section>

          <Section icon={<FaGift color="#22c55e" />} title="Benefits">
            <p>{scheme.benefits}</p>
          </Section>

          <Section icon={<FaBuilding color="#f97316" />} title="Ministry/Department">
            <p>{scheme.ministry || 'Government of India'}</p>
          </Section>

          <Section icon={<FaFileAlt color="#eab308" />} title="Documents Required">
            <ul style={{ paddingLeft: '20px' }}>
              {(scheme.documents || ['Check official website']).map((doc, i) => (
                <li key={i} style={{ marginBottom: '4px', fontSize: '14px', color: 'var(--text-secondary)' }}>{doc}</li>
              ))}
            </ul>
          </Section>

          <Section icon={<FaClipboardList color="#8b5cf6" />} title="How to Apply">
            <p>{scheme.how_to_apply || 'Visit official website'}</p>
          </Section>

          {/* Score Bar */}
          <Section icon={<FaChartBar color="#22c55e" />} title="Your Match Score">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
              <div style={styles.scoreBarBg}>
                <motion.div
                  style={{ ...styles.scoreBarFill, background: scoreColor }}
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
              <strong style={{ fontSize: '20px', color: scoreColor }}>{score}%</strong>
            </div>
          </Section>

          {/* Apply Button */}
          <motion.a
            href={scheme.apply_link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.applyBtn}
            whileHover={{ scale: 1.02, boxShadow: '0 6px 20px rgba(34,197,94,0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            <FaExternalLinkAlt /> Apply Now on Official Website
          </motion.a>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Section = ({ icon, title, children }) => (
  <div style={{ marginBottom: '20px' }}>
    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, marginBottom: '8px', color: 'var(--text)' }}>
      {icon} {title}
    </h4>
    <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
      {children}
    </div>
  </div>
);

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '20px',
    backdropFilter: 'blur(6px)',
  },
  modal: {
    background: 'var(--bg-card)',
    borderRadius: '20px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '85vh',
    overflowY: 'auto',
    padding: '32px',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: 'none',
    background: '#f1f5f9',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    color: 'var(--text-light)',
    transition: 'all 0.3s ease',
  },
  badge: {
    display: 'inline-block',
    padding: '6px 16px',
    borderRadius: '50px',
    fontSize: '12px',
    fontWeight: 700,
    marginBottom: '14px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 800,
    color: 'var(--text)',
    marginBottom: '6px',
    paddingRight: '40px',
    lineHeight: 1.3,
  },
  scoreBarBg: {
    flex: 1,
    height: '12px',
    background: '#e2e8f0',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: '10px',
  },
  applyBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '16px 28px',
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
    textDecoration: 'none',
    width: '100%',
    fontFamily: 'Inter, sans-serif',
    marginTop: '10px',
  },
};

export default SchemeModal;