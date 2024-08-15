import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
`;

const LoginForm = styled.form`
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
  margin-bottom: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
  }
`;

const HomeButton = styled(Button)`
  background-color: ${({ theme }) => theme.secondaryColor};
  color: ${({ theme }) => theme.primaryColor};

  &:hover {
    background-color: ${({ theme }) => theme.primaryColor};
    color: #fff;
  }
`;

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin') {
      onLogin();
      navigate('/app'); // Redirect to the main app after successful login
    } else {
      setError('Invalid username or password');
    }
  };

  const handleHomeClick = () => {
    navigate('/'); // Redirect to the landing page
  };

  return (
    <LoginWrapper>
      <LoginForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Sign In</Button>
        <HomeButton type="button" onClick={handleHomeClick}>Home</HomeButton> {/* Add Home button */}
      </LoginForm>
    </LoginWrapper>
  );
};

export default LoginPage;
