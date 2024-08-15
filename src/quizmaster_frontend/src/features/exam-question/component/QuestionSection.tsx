import React, { useState } from 'react';
import styled from 'styled-components';
import questionSectionConfig from '../config/questionSectionConfig';
import ConditionalSection from './ConditionalSection';
import ContentFormatter from './ContentFormatter';
import SelectableLabels from './sub-components/SelectableLabels';
import PopupComponent from './sub-components/PopupComponent';
import { extractTitles, highlightKeywordsInQuestionAsString } from '../../../utils/transformQuestionData';

interface KeyPoint {
  title: string;
  explanation: string;
}

interface QuestionData {
  question: string;
  keyPoints?: KeyPoint[];
  [key: string]: any; // To allow other dynamic keys in questionData
}

interface QuestionSectionProps {
  questionData: QuestionData;
}

const QuestionText = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 1.6em;
  text-align: left;
`;

const QuestionSection: React.FC<QuestionSectionProps> = ({ questionData }) => {
  const [selectedLabel, setSelectedLabel] = useState<string>('Clear');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupContent, setPopupContent] = useState<string>('');
  const [popupTitle, setPopupTitle] = useState<string>('');
  
  const labels = extractTitles(questionData);

  const questionText = highlightKeywordsInQuestionAsString(selectedLabel, questionData.question, questionData.keyPoints);

  const handleLabelSelection = (selectedLabel: string) => {
    setSelectedLabel(selectedLabel);
  };

  const handleClick = () => {
    const keyPoint = questionData.keyPoints ? questionData.keyPoints.find(kp => kp.title === selectedLabel) : null;
    if (keyPoint) {
      setPopupTitle(keyPoint.title);
      setPopupContent(keyPoint.explanation);
      setShowPopup(true);
    }
  };

  return (
    <>
      {labels.length > 0 && <SelectableLabels labels={labels} onLabelSelect={handleLabelSelection} />}
      {questionSectionConfig.map(({ title, key }) => (
        <ConditionalSection key={title} title={title} content={questionData[key]} />
      ))}
      <QuestionText onClick={handleClick}>
        <ContentFormatter text={questionText}/>
      </QuestionText>
      {showPopup && (
        <PopupComponent
          title={popupTitle}
          content={popupContent}
          onClose={() => setShowPopup(false)}
          initialPosition={{ x: 200, y: 100 }}
        />
      )}
    </>
  );
};

export default QuestionSection;
