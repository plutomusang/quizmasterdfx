import React, { useState, useEffect, useCallback } from 'react';
import QuestionHandler from './features/question-handler/QuestionHandler';
import { transformQuestionData } from './utils/transformQuestionData';
import examConfig from './config/examConfig';
import { QuestionData } from './utils/types'; // Adjust the import path as necessary
import GCPArchitecture from './exam-json/GCPArchitecture.json';
import GoogleMobilityService from './exam-json/Google_Mobility_Service.json';
import GoogleCloudDeveloperCloudGuro from './exam-json/GoogleCloudDeveloper_Cloud_Guro.json';
import GoogleCloudDigitalLeader from './exam-json/GoogleCloudDigitalLeader.json';
import Grade6QuizmasterInclinePlane from './exam-json/Grade6_quizmaster_InclinePlane.json';
import Grade6QuizmasterLever from './exam-json/Grade6_quizmaster_lever.json';
import ReactBasics from './exam-json/React_Basics.json';
import ReactQuiz from './exam-json/React_quiz.json';

interface ExamQuestion {
  source?: string; // Optional
  topic: string;
  question: string;
  type: string;
  choices: {
    A: string;
    B: string;
    C: string;
    D?: string; // Optional
    E?: string; // Optional
    F?: string; // Optional
  };
  keyPoints?: { // Optional
    title: string;
    keywords: string[];
    explanation: string;
  }[];
  answer: string | string[]; // Allow both string and array of strings
  page: number;
  most_voted: string | string[] | number; // Allow number, string, or string array
  classification?: string;
  diagram?: string;
  Reference?: string;
  Discussion?: string;
}

interface ExamData {
  exam_questions: ExamQuestion[];
}

type ExamDataDictionary = { [key: string]: ExamData };

function normalizeExamQuestion(question: any): ExamQuestion {
  return {
    ...question,
    choices: {
      A: question.choices.A,
      B: question.choices.B,
      C: question.choices.C,
      D: question.choices.D ?? "", // Provide default empty string if D is missing
      E: question.choices.E ?? "", // Provide default empty string if E is missing
      F: question.choices.F ?? "", // Provide default empty string if F is missing
    },
    keyPoints: question.keyPoints ?? [], // Provide default empty array if keyPoints are missing
    answer: Array.isArray(question.answer) ? question.answer.join(", ") : question.answer, // Convert array to string if necessary
    most_voted: question.most_voted.toString(), // Convert number to string
  };
}

function normalizeExamData(examData: any): ExamData {
  return {
    exam_questions: examData.exam_questions.map(normalizeExamQuestion),
  };
}

const examDataDictionary: ExamDataDictionary = {
  GCPArchitecture: normalizeExamData(GCPArchitecture),
  GoogleMobilityService: normalizeExamData(GoogleMobilityService),
  GoogleCloudDeveloperCloudGuro: normalizeExamData(GoogleCloudDeveloperCloudGuro),
  GoogleCloudDigitalLeader: normalizeExamData(GoogleCloudDigitalLeader),
  Grade6QuizmasterInclinePlane: normalizeExamData(Grade6QuizmasterInclinePlane),
  Grade6QuizmasterLever: normalizeExamData(Grade6QuizmasterLever),
  ReactBasics: normalizeExamData(ReactBasics),
  ReactQuiz: normalizeExamData(ReactQuiz),
};

function getDictionary(examName: string): ExamData {
  const examData = examDataDictionary[examName];
  if (!examData) {
    throw new Error(`Exam data not found for key: ${examName}`);
  }
  return examData;
}

interface ExamContentProps {
  currentExamKey: string;
}

interface ExamStates {
  [key: string]: QuestionData[];
}

const ExamContent: React.FC<ExamContentProps> = ({ currentExamKey }) => {
  const [examStates, setExamStates] = useState<ExamStates>({});
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  const handleShowAnswerToggle = useCallback(
    (examKey: string, questionId: string, newShowAnswerValue: boolean) => {
      setExamStates(currentStates => ({
        ...currentStates,
        [examKey]: currentStates[examKey].map(question => {
          if (question.questionId === questionId) {
            return { ...question, showAnswer: newShowAnswerValue };
          }
          return question;
        })
      }));
    },
    []
  );

  const handleOptionChange = useCallback(
    (examKey: string, questionId: string, newSelectedOptions: string[]) => {
      setExamStates(currentStates => ({
        ...currentStates,
        [examKey]: currentStates[examKey].map(question => {
          if (question.questionId === questionId) {
            return { ...question, userSelectedChoices: newSelectedOptions };
          }
          return question;
        })
      }));
    },
    []
  );

  useEffect(() => {
    const fetchData = async (examKey: string) => {
      if (examStates[examKey]) return;

      try {
        const module = getDictionary(examKey);
        const sortedQuestions = module.exam_questions.sort((a: ExamQuestion, b: ExamQuestion) =>
          sortAscending ? a.page - b.page : b.page - a.page
        );
        const transformedData = transformQuestionData(sortedQuestions) as QuestionData[];
        setExamStates(currentStates => ({
          ...currentStates,
          [examKey]: transformedData
        }));
      } catch (error) {
        console.error(`Failed to fetch data for ${examKey}:`, error);
      }
    };

    if (currentExamKey) {
      fetchData(currentExamKey);
    }
  }, [currentExamKey, sortAscending, examStates]);

  return (
    <div style={{ paddingTop: '30px' }}>
      {currentExamKey && examStates[currentExamKey] ? (
        <QuestionHandler 
          questions={examStates[currentExamKey]} 
          onShowAnswerToggle={(questionId, newShowAnswerValue) => handleShowAnswerToggle(currentExamKey, questionId, newShowAnswerValue)} 
          onUserSelectionChange={(questionId, newSelectedOptions) => handleOptionChange(currentExamKey, questionId, newSelectedOptions)}
        /> 
      ) : (
        <div>Loading exam questions...</div>
      )}
    </div>
  );
};

export default ExamContent;
