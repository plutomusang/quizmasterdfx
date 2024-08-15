import React, { useCallback } from 'react';
import ExamQuestion from '../exam-question/ExamQuestion';
import { QuestionData } from '../../utils/types'; // Adjust the import path as necessary

interface QuestionHandlerProps {
  questions: QuestionData[];
  onShowAnswerToggle: (questionId: string, showAnswer: boolean) => void;
  onUserSelectionChange: (questionId: string, selectedChoices: string[]) => void;
}

const QuestionHandler: React.FC<QuestionHandlerProps> = ({
  questions,
  onShowAnswerToggle,
  onUserSelectionChange,
}) => {
  return (
    <div>
      {questions.map((question) => (
        <ExamQuestion
          key={question.questionId}
          questionData={question}
          onShowAnswerToggle={onShowAnswerToggle}
          onUserSelectionChange={onUserSelectionChange}
        />
      ))}
    </div>
  );
};

export default QuestionHandler;
