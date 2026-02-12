import React from 'react';
import { FaHeart, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <p style={styles.main}>
          🏛️ GovScheme AI — Made with <FaHeart style={{ color: '#ef4444', verticalAlign: 'middle' }} /> for every Indian citizen
        </p>
        <p style={styles.sub}>
          This is an informational tool. Please verify details on official government websites before applying.
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: 'linear-gradient(135deg, #1e3a8a, #312e81)',
    padding: '30px 24px',
    textAlign: 'center',
    marginTop: 'auto',
  },
  content: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  main: {
    color: 'white',
    fontSize: '15px',
    fontWeight: 600,
    marginBottom: '8px',
  },
  sub: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '12px',
  },
};

export default Footer;