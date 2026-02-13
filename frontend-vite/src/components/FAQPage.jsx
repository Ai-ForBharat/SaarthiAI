import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  FaChevronDown, FaHome, FaQuestionCircle,
  FaCheckCircle, FaSearch, FaArrowRight
} from 'react-icons/fa';

const FAQPage = () => {
  const { setCurrentView } = useApp();
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const goHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const faqs = [
    {
      q: 'What is GovScheme AI?',
      a: 'GovScheme AI is an AI-powered platform that helps Indian citizens discover government schemes they are eligible for, available in 12 Indian languages.',
      icon: '🤖',
      category: 'general',
    },
    {
      q: 'How will GovScheme AI help common citizens?',
      a: 'It eliminates the need to visit multiple government websites. Fill one form and instantly see all schemes you qualify for with benefits, documents, and apply links.',
      icon: '🇮🇳',
      category: 'general',
    },
    {
      q: 'Can I apply for schemes through GovScheme AI?',
      a: 'We provide detailed information and direct links to official government portals where you can apply.',
      icon: '📝',
      category: 'application',
    },
    {
      q: 'How does the eligibility check work?',
      a: 'Our AI compares your profile against scheme eligibility criteria and shows matching ones with a relevance score.',
      icon: '⚙️',
      category: 'eligibility',
    },
    {
      q: 'What information about a scheme can I find?',
      a: 'You can view eligibility, benefits, required documents, application steps, and official links.',
      icon: '📋',
      category: 'general',
    },
    {
      q: 'Is this service free?',
      a: 'Yes! GovScheme AI is completely free to use. No hidden charges or premium features.',
      icon: '💚',
      category: 'general',
    },
    {
      q: 'How many schemes are available?',
      a: 'We currently cover 200+ schemes from Central and State governments across 36 States & UTs.',
      icon: '📊',
      category: 'general',
    },
    {
      q: 'Which languages are supported?',
      a: 'We support 12+ Indian languages including Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese, and Urdu.',
      icon: '🌐',
      category: 'general',
    },
    {
      q: 'Is my personal data safe?',
      a: 'Absolutely. We do not store any personal information. Your data is used only for real-time scheme matching and is never shared with third parties.',
      icon: '🔒',
      category: 'privacy',
    },
    {
      q: 'What documents are needed to apply?',
      a: 'Document requirements vary per scheme. Each scheme page lists all required documents such as Aadhaar, income certificate, caste certificate, etc.',
      icon: '📄',
      category: 'application',
    },
    {
      q: 'Can I check eligibility for my family members?',
      a: 'Yes! You can fill the form multiple times with different details to check eligibility for any family member.',
      icon: '👨‍👩‍👧‍👦',
      category: 'eligibility',
    },
    {
      q: 'How accurate is the AI matching?',
      a: 'Our AI uses multiple eligibility parameters including age, income, location, occupation, and category to provide highly accurate matches with confidence scores.',
      icon: '🎯',
      category: 'eligibility',
    },
  ];

  const categories = [
    { key: 'all', label: 'All Questions', icon: '📋', count: faqs.length },
    { key: 'general', label: 'General', icon: '💡', count: faqs.filter(f => f.category === 'general').length },
    { key: 'eligibility', label: 'Eligibility', icon: '✅', count: faqs.filter(f => f.category === 'eligibility').length },
    { key: 'application', label: 'Application', icon: '📝', count: faqs.filter(f => f.category === 'application').length },
    { key: 'privacy', label: 'Privacy', icon: '🔒', count: faqs.filter(f => f.category === 'privacy').length },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={styles.page}>

      {/* HERO HEADER */}
      <section style={styles.hero}>
        <div style={styles.heroBgDecor1} />
        <div style={styles.heroBgDecor2} />
        <div style={styles.heroBgDecor3} />

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
            ❓ Help Center
          </motion.div>

          <motion.h1
            style={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Frequently Asked{' '}
            <span style={styles.heroTitleHighlight}>Questions</span>
          </motion.h1>

          <motion.p
            style={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Find answers to common questions about GovScheme AI,
            eligibility checks, and how to apply for government schemes.
          </motion.p>

          <motion.p
            style={styles.breadcrumb}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span onClick={goHome} style={styles.breadcrumbLink}>Home</span>
            <span style={styles.breadcrumbSep}>›</span>
            Frequently Asked Questions
          </motion.p>

          {/* Search Bar */}
          <motion.div
            style={styles.searchBar}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <FaSearch style={styles.searchIcon} />
            <input
              style={styles.searchInput}
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                style={styles.searchClear}
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            style={styles.quickStats}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {[
              { num: `${faqs.length}+`, label: 'Questions', icon: '❓' },
              { num: '5', label: 'Categories', icon: '📂' },
              { num: '24/7', label: 'AI Support', icon: '🤖' },
            ].map((stat, i) => (
              <div key={i} style={styles.quickStat}>
                <span style={styles.quickStatIcon}>{stat.icon}</span>
                <span style={styles.quickStatNum}>{stat.num}</span>
                <span style={styles.quickStatLabel}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={styles.mainSection}>
        <div style={styles.contentContainer}>

          {/* LEFT SIDE */}
          <motion.div
            style={styles.left}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Category Filter */}
            <div style={styles.categoryCard}>
              <h3 style={styles.categoryTitle}>
                <FaQuestionCircle style={{ color: '#22c55e', fontSize: '16px' }} />
                Categories
              </h3>

              <div style={styles.categoryList}>
                {categories.map((cat, i) => (
                  <motion.button
                    key={cat.key}
                    style={{
                      ...styles.categoryBtn,
                      ...(activeCategory === cat.key ? styles.categoryBtnActive : {}),
                    }}
                    onClick={() => setActiveCategory(cat.key)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div style={styles.categoryBtnLeft}>
                      <span style={styles.categoryEmoji}>{cat.icon}</span>
                      <span style={styles.categoryLabel}>{cat.label}</span>
                    </div>
                    <span style={{
                      ...styles.categoryCount,
                      ...(activeCategory === cat.key ? styles.categoryCountActive : {}),
                    }}>
                      {cat.count}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Illustration Card */}
            <motion.div
              style={styles.illustrationCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div style={styles.illustrationGlow} />

              <div style={styles.illustrationContent}>
                <motion.div
                  style={styles.illustrationIcon}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  🏛️
                </motion.div>
                <div style={styles.illustrationTitle}>Need More Help?</div>
                <div style={styles.illustrationSub}>
                  Our AI assistant can answer specific questions about schemes
                </div>

                <div style={styles.illustrationFeatures}>
                  {['Instant answers', 'Scheme details', 'Eligibility info'].map((item, i) => (
                    <div key={i} style={styles.illustrationFeature}>
                      <FaCheckCircle style={{ color: '#22c55e', fontSize: '10px', flexShrink: 0 }} />
                      <span style={styles.illustrationFeatureText}>{item}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  style={styles.findSchemesBtn}
                  onClick={() => setCurrentView('form')}
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(34,197,94,0.4)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Find My Schemes <FaArrowRight style={{ fontSize: '11px' }} />
                </motion.button>
              </div>

              {/* Floating badge */}
              <motion.div
                style={styles.floatingBadge}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <FaCheckCircle style={{ fontSize: '10px' }} /> Free Forever
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE FAQ */}
          <motion.div
            style={styles.right}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Results info */}
            <div style={styles.resultsInfo}>
              <span style={styles.resultsText}>
                Showing <strong style={{ color: '#22c55e' }}>{filteredFaqs.length}</strong> of {faqs.length} questions
              </span>
              {(activeCategory !== 'all' || searchQuery) && (
                <motion.button
                  style={styles.clearFiltersBtn}
                  onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  Clear filters ✕
                </motion.button>
              )}
            </div>

            <div style={styles.faqList}>
              <AnimatePresence mode="wait">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, i) => (
                    <motion.div
                      key={faq.q}
                      style={{
                        ...styles.faqItem,
                        ...(openIndex === i ? styles.faqItemActive : {}),
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: i * 0.05 }}
                      layout
                    >
                      <button
                        style={styles.question}
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      >
                        <div style={styles.questionLeft}>
                          <span style={styles.questionIcon}>{faq.icon}</span>
                          <div style={styles.questionContent}>
                            <span style={styles.questionText}>{faq.q}</span>
                            <span style={styles.questionCategory}>
                              {categories.find(c => c.key === faq.category)?.icon}{' '}
                              {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                            </span>
                          </div>
                        </div>
                        <motion.div
                          style={styles.chevronWrapper}
                          animate={{ rotate: openIndex === i ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaChevronDown style={{
                            fontSize: '12px',
                            color: openIndex === i ? '#22c55e' : '#64748b',
                          }} />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {openIndex === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div style={styles.answerWrapper}>
                              <div style={styles.answerLine} />
                              <div style={styles.answerContent}>
                                <p style={styles.answer}>{faq.a}</p>
                                <div style={styles.helpfulRow}>
                                  <span style={styles.helpfulText}>Was this helpful?</span>
                                  <div style={styles.helpfulBtns}>
                                    <button style={styles.helpfulBtn}>👍 Yes</button>
                                    <button style={styles.helpfulBtn}>👎 No</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    style={styles.emptyState}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div style={styles.emptyIcon}>🔍</div>
                    <h3 style={styles.emptyTitle}>No questions found</h3>
                    <p style={styles.emptyText}>
                      Try a different search term or category
                    </p>
                    <motion.button
                      style={styles.emptyBtn}
                      onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Show All Questions
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaDecor1} />
        <motion.div
          style={styles.ctaContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={styles.ctaTitle}>
            Still have <span style={{ color: '#22c55e' }}>questions</span>?
          </h2>
          <p style={styles.ctaText}>
            Can't find what you're looking for? Start finding your eligible schemes now.
          </p>
          <div style={styles.ctaBtns}>
            <motion.button
              style={styles.ctaPrimaryBtn}
              onClick={() => setCurrentView('form')}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(34,197,94,0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSearch style={{ fontSize: '14px' }} /> Find My Schemes
            </motion.button>
            <motion.button
              style={styles.ctaSecondaryBtn}
              onClick={goHome}
              whileHover={{ scale: 1.05, background: '#1e293b' }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHome style={{ fontSize: '14px' }} /> Go Home
            </motion.button>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

const styles = {
  page: {
    background: '#020617',
    minHeight: '100vh',
    color: 'white',
    fontFamily: 'Inter, sans-serif',
  },

  /* ===== HERO ===== */
  hero: {
    position: 'relative',
    background: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)',
    padding: 'clamp(80px, 12vw, 140px) 20px clamp(60px, 8vw, 80px)',
    textAlign: 'center',
    overflow: 'hidden',
  },
  heroBgDecor1: {
    position: 'absolute',
    top: '-120px',
    right: '-120px',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroBgDecor2: {
    position: 'absolute',
    bottom: '-80px',
    left: '-80px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroBgDecor3: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '700px',
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
    marginBottom: '28px',
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
    marginBottom: '18px',
  },
  heroTitle: {
    fontSize: 'clamp(32px, 6vw, 50px)',
    fontWeight: 900,
    marginBottom: '14px',
    lineHeight: 1.15,
    color: '#ffffff',
  },
  heroTitleHighlight: {
    color: '#22c55e',
  },
  heroSubtitle: {
    fontSize: 'clamp(14px, 2.5vw, 17px)',
    color: '#94a3b8',
    maxWidth: '550px',
    margin: '0 auto 10px',
    lineHeight: 1.7,
  },
  breadcrumb: {
    color: '#64748b',
    fontSize: '13px',
    fontWeight: 500,
    marginBottom: '28px',
  },
  breadcrumbLink: {
    color: '#22c55e',
    cursor: 'pointer',
    fontWeight: 600,
  },
  breadcrumbSep: {
    margin: '0 8px',
    color: '#334155',
  },

  /* Search Bar */
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    maxWidth: '480px',
    margin: '0 auto 24px',
    padding: '12px 18px',
    background: '#0f172a',
    border: '2px solid #1e293b',
    borderRadius: '14px',
    transition: 'all 0.3s ease',
  },
  searchIcon: {
    color: '#64748b',
    fontSize: '14px',
    flexShrink: 0,
  },
  searchInput: {
    flex: 1,
    background: 'none',
    border: 'none',
    outline: 'none',
    color: '#ffffff',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
  },
  searchClear: {
    background: '#1e293b',
    border: 'none',
    color: '#94a3b8',
    fontSize: '12px',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '6px',
    fontWeight: 700,
  },

  /* Quick Stats */
  quickStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(10px, 2vw, 16px)',
    flexWrap: 'wrap',
  },
  quickStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    padding: '12px 20px',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '14px',
    minWidth: '90px',
  },
  quickStatIcon: { fontSize: '18px' },
  quickStatNum: {
    fontSize: '20px',
    fontWeight: 900,
    color: '#22c55e',
  },
  quickStatLabel: {
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#64748b',
    fontWeight: 600,
  },

  /* ===== MAIN SECTION ===== */
  mainSection: {
    background: '#0f172a',
    padding: 'clamp(40px, 6vw, 60px) 20px clamp(60px, 8vw, 100px)',
  },
  contentContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    gap: 'clamp(30px, 4vw, 50px)',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },

  /* LEFT SIDE */
  left: {
    width: '300px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    position: 'sticky',
    top: '100px',
  },

  /* Category Card */
  categoryCard: {
    background: '#020617',
    border: '1px solid #1e293b',
    borderRadius: '18px',
    padding: '20px',
  },
  categoryTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid #1e293b',
  },
  categoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  categoryBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 14px',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '12px',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.3s ease',
    color: '#94a3b8',
    width: '100%',
  },
  categoryBtnActive: {
    background: 'rgba(34,197,94,0.1)',
    borderColor: 'rgba(34,197,94,0.3)',
    color: '#22c55e',
    boxShadow: '0 4px 15px rgba(34,197,94,0.1)',
  },
  categoryBtnLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  categoryEmoji: { fontSize: '16px' },
  categoryLabel: {
    fontSize: '13px',
    fontWeight: 600,
  },
  categoryCount: {
    fontSize: '11px',
    fontWeight: 700,
    background: '#1e293b',
    padding: '2px 8px',
    borderRadius: '50px',
    color: '#64748b',
  },
  categoryCountActive: {
    background: 'rgba(34,197,94,0.2)',
    color: '#22c55e',
  },

  /* Illustration Card */
  illustrationCard: {
    background: '#020617',
    border: '1px solid #1e293b',
    borderRadius: '18px',
    position: 'relative',
    overflow: 'hidden',
  },
  illustrationGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  illustrationContent: {
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    position: 'relative',
    zIndex: 1,
  },
  illustrationIcon: { fontSize: '36px' },
  illustrationTitle: {
    fontSize: '16px',
    fontWeight: 800,
    color: '#ffffff',
  },
  illustrationSub: {
    fontSize: '12px',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 1.5,
    marginBottom: '8px',
  },
  illustrationFeatures: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%',
    marginBottom: '12px',
  },
  illustrationFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  illustrationFeatureText: {
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: 500,
  },
  findSchemesBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 22px',
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    width: '100%',
    justifyContent: 'center',
  },
  floatingBadge: {
    position: 'absolute',
    top: '12px',
    right: '-6px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '5px 12px',
    background: '#0f172a',
    border: '1px solid rgba(34,197,94,0.3)',
    borderRadius: '50px',
    fontSize: '10px',
    fontWeight: 600,
    color: '#22c55e',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    zIndex: 2,
  },

  /* RIGHT SIDE */
  right: {
    flex: 1,
    minWidth: '320px',
  },

  resultsInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
    flexWrap: 'wrap',
    gap: '8px',
  },
  resultsText: {
    fontSize: '13px',
    color: '#64748b',
    fontWeight: 500,
  },
  clearFiltersBtn: {
    padding: '6px 14px',
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: '50px',
    color: '#ef4444',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
  },

  faqList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  faqItem: {
    background: '#020617',
    border: '1px solid #1e293b',
    borderRadius: '16px',
    padding: '4px',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
  },
  faqItemActive: {
    borderColor: 'rgba(34,197,94,0.3)',
    boxShadow: '0 4px 20px rgba(34,197,94,0.08)',
  },

  question: {
    width: '100%',
    background: 'none',
    border: 'none',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'clamp(14px, 3vw, 18px)',
    cursor: 'pointer',
    textAlign: 'left',
    gap: '12px',
    fontFamily: 'Inter, sans-serif',
  },
  questionLeft: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    flex: 1,
  },
  questionIcon: {
    fontSize: '20px',
    flexShrink: 0,
    marginTop: '2px',
  },
  questionContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  questionText: {
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    fontWeight: 600,
    color: '#e2e8f0',
    lineHeight: 1.4,
  },
  questionCategory: {
    fontSize: '11px',
    color: '#475569',
    fontWeight: 500,
  },
  chevronWrapper: {
    width: '34px',
    height: '34px',
    borderRadius: '10px',
    background: '#0f172a',
    border: '1px solid #1e293b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  answerWrapper: {
    display: 'flex',
    gap: '12px',
    padding: '0 clamp(14px, 3vw, 18px) clamp(14px, 3vw, 18px)',
    paddingLeft: 'clamp(50px, 7vw, 58px)',
  },
  answerLine: {
    width: '3px',
    borderRadius: '2px',
    background: 'linear-gradient(180deg, #22c55e, #16a34a)',
    flexShrink: 0,
  },
  answerContent: {
    flex: 1,
  },
  answer: {
    color: '#94a3b8',
    fontSize: 'clamp(13px, 2.5vw, 14px)',
    lineHeight: 1.7,
    padding: '4px 0',
    margin: '0 0 12px 0',
  },
  helpfulRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    paddingTop: '10px',
    borderTop: '1px solid #1e293b',
    flexWrap: 'wrap',
  },
  helpfulText: {
    fontSize: '12px',
    color: '#475569',
    fontWeight: 500,
  },
  helpfulBtns: {
    display: 'flex',
    gap: '6px',
  },
  helpfulBtn: {
    padding: '4px 12px',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '8px',
    color: '#94a3b8',
    fontSize: '11px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.2s ease',
  },

  /* Empty State */
  emptyState: {
    textAlign: 'center',
    padding: 'clamp(40px, 8vw, 60px) 20px',
    background: '#020617',
    border: '1px solid #1e293b',
    borderRadius: '20px',
  },
  emptyIcon: { fontSize: '44px', marginBottom: '12px' },
  emptyTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#e2e8f0',
    marginBottom: '6px',
  },
  emptyText: {
    fontSize: '13px',
    color: '#64748b',
    marginBottom: '18px',
  },
  emptyBtn: {
    padding: '10px 24px',
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50px',
    fontSize: '13px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
  },

  /* ===== CTA SECTION ===== */
  ctaSection: {
    padding: 'clamp(60px, 10vw, 100px) 20px',
    background: '#020617',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  ctaDecor1: {
    position: 'absolute',
    top: '-80px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  ctaContent: {
    maxWidth: '550px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  ctaTitle: {
    fontSize: 'clamp(26px, 5vw, 38px)',
    fontWeight: 900,
    color: '#ffffff',
    marginBottom: '12px',
    lineHeight: 1.2,
  },
  ctaText: {
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    color: '#94a3b8',
    marginBottom: '24px',
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
    padding: '16px 34px',
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '14px',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
  },
  ctaSecondaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px 34px',
    background: 'transparent',
    color: '#94a3b8',
    border: '2px solid #1e293b',
    borderRadius: '14px',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.3s ease',
  },
};

export default FAQPage;