import React from 'react';

interface ColoredTextRendererProps {
  text: string;
}

// Component that parses and renders text with colored sections
const ColoredTextRenderer: React.FC<ColoredTextRendererProps> = ({ text }) => {
  const renderColoredText = (inputText: string): React.ReactNode[] => {
    const colorTextRegex = /<color:(.*?)>(.*?)<\/color>/gs;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    inputText.replace(colorTextRegex, (match, color, content, index) => {
      // Push text before color tag if any
      if (index > lastIndex) {
        parts.push(inputText.slice(lastIndex, index));
      }

      // Push colored span
      parts.push(<span key={index} style={{ color }}>{content}</span>);
      lastIndex = index + match.length;
      return ''; // replace requires a return value, though it is unused here
    });

    // Push remaining text if any
    if (lastIndex < inputText.length) {
      parts.push(inputText.slice(lastIndex));
    }

    return parts;
  };

  return <>{renderColoredText(text)}</>;
};

export default ColoredTextRenderer;
