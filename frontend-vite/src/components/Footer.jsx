import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  FaHeart, FaTwitter, FaFacebookF, FaInstagram,
  FaYoutube, FaLinkedinIn, FaEnvelope,
  FaPhone, FaMapMarkerAlt, FaExternalLinkAlt,
  FaShieldAlt, FaRobot
} from 'react-icons/fa';

const Footer = () => {
  const { setCurrentView } = useApp();

  const navigateTo = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <FaTwitter />, url: 'https://twitter.com/GoI_MeitY', label: 'Twitter', color: '#1DA1F2' },
    { icon: <FaFacebookF />, url: 'https://www.facebook.com/MeitYGoI', label: 'Facebook', color: '#4267B2' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/meaboratory/', label: 'Instagram', color: '#E4405F' },
    { icon: <FaYoutube />, url: 'https://www.youtube.com/@MeitYGoI', label: 'YouTube', color: '#FF0000' },
    { icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/company/meity/', label: 'LinkedIn', color: '#0A66C2' },
  ];

  const quickLinks = [
    { label: 'About Us', action: () => navigateTo('about') },
    { label: 'FAQs', action: () => navigateTo('faq') },
    { label: 'Find Schemes', action: () => navigateTo('form') },
    { label: 'Home', action: () => navigateTo('home') },
    { label: 'Disclaimer', action: () => {} },
    { label: 'Terms & Conditions', action: () => {} },
    { label: 'Privacy Policy', action: () => {} },
    { label: 'Accessibility Statement', action: () => {} },
  ];

  const govLinks = [
    { label: 'Digital India', url: 'https://www.digitalindia.gov.in/' },
    { label: 'DigiLocker', url: 'https://www.digilocker.gov.in/' },
    { label: 'UMANG', url: 'https://web.umang.gov.in/' },
    { label: 'India.gov.in', url: 'https://www.india.gov.in/' },
    { label: 'data.gov.in', url: 'https://data.gov.in/' },
    { label: 'MyGov.in', url: 'https://www.mygov.in/' },
    { label: 'PM India', url: 'https://www.pmindia.gov.in/' },
    { label: 'National Portal', url: 'https://services.india.gov.in/' },
  ];

  const schemeLinks = [
    { label: 'PM Awas Yojana', url: 'https://pmaymis.gov.in/' },
    { label: 'PM Kisan', url: 'https://pmkisan.gov.in/' },
    { label: 'Ayushman Bharat', url: 'https://pmjay.gov.in/' },
    { label: 'PM Mudra Yojana', url: 'https://www.mudra.org.in/' },
    { label: 'Skill India', url: 'https://www.skillindia.gov.in/' },
    { label: 'Jan Dhan Yojana', url: 'https://pmjdy.gov.in/' },
  ];

  return (
    <footer style={styles.footer}>
      <div style={styles.bgDecor1} />
      <div style={styles.bgDecor2} />

      <div style={styles.container}>

        {/* Column 1 — Brand */}
        <div style={styles.column}>
          <div style={styles.brandRow}>
            <div style={styles.brandIcon}>
              <FaShieldAlt style={{ color: '#22c55e', fontSize: '18px' }} />
            </div>
            <h2 style={styles.brand}>
              <span style={styles.brandGreen}>GovScheme</span> AI
            </h2>
          </div>

          <p style={styles.brandTagline}>
            Empowering every Indian citizen to access government welfare schemes
          </p>

          <div style={styles.govInfo}>
            <p style={styles.text}>Powered by Digital India</p>
            <p style={styles.text}>Ministry of Electronics & IT (MeitY)</p>
            <p style={styles.text}>Government of India</p>
          </div>

          <div style={styles.featurePills}>
            {[
              { icon: <FaShieldAlt />, text: 'Secure' },
              { icon: <FaRobot />, text: 'AI Powered' },
            ].map((f, i) => (
              <span key={i} style={styles.featurePill}>
                {f.icon} {f.text}
              </span>
            ))}
          </div>

          <div style={styles.socialSection}>
            <p style={styles.socialLabel}>Connect with us</p>
            <div style={styles.socialRow}>
              {socialLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialBtn}
                  title={s.label}
                  whileHover={{
                    scale: 1.15,
                    background: s.color,
                    color: '#ffffff',
                    borderColor: s.color,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div style={styles.column}>
          <h3 style={styles.heading}>
            <span style={styles.headingDot} /> Quick Links
          </h3>
          <ul style={styles.list}>
            {quickLinks.map((link, i) => (
              <motion.li
                key={i}
                style={styles.listItem}
                whileHover={{ x: 4, color: '#22c55e' }}
                onClick={link.action}
              >
                <span style={styles.listArrow}>›</span>
                {link.label}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Government Links */}
        <div style={styles.column}>
          <h3 style={styles.heading}>
            <span style={{ ...styles.headingDot, background: '#3b82f6' }} /> Government Portals
          </h3>
          <ul style={styles.list}>
            {govLinks.map((link, i) => (
              <motion.li
                key={i}
                style={styles.listItem}
                whileHover={{ x: 4, color: '#3b82f6' }}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.externalLink}
                >
                  <span style={styles.listArrow}>›</span>
                  {link.label}
                  <FaExternalLinkAlt style={styles.externalIcon} />
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Popular Schemes + Contact */}
        <div style={styles.column}>
          <h3 style={styles.heading}>
            <span style={{ ...styles.headingDot, background: '#8b5cf6' }} /> Popular Schemes
          </h3>
          <ul style={styles.list}>
            {schemeLinks.map((link, i) => (
              <motion.li
                key={i}
                style={styles.listItem}
                whileHover={{ x: 4, color: '#8b5cf6' }}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.externalLink}
                >
                  <span style={styles.listArrow}>›</span>
                  {link.label}
                  <FaExternalLinkAlt style={styles.externalIcon} />
                </a>
              </motion.li>
            ))}
          </ul>

          <div style={styles.contactSection}>
            <h3 style={styles.heading}>
              <span style={{ ...styles.headingDot, background: '#f59e0b' }} /> Contact
            </h3>

            <div style={styles.contactItem}>
              <FaMapMarkerAlt style={styles.contactIcon} />
              <p style={styles.contactText}>
                4th Floor, Electronics Niketan,
                CGO Complex, Lodhi Road,
                New Delhi – 110003
              </p>
            </div>

            <a href="mailto:support@govschemeai.in" style={styles.contactLink}>
              <FaEnvelope style={{ ...styles.contactIcon, color: '#3b82f6' }} />
              <span>support@govschemeai.in</span>
            </a>

            <a href="tel:01124303714" style={styles.contactLink}>
              <FaPhone style={{ ...styles.contactIcon, color: '#8b5cf6' }} />
              <span>(011) 24303714</span>
            </a>
          </div>
        </div>
      </div>
  
      
    </footer>
  );
};

const styles = {
  footer: {
    background: '#020617',
    color: 'white',
    marginTop: 'auto',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'Inter, sans-serif',
  },

  bgDecor1: {
    position: 'absolute',
    top: '-100px',
    right: '-100px',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgDecor2: {
    position: 'absolute',
    bottom: '-80px',
    left: '-80px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(59,130,246,0.03) 0%, transparent 70%)',
    pointerEvents: 'none',
  },

  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 'clamp(30px, 4vw, 50px)',
    padding: 'clamp(50px, 6vw, 70px) 20px',
    position: 'relative',
    zIndex: 1,
  },

  column: {},

  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px',
  },
  brandIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    background: 'rgba(34,197,94,0.1)',
    border: '1px solid rgba(34,197,94,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    fontSize: '20px',
    fontWeight: 800,
    color: '#ffffff',
    margin: 0,
  },
  brandGreen: { color: '#22c55e' },
  brandTagline: {
    fontSize: '13px',
    color: '#64748b',
    lineHeight: 1.6,
    marginBottom: '16px',
    maxWidth: '250px',
  },
  govInfo: {
    padding: '12px 14px',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '12px',
    marginBottom: '14px',
  },

  featurePills: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  featurePill: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    background: 'rgba(34,197,94,0.1)',
    border: '1px solid rgba(34,197,94,0.2)',
    borderRadius: '50px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#22c55e',
  },

  socialSection: { marginTop: '4px' },
  socialLabel: {
    fontSize: '12px',
    color: '#64748b',
    fontWeight: 600,
    marginBottom: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  socialRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  socialBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: '#0f172a',
    border: '1px solid #1e293b',
    color: '#94a3b8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },

  heading: {
    fontSize: '15px',
    fontWeight: 700,
    marginBottom: '16px',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  headingDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#22c55e',
    flexShrink: 0,
  },

  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 0',
    color: '#94a3b8',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  listArrow: {
    color: '#334155',
    fontSize: '14px',
    fontWeight: 700,
    flexShrink: 0,
  },
  externalLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: 'inherit',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: 500,
    width: '100%',
  },
  externalIcon: {
    fontSize: '9px',
    color: '#334155',
    marginLeft: 'auto',
  },

  text: {
    fontSize: '13px',
    color: '#64748b',
    lineHeight: 1.6,
    margin: '0 0 4px 0',
  },

  contactSection: { marginTop: '24px' },
  contactItem: {
    display: 'flex',
    gap: '10px',
    marginBottom: '12px',
  },
  contactIcon: {
    color: '#22c55e',
    fontSize: '14px',
    marginTop: '3px',
    flexShrink: 0,
  },
  contactText: {
    fontSize: '12px',
    color: '#64748b',
    lineHeight: 1.6,
    margin: 0,
  },
  contactLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: 500,
    marginBottom: '8px',
    transition: 'color 0.2s ease',
  },

  divider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #1e293b, transparent)',
    maxWidth: '1200px',
    margin: '0 auto',
  },

  bottom: {
    textAlign: 'center',
    padding: '20px 20px 24px',
  },
  bottomText: {
    fontSize: '13px',
    color: '#475569',
    margin: 0,
  },
};

export default Footer;