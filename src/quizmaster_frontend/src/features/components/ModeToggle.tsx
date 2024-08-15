import React, { useState } from 'react';
import styled from 'styled-components';

interface ModeToggleProps {
  labelOn: string;
  labelOff: string;
  onChange?: (checked: boolean) => void;
  initialValue: boolean;
}

interface ToggleProps {
  checked: boolean;
}

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 20px;
  justify-content: flex-end;
`;

const ToggleLabel = styled.span`
  margin-right: 10px;
  color: ${({ theme }) => theme.color}; /* Use theme text color */
  font-size: 14px;
`;

const ToggleSwitch = styled.div<ToggleProps>`
  width: 50px;
  height: 25px;
  background-color: ${({ checked }) => (checked ? '#2196F3' : '#ddd')}; /* Updated background color */
  border-radius: 25px;
  position: relative;
  transition: background-color 0.3s ease;
`;

const ToggleCircle = styled.div<ToggleProps>`
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 2.5px;
  left: ${({ checked }) => (checked ? '27.5px' : '2.5px')};
  transition: left 0.3s ease;
`;

const ModeToggle: React.FC<ModeToggleProps> = ({ labelOn, labelOff, onChange, initialValue }) => {
  const [checked, setChecked] = useState<boolean>(initialValue);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked); // Pass the new state to the parent
    }
  };

  return (
    <ToggleWrapper onClick={handleToggle}>
      <ToggleLabel>{checked ? labelOn : labelOff}</ToggleLabel>
      <ToggleSwitch checked={checked}>
        <ToggleCircle checked={checked} />
      </ToggleSwitch>
    </ToggleWrapper>
  );
};

export default ModeToggle;
