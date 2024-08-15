import React, { useState } from 'react';
import styled from 'styled-components';

interface ToggleSwitchProps {
  labelOn: string;
  labelOff: string;
  onChange?: (checked: boolean) => void;
  initialValue?: boolean;
}

interface SwitchProps {
  checked: boolean;
}

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
`;

const SwitchLabel = styled.span`
  margin-right: 10px;
  color: ${({ theme }) => theme.color}; /* Use theme text color */
  font-size: 14px;
`;

const Switch = styled.div<SwitchProps>`
  width: 50px;
  height: 25px;
  background-color: ${({ checked }) => (checked ? '#2196F3' : '#ddd')};
  border-radius: 25px;
  position: relative;
  transition: background-color 0.3s ease;
`;

const Circle = styled.div<SwitchProps>`
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 2.5px;
  left: ${({ checked }) => (checked ? '27.5px' : '2.5px')};
  transition: left 0.3s ease;
`;

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ labelOn, labelOff, onChange, initialValue = false }) => {
  const [checked, setChecked] = useState<boolean>(initialValue);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked); // Pass the new state to the parent
    }
  };

  return (
    <SwitchWrapper onClick={handleToggle}>
      <SwitchLabel>{checked ? labelOn : labelOff}</SwitchLabel>
      <Switch checked={checked}>
        <Circle checked={checked} />
      </Switch>
    </SwitchWrapper>
  );
};

export default ToggleSwitch;
