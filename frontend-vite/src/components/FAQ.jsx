import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const FAQ = () => {
  const { setCurrentView } = useApp();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What is GovScheme AI?',
      a: 'GovScheme AI is an AI-powered platform that helps Indian citizens discover government schemes they are eligible for based on their personal profile.',
      icon: '🤖',
    },
    {
      q: 'How will GovScheme AI help common citizens?',
      a: 'It simplifies access to welfare schemes by matching users with relevant Central and State schemes instantly in one place.',
      icon: '🇮🇳',
    },
    {
      q: 'Can I apply for the schemes through GovScheme AI?',
      a: 'We provide official application links and complete guidance so you can apply directly through government portals.',
      icon: '📝',
    },
    {
      q: 'How does GovScheme AI work? How do I check eligibility?',
      a: 'You fill out a simple form. Our AI compares your details with scheme eligibility criteria and shows the best matches instantly.',
      icon: '⚙️',
    },
    {
      q: 'What information about a scheme can I find?',
      a: 'You can see eligibility, benefits, documents required, application steps, official website links, and match percentage.',
      icon: '📋',
    },
  ];

  const quickFacts = [
    { text: '200+ Schemes', icon: '📊' },
    { text: '100% Free', icon: '💚' },
    { text: 'AI Powered', icon: '🤖' },
    { text: '12+ Languages', icon: '🌐' },
  ];

  return (
    <section style={styles.section}>
      {/* Background decorations */}
      <div style={styles.bgDecor1} />
      <div style={styles.bgDecor2} />
      <div style={styles.bgDecor3} />

      <div style={styles.container}>

        {/* LEFT SIDE */}
        <motion.div
          style={styles.left}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={styles.imageWrapper}>
            <div style={styles.imageGlow} />

            <div style={styles.imagePlaceholder}>
              {/* Decorative FAQ illustration */}
              <div style={styles.illustrationContent}>

                {/* Top bar */}
                <div style={styles.frameTopBar}>
                  <div style={styles.frameDots}>
                    <span style={{ ...styles.frameDot, background: '#ef4444' }} />
                    <span style={{ ...styles.frameDot, background: '#f59e0b' }} />
                    <span style={{ ...styles.frameDot, background: '#22c55e' }} />
                  </div>
                  <span style={styles.frameUrl}>help.govscheme.ai</span>
                </div>

                {/* Main content */}
                <div style={styles.illustrationMain}>
                  <motion.div
                    style={styles.illustrationIcon}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    ❓
                  </motion.div>

                  <div style={styles.illustrationTitle}>Help Center</div>
                  <div style={styles.illustrationSub}>Find answers quickly</div>

                  {/* Mock search bar */}
                  <div style={styles.mockSearchBar}>
                    <FaQuestionCircle style={{ color: '#64748b', fontSize: '12px' }} />
                    <span style={styles.mockSearchText}>Search your question...</span>
                  </div>

                  {/* Quick facts */}
                  <div style={styles.quickFacts}>
                    {quickFacts.map((fact, i) => (
                      <motion.div
                        key={i}
                        style={styles.quickFact}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <span style={styles.quickFactIcon}>{fact.icon}</span>
                        <span style={styles.quickFactText}>{fact.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mock FAQ items */}
                  <div style={styles.mockFaqList}>
                    {[1, 2, 3].map((_, i) => (
                      <motion.div
                        key={i}
                        style={styles.mockFaqItem}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <div style={styles.mockFaqLine} />
                        <FaCheckCircle style={{ color: '#22c55e', fontSize: '10px', flexShrink: 0 }} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                style={styles.floatingBadge1}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <FaQuestionCircle style={{ fontSize: '10px' }} /> 50+ FAQs
              </motion.div>

              <motion.div
                style={styles.floatingBadge2}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <FaCheckCircle style={{ fontSize: '10px' }} /> Instant Help
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE CONTENT */}
        <motion.div
          style={styles.right}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            style={styles.badge}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            ❓ FAQ
          </motion.div>

          <p style={styles.smallTitle}>Frequently Asked Questions</p>

          <h2 style={styles.bigTitle}>
            Checkout our{' '}
            <span style={styles.bigTitleHighlight}>knowledge base</span> for
            some of your answers!
          </h2>

          <div style={styles.faqList}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                style={{
                  ...styles.faqItem,
                  ...(openIndex === i ? styles.faqItemActive : {}),
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <button
                  style={styles.question}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <div style={styles.questionLeft}>
                    <span style={styles.questionIcon}>{faq.icon}</span>
                    <span style={styles.questionText}>{faq.q}</span>
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
                        <p style={styles.answer}>{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* BOTTOM ROW */}
          <motion.div
            style={styles.bottomRow}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              style={styles.viewMoreBtn}
              onClick={() => setCurrentView('faq')}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(34,197,94,0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              View All Questions <FaArrowRight style={{ fontSize: '12px' }} />
            </motion.button>

            <div style={styles.helpText}>
              <span style={styles.helpTextIcon}>💬</span>
              Can't find your answer?{' '}
              <span style={styles.helpTextLink}>Ask our AI</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

const styles = {
  section: {
    background: '#0f172a',
    padding: 'clamp(60px, 10vw, 100px) 20px',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
  },

  /* Background decorations */
  bgDecor1: {
    position: 'absolute',
    top: '-150px',
    right: '-150px',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgDecor2: {
    position: 'absolute',
    bottom: '-100px',
    left: '-100px',
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgDecor3: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 60%)',
    pointerEvents: 'none',
  },

  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    gap: 'clamp(40px, 6vw, 80px)',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    position: 'relative',
    zIndex: 1,
  },

  /* LEFT SIDE */
  left: {
    flex: 1,
    minWidth: '300px',
    display: 'flex',
    justifyContent: 'center',
  },

  imageWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '450px',
  },

  imageGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: 0,
  },

  imagePlaceholder: {
    width: '100%',
    height: '440px',
    borderRadius: '20px',
    background: '#020617',
    border: '1px solid #1e293b',
    boxShadow: '0 25px 70px rgba(0,0,0,0.5)',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
  },

  /* Illustration content */
  illustrationContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  frameTopBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 14px',
    borderBottom: '1px solid #1e293b',
    background: '#0f172a',
  },
  frameDots: {
    display: 'flex',
    gap: '5px',
  },
  frameDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    display: 'block',
  },
  frameUrl: {
    fontSize: '10px',
    color: '#64748b',
    fontWeight: 500,
    background: '#020617',
    padding: '2px 10px',
    borderRadius: '4px',
    flex: 1,
    textAlign: 'center',
  },

  illustrationMain: {
    padding: '20px 18px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
  },
  illustrationIcon: { fontSize: '32px' },
  illustrationTitle: {
    fontSize: '18px',
    fontWeight: 800,
    color: '#ffffff',
  },
  illustrationSub: {
    fontSize: '11px',
    color: '#64748b',
    marginBottom: '8px',
  },

  mockSearchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '90%',
    padding: '8px 14px',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '10px',
    marginBottom: '4px',
  },
  mockSearchText: {
    fontSize: '11px',
    color: '#475569',
    fontWeight: 500,
  },

  quickFacts: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '6px',
    width: '90%',
  },
  quickFact: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 10px',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '8px',
  },
  quickFactIcon: { fontSize: '12px' },
  quickFactText: {
    fontSize: '10px',
    color: '#94a3b8',
    fontWeight: 600,
  },

  mockFaqList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '90%',
    marginTop: '4px',
  },
  mockFaqItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '8px',
  },
  mockFaqLine: {
    height: '6px',
    width: '60%',
    background: '#1e293b',
    borderRadius: '3px',
  },

  /* Floating badges */
  floatingBadge1: {
    position: 'absolute',
    top: '60px',
    right: '-10px',
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
    bottom: '50px',
    left: '-10px',
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

  /* RIGHT SIDE */
  right: {
    flex: 1,
    minWidth: '320px',
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
    marginBottom: '12px',
  },

  smallTitle: {
    color: '#64748b',
    fontSize: 'clamp(13px, 2.5vw, 15px)',
    marginBottom: '10px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },

  bigTitle: {
    fontSize: 'clamp(28px, 5vw, 40px)',
    fontWeight: 800,
    lineHeight: 1.2,
    marginBottom: 'clamp(28px, 5vw, 40px)',
    color: '#ffffff',
  },

  bigTitleHighlight: {
    color: '#22c55e',
  },

  /* FAQ LIST */
  faqList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  faqItem: {
    background: '#020617',
    border: '1px solid #1e293b',
    borderRadius: '14px',
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
    padding: 'clamp(12px, 2.5vw, 16px)',
    cursor: 'pointer',
    textAlign: 'left',
    gap: '12px',
    fontFamily: 'Inter, sans-serif',
  },

  questionLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
  },

  questionIcon: {
    fontSize: '18px',
    flexShrink: 0,
  },

  questionText: {
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    fontWeight: 600,
    color: '#e2e8f0',
    lineHeight: 1.4,
  },

  chevronWrapper: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
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
    padding: '0 clamp(12px, 2.5vw, 16px) clamp(12px, 2.5vw, 16px)',
    paddingLeft: 'clamp(48px, 6vw, 56px)',
  },

  answerLine: {
    width: '3px',
    borderRadius: '2px',
    background: 'linear-gradient(180deg, #22c55e, #16a34a)',
    flexShrink: 0,
  },

  answer: {
    color: '#94a3b8',
    fontSize: 'clamp(13px, 2.5vw, 14px)',
    lineHeight: 1.7,
    padding: '4px 0',
    margin: 0,
  },

  /* BOTTOM ROW */
  bottomRow: {
    marginTop: 'clamp(28px, 5vw, 40px)',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },

  viewMoreBtn: {
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    fontSize: '14px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  helpText: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: '#64748b',
    fontWeight: 500,
  },

  helpTextIcon: {
    fontSize: '16px',
  },

  helpTextLink: {
    color: '#3b82f6',
    fontWeight: 700,
    cursor: 'pointer',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },
};

export default FAQ;