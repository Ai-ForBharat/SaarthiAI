import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UserForm from './components/UserForm';
import Loading from './components/Loading';
import Results from './components/Results';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const { currentView } = useApp();
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="app">
      <Navbar />

      <div className="app-content">
        {currentView === 'home' && (
          <>
            <Hero />
            <UserForm />
          </>
        )}

        {currentView === 'loading' && <Loading />}

        {currentView === 'results' && <Results />}
      </div>

      {/* Floating Chatbot */}
      <button
        className="chat-fab"
        onClick={() => setShowChat(!showChat)}
        title="AI Assistant"
      >
        {showChat ? '✕' : '🤖'}
        {!showChat && <span className="fab-badge">AI</span>}
      </button>

      {showChat && <ChatBot onClose={() => setShowChat(false)} />}

      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </div>
  );
}

export default App;