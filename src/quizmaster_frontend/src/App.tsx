import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import Header from './features/components/Header';
import ExamSelect from './features/exam-select/ExamSelect';
import ExamContent from './ExamContent';
import examConfig from './config/examConfig';
import OpenAIComponent from './features/components/OpenAIComponent';
import LoginPage from './features/pages/LoginPage';
import LandingPage from './features/pages/LandingPage';
import SignUpPage from './features/pages/SignUpPage'; // Import the SignUpPage
import TestBed from './features/pages/TestBed'; 

interface MainAppProps {
  onLogout: () => void;
}

function MainApp({ onLogout }: MainAppProps) {
  const [currentExamKey, setCurrentExamKey] = useState<string>(examConfig[0].key);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSideMenuVisible, setIsSideMenuVisible] = useState<boolean>(true);
  const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth <= 768);
  const [isCreatorMode, setIsCreatorMode] = useState<boolean>(false);

  const handleExamChange = useCallback((newExamKey: string) => {
    setCurrentExamKey(newExamKey);
    setIsModalOpen(false);
  }, []);

  const toggleModal = () => {
    if (isMobileView) {
      setIsModalOpen(prev => !prev);
    } else {
      setIsSideMenuVisible(prev => !prev);
    }
  };

  const handleModeChange = (isCreatorMode: boolean) => {
    setIsCreatorMode(isCreatorMode);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app-container">
      <Header 
        toggleModal={toggleModal} 
        selectedExamTitle={currentExamKey} 
        onModeChange={handleModeChange} 
        onLogout={onLogout}
      /> 
      <div className={`main-content ${isSideMenuVisible ? '' : 'full-width'}`}>
        {isSideMenuVisible && (
          <div className="side-menu">
            <ExamSelect 
              examConfig={examConfig} 
              currentExamKey={currentExamKey} 
              onExamChange={handleExamChange} 
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen} 
            />
          </div>
        )}
        <div className="exam-content">
          {isCreatorMode ? (
            <OpenAIComponent /> 
          ) : (
            <ExamContent currentExamKey={currentExamKey} />
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/app" /> : <LandingPage />} />
          <Route 
            path="/login" 
            element={<LoginPage onLogin={handleLogin} />} 
          />
          <Route 
            path="/signup" 
            element={<SignUpPage />} 
          />
          <Route 
            path="/testbed" 
            element={<TestBed />} 
          />
          <Route 
            path="/app" 
            element={isAuthenticated ? <MainApp onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to home if path is not recognized */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
