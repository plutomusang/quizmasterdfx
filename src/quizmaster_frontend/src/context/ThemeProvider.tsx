import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import '../styles/themes/light-theme.css';
import '../styles/themes/dark-theme.css';

// Define the shape of the theme object
interface Theme {
  background: string;
  color: string;
  selectedBackground: string;
  hoverBackground: string;
  sideMenuBackground: string;
  primaryColor?: string; // Optional properties
  secondaryColor?: string;
}

// Define the context type
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Default values for the theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const lightTheme: Theme = {
  background: '#ffffff',
  color: '#000000',
  selectedBackground: '#e0e0e0',
  hoverBackground: '#f0f0f0',
  sideMenuBackground: '#f7f7f7',
  primaryColor: '#007BFF',
  secondaryColor: '#6C757D',
};

const darkTheme: Theme = {
  background: '#333333',
  color: '#ffffff',
  selectedBackground: '#555555',
  hoverBackground: '#444444',
  sideMenuBackground: '#2b2b2b',
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const themeObject = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={themeObject}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
