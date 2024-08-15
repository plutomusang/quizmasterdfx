import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { quizmaster_backend } from '../../../../declarations/quizmaster_backend';

const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 40px;
  background-color: ${({ theme }) => theme.secondaryBackground};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  font-size: 16px;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.inputBackground};
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

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await quizmaster_backend.saveCredentials(username, password);
      console.log("Save action triggered");
      navigate('/login'); // Redirect to the login page after successful signup
    } catch (error) {
      console.error("Error saving credentials:", error);
    }
  };

  return (
    <SignUpWrapper>
      <SignUpForm onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <Input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Sign Up</Button>
      </SignUpForm>
    </SignUpWrapper>
  );
};

export default SignUpPage;
