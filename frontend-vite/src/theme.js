// Use these in ALL components instead of hardcoded colors

export const T = {
  // Primary
  primary: '#16a34a',
  primaryLight: '#22c55e',
  primaryDark: '#15803d',
  primaryDarker: '#166534',
  primaryGradient: 'linear-gradient(135deg, #16a34a, #15803d)',
  primaryGlow: 'rgba(22, 163, 74, 0.4)',

  // Accent (same green family)
  accent: '#10b981',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',

  // Light backgrounds (green tint)
  bgLight: '#f0fdf4',
  bgLighter: '#dcfce7',
  bgBadge: '#dcfce7',

  // Gradients
  navbarBg: 'var(--navbar-bg)',
  heroBg: 'var(--hero-bg)',
  footerBg: 'var(--footer-bg)',
  buttonGradient: 'linear-gradient(135deg, #16a34a, #15803d)',
  buttonGradientHover: 'linear-gradient(135deg, #22c55e, #16a34a)',
  chatGradient: 'linear-gradient(135deg, #16a34a, #166534)',
  summaryBg: 'linear-gradient(135deg, #166534, #15803d)',

  // Dynamic (uses CSS vars for dark mode support)
  bg: 'var(--bg)',
  bgCard: 'var(--bg-card)',
  bgSecondary: 'var(--bg-secondary)',
  bgInput: 'var(--bg-input)',
  bgHover: 'var(--bg-hover)',
  text: 'var(--text)',
  textSecondary: 'var(--text-secondary)',
  textLight: 'var(--text-light)',
  textLighter: 'var(--text-lighter)',
  border: 'var(--border)',
  borderLight: 'var(--border-light)',
  shadow: 'var(--shadow)',
  shadowLg: 'var(--shadow-lg)',
};