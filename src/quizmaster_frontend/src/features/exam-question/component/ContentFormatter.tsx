import React from 'react';
import styled from 'styled-components';
import ColoredTextRenderer from './sub-components/ColoredTextRenderer';

interface ContentFormatterProps {
  text: string;
}

const CodeBlockWrapper = styled.div`
  position: relative;
  padding-right: 10px;
`;

const CodeBlock = styled.pre`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  color: #666;
  page-break-inside: avoid;
  font-family: monospace;
  font-size: 15px;
  line-height: 1.6;
  max-width: 100%;
  overflow: auto;
  padding: 1em 1.5em;
  display: block;
  word-wrap: break-word;
  font-weight: normal;
  border-radius: 5px;
`;

const ContentFormatter: React.FC<ContentFormatterProps> = ({ text }) => {
  const codeBlockRegex = /<codeblock>(.*?)<\/codeblock>/gs;

  const parts = text.split(codeBlockRegex).map((part, index) => {
    if (index % 2 === 0) {
      return part.split('\n').map((line, lineIndex) => (
        <React.Fragment key={`${index}-${lineIndex}`}>
          <ColoredTextRenderer text={line} />
          <br />
        </React.Fragment>
      ));
    } else {
      return (
        <CodeBlockWrapper key={index}>
          <CodeBlock>
            {part.split('\n').map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                <ColoredTextRenderer text={line} />
                <br />
              </React.Fragment>
            ))}
          </CodeBlock>
        </CodeBlockWrapper>
      );
    }
  });

  return <>{parts}</>;
};

export default ContentFormatter;
