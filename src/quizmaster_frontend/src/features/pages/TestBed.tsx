import React, { FormEvent } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import examConfig from '../../config/examConfig';
import exam from '../../exam-json/GCPArchitecture.json';
import { quizmaster_backend } from '../../../../declarations/quizmaster_backend';

const TestForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 40px;
  background-color: ${({ theme }) => theme.secondaryBackground};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  color: #fff;
  background-color: ${({ theme }) => theme.primaryColor};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
  }
`;

const TestBed: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/home'); // Redirect to the home page after successful action
  };

  const handleSave = async () => {
    const title = examConfig[0].title;
    const jsonfile = JSON.stringify(exam);

    try {
      await quizmaster_backend.greet(jsonfile);
      console.log("Save action triggered");
    } catch (error) {
      console.error("Error saving exam:", error);
    }
  };

  const handleGet = async () => {
    const title = examConfig[0].title;
    try {
      const jsonfile = JSON.stringify(exam);
      console.log(JSON.stringify(jsonfile)); // Convert jsonfile to a string for logging
    } catch (error) {
      console.error("Error getting exam:", error);
    }
  };

  return (
    <TestForm onSubmit={handleSubmit}>
      <h2>Test Bed</h2>
      <Button type="submit">Home</Button>
      <Button type="button" onClick={handleSave}>Save</Button>
      <Button type="button" onClick={handleGet}>Get</Button>
    </TestForm>
  );
};

export default TestBed;
