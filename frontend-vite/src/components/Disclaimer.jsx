import React from 'react';
import { motion } from 'framer-motion';

const Disclaimer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.container}
    >
      <div style={styles.content}>
        <h1 style={styles.title}>Disclaimer</h1>
        <div style={styles.divider} />

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>General Information</h2>
          <p style={styles.text}>
            The information provided by <strong>Saarthi AI</strong> is for general informational
            purposes only. All information on the platform is provided in good faith; however,
            we make no representation or warranty of any kind, express or implied, regarding the
            accuracy, adequacy, validity, reliability, availability, or completeness of any
            information on the platform.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Not Government Official</h2>
          <p style={styles.text}>
            Saarthi AI is <strong>not an official government website</strong>. It is an
            AI-powered tool designed to help citizens discover government welfare schemes they
            may be eligible for. The scheme information displayed is sourced from publicly
            available government data and may not always reflect the most current updates.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>No Guarantee of Eligibility</h2>
          <p style={styles.text}>
            The eligibility results provided by Saarthi AI are <strong>indicative only</strong> and
            do not guarantee actual eligibility or approval for any scheme. Final eligibility is
            determined solely by the respective government departments and authorities.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>External Links</h2>
          <p style={styles.text}>
            This platform may contain links to external websites that are not provided or
            maintained by us. We do not guarantee the accuracy, relevance, timeliness, or
            completeness of any information on these external websites.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Limitation of Liability</h2>
          <p style={styles.text}>
            Under no circumstance shall Saarthi AI be liable for any loss or damage incurred as
            a result of the use of the platform or reliance on any information provided on the
            platform. Your use of the platform and reliance on any information is solely at your
            own risk.
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

export default Disclaimer;