import React from 'react';

interface PointOfInterestIconProps {
  onClick?: () => void;
  isLabelVisible?: boolean;
  width?: string;
  height?: string;
  fillColor?: string;
  strokeWidth?: string;
}

const PointOfInterestIcon: React.FC<PointOfInterestIconProps> = ({
  onClick,
  isLabelVisible = false,
  width = '16px',
  height = '16px',
  fillColor = '#FFD700',
  strokeWidth = '1.5',
}) => (
  <svg
    onClick={onClick}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={fillColor}
    stroke={isLabelVisible ? '#FFD700' : '#FFD700'}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: 'pointer' }}
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 3.87 3.13 7 7 7s7-3.13 7-7c0-3.87-3.13-7-7-7zM12 15v2m-1 1h2m-4-1h6m-6-2h6" fill="#FFD700" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="8" y1="20" x2="16" y2="20" />
  </svg>
);

export default PointOfInterestIcon;
