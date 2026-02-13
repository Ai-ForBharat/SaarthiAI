import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  FaArrowLeft, FaBullseye, FaEye, FaHome,
  FaCheckCircle, FaSearch, FaClipboardList,
  FaShieldAlt, FaLanguage, FaRobot, FaUsers,
  FaHandshake, FaLightbulb, FaGlobeAsia,
  FaArrowRight
} from 'react-icons/fa';

const AboutPage = () => {
  const { resetApp, setCurrentView } = useApp();

  const goHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stats = [
    { num: '200+', label: 'Schemes', icon: '📋', color: '#22c55e' },
    { num: '36', label: 'States & UTs', icon: '🗺️', color: '#3b82f6' },
    { num: '12+', label: 'Languages', icon: '🌐', color: '#8b5cf6' },
    { num: '10L+', label: 'Citizens Helped', icon: '👥', color: '#f59e0b' },
  ];

  const values = [
    {
      icon: <FaHandshake />,
      title: 'Accessibility',
      desc: 'Making government schemes accessible to every citizen regardless of location or language.',
      color: '#22c55e',
    },
    {
      icon: <FaLightbulb />,
      title: 'Innovation',
      desc: 'Using cutting-edge AI technology to simplify scheme discovery and eligibility matching.',
      color: '#3b82f6',
    },
    {
      icon: <FaShieldAlt />,
      title: 'Trust & Security',
      desc: 'Your data is secure. We never share personal information with third parties.',
      color: '#8b5cf6',
    },
    {
      icon: <FaGlobeAsia />,
      title: 'Inclusivity',
      desc: 'Supporting 12+ languages to ensure no citizen is left behind due to language barriers.',
      color: '#f59e0b',
    },
  ];

  return (
    <div style={styles.page}>

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroBgDecor1} />
        <div style={styles.heroBgDecor2} />

        <div style={styles.heroContent}>
          {/* Back button */}
          <motion.button
            onClick={goHome}
            style={styles.backHomeBtn}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, background: '#1e293b' }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHome /> Back to Home
          </motion.button>

          <motion.div
            style={styles.heroBadge}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            🇮🇳 About Our Platform
          </motion.div>

          <motion.h1
            style={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            About <span style={styles.heroTitleHighlight}>GovScheme AI</span>
          </motion.h1>

          <motion.p
            style={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Empowering every Indian citizen to discover and access government
            schemes they truly deserve — powered by AI, built with trust.
          </motion.p>

          <motion.p
            style={styles.breadcrumb}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Home › About Us
          </motion.p>

          {/* Stats Row */}
          <motion.div
            style={styles.statsRow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                style={styles.statCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: stat.color }}
              >
                <span style={styles.statIcon}>{stat.icon}</span>
                <span style={{ ...styles.statNum, color: stat.color }}>{stat.num}</span>
                <span style={styles.statLabel}>{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* VISION + MISSION SECTION */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <div style={styles.grid}>

            {/* LEFT IMAGE PLACEHOLDER */}
            <motion.div
              style={styles.imageBoxWrapper}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div style={styles.imageBoxGlow} />
              <div style={styles.imageBox}>
                {/* Mock decorative content */}
                <div style={styles.imageBoxContent}>
                  <motion.div
                    style={styles.mockLogo}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    🇮🇳
                  </motion.div>
                  <div style={styles.mockLogoText}>GovScheme AI</div>
                  <div style={styles.mockLogoSub}>For Every Citizen</div>

                  <div style={styles.mockFeatureList}>
                    {['Vision-driven', 'Mission-focused', 'People-first'].map((item, i) => (
                      <motion.div
                        key={i}
                        style={styles.mockFeatureItem}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <FaCheckCircle style={{ color: '#22c55e', fontSize: '11px', flexShrink: 0 }} />
                        <span style={styles.mockFeatureText}>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  style={styles.floatingBadge1}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <FaEye style={{ fontSize: '10px' }} /> Vision
                </motion.div>
                <motion.div
                  style={styles.floatingBadge2}
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  <FaBullseye style={{ fontSize: '10px' }} /> Mission
                </motion.div>
              </div>
            </motion.div>

            {/* RIGHT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                style={styles.sectionBadge}
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                ✨ What Drives Us
              </motion.div>

              <motion.div
                style={styles.visionBlock}
                whileHover={{ borderColor: '#22c55e' }}
              >
                <div style={styles.visionIconWrapper}>
                  <FaEye style={styles.visionIcon} />
                </div>
                <div>
                  <h3 style={styles.heading}>Our Vision</h3>
                  <p style={styles.text}>
                    Our vision is to make citizens' lives easier by bridging the gap
                    between government schemes and the people who need them most.
                  </p>
                </div>
              </motion.div>

              <motion.div
                style={styles.visionBlock}
                whileHover={{ borderColor: '#3b82f6' }}
              >
                <div style={{ ...styles.visionIconWrapper, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)' }}>
                  <FaBullseye style={{ ...styles.visionIcon, color: '#3b82f6' }} />
                </div>
                <div>
                  <h3 style={styles.heading}>Our Mission</h3>
                  <p style={styles.text}>
                    Our mission is to streamline the government-user interface
                    for government schemes and benefits.
                  </p>
                  <p style={styles.text}>
                    Reduce time and effort required to find and avail
                    a government scheme — making the process seamless for everyone.
                  </p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ABOUT DESCRIPTION SECTION */}
      <section style={styles.darkSection}>
        <div style={styles.darkSectionDecor1} />
        <div style={styles.darkSectionDecor2} />

        <div style={styles.contentWrapper}>
          <motion.div
            style={styles.textColumn}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              style={styles.sectionBadge}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              📖 Our Story
            </motion.div>

            <h2 style={styles.darkSectionTitle}>
              One Platform, <span style={{ color: '#22c55e' }}>Endless Possibilities</span>
            </h2>

            <div style={styles.storyCard}>
              <div style={styles.storyDot} />
              <p style={styles.bigText}>
                myScheme is a National Platform that aims to offer one-stop search
                and discovery of the Government schemes.
              </p>
            </div>

            <div style={styles.storyCard}>
              <div style={{ ...styles.storyDot, background: '#3b82f6' }} />
              <p style={styles.bigText}>
                It provides an innovative, technology-based solution to discover
                scheme information based upon the eligibility of the citizen.
              </p>
            </div>

            <div style={styles.storyCard}>
              <div style={{ ...styles.storyDot, background: '#8b5cf6' }} />
              <p style={styles.bigText}>
                The platform helps the citizen to find the right Government schemes
                for them. It also guides on how to apply for different Government schemes.
                Thus no need to visit multiple Government websites.
              </p>
            </div>
          </motion.div>

          <motion.div
            style={styles.illustrationWrapper}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div style={styles.illustrationGlow} />
            <div style={styles.illustrationBox}>
              <div style={styles.illustrationContent}>
                <motion.div
                  style={styles.illustrationIcon}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  🏛️
                </motion.div>
                <div style={styles.illustrationTitle}>How It Works</div>

                <div style={styles.illustrationSteps}>
                  {[
                    { step: '01', text: 'Enter your details', color: '#22c55e' },
                    { step: '02', text: 'AI matches schemes', color: '#3b82f6' },
                    { step: '03', text: 'Get eligible schemes', color: '#8b5cf6' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      style={styles.illustrationStep}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.15 }}
                    >
                      <span style={{ ...styles.illustrationStepNum, color: item.color }}>
                        {item.step}
                      </span>
                      <span style={styles.illustrationStepText}>{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section style={styles.valuesSection}>
        <div style={styles.valuesSectionInner}>
          <motion.div
            style={styles.valuesBadge}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            💎 Our Core Values
          </motion.div>

          <motion.h2
            style={styles.valuesTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Built on <span style={{ color: '#22c55e' }}>Trust</span> & <span style={{ color: '#3b82f6' }}>Innovation</span>
          </motion.h2>

          <div style={styles.valuesGrid}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                style={styles.valueCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  borderColor: v.color,
                  boxShadow: `0 10px 30px ${v.color}15`,
                }}
              >
                <div style={{ ...styles.valueIcon, color: v.color, background: `${v.color}15`, border: `1px solid ${v.color}30` }}>
                  {v.icon}
                </div>
                <h3 style={styles.valueTitle}>{v.title}</h3>
                <p style={styles.valueDesc}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section style={styles.featuresSection}>
        <div style={styles.featuresSectionInner}>
          <motion.div
            style={styles.featuresBadge}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            🚀 Key Features
          </motion.div>

          <motion.h2
            style={styles.featuresTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Everything You Need, <span style={{ color: '#22c55e' }}>In One Place</span>
          </motion.h2>

          <div style={styles.featuresGrid}>
            {[
              {
                icon: <FaCheckCircle />,
                title: 'Eligibility Check',
                desc: 'You can check your eligibility for schemes using different criteria and personal attributes.',
                color: '#22c55e',
              },
              {
                icon: <FaSearch />,
                title: 'Scheme Finder',
                desc: 'Fast and easy searching with filter based drill downs for various Government Schemes.',
                color: '#3b82f6',
              },
              {
                icon: <FaClipboardList />,
                title: 'Scheme in Detail',
                desc: 'Deep dive into dedicated scheme pages for fine grained scheme details before you apply.',
                color: '#8b5cf6',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                style={styles.featureCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{
                  scale: 1.03,
                  borderColor: feature.color,
                  boxShadow: `0 15px 40px ${feature.color}15`,
                }}
              >
                <div style={{
                  ...styles.featureIcon,
                  color: feature.color,
                  background: `${feature.color}15`,
                  border: `1px solid ${feature.color}30`,
                }}>
                  {feature.icon}
                </div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDesc}>{feature.desc}</p>
                <span style={{ ...styles.featureLearnMore, color: feature.color }}>
                  Learn more <FaArrowRight style={{ fontSize: '10px' }} />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaDecor1} />
        <div style={styles.ctaDecor2} />

        <motion.div
          style={styles.ctaContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={styles.ctaTitle}>
            Ready to Find Your <span style={{ color: '#22c55e' }}>Schemes</span>?
          </h2>
          <p style={styles.ctaText}>
            Start discovering government schemes tailored to your profile.
            It's free, fast, and powered by AI.
          </p>
          <div style={styles.ctaBtns}>
            <motion.button
              style={styles.ctaPrimaryBtn}
              onClick={() => setCurrentView('form')}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(34,197,94,0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSearch /> Find My Schemes
            </motion.button>
            <motion.button
              style={styles.ctaSecondaryBtn}
              onClick={goHome}
              whileHover={{ scale: 1.05, background: '#1e293b' }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHome /> Go Home
            </motion.button>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

const styles = {
  page: {
    fontFamily: 'Inter, sans-serif',
    background: '#020617',
    color: 'white',
  },

  /* ===== HERO ===== */
  hero: {
    textAlign: 'center',
    padding: 'clamp(80px, 12vw, 140px) 20px clamp(60px, 8vw, 100px)',
    background: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  heroBgDecor1: {
    position: 'absolute',
    top: '-100px',
    right: '-100px',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroBgDecor2: {
    position: 'absolute',
    bottom: '-60px',
    left: '-60px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '800px',
    margin: '0 auto',
  },
  backHomeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 18px',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '50px',
    color: '#94a3b8',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    marginBottom: '30px',
    transition: 'all 0.3s ease',
  },
  heroBadge: {
    display: 'inline-block',
    padding: '6px 18px',
    background: 'rgba(34,197,94,0.1)',
    border: '1px solid rgba(34,197,94,0.3)',
    borderRadius: '50px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#22c55e',
    marginBottom: '20px',
  },
  heroTitle: {
    fontSize: 'clamp(36px, 6vw, 56px)',
    fontWeight: 900,
    marginBottom: '16px',
    lineHeight: 1.15,
    color: '#ffffff',
  },
  heroTitleHighlight: {
    color: '#22c55e',
  },
  heroSubtitle: {
    fontSize: 'clamp(15px, 2.5vw, 18px)',
    color: '#94a3b8',
    maxWidth: '600px',
    margin: '0 auto 12px',
    lineHeight: 1.7,
  },
  breadcrumb: {
    color: '#64748b',
    fontSize: '13px',
    fontWeight: 500,
    marginBottom: '36px',
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(10px, 2vw, 16px)',
    flexWrap: 'wrap',
  },
  statCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: 'clamp(12px, 2vw, 18px) clamp(16px, 3vw, 24px)',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '16px',
    minWidth: '100px',
    transition: 'all 0.3s ease',
    cursor: 'default',
  },
  statIcon: { fontSize: '20px' },
  statNum: {
    fontSize: 'clamp(22px, 4vw, 28px)',
    fontWeight: 900,
  },
  statLabel: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#64748b',
    fontWeight: 600,
  },

  /* ===== VISION + MISSION ===== */
  section: {
    padding: 'clamp(60px, 10vw, 100px) 20px',
    background: '#0f172a',
  },
  sectionInner: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionBadge: {
    display: 'inline-block',
    padding: '6px 16px',
    background: 'rgba(34,197,94,0.1)',
    border: '1px solid rgba(34,197,94,0.3)',
    borderRadius: '50px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#22c55e',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'clamp(40px, 6vw, 80px)',
    alignItems: 'center',
  },

  /* Image box */
  imageBoxWrapper: {
    position: 'relative',
  },
  imageBoxGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '70%',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  imageBox: {
    height: '380px',
    borderRadius: '20px',
    background: '#020617',
    border: '1px solid #1e293b',
    boxShadow: '0 25px 70px rgba(0,0,0,0.5)',
    position: 'relative',
    overflow: 'hidden',
  },
  imageBoxContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '30px',
    gap: '8px',
  },
  mockLogo: { fontSize: '40px' },
  mockLogoText: {
    fontSize: '22px',
    fontWeight: 800,
    color: '#ffffff',
  },
  mockLogoSub: {
    fontSize: '12px',
    color: '#64748b',
    marginBottom: '16px',
  },
  mockFeatureList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  mockFeatureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  mockFeatureText: {
    fontSize: '13px',
    color: '#94a3b8',
    fontWeight: 500,
  },
  floatingBadge1: {
    position: 'absolute',
    top: '30px',
    right: '-6px',
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
  floatingBadge2: {
    position: 'absolute',
    bottom: '40px',
    left: '-6px',
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

  /* Vision blocks */
  visionBlock: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    padding: '20px',
    background: '#020617',
    border: '1px solid #1e293b',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
  },
  visionIconWrapper: {
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    background: 'rgba(34,197,94,0.1)',
    border: '1px solid rgba(34,197,94,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  visionIcon: {
    fontSize: '20px',
    color: '#22c55e',
  },
  heading: {
    fontSize: 'clamp(18px, 3vw, 22px)',
    fontWeight: 700,
    marginBottom: '8px',
    color: '#ffffff',
  },
  text: {
    color: '#94a3b8',
    lineHeight: 1.8,
    fontSize: 'clamp(13px, 2.5vw, 15px)',
    marginBottom: '8px',
  },

  /* ===== DARK SECTION (Story) ===== */
  darkSection: {
    padding: 'clamp(60px, 10vw, 100px) 20px',
    background: '#020617',
    position: 'relative',
    overflow: 'hidden',
  },
  darkSectionDecor1: {
    position: 'absolute',
    top: '-100px',
    left: '-100px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  darkSectionDecor2: {
    position: 'absolute',
    bottom: '-100px',
    right: '-100px',
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  darkSectionTitle: {
    fontSize: 'clamp(26px, 4vw, 36px)',
    fontWeight: 800,
    color: '#ffffff',
    marginBottom: '28px',
    lineHeight: 1.2,
  },
  contentWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'clamp(40px, 6vw, 80px)',
    position: 'relative',
    zIndex: 1,
  },
  textColumn: {},
  storyCard: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
    padding: '16px 20px',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '14px',
  },
  storyDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#22c55e',
    marginTop: '8px',
    flexShrink: 0,
  },
  bigText: {
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    color: '#94a3b8',
    lineHeight: 1.8,
    margin: 0,
  },

  /* Illustration */
  illustrationWrapper: {
    position: 'relative',
  },
  illustrationGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '70%',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  illustrationBox: {
    background: '#0f172a',
    borderRadius: '20px',
    border: '1px solid #1e293b',
    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
    overflow: 'hidden',
    position: 'relative',
  },
  illustrationContent: {
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  illustrationIcon: { fontSize: '40px' },
  illustrationTitle: {
    fontSize: '18px',
    fontWeight: 800,
    color: '#ffffff',
    marginBottom: '12px',
  },
  illustrationSteps: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
  },
  illustrationStep: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    background: '#020617',
    border: '1px solid #1e293b',
    borderRadius: '12px',
  },
  illustrationStepNum: {
    fontSize: '18px',
    fontWeight: 900,
    flexShrink: 0,
  },
  illustrationStepText: {
    fontSize: '13px',
    color: '#94a3b8',
    fontWeight: 500,
  },

  /* ===== VALUES ===== */
  valuesSection: {
    padding: 'clamp(60px, 10vw, 100px) 20px',
    background: '#0f172a',
  },
  valuesSectionInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  valuesBadge: {
    display: 'inline-block',
    padding: '6px 18px',
    background: 'rgba(139,92,246,0.1)',
    border: '1px solid rgba(139,92,246,0.3)',
    borderRadius: '50px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#8b5cf6',
    marginBottom: '16px',
  },
  valuesTitle: {
    fontSize: 'clamp(26px, 4vw, 36px)',
    fontWeight: 800,
    color: '#ffffff',
    marginBottom: '40px',
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    textAlign: 'left',
  },
  valueCard: {
    padding: '28px 24px',
    background: '#020617',
    border: '1px solid #1e293b',
    borderRadius: '18px',
    transition: 'all 0.3s ease',
    cursor: 'default',
  },
  valueIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    marginBottom: '16px',
  },
  valueTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '8px',
  },
  valueDesc: {
    fontSize: '14px',
    color: '#94a3b8',
    lineHeight: 1.7,
  },

  /* ===== FEATURES ===== */
  featuresSection: {
    padding: 'clamp(60px, 10vw, 100px) 20px',
    background: '#020617',
  },
  featuresSectionInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  featuresBadge: {
    display: 'inline-block',
    padding: '6px 18px',
    background: 'rgba(59,130,246,0.1)',
    border: '1px solid rgba(59,130,246,0.3)',
    borderRadius: '50px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#3b82f6',
    marginBottom: '16px',
  },
  featuresTitle: {
    fontSize: 'clamp(26px, 4vw, 36px)',
    fontWeight: 800,
    color: '#ffffff',
    marginBottom: '40px',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    textAlign: 'left',
  },
  featureCard: {
    padding: '32px 28px',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    cursor: 'default',
  },
  featureIcon: {
    width: '52px',
    height: '52px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    marginBottom: '18px',
  },
  featureTitle: {
    fontSize: 'clamp(18px, 3vw, 20px)',
    fontWeight: 700,
    marginBottom: '10px',
    color: '#ffffff',
  },
  featureDesc: {
    color: '#94a3b8',
    lineHeight: 1.8,
    fontSize: '14px',
    marginBottom: '16px',
  },
  featureLearnMore: {
    fontSize: '13px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
  },

  /* ===== CTA ===== */
  ctaSection: {
    padding: 'clamp(60px, 10vw, 100px) 20px',
    background: '#0f172a',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  ctaDecor1: {
    position: 'absolute',
    top: '-80px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  ctaDecor2: {
    position: 'absolute',
    bottom: '-80px',
    right: '-80px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  ctaContent: {
    maxWidth: '600px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  ctaTitle: {
    fontSize: 'clamp(28px, 5vw, 40px)',
    fontWeight: 900,
    color: '#ffffff',
    marginBottom: '16px',
    lineHeight: 1.2,
  },
  ctaText: {
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    color: '#94a3b8',
    marginBottom: '28px',
    lineHeight: 1.7,
  },
  ctaBtns: {
    display: 'flex',
    gap: '14px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaPrimaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px 36px',
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '14px',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
  },
  ctaSecondaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px 36px',
    background: 'transparent',
    color: '#94a3b8',
    border: '2px solid #1e293b',
    borderRadius: '14px',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.3s ease',
  },
};

export default AboutPage;