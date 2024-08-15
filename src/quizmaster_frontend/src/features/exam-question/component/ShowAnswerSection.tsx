import React from 'react';
import { QuestionData } from '../../../utils/types'; // Ensure this matches your import path

interface ShowAnswerSectionProps {
  showAnswer: boolean;
  handleAnswerClick: () => void;
  questionData: QuestionData;
  isCorrect: boolean;
}

const ShowAnswerSection: React.FC<ShowAnswerSectionProps> = ({
  showAnswer,
  handleAnswerClick,
  questionData,
  isCorrect,
}) => {
  return (
    <div>
      {/* Your ShowAnswerSection content goes here */}
      <button onClick={handleAnswerClick}>
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </button>
      {showAnswer && (
        <div>
          <div>Correct Answer: {questionData.answer}</div>
          {isCorrect && <div>You got it right!</div>}
        </div>
      )}
    </div>
  );
};

export default ShowAnswerSection;
