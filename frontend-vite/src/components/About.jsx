import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { FaArrowRight } from 'react-icons/fa';

const About = () => {
  const { setCurrentView } = useApp();

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        
        {/* LEFT SIDE */}
        <motion.div
          style={styles.left}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={styles.title}>About</h2>

          <p style={styles.text}>
            <strong>GovScheme AI</strong> is a national platform that aims to offer
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

          <motion.button
            style={styles.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentView('about')}
          >
            View More <FaArrowRight />
          </motion.button>
        </motion.div>

        {/* RIGHT SIDE – EMPTY FRAME */}
        <motion.div
          style={styles.right}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div style={styles.placeholder}>
            {/* Empty decorative box */}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '80px 20px',
    background: '#1f2937',
  },

  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '60px',
    alignItems: 'center',
  },

  left: {
    color: 'white',
  },

  title: {
    fontSize: '40px',
    fontWeight: '700',
    color: '#22c55e',
    marginBottom: '20px',
  },

  text: {
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#d1d5db',
    marginBottom: '20px',
  },

  button: {
    marginTop: '20px',
    padding: '12px 28px',
    background: 'transparent',
    border: '1px solid white',
    color: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '15px',
  },

  right: {
    display: 'flex',
    justifyContent: 'center',
  },

  placeholder: {
    width: '100%',
    height: '350px',
    borderRadius: '20px',
    background: '#111827',
    border: '2px solid #374151',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
  },
};

export default About;
