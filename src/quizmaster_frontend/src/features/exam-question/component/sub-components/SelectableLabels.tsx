import React, { useState } from 'react';
import styled from 'styled-components';
import PointOfInterestIcon from './PointOfInterestIcon';

interface LabelProps {
  $isSelected: boolean;
}

interface SelectableLabelsProps {
  labels: string[];
  onLabelSelect: (selectedLabel: string) => void;
}

const Label = styled.div<LabelProps>`
  display: inline-block;
  background-color: ${({ $isSelected }) => ($isSelected ? '#4CAF50' : '#ddd')};
  color: ${({ $isSelected }) => ($isSelected ? 'white' : '#666')};
  padding: 2px 10px;
  border-radius: 5px;
  font-family: monospace;
  font-size: 12px;
  margin-bottom: 5px;
  margin-left: auto;
  margin-right: 0;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const LabelsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  gap: 10px;
  padding-bottom: 20px;
`;

const SelectableLabels: React.FC<SelectableLabelsProps> = ({ labels, onLabelSelect }) => {
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const [isLabelVisible, setIsLabelVisible] = useState<boolean>(false);

  const handleLabelClick = (label: string) => {
    const newSelectedLabel = selectedLabel === label ? '' : label;
    setSelectedLabel(newSelectedLabel);
    onLabelSelect(newSelectedLabel);
  };

  const toggleLabelVisibility = () => {
    setIsLabelVisible(!isLabelVisible);
  };

  return (
    <LabelsContainer>
      {isLabelVisible && labels.map((label) => (
        <Label
          key={label}
          $isSelected={selectedLabel === label}
          onClick={() => handleLabelClick(label)}
        >
          {label}
        </Label>
      ))}
      <PointOfInterestIcon onClick={toggleLabelVisibility} isLabelVisible={isLabelVisible} />
    </LabelsContainer>
  );
};

export default SelectableLabels;
