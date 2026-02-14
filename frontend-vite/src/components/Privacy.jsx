import React from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.container}
    >
      <div style={styles.content}>
        <h1 style={styles.title}>Privacy Policy</h1>
        <div style={styles.divider} />

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>1. Information We Collect</h2>
          <p style={styles.text}>
            Saarthi AI collects personal information that you voluntarily provide when using our
            scheme eligibility checker. This may include your age, gender, state, caste category,
            income level, occupation, education level, and other demographic details necessary to
            determine scheme eligibility.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>2. How We Use Your Information</h2>
          <p style={styles.text}>
            The information you provide is used solely to match you with relevant government
            welfare schemes. We use this data to generate personalized recommendations and
            improve the accuracy of our AI-powered matching engine. We do <strong>not</strong> sell,
            trade, or share your personal information with third parties for marketing purposes.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>3. Data Storage & Security</h2>
          <p style={styles.text}>
            We implement appropriate technical and organizational measures to protect your
            personal data against unauthorized access, alteration, disclosure, or destruction.
            Your data is processed securely, and we do not store sensitive personal information
            beyond the session unless explicitly stated.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>4. Cookies & Analytics</h2>
          <p style={styles.text}>
            Our platform may use cookies and similar tracking technologies to enhance your
            browsing experience and collect usage analytics. These help us understand how users
            interact with the platform so we can continuously improve our services.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>5. Third-Party Links</h2>
          <p style={styles.text}>
            Our platform contains links to external government websites. Once you leave our
            platform through these links, we have no control over and are not responsible for
            the privacy practices of those websites. We encourage you to review their privacy
            policies.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>6. Your Rights</h2>
          <p style={styles.text}>
            You have the right to access, correct, or delete your personal information at any
            time. If you wish to exercise any of these rights, please contact us through the
            platform. We will respond to your request within a reasonable timeframe.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>7. Children's Privacy</h2>
          <p style={styles.text}>
            Saarthi AI is not intended for use by children under the age of 13. We do not
            knowingly collect personal information from children. If we discover that a child
            has provided us with personal data, we will take steps to delete it promptly.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>8. Changes to This Policy</h2>
          <p style={styles.text}>
            We may update this Privacy Policy from time to time. Any changes will be posted on
            this page with a revised effective date. We encourage you to review this policy
            periodically for any updates.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>9. Contact Us</h2>
          <p style={styles.text}>
            If you have any questions about this Privacy Policy or our data practices, please
            reach out to us through the contact information provided on the platform.
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

export default Privacy;