import React from 'react';
import styled, { keyframes } from 'styled-components';

interface ModalProps {
  examConfig: Array<{ key: string; title: string }>;
  currentExamKey: string;
  onClose: () => void;
  onExamChange: (key: string) => void;
}

// Keyframes for sliding in from bottom to top
const slideIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Keyframes for sliding out from top to bottom
const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end; /* Align items at the bottom */
  z-index: 1000;
`;

interface ModalContainerProps {
  isClosing: boolean;
}

const ModalContainer = styled.div<ModalContainerProps>`
  width: 100%; /* Full screen width */
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  padding: 20px;
  border-radius: 8px 8px 0 0; /* Rounded corners on the top */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: ${({ isClosing }) => (isClosing ? slideOut : slideIn)} 0.3s ease;
  margin-bottom: ${({ theme }) => theme.headerHeight}; /* Stops before hitting the header */

  @media (max-width: 768px) {
    width: 100%; /* Full screen width for mobile */
    border-radius: 0; /* Remove border radius for mobile */
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.color};
`;

const ModalContent = styled.div`
  max-height: calc(100vh - ${({ theme }) => theme.headerHeight} - 80px);
  overflow-y: auto;
`;

const ExamItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.hoverBackground};
  }
`;

const Modal: React.FC<ModalProps> = ({ examConfig, currentExamKey, onClose, onExamChange }) => {
  const [isClosing, setIsClosing] = React.useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Wait for the slide-out animation to finish before closing
  };

  return (
    <ModalBackground onClick={handleClose}>
      <ModalContainer isClosing={isClosing} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Select Category</ModalTitle>
          <CloseButton onClick={handleClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalContent>
          {examConfig.map(exam => (
            <ExamItem
              key={exam.key}
              onClick={() => {
                onExamChange(exam.key);
                handleClose();
              }}
            >
              {exam.title}
            </ExamItem>
          ))}
        </ModalContent>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Modal;
