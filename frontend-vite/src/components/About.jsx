import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  FaArrowRight, FaShieldAlt, FaLanguage, FaRobot,
  FaUsers, FaCheckCircle, FaMapMarkerAlt
} from 'react-icons/fa';

const About = () => {
  const { setCurrentView } = useApp();

  const highlights = [
    { icon: <FaShieldAlt />, text: '100% Free & Secure', color: '#22c55e' },
    { icon: <FaLanguage />, text: '12+ Languages', color: '#3b82f6' },
    { icon: <FaRobot />, text: 'AI-Powered Matching', color: '#8b5cf6' },
    { icon: <FaUsers />, text: '10L+ Users Helped', color: '#f59e0b' },
  ];

  return (
    <section style={styles.section}>
      {/* Background decorations */}
      <div style={styles.bgDecor1} />
      <div style={styles.bgDecor2} />

      <div style={styles.container}>

        {/* LEFT SIDE */}
        <motion.div
          style={styles.left}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            style={styles.badge}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            🇮🇳 About Our Platform
          </motion.div>

          <h2 style={styles.title}>
            About <span style={styles.titleHighlight}>GovScheme AI</span>
          </h2>

          <p style={styles.text}>
            <strong style={styles.bold}>GovScheme AI</strong> is a national platform that aims to offer
            one-stop search and discovery of Government schemes.
          </p>

          <p style={styles.text}>
            It provides an innovative, technology-based solution to discover
            scheme information based upon the eligibility of the citizen.
          </p>

          <p style={styles.text}>
            The platform helps citizens find the right Government schemes for them.
            It also guides on how to apply for different Government schemes.
            Thus no need to visit multiple Government websites.
          </p>

          {/* Highlight Pills */}
          <div style={styles.highlights}>
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                style={styles.highlightPill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: h.color }}
              >
                <span style={{ color: h.color, fontSize: '14px', flexShrink: 0 }}>
                  {h.icon}
                </span>
                <span style={styles.highlightText}>{h.text}</span>
              </motion.div>
            ))}
          </div>

          <motion.button
            style={styles.button}
            whileHover={{
              scale: 1.05,
              background: '#22c55e',
              color: '#ffffff',
              borderColor: '#22c55e',
              boxShadow: '0 8px 30px rgba(34,197,94,0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentView('about')}
          >
            View More <FaArrowRight />
          </motion.button>
        </motion.div>

        {/* RIGHT SIDE – DECORATIVE FRAME */}
        <motion.div
          style={styles.right}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div style={styles.placeholderWrapper}>
            {/* Glow behind */}
            <div style={styles.placeholderGlow} />

            <div style={styles.placeholder}>
              {/* Decorative content inside the frame */}
              <div style={styles.frameContent}>

                {/* Top bar */}
                <div style={styles.frameTopBar}>
                  <div style={styles.frameDots}>
                    <span style={{ ...styles.frameDot, background: '#ef4444' }} />
                    <span style={{ ...styles.frameDot, background: '#f59e0b' }} />
                    <span style={{ ...styles.frameDot, background: '#22c55e' }} />
                  </div>
                  <span style={styles.frameUrl}>govscheme.ai</span>
                </div>

                {/* Mock content */}
                <div style={styles.mockContent}>
                  {/* Icon */}
                  <motion.div
                    style={styles.mockIcon}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    🇮🇳
                  </motion.div>

                  <div style={styles.mockTitle}>GovScheme AI</div>
                  <div style={styles.mockSubtitle}>Find schemes you deserve</div>

                  {/* Mock stats */}
                  <div style={styles.mockStats}>
                    {[
                      { num: '200+', label: 'Schemes' },
                      { num: '36', label: 'States' },
                      { num: '12', label: 'Languages' },
                    ].map((s, i) => (
                      <motion.div
                        key={i}
                        style={styles.mockStatItem}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.15 }}
                      >
                        <span style={styles.mockStatNum}>{s.num}</span>
                        <span style={styles.mockStatLabel}>{s.label}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mock checklist */}
                  <div style={styles.mockChecklist}>
                    {[
                      'AI-powered scheme matching',
                      'Multi-language support',
                      'Real-time eligibility check',
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        style={styles.mockCheckItem}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                      >
                        <FaCheckCircle style={{ color: '#22c55e', fontSize: '12px', flexShrink: 0 }} />
                        <span style={styles.mockCheckText}>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  style={styles.floatingBadge1}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <FaMapMarkerAlt style={{ fontSize: '10px' }} /> 36 States
                </motion.div>

                <motion.div
                  style={styles.floatingBadge2}
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  <FaShieldAlt style={{ fontSize: '10px' }} /> Verified
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: 'clamp(60px, 10vw, 100px) 20px',
    background: '#0f172a',
    position: 'relative',
    overflow: 'hidden',
  },

  bgDecor1: {
    position: 'absolute',
    top: '-100px',
    left: '-100px',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },

  bgDecor2: {
    position: 'absolute',
    bottom: '-80px',
    right: '-80px',
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
  },

  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'clamp(40px, 6vw, 80px)',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },

  /* LEFT SIDE */
  left: {
    color: 'white',
  },

  badge: {
    display: 'inline-block',
    padding: '6px 16px',
    background: 'rgba(34,197,94,0.1)',
    border: '1px solid rgba(34,197,94,0.3)',
    borderRadius: '50px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#22c55e',
    marginBottom: '16px',
  },

  title: {
    fontSize: 'clamp(32px, 5vw, 44px)',
    fontWeight: 800,
    color: '#ffffff',
    marginBottom: '24px',
    lineHeight: 1.2,
  },

  titleHighlight: {
    color: '#22c55e',
  },

  text: {
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    lineHeight: 1.8,
    color: '#94a3b8',
    marginBottom: '16px',
  },

  bold: {
    color: '#e2e8f0',
  },

  highlights: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    marginTop: '24px',
    marginBottom: '28px',
  },

  highlightPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    background: '#020617',
    border: '1px solid #1e293b',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    cursor: 'default',
  },

  highlightText: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#e2e8f0',
  },

  button: {
    marginTop: '8px',
    padding: '14px 32px',
    background: 'transparent',
    border: '2px solid #334155',
    color: '#e2e8f0',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '15px',
    fontWeight: 700,
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.3s ease',
  },

  /* RIGHT SIDE */
  right: {
    display: 'flex',
    justifyContent: 'center',
  },

  placeholderWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '450px',
  },

  placeholderGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: 0,
  },

  placeholder: {
    width: '100%',
    height: '420px',
    borderRadius: '20px',
    background: '#020617',
    border: '1px solid #1e293b',
    boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px #1e293b',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
  },

  /* Frame content */
  frameContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },

  frameTopBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderBottom: '1px solid #1e293b',
    background: '#0f172a',
  },

  frameDots: {
    display: 'flex',
    gap: '6px',
  },

  frameDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    display: 'block',
  },

  frameUrl: {
    fontSize: '11px',
    color: '#64748b',
    fontWeight: 500,
    background: '#020617',
    padding: '3px 12px',
    borderRadius: '6px',
    flex: 1,
    textAlign: 'center',
  },

  /* Mock content inside frame */
  mockContent: {
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
  },

  mockIcon: {
    fontSize: '36px',
  },

  mockTitle: {
    fontSize: '20px',
    fontWeight: 800,
    color: '#ffffff',
  },

  mockSubtitle: {
    fontSize: '12px',
    color: '#64748b',
    fontWeight: 500,
  },

  mockStats: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  },

  mockStatItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 16px',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '12px',
    minWidth: '70px',
  },

  mockStatNum: {
    fontSize: '18px',
    fontWeight: 900,
    color: '#22c55e',
  },

  mockStatLabel: {
    fontSize: '10px',
    color: '#64748b',
    textTransform: 'uppercase',
    fontWeight: 600,
  },

  mockChecklist: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '8px',
    width: '100%',
    paddingLeft: '8px',
  },

  mockCheckItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  mockCheckText: {
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: 500,
  },

  /* Floating badges */
  floatingBadge1: {
    position: 'absolute',
    top: '80px',
    right: '-8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    background: '#0f172a',
    border: '1px solid rgba(59,130,246,0.3)',
    borderRadius: '50px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#3b82f6',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    zIndex: 2,
  },

  floatingBadge2: {
    position: 'absolute',
    bottom: '60px',
    left: '-8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    background: '#0f172a',
    border: '1px solid rgba(34,197,94,0.3)',
    borderRadius: '50px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#22c55e',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    zIndex: 2,
  },
};

export default About;