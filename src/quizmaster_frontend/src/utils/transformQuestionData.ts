// Utility function to generate a unique ID based on the question text
const generateUniqueId = (questionText: string): string => {
  // A simple way to generate a hash from the question text. 
  // In a real scenario, you might want a more robust solution.
  const hash = questionText.split('').reduce((acc, char) => {
    const newHash = ((acc << 5) - acc) + char.charCodeAt(0);
    return newHash & newHash; // Convert to 32-bit integer
  }, 0);
  return hash.toString(); // Convert hash to a string
};

interface Question {
  question: string;
  keyPoints?: KeyPoint[];
  [key: string]: any; // Other properties can be included
}

interface KeyPoint {
  title: string;
  explanation?: string;
  keywords?: string[];
}

interface TransformedQuestion extends Question {
  questionId: string;
  showAnswer: boolean;
  userSelectedChoices: string[];
}

export const transformQuestionData = (examQuestions: Question[]): TransformedQuestion[] => {
  return examQuestions.map((question, index) => {
    // Generate a unique ID based on the question text and index
    const uniqueId = generateUniqueId(question.question + index);
    return {
      ...question,
      questionId: uniqueId,
      showAnswer: false,
      userSelectedChoices: [],
    };
  });
};

export const extractTitles = (questionData: Question): string[] => {
  if (questionData?.keyPoints?.length) {
    return questionData.keyPoints.map((keyPoint) => keyPoint.title);
  }
  return []; // Return an empty array if no titles are found
};

export const highlightKeywordsInQuestionAsString = (
  label: string,
  questionText: string,
  keyPoints?: KeyPoint[]
): string => {
  // Check if keyPoints is undefined or not an array
  if (!Array.isArray(keyPoints)) {
    return questionText;
  }

  let highlightedQuestionText = questionText;

  // Find the key point matching the provided label
  const keyPoint = keyPoints.find((kp) => kp.title === label);

  // If a matching key point is found, process its keywords
  if (keyPoint?.keywords) {
    keyPoint.keywords.forEach((keyword) => {
      // Escape special characters for RegExp
      const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}<>"]/g, '\\$&');
      // Create a RegExp to find the keyword in a case-insensitive manner
      const regex = new RegExp(`(${escapedKeyword})`, 'gi');
      highlightedQuestionText = highlightedQuestionText.replace(regex, `<color:magenta>$1</color>`);
    });
  }

  return highlightedQuestionText;
};