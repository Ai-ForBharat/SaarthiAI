import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sendChatMessage } from '../api/api';
import { FaTimes, FaPaperPlane, FaRobot, FaMicrophone } from 'react-icons/fa';

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const suggestions = [
    "Tell me about DPIIT Internship Scheme",
    "Eligibility criteria for Pradhan Mantri Awas Yojana",
    "Application process of Kisan Credit Scheme",
    "Schemes for students?"
  ];

  const handleSend = async (text = input) => {
    if (!text.trim() || loading) return;

    const userMsg = text.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setLoading(true);

    try {
      const data = await sendChatMessage(userMsg);
      setMessages(prev => [
        ...prev,
        { text: data.response || "Sorry, I couldn't process that.", sender: 'bot' }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { text: "Server error. Please try again.", sender: 'bot' }
      ]);
    }

    setLoading(false);
  };

  return (
    <motion.div
      style={styles.chatWindow}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{ type: 'spring', damping: 22, stiffness: 300 }}
    >

      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <FaRobot />
          </div>
          <div>
            <span style={styles.logoText}>myScheme</span>
            <span style={styles.statusDot}>● Online</span>
          </div>
        </div>
        <button onClick={onClose} style={styles.closeBtn}>
          <FaTimes />
        </button>
      </div>

      {/* WELCOME BOX */}
      {messages.length === 0 && (
        <div style={styles.welcomeBox}>
          <h2 style={styles.welcomeTitle}>myScheme</h2>
          <p style={styles.welcomeText}>
            myScheme is a National Platform that aims to offer one-stop search
            and discovery of Government schemes.
          </p>
          <p style={styles.welcomeText}>
            Hi! I am your assistant, here to help you find eligible government
            schemes and provide information on eligibility, documents and more.
          </p>
        </div>
      )}

      {/* MESSAGES */}
      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              ...(msg.sender === 'user' ? styles.userMsg : styles.botMsg),
            }}
          >
            {msg.sender === 'bot' && (
              <div style={styles.botAvatar}>
                <FaRobot style={{ fontSize: '10px' }} />
              </div>
            )}
            <div style={{
              ...(msg.sender === 'user' ? styles.userBubble : styles.botBubble),
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ ...styles.message, ...styles.botMsg }}>
            <div style={styles.botAvatar}>
              <FaRobot style={{ fontSize: '10px' }} />
            </div>
            <div style={styles.botBubble}>
              <div style={styles.typingDots}>
                <span style={styles.dot}>●</span>
                <span style={{ ...styles.dot, animationDelay: '0.2s' }}>●</span>
                <span style={{ ...styles.dot, animationDelay: '0.4s' }}>●</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* SUGGESTIONS */}
      {messages.length === 0 && (
        <div style={styles.suggestions}>
          {suggestions.map((s, i) => (
            <button
              key={i}
              style={styles.suggestionBtn}
              onClick={() => handleSend(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* INPUT BAR */}
      <div style={styles.inputBar}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type something..."
          disabled={loading}
        />

        <button style={styles.iconBtn} title="Voice input">
          <FaMicrophone />
        </button>

        <button
          style={{
            ...styles.sendBtn,
            opacity: input.trim() ? 1 : 0.5,
          }}
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
        >
          <FaPaperPlane />
        </button>
      </div>

      {/* FOOTER NOTE */}
      <div style={styles.footer}>
        *myScheme assistant can make mistakes. Consider checking important information.
      </div>

    </motion.div>
  );
};

const styles = {
  /* 🔥 BOTTOM-RIGHT CORNER POSITIONING */
  chatWindow: {
    position: 'fixed',
    bottom: '90px',
    right: '20px',
    width: '400px',
    maxWidth: 'calc(100vw - 32px)',
    height: '580px',
    maxHeight: 'calc(100vh - 120px)',
    background: '#0f172a',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px #1e293b',
    border: '1px solid #1e293b',
    fontFamily: 'Inter, sans-serif',
    zIndex: 2000,
  },

  /* HEADER */
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 16px',
    borderBottom: '1px solid #1e293b',
    background: '#020617',
    flexShrink: 0,
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  logoIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.05))',
    border: '1px solid rgba(34,197,94,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#22c55e',
    fontSize: '16px',
  },

  logoText: {
    fontWeight: 700,
    fontSize: '16px',
    color: '#ffffff',
    display: 'block',
  },

  statusDot: {
    fontSize: '10px',
    color: '#22c55e',
    fontWeight: 500,
  },

  closeBtn: {
    background: '#1e293b',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    color: '#94a3b8',
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },

  /* WELCOME BOX */
  welcomeBox: {
    padding: '16px',
    background: '#020617',
    borderRadius: '12px',
    margin: '12px',
    border: '1px solid #1e293b',
    flexShrink: 0,
  },

  welcomeTitle: {
    fontSize: '16px',
    fontWeight: 800,
    color: '#22c55e',
    marginBottom: '8px',
    margin: '0 0 8px 0',
  },

  welcomeText: {
    fontSize: '12px',
    color: '#94a3b8',
    lineHeight: 1.5,
    margin: '0 0 6px 0',
  },

  /* MESSAGES */
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  message: {
    display: 'flex',
    gap: '8px',
    maxWidth: '85%',
  },

  botMsg: {
    alignSelf: 'flex-start',
  },

  userMsg: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },

  botAvatar: {
    width: '24px',
    height: '24px',
    borderRadius: '8px',
    background: 'rgba(34,197,94,0.15)',
    border: '1px solid rgba(34,197,94,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#22c55e',
    flexShrink: 0,
    marginTop: '2px',
  },

  botBubble: {
    padding: '10px 14px',
    borderRadius: '4px 12px 12px 12px',
    background: '#1e293b',
    color: '#e2e8f0',
    fontSize: '13px',
    lineHeight: 1.5,
  },

  userBubble: {
    padding: '10px 14px',
    borderRadius: '12px 4px 12px 12px',
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: '#ffffff',
    fontSize: '13px',
    lineHeight: 1.5,
  },

  /* TYPING DOTS */
  typingDots: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    padding: '2px 0',
  },

  dot: {
    fontSize: '14px',
    color: '#64748b',
    animation: 'pulse 1s infinite',
  },

  /* SUGGESTIONS */
  suggestions: {
    padding: '8px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flexShrink: 0,
    maxHeight: '180px',
    overflowY: 'auto',
  },

  suggestionBtn: {
    background: '#020617',
    border: '1px solid #1e293b',
    padding: '10px 14px',
    borderRadius: '10px',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '12px',
    color: '#94a3b8',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.2s ease',
    fontWeight: 500,
  },

  /* INPUT BAR */
  inputBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 12px',
    gap: '8px',
    borderTop: '1px solid #1e293b',
    background: '#020617',
    flexShrink: 0,
  },

  input: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: '12px',
    border: '1px solid #1e293b',
    outline: 'none',
    fontSize: '13px',
    fontFamily: 'Inter, sans-serif',
    background: '#0f172a',
    color: '#ffffff',
  },

  iconBtn: {
    background: '#1e293b',
    border: 'none',
    padding: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
    color: '#94a3b8',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },

  sendBtn: {
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },

  /* FOOTER */
  footer: {
    fontSize: '10px',
    color: '#475569',
    padding: '6px 12px 10px',
    textAlign: 'center',
    background: '#020617',
    flexShrink: 0,
  },
};

export default ChatBot;