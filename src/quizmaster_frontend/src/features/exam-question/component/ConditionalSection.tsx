import React from 'react';
import styled from 'styled-components';

// Define the props interface
interface ConditionalSectionProps {
  title: string;
  content?: React.ReactNode; // content can be any valid React node, or undefined
}

// Styled component for the section header
const SectionHeader = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left; /* Add this line to align text to the left */
`;

// ConditionalSection component
const ConditionalSection: React.FC<ConditionalSectionProps> = ({ title, content }) => {
  if (content) {
    return (
      <>
        <SectionHeader>{title}</SectionHeader>
        <div>{content}</div>
      </>
    );
  }
  return null;
};

export default ConditionalSection;
