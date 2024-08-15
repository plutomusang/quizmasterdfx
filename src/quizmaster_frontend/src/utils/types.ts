export interface KeyPoint {
    title: string;
    explanation?: string;
    keywords?: string[];
  }
  
export interface QuestionData {
  questionId: string;
  question: string;
  type: 'option' | 'checkbox';
  choices: { [key: string]: string };
  answer: string | string[];
  showAnswer: boolean;
  userSelectedChoices?: string[];
  keyPoints?: KeyPoint[];
  [key: string]: any; // This allows indexing with any string key
}

