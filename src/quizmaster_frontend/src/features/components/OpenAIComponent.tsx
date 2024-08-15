import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';

const OpenAIWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.background}; /* Uses the theme background */
  color: ${({ theme }) => theme.color}; /* Uses the theme color for text */
  height: 100vh;
  box-sizing: border-box;
`;

const DisplayArea = styled.div`
  background-color: #333; /* Darker background for dark mode */
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 60%;
  height: 50%;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #ddd; /* Light text color for contrast */
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  border-radius: 50px;
  background-color: #444; /* Dark background for the input container */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
`;

const InputBox = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 18px;
  padding: 10px;
  border-radius: 50px;
  background-color: #555; /* Slightly darker for the input field */
  color: #ddd; /* Light text color */
`;

const SendButton = styled.button`
  background-color: #007bff; /* Bright button color */
  color: #ffffff;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3; /* Slightly darker on hover */
  }
`;

const OpenAIComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [displayText, setDisplayText] = useState<string>('Your output will appear here.');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    setDisplayText(inputValue);
    setInputValue(''); // Clear the input box after sending
  };

  return (
    <OpenAIWrapper>
      <DisplayArea>{displayText}</DisplayArea>
      <InputContainer>
        <InputBox 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder="Type your message..." 
        />
        <SendButton onClick={handleSend}>Send</SendButton>
      </InputContainer>
    </OpenAIWrapper>
  );
};

export default OpenAIComponent;
