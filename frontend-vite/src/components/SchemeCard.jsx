import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

const SchemeCard = ({ scheme, index, onViewDetails }) => {
  const score = scheme.match_score || 0;

  const getScoreColor = () => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#eab308';
    return '#ef4444';
  };

  const getScoreBg = () => {
    if (score >= 80) return '#f0fdf4';
    if (score >= 60) return '#fefce8';
    return '#fef2f2';
  };

  const formatCategory = (cat) => {
    if (!cat) return 'General';
    return cat.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <motion.div
      style={styles.card}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,0,0,0.12)' }}
    >
      {/* Top Row */}
      <div style={styles.top}>
        <span style={{
          ...styles.typeBadge,
          background: scheme.type === 'central' ? '#dcfce7' : '#fef3c7',
          color: scheme.type === 'central' ? '#16a34a' : '#92400e',
        }}>
          {scheme.type === 'central' ? '🇮🇳 Central' : '🏛️ State'}
        </span>

        <div style={{
          ...styles.scoreCircle,
          borderColor: getScoreColor(),
          background: getScoreBg(),
        }}>
          <span style={{ fontSize: '18px', fontWeight: 800, color: getScoreColor() }}>
            {score}%
          </span>
          <span style={{ fontSize: '9px', fontWeight: 600, color: getScoreColor(), opacity: 0.8 }}>
            match
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 style={styles.title}>{scheme.name}</h3>

      {/* Description */}
      <p style={styles.description}>{scheme.description}</p>

      {/* Benefits */}
      <div style={styles.benefits}>
        <strong style={{ color: '#16a34a' }}>💰 Benefits: </strong>
        {scheme.benefits}
      </div>

      {/* Bottom */}
      <div style={styles.bottom}>
        <span style={styles.categoryTag}>{formatCategory(scheme.category)}</span>
        <motion.button
          style={styles.detailBtn}
          onClick={() => onViewDetails(scheme)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Details <FaExternalLinkAlt style={{ fontSize: '11px' }} />
        </motion.button>
      </div>
    </motion.div>
  );
};

const styles = {
  card: {
    background: 'var(--bg-card)',
    borderRadius: '18px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    border: '1px solid var(--border)',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '14px',
  },
  typeBadge: {
    padding: '5px 14px',
    borderRadius: '50px',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  scoreCircle: {
    width: '58px',
    height: '58px',
    borderRadius: '50%',
    border: '3px solid',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  title: {
    fontSize: '17px',
    fontWeight: 700,
    color: 'var(--text)',
    lineHeight: 1.3,
    marginBottom: '8px',
  },
  description: {
    fontSize: '13px',
    color: 'var(--text-light)',
    lineHeight: 1.6,
    marginBottom: '14px',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    flex: 1,
  },
  benefits: {
    background: '#f0fdf4',
    borderRadius: '10px',
    padding: '12px 14px',
    fontSize: '13px',
    color: '#374151',
    lineHeight: 1.5,
    marginBottom: '16px',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTag: {
    padding: '5px 12px',
    background: '#f1f5f9',
    borderRadius: '8px',
    fontSize: '12px',
    color: 'var(--text-light)',
    fontWeight: 500,
  },
  detailBtn: {
    padding: '8px 18px',
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
  },
};

export default SchemeCard;