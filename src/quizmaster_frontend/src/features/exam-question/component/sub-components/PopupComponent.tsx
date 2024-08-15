import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

interface Position {
  x: number;
  y: number;
}

interface PopupComponentProps {
  title: string;
  content: string;
  onClose: () => void;
  initialPosition?: Position;
}

const Popup = styled.div`
  position: fixed;
  cursor: move;
  background-color: ${({ theme }) => theme.background}; /* Use theme background color */
  color: ${({ theme }) => theme.color}; /* Use theme text color */
  border: 1px solid ${({ theme }) => theme.borderColor || '#ccc'}; /* Use theme border color or default */
  padding: 20px;
  z-index: 100;
  width: 300px;
  top: 20%;
  left: calc(50% - 150px);
`;

const PopupTitle = styled.h4`
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor || '#eee'}; /* Use theme border color or default */
  color: ${({ theme }) => theme.color}; /* Use theme text color */
`;

const PopupComponent: React.FC<PopupComponentProps> = ({ title, content, onClose, initialPosition = { x: 200, y: 100 } }) => {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<Position>({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y,
      });
    }
  }, [isDragging, startPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <Popup
      className="draggable-popup"
      onMouseDown={handleMouseDown}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <PopupTitle>{title}</PopupTitle>
      <p>{content}</p>
      <button onClick={onClose}>Close</button>
    </Popup>
  );
};

export default PopupComponent;
