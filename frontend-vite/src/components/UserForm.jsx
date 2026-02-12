import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { getRecommendations } from '../api/api';
import { toast } from 'react-toastify';
import {
  FaUser, FaBirthdayCake, FaVenusMars, FaMapMarkerAlt,
  FaUsers, FaRupeeSign, FaBriefcase, FaGraduationCap,
  FaHeart, FaArrowRight, FaArrowLeft, FaSearch,
  FaTractor, FaUserGraduate, FaWheelchair, FaMosque
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

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '15px',
    fontFamily: 'Inter, sans-serif',
    background: '#fafbff',
    transition: 'all 0.3s ease',
    outline: 'none',
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '6px',
    color: '#1e293b',
  };

  const groupStyle = { marginBottom: '18px' };

  const checkboxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 18px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    marginBottom: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    background: '#fafbff',
  };

  return (
    <section id="form-section" style={styles.section}>
      <motion.div
        style={styles.container}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={styles.title}>
          <FaUser style={{ color: '#3b82f6' }} /> Enter Your Details
        </h2>
        <p style={styles.subtitle}>
          Fill your information to find matching government schemes
        </p>

        {/* Progress */}
        <div style={styles.progress}>
          {['Personal', 'Economic', 'Additional'].map((label, i) => (
            <React.Fragment key={label}>
              {i > 0 && <div style={{
                ...styles.progressLine,
                background: step > i ? '#22c55e' : '#e2e8f0'
              }} />}
              <div style={styles.progressStep}>
                <div style={{
                  ...styles.progressDot,
                  background: step > i ? '#22c55e' : step === i + 1 ? '#3b82f6' : '#e2e8f0',
                  color: step >= i + 1 ? 'white' : '#94a3b8',
                }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span style={{
                  fontSize: '12px',
                  fontWeight: step === i + 1 ? 700 : 500,
                  color: step === i + 1 ? '#3b82f6' : '#94a3b8',
                }}>{label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* Step 1 */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 style={styles.stepTitle}>👤 Personal Information</h3>

                <div style={groupStyle}>
                  <label style={labelStyle}><FaUser style={{color:'#3b82f6'}} /> Full Name</label>
                  <input style={inputStyle} name="name" value={formData.name}
                    onChange={handleChange} placeholder="Enter your full name" required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div style={groupStyle}>
                    <label style={labelStyle}><FaBirthdayCake style={{color:'#f97316'}} /> Age</label>
                    <input style={inputStyle} type="number" name="age" value={formData.age}
                      onChange={handleChange} placeholder="Your age" min="0" max="120" required />
                  </div>
                  <div style={groupStyle}>
                    <label style={labelStyle}><FaVenusMars style={{color:'#ec4899'}} /> Gender</label>
                    <select style={inputStyle} name="gender" value={formData.gender} onChange={handleChange} required>
                      <option value="">Select Gender</option>
                      <option value="male">👨 Male</option>
                      <option value="female">👩 Female</option>
                      <option value="other">🧑 Other</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div style={groupStyle}>
                    <label style={labelStyle}><FaMapMarkerAlt style={{color:'#ef4444'}} /> State</label>
                    <select style={inputStyle} name="state" value={formData.state} onChange={handleChange} required>
                      <option value="">Select State</option>
                      {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div style={groupStyle}>
                    <label style={labelStyle}><FaUsers style={{color:'#8b5cf6'}} /> Category</label>
                    <select style={inputStyle} name="category" value={formData.category} onChange={handleChange} required>
                      <option value="">Select Category</option>
                      <option value="general">General</option>
                      <option value="obc">OBC</option>
                      <option value="sc">SC</option>
                      <option value="st">ST</option>
                    </select>
                  </div>
                </div>

                <motion.button type="button" onClick={nextStep} style={styles.nextBtn}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  Next <FaArrowRight />
                </motion.button>
              </motion.div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 style={styles.stepTitle}>💰 Economic Information</h3>

                <div style={groupStyle}>
                  <label style={labelStyle}><FaRupeeSign style={{color:'#22c55e'}} /> Annual Family Income (₹)</label>
                  <input style={inputStyle} type="number" name="annual_income" value={formData.annual_income}
                    onChange={handleChange} placeholder="e.g. 200000" min="0" required />
                  <small style={{ color: '#94a3b8', fontSize: '12px' }}>Enter total yearly family income</small>
                </div>

                <div style={groupStyle}>
                  <label style={labelStyle}><FaBriefcase style={{color:'#f97316'}} /> Occupation</label>
                  <select style={inputStyle} name="occupation" value={formData.occupation} onChange={handleChange} required>
                    <option value="">Select Occupation</option>
                    <option value="farmer">🌾 Farmer</option>
                    <option value="student">🎓 Student</option>
                    <option value="employed">💼 Employed</option>
                    <option value="self_employed">🏪 Self-Employed</option>
                    <option value="unemployed">🔍 Unemployed</option>
                    <option value="daily_wage">🔨 Daily Wage Worker</option>
                    <option value="homemaker">🏠 Homemaker</option>
                    <option value="retired">👴 Retired</option>
                  </select>
                </div>

                <label style={checkboxStyle}>
                  <input type="checkbox" name="is_bpl" checked={formData.is_bpl}
                    onChange={handleChange} style={{ width: 18, height: 18, accentColor: '#3b82f6' }} />
                  📋 BPL (Below Poverty Line) Card Holder
                </label>

                <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                  <motion.button type="button" onClick={prevStep} style={styles.backBtn}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <FaArrowLeft /> Back
                  </motion.button>
                  <motion.button type="button" onClick={nextStep} style={{ ...styles.nextBtn, flex: 1 }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    Next <FaArrowRight />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 style={styles.stepTitle}>📋 Additional Information</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div style={groupStyle}>
                    <label style={labelStyle}><FaGraduationCap style={{color:'#8b5cf6'}} /> Education</label>
                    <select style={inputStyle} name="education" value={formData.education} onChange={handleChange}>
                      <option value="">Select Level</option>
                      <option value="none">No Formal Education</option>
                      <option value="primary">Primary (1-5)</option>
                      <option value="secondary">Secondary (6-10)</option>
                      <option value="higher_secondary">Higher Secondary</option>
                      <option value="graduate">Graduate</option>
                      <option value="post_graduate">Post Graduate</option>
                    </select>
                  </div>
                  <div style={groupStyle}>
                    <label style={labelStyle}><FaHeart style={{color:'#ef4444'}} /> Marital Status</label>
                    <select style={inputStyle} name="marital_status" value={formData.marital_status} onChange={handleChange}>
                      <option value="">Select Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="widowed">Widowed</option>
                      <option value="divorced">Divorced</option>
                    </select>
                  </div>
                </div>

                {[
                  { name: 'is_farmer', icon: <FaTractor />, label: 'I am a Farmer / Own Agricultural Land' },
                  { name: 'is_student', icon: <FaUserGraduate />, label: 'I am currently a Student' },
                  { name: 'disability', icon: <FaWheelchair />, label: 'Person with Disability' },
                  { name: 'is_minority', icon: <FaMosque />, label: 'Minority Community' },
                ].map(item => (
                  <label key={item.name} style={checkboxStyle}>
                    <input type="checkbox" name={item.name} checked={formData[item.name]}
                      onChange={handleChange} style={{ width: 18, height: 18, accentColor: '#3b82f6' }} />
                    {item.icon} {item.label}
                  </label>
                ))}

                <div style={{ display: 'flex', gap: '12px', marginTop: '15px' }}>
                  <motion.button type="button" onClick={prevStep} style={styles.backBtn}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <FaArrowLeft /> Back
                  </motion.button>
                  <motion.button type="submit" style={styles.submitBtn}
                    whileHover={{ scale: 1.02, boxShadow: '0 6px 20px rgba(34,197,94,0.4)' }}
                    whileTap={{ scale: 0.98 }}>
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
  section: {
    maxWidth: '680px',
    margin: '-50px auto 40px',
    padding: '0 20px',
    position: 'relative',
    zIndex: 10,
  },
  container: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 10px 50px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  title: {
    fontSize: '24px',
    fontWeight: 800,
    color: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '4px',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '14px',
    marginBottom: '28px',
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '30px',
    gap: '0',
  },
  progressStep: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
  },
  progressDot: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '14px',
    transition: 'all 0.3s ease',
  },
  progressLine: {
    width: '60px',
    height: '3px',
    borderRadius: '10px',
    marginBottom: '22px',
    marginLeft: '4px',
    marginRight: '4px',
    transition: 'all 0.3s ease',
  },
  stepTitle: {
    fontSize: '18px',
    fontWeight: 700,
    marginBottom: '20px',
    color: '#1e293b',
  },
  nextBtn: {
    width: '100%',
    padding: '14px 24px',
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    marginTop: '10px',
  },
  backBtn: {
    padding: '14px 24px',
    background: '#f1f5f9',
    color: '#64748b',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
  },
  submitBtn: {
    flex: 1,
    padding: '16px 24px',
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
  },
};

export default UserForm;