import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div style={styles.container}>
      <motion.div
        style={styles.content}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div style={styles.spinner}></div>
        <h2 style={styles.title}>🔍 Analyzing Your Profile...</h2>
        <p style={styles.subtitle}>Matching with 200+ government schemes</p>

        <div style={styles.steps}>
          {['Reading your details', 'Checking eligibility', 'Calculating match score', 'Preparing results'].map((text, i) => (
            <motion.div
              key={text}
              style={styles.stepItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.5 }}
            >
              <span style={styles.checkIcon}>✅</span>
              <span>{text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70vh',
    padding: '40px 20px',
  },
  content: {
    textAlign: 'center',
    background: 'var(--bg-card)',
    padding: '50px',
    borderRadius: '24px',
    boxShadow: '0 10px 50px rgba(0,0,0,0.1)',
    maxWidth: '450px',
    width: '100%',
  },
  spinner: {
    width: '60px',
    height: '60px',
    border: '5px solid #e2e8f0',
    borderTopColor: '#22c55e',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 24px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#16a34a',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--text-lighter)',
    marginBottom: '30px',
  },
  steps: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  stepItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: 'var(--text-secondary)',
    fontWeight: 500,
  },
  checkIcon: {
    fontSize: '16px',
  },
};

export default Loading;