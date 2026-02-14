import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.container}
    >
      <div style={styles.content}>
        <h1 style={styles.title}>Terms & Conditions</h1>
        <div style={styles.divider} />

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>1. Acceptance of Terms</h2>
          <p style={styles.text}>
            By accessing and using Saarthi AI, you accept and agree to be bound by these Terms
            and Conditions. If you do not agree to these terms, please do not use the platform.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>2. Use of Service</h2>
          <p style={styles.text}>
            Saarthi AI provides an AI-powered recommendation engine to help Indian citizens
            discover government welfare schemes. The service is provided free of charge and is
            intended for personal, non-commercial use only.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>3. User Responsibilities</h2>
          <p style={styles.text}>
            You agree to provide accurate and truthful information when using the platform.
            You are responsible for maintaining the confidentiality of any personal information
            you provide. Misuse of the platform, including providing false information or
            attempting to exploit the system, is strictly prohibited.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>4. Accuracy of Information</h2>
          <p style={styles.text}>
            While we strive to keep the information up to date and correct, we make no
            representations or warranties about the completeness, accuracy, or reliability of
            the scheme information. Scheme details, eligibility criteria, and benefits may change
            without notice by the respective government authorities.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>5. Intellectual Property</h2>
          <p style={styles.text}>
            All content, design, graphics, and code on this platform are the intellectual
            property of Saarthi AI and are protected by applicable intellectual property laws.
            Unauthorized reproduction, distribution, or modification is prohibited.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>6. Limitation of Liability</h2>
          <p style={styles.text}>
            Saarthi AI shall not be held liable for any direct, indirect, incidental, or
            consequential damages arising from the use or inability to use this platform. This
            includes but is not limited to damages for loss of data, missed scheme benefits, or
            any decisions made based on the information provided.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>7. Modifications</h2>
          <p style={styles.text}>
            We reserve the right to modify these Terms & Conditions at any time without prior
            notice. Continued use of the platform after changes constitutes acceptance of the
            updated terms.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>8. Governing Law</h2>
          <p style={styles.text}>
            These terms shall be governed by and construed in accordance with the laws of India.
            Any disputes shall be subject to the exclusive jurisdiction of the courts in India.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f9fafb',
    padding: 'clamp(30px, 5vw, 80px) 20px',
    fontFamily: 'Inter, sans-serif',
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
    background: '#ffffff',
    borderRadius: '16px',
    padding: 'clamp(30px, 4vw, 50px)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    border: '1px solid #e5e7eb',
  },
  title: {
    fontSize: 'clamp(24px, 4vw, 32px)',
    fontWeight: 800,
    color: '#1a1a1a',
    margin: '0 0 8px 0',
  },
  divider: {
    width: '60px',
    height: '4px',
    background: '#f97316',
    borderRadius: '2px',
    marginBottom: '30px',
  },
  section: {
    marginBottom: '28px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: '10px',
  },
  text: {
    fontSize: '14px',
    lineHeight: 1.8,
    color: '#4b5563',
    margin: 0,
  },
};

export default Terms;