import React, { useState } from 'react';
import styled from 'styled-components';
import ModeToggle from './ThemeToggle';
import ToggleSwitch from './ToggleSwitch';
import { useTheme } from '../../context/ThemeProvider';

interface HeaderProps {
  toggleModal: () => void;
  selectedExamTitle?: string;
  onModeChange?: (isChecked: boolean) => void;
  onLogout: () => void;
}

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Title = styled.h1`
  font-size: 16px;
  margin: 0 10px;
  display: flex;
  align-items: center;
`;

const Subtitle = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.color};
  position: absolute;
  top: 100%;
  left: 60px;
  transform: translateY(-7px);
  width: 100%;
`;

const BurgerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin-right: 10px;
`;

const BurgerIcon = styled.div`
  width: 25px;
  height: 2px;
  background-color: ${({ theme }) => theme.color};
  position: relative;

  &:before,
  &:after {
    content: '';
    width: 25px;
    height: 2px;
    background-color: ${({ theme }) => theme.color};
    position: absolute;
    left: 0;
    transition: 0.3s ease;
  }

  &:before {
    top: -8px;
  }

  &:after {
    bottom: -8px;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  color: #fff;
  background-color: ${({ theme }) => theme.primaryColor};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
  }
`;

const Header: React.FC<HeaderProps> = ({ toggleModal, selectedExamTitle, onModeChange, onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(theme === 'dark');

  const handleToggle = (isChecked: boolean) => {
    if (onModeChange) {
      onModeChange(isChecked);
    }
  };

  const handleThemeChange = (newMode: boolean) => {
    setIsDarkMode(newMode);
    if ((newMode && theme !== 'dark') || (!newMode && theme !== 'light')) {
      toggleTheme();
    }
  };

  return (
    <HeaderWrapper>
      <TitleWrapper>
        <BurgerContainer onClick={toggleModal}>
          <BurgerIcon />
        </BurgerContainer>
        <Title>
          QuizMaster
        </Title>
        {selectedExamTitle && <Subtitle>{selectedExamTitle}</Subtitle>}
      </TitleWrapper>
      <ToggleContainer>
        <ToggleSwitch 
          labelOn="Creator Mode" 
          labelOff="Takers Mode" 
          onChange={handleToggle} 
          initialValue={false} 
        />
        <ToggleSwitch 
          labelOn="Dark Mode" 
          labelOff="Light Mode" 
          onChange={handleThemeChange} 
          initialValue={theme === 'dark'}
        />
        <LogoutButton onClick={onLogout}>Logout</LogoutButton>
      </ToggleContainer>
    </HeaderWrapper>
  );
};

export default Header;
