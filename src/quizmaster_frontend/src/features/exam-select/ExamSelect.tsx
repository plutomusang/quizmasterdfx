import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

interface Exam {
  key: string;
  title: string;
}

interface ExamSelectProps {
  examConfig: Exam[];
  currentExamKey: string;
  onExamChange: (newExamKey: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

interface ListContainerProps {
  isMobileView: boolean;
}

interface ListItemProps {
  isSelected: boolean;
}

const ListContainer = styled.div<ListContainerProps>`
  display: ${({ isMobileView }) => (isMobileView ? 'none' : 'block')};
  background-color: ${({ theme }) => theme.sideMenuBackground}; /* Match header background in dark mode */
  padding: 10px;
`;

const ListItem = styled.div<ListItemProps>`
  padding: 10px;
  cursor: pointer;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.selectedBackground : 'transparent'};
  color: ${({ theme }) => theme.color};
  border-radius: 4px;
  margin-bottom: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.hoverBackground};
  }
`;

const ExamSelect: React.FC<ExamSelectProps> = ({ examConfig, currentExamKey, onExamChange, isModalOpen, setIsModalOpen }) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectionChange = (newExamKey: string) => {
    onExamChange(newExamKey);
    if (isMobileView) {
      setIsModalOpen(false);  // Close the modal on mobile view
    }
  };

  return (
    <>
      <ListContainer isMobileView={isMobileView}>
        {examConfig.map(exam => (
          <ListItem
            key={exam.key}
            isSelected={exam.key === currentExamKey}
            onClick={() => handleSelectionChange(exam.key)}
          >
            {exam.title}
          </ListItem>
        ))}
      </ListContainer>

      {isModalOpen && (
        <Modal 
          examConfig={examConfig} 
          currentExamKey={currentExamKey} 
          onClose={() => setIsModalOpen(false)} 
          onExamChange={handleSelectionChange} 
        />
      )}
    </>
  );
};

export default ExamSelect;
