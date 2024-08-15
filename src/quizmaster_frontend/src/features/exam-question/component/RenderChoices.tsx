import React from 'react';
import styled from 'styled-components';
import ContentFormatter from './ContentFormatter';

interface QuestionData {
  questionId: string;
  question: string;
  type: 'option' | 'checkbox';
  choices: { [key: string]: string };
  answer: string | string[];
}

interface RenderChoicesProps {
  questionData: QuestionData;
  selectedOptions: Set<string>;
  handleOptionChange: (choiceKey: string) => void;
  showAnswer: boolean;
}

const ChoicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Choice = styled.div`
  margin: 5px 0;

  label {
    display: grid;
    grid-template-columns: auto auto 1fr;
    align-items: start;
    gap: 10px;
    cursor: pointer;
  }

  input[type='radio'],
  input[type='checkbox'] {
    grid-column: 1;
    margin-top: 4.5px;
  }

  .choiceKey {
    grid-column: 2;
    text-align: left;
  }

  .choiceText {
    grid-column: 3;
    text-align: left;
  }

  &.correct {
    background-color: #d4edda;
    color: #155724;
  }
`;

const RenderChoices: React.FC<RenderChoicesProps> = ({
  questionData,
  selectedOptions,
  handleOptionChange,
  showAnswer,
}) => {
  const correctAnswers = Array.isArray(questionData.answer) ? questionData.answer : [questionData.answer];

  return (
    <ChoicesContainer>
      {Object.entries(questionData.choices).map(([choiceKey, choiceText]) => (
        <Choice
          key={choiceKey}
          className={showAnswer && correctAnswers.includes(choiceKey) ? 'correct' : ''}
        >
          <label htmlFor={`choice-${questionData.questionId + choiceKey}`}>
            <input
              type={questionData.type === 'option' ? 'radio' : 'checkbox'}
              name={questionData.question}
              checked={selectedOptions.has(choiceKey)}
              onChange={() => handleOptionChange(choiceKey)}
              id={`choice-${questionData.questionId + choiceKey}`}
            />
            <span className="choiceKey">{choiceKey}:</span>
            <div className="choiceText">
              <ContentFormatter text={choiceText} />
            </div>
          </label>
        </Choice>
      ))}
    </ChoicesContainer>
  );
};

export default RenderChoices;
