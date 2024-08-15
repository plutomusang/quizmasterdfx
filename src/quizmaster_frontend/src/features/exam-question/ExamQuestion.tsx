import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RenderChoices from './component/RenderChoices';
import QuestionSection from './component/QuestionSection';
import ShowAnswerSection from './component/ShowAnswerSection';
import { QuestionData } from '../../utils/types';

interface ExamQuestionProps {
  questionData: QuestionData;
  onUserSelectionChange?: (questionId: string, selectedChoices: string[]) => void;
  onShowAnswerToggle?: (questionId: string, showAnswer: boolean) => void;
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.background}; 
  color: ${({ theme }) => theme.color}; 
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: left;
`;

const ExamQuestion: React.FC<ExamQuestionProps> = ({
  questionData,
  onUserSelectionChange,
  onShowAnswerToggle,
}) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(questionData.showAnswer);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set(questionData.userSelectedChoices || [])
  );
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const checkAnswerCorrectness = (): boolean => {
    const correctAnswers = new Set(
      Array.isArray(questionData.answer) ? questionData.answer : [questionData.answer]
    );
    return (
      Array.from(selectedOptions).every(option => correctAnswers.has(option)) &&
      correctAnswers.size === selectedOptions.size
    );
  };

  const handleAnswerClick = () => {
    setIsCorrect(!showAnswer ? checkAnswerCorrectness() : false);
    if (showAnswer) setSelectedOptions(new Set());
    setShowAnswer(!showAnswer);
    onShowAnswerToggle?.(questionData.questionId, !showAnswer);
  };

  const handleOptionChange = (choiceKey: string) => {
    if (questionData.type === 'option') {
      const newSelection = new Set([choiceKey]);
      setSelectedOptions(newSelection);
      onUserSelectionChange?.(questionData.questionId, Array.from(newSelection));
    } else {
      setSelectedOptions(prevSelectedOptions => {
        const updatedOptions = new Set(prevSelectedOptions);
        updatedOptions.has(choiceKey)
          ? updatedOptions.delete(choiceKey)
          : updatedOptions.add(choiceKey);
        onUserSelectionChange?.(questionData.questionId, Array.from(updatedOptions));
        return updatedOptions;
      });
    }
  };

  useEffect(() => {
    setSelectedOptions(new Set(questionData.userSelectedChoices || []));
  }, [questionData.userSelectedChoices]);

  return (
    <Container>
      <QuestionSection questionData={questionData} />
      <RenderChoices
        questionData={questionData}
        selectedOptions={selectedOptions}
        handleOptionChange={handleOptionChange}
        showAnswer={showAnswer}
      />
      <ShowAnswerSection {...{ showAnswer, handleAnswerClick, questionData, isCorrect }} />
    </Container>
  );
};

export default ExamQuestion;
