import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { getRecommendations } from '../api/api';
import { toast } from 'react-toastify';
import {
  FaUser, FaBirthdayCake, FaVenusMars, FaMapMarkerAlt,
  FaUsers, FaRupeeSign, FaBriefcase, FaGraduationCap,
  FaHeart, FaArrowRight, FaArrowLeft, FaSearch,
  FaTractor, FaUserGraduate, FaWheelchair, FaMosque,
  FaHome, FaClipboardList, FaMoneyBillWave, FaFileAlt
} from 'react-icons/fa';

const UserForm = () => {
  const {
    language, setResults, setUserProfile,
    setCurrentView, setTotalMatches, STATES
  } = useApp();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', age: '', gender: '', state: '',
    category: '', annual_income: '', occupation: '',
    education: '', marital_status: '',
    is_bpl: false, is_farmer: false, is_student: false,
    disability: false, is_minority: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateStep = (s) => {
    if (s === 1) {
      if (!formData.name || !formData.age || !formData.gender || !formData.state || !formData.category) {
        toast.error('Please fill all fields');
        return false;
      }
      if (formData.age < 0 || formData.age > 120) {
        toast.error('Enter a valid age');
        return false;
      }
    }
    if (s === 2) {
      if (!formData.annual_income || !formData.occupation) {
        toast.error('Please fill income and occupation');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(step)) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const goBackHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentView('loading');

    const payload = {
      ...formData,
      age: parseInt(formData.age),
      annual_income: parseInt(formData.annual_income),
      language,
    };

    try {
      const data = await getRecommendations(payload);
      if (data.success) {
        setResults(data.schemes);
        setTotalMatches(data.total_matches);
        setUserProfile(payload);
        setCurrentView('results');
        toast.success(`Found ${data.total_matches} schemes for you!`);
      }
    } catch (error) {
      toast.error('Error connecting to server. Is backend running?');
      setCurrentView('home');
    }
  };

  return (
    <section style={styles.fullPage}>
      <div style={styles.bgDecor1} />
      <div style={styles.bgDecor2} />

      <motion.div
        style={styles.container}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back to Home */}
        <motion.button
          onClick={goBackHome}
          style={styles.backHomeBtn}
          whileHover={{ scale: 1.05, background: '#f3f4f6' }}
          whileTap={{ scale: 0.95 }}
        >
          <FaHome /> Back to Home
        </motion.button>

        {/* Header */}
        <div style={styles.header}>
          <motion.div
            style={styles.headerIcon}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            <FaSearch style={{ fontSize: '28px', color: '#f97316' }} />
          </motion.div>

          <h2 style={styles.title}>Find Your Schemes</h2>
          <p style={styles.subtitle}>
            Fill in your details and our AI will match you with eligible
            government schemes instantly
          </p>
        </div>

        {/* Progress */}
        <div style={styles.progress}>
          {['Personal', 'Economic', 'Additional'].map((label, i) => (
            <React.Fragment key={label}>
              {i > 0 && (
                <div style={{
                  ...styles.progressLine,
                  background: step > i
                    ? 'linear-gradient(90deg, #f97316, #ea580c)'
                    : '#e5e7eb'
                }} />
              )}
              <div style={styles.progressStep}>
                <motion.div
                  style={{
                    ...styles.progressDot,
                    background: step > i + 1
                      ? '#f97316'
                      : step === i + 1
                        ? 'linear-gradient(135deg, #f97316, #ea580c)'
                        : '#f3f4f6',
                    color: step >= i + 1 ? 'white' : '#9ca3af',
                    border: step < i + 1 ? '2px solid #e5e7eb' : '2px solid transparent',
                    boxShadow: step === i + 1
                      ? '0 0 20px rgba(249,115,22,0.3)'
                      : 'none',
                  }}
                  animate={step === i + 1 ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {step > i + 1 ? '✓' : i + 1}
                </motion.div>
                <span style={{
                  fontSize: 'clamp(10px, 2.5vw, 12px)',
                  fontWeight: step === i + 1 ? 700 : 500,
                  color: step === i + 1 ? '#f97316' : '#9ca3af',
                  marginTop: '6px',
                }}>{label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Step indicator */}
        <div style={styles.stepIndicator}>
          Step {step} of 3
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">

            {/* ===== STEP 1 ===== */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.35 }}
              >
                <h3 style={styles.stepTitle}>
                  <FaUser style={{ color: '#f97316', fontSize: '16px' }} /> Personal Information
                </h3>

                <div style={styles.group}>
                  <label style={styles.label}>
                    <FaUser style={styles.labelIcon} /> Full Name
                  </label>
                  <input
                    style={styles.input}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div style={styles.row}>
                  <div style={styles.group}>
                    <label style={styles.label}>
                      <FaBirthdayCake style={{ ...styles.labelIcon, color: '#ea580c' }} /> Age
                    </label>
                    <input
                      style={styles.input}
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Your age"
                      min="0"
                      max="120"
                      required
                    />
                  </div>
                  <div style={styles.group}>
                    <label style={styles.label}>
                      <FaVenusMars style={{ ...styles.labelIcon, color: '#ec4899' }} /> Gender
                    </label>
                    <select
                      style={styles.input}
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div style={styles.row}>
                  <div style={styles.group}>
                    <label style={styles.label}>
                      <FaMapMarkerAlt style={{ ...styles.labelIcon, color: '#ef4444' }} /> State
                    </label>
                    <select
                      style={styles.input}
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select State</option>
                      {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div style={styles.group}>
                    <label style={styles.label}>
                      <FaUsers style={{ ...styles.labelIcon, color: '#8b5cf6' }} /> Category
                    </label>
                    <select
                      style={styles.input}
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="general">General</option>
                      <option value="obc">OBC</option>
                      <option value="sc">SC</option>
                      <option value="st">ST</option>
                    </select>
                  </div>
                </div>

                <motion.button
                  type="button"
                  onClick={nextStep}
                  style={styles.nextBtn}
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(249,115,22,0.3)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue to Economic Details <FaArrowRight />
                </motion.button>
              </motion.div>
            )}

            {/* ===== STEP 2 ===== */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.35 }}
              >
                <h3 style={styles.stepTitle}>
                  <FaMoneyBillWave style={{ color: '#f97316', fontSize: '16px' }} /> Economic Information
                </h3>

                <div style={styles.group}>
                  <label style={styles.label}>
                    <FaRupeeSign style={{ ...styles.labelIcon, color: '#f97316' }} /> Annual Family Income (₹)
                  </label>
                  <input
                    style={styles.input}
                    type="number"
                    name="annual_income"
                    value={formData.annual_income}
                    onChange={handleChange}
                    placeholder="e.g. 200000"
                    min="0"
                    required
                  />
                  <small style={styles.hint}>Enter total yearly family income</small>
                </div>

                <div style={styles.group}>
                  <label style={styles.label}>
                    <FaBriefcase style={{ ...styles.labelIcon, color: '#ea580c' }} /> Occupation
                  </label>
                  <select
                    style={styles.input}
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Occupation</option>
                    <option value="farmer">Farmer</option>
                    <option value="student">Student</option>
                    <option value="employed">Employed</option>
                    <option value="self_employed">Self-Employed</option>
                    <option value="unemployed">Unemployed</option>
                    <option value="daily_wage">Daily Wage Worker</option>
                    <option value="homemaker">Homemaker</option>
                    <option value="retired">Retired</option>
                  </select>
                </div>

                <label style={styles.checkbox}>
                  <input
                    type="checkbox"
                    name="is_bpl"
                    checked={formData.is_bpl}
                    onChange={handleChange}
                    style={styles.checkboxInput}
                  />
                  <FaClipboardList style={{ color: '#f97316', fontSize: '14px', flexShrink: 0 }} />
                  BPL (Below Poverty Line) Card Holder
                </label>

                <div style={styles.btnRow}>
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    style={styles.backBtn}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaArrowLeft /> Back
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    style={{ ...styles.nextBtn, flex: 1, marginTop: 0 }}
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(249,115,22,0.3)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue <FaArrowRight />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ===== STEP 3 ===== */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.35 }}
              >
                <h3 style={styles.stepTitle}>
                  <FaFileAlt style={{ color: '#f97316', fontSize: '16px' }} /> Additional Information
                </h3>

                <div style={styles.row}>
                  <div style={styles.group}>
                    <label style={styles.label}>
                      <FaGraduationCap style={{ ...styles.labelIcon, color: '#8b5cf6' }} /> Education
                    </label>
                    <select
                      style={styles.input}
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                    >
                      <option value="">Select Level</option>
                      <option value="none">No Formal Education</option>
                      <option value="primary">Primary (1-5)</option>
                      <option value="secondary">Secondary (6-10)</option>
                      <option value="higher_secondary">Higher Secondary</option>
                      <option value="graduate">Graduate</option>
                      <option value="post_graduate">Post Graduate</option>
                    </select>
                  </div>
                  <div style={styles.group}>
                    <label style={styles.label}>
                      <FaHeart style={{ ...styles.labelIcon, color: '#ef4444' }} /> Marital Status
                    </label>
                    <select
                      style={styles.input}
                      name="marital_status"
                      value={formData.marital_status}
                      onChange={handleChange}
                    >
                      <option value="">Select Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="widowed">Widowed</option>
                      <option value="divorced">Divorced</option>
                    </select>
                  </div>
                </div>

                {[
                  { name: 'is_farmer', icon: <FaTractor />, text: 'I am a Farmer / Own Agricultural Land' },
                  { name: 'is_student', icon: <FaUserGraduate />, text: 'I am currently a Student' },
                  { name: 'disability', icon: <FaWheelchair />, text: 'Person with Disability' },
                  { name: 'is_minority', icon: <FaMosque />, text: 'Minority Community' },
                ].map(item => (
                  <label key={item.name} style={styles.checkbox}>
                    <input
                      type="checkbox"
                      name={item.name}
                      checked={formData[item.name]}
                      onChange={handleChange}
                      style={styles.checkboxInput}
                    />
                    <span style={{ color: '#f97316', fontSize: '14px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                      {item.icon}
                    </span>
                    {item.text}
                  </label>
                ))}

                <div style={styles.btnRow}>
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    style={styles.backBtn}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaArrowLeft /> Back
                  </motion.button>
                  <motion.button
                    type="submit"
                    style={styles.submitBtn}
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(249,115,22,0.4)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaSearch /> Find My Schemes
                  </motion.button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </form>
      </motion.div>
    </section>
  );
};

const styles = {
  fullPage: {
    minHeight: '100vh',
    background: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'clamp(30px, 5vw, 60px) clamp(12px, 3vw, 20px)',
    position: 'relative',
    overflow: 'hidden',
  },

  bgDecor1: {
    position: 'absolute',
    top: '-150px',
    right: '-150px',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgDecor2: {
    position: 'absolute',
    bottom: '-100px',
    left: '-100px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
  },

  container: {
    width: '100%',
    maxWidth: '720px',
    background: '#ffffff',
    borderRadius: 'clamp(16px, 3vw, 24px)',
    padding: 'clamp(24px, 5vw, 48px)',
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.08), 0 0 0 1px #e5e7eb',
    border: '1px solid #e5e7eb',
    position: 'relative',
    zIndex: 1,
  },

  backHomeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '50px',
    color: '#6b7280',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    marginBottom: '24px',
    transition: 'all 0.3s ease',
  },

  header: {
    textAlign: 'center',
    marginBottom: 'clamp(24px, 4vw, 36px)',
  },
  headerIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'rgba(249,115,22,0.08)',
    border: '2px solid rgba(249,115,22,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  },

  title: {
    fontSize: 'clamp(22px, 5vw, 30px)',
    fontWeight: 800,
    color: '#1a1a1a',
    marginBottom: '8px',
  },

  subtitle: {
    color: '#6b7280',
    fontSize: 'clamp(13px, 2.5vw, 15px)',
    maxWidth: '480px',
    margin: '0 auto',
    lineHeight: 1.6,
  },

  progress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 'clamp(8px, 2vw, 12px)',
  },

  progressStep: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  },

  progressDot: {
    width: 'clamp(32px, 5vw, 40px)',
    height: 'clamp(32px, 5vw, 40px)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 'clamp(12px, 2.5vw, 14px)',
    transition: 'all 0.4s ease',
  },

  progressLine: {
    width: 'clamp(40px, 10vw, 80px)',
    height: '3px',
    borderRadius: '10px',
    marginBottom: '22px',
    marginLeft: '4px',
    marginRight: '4px',
    transition: 'all 0.4s ease',
  },

  stepIndicator: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#9ca3af',
    fontWeight: 600,
    marginBottom: 'clamp(20px, 4vw, 30px)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },

  stepTitle: {
    fontSize: 'clamp(16px, 3vw, 20px)',
    fontWeight: 700,
    marginBottom: 'clamp(16px, 3vw, 24px)',
    color: '#1a1a1a',
    paddingBottom: '12px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  group: {
    marginBottom: 'clamp(16px, 3vw, 20px)',
  },

  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: 'clamp(12px, 2.5vw, 14px)',
    fontWeight: 600,
    marginBottom: '8px',
    color: '#1a1a1a',
  },

  labelIcon: {
    color: '#f97316',
    fontSize: '14px',
  },

  input: {
    width: '100%',
    padding: 'clamp(12px, 2.5vw, 16px) clamp(14px, 2.5vw, 18px)',
    border: '2px solid #e5e7eb',
    borderRadius: 'clamp(10px, 2vw, 12px)',
    fontSize: 'clamp(13px, 2.5vw, 15px)',
    fontFamily: 'Inter, sans-serif',
    background: '#f9fafb',
    color: '#1a1a1a',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box',
  },

  hint: {
    color: '#9ca3af',
    fontSize: 'clamp(10px, 2vw, 12px)',
    marginTop: '6px',
    display: 'block',
  },

  row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'clamp(12px, 2vw, 16px)',
  },

  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(10px, 2vw, 14px)',
    padding: 'clamp(12px, 2.5vw, 16px) clamp(14px, 2.5vw, 20px)',
    border: '2px solid #e5e7eb',
    borderRadius: 'clamp(10px, 2vw, 12px)',
    marginBottom: 'clamp(10px, 1.5vw, 12px)',
    cursor: 'pointer',
    fontSize: 'clamp(12px, 2.5vw, 14px)',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    background: '#f9fafb',
    color: '#1a1a1a',
  },

  checkboxInput: {
    width: '20px',
    height: '20px',
    accentColor: '#f97316',
    flexShrink: 0,
  },

  btnRow: {
    display: 'flex',
    gap: 'clamp(10px, 2vw, 14px)',
    marginTop: 'clamp(16px, 3vw, 24px)',
    flexWrap: 'wrap',
  },

  nextBtn: {
    width: '100%',
    padding: 'clamp(14px, 3vw, 18px) 24px',
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    color: 'white',
    border: 'none',
    borderRadius: 'clamp(10px, 2vw, 12px)',
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    marginTop: '12px',
  },

  backBtn: {
    padding: 'clamp(14px, 3vw, 18px) clamp(18px, 3vw, 28px)',
    background: '#f9fafb',
    color: '#4b5563',
    border: '1px solid #e5e7eb',
    borderRadius: 'clamp(10px, 2vw, 12px)',
    fontSize: 'clamp(13px, 2.5vw, 15px)',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
  },

  submitBtn: {
    flex: 1,
    padding: 'clamp(14px, 3vw, 18px) 24px',
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    color: 'white',
    border: 'none',
    borderRadius: 'clamp(10px, 2vw, 12px)',
    fontSize: 'clamp(14px, 3vw, 17px)',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    minWidth: '180px',
  },
};

export default UserForm;