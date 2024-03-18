import React, { useState } from 'react';

// Example questions


const questions = [
  // Group 1
  [
   
    { type: "question", text: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Rome"] },
    { type: "content", title: "Introduction to France", text: "France is known for its rich history and cultural heritage.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%29.svg/1200px-Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%29.svg.png" },
   // { type: "question", text: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Rome"] },
    {  type: "question",text: "Which element has the chemical symbol 'O'?", options: ["Oxygen", "Gold", "Iron", "Carbon"] },
    // ... more questions for group 1
  ],
  // Group 2
  [
   {  type: "question",text: "Who wrote 'To be, or not to be'?", options: ["Shakespeare", "Charles Dickens", "J.K. Rowling", "Ernest Hemingway"] },
    // ... more questions for group 2
  ],

  [
    { type: "question", text: "What is the largest planet in our Solar System?", options: ["Earth", "Jupiter", "Mars", "Venus"] },
  {  type: "question",text: "What year did World War II end?", options: ["1945", "1939", "1918", "1965"] },
    // ... more questions for group 2
  ],
  // ... more groups
];

const Quiz = () => {


 const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [segmentProgress, setSegmentProgress] = useState(questions.map(() => 0));

  const handleAnswerOptionClick = (option) => {
    const questionIndex = currentQuestionIndex + questions.slice(0, currentGroupIndex).reduce((acc, group) => acc + group.length, 0);

    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option
    });

    const updatedSegmentProgress = [...segmentProgress];
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions[currentGroupIndex].length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      updatedSegmentProgress[currentGroupIndex] = (nextQuestionIndex / questions[currentGroupIndex].length) * 100;
    } else if (currentGroupIndex < questions.length - 1) {
      setCurrentGroupIndex(currentGroupIndex + 1);
      setCurrentQuestionIndex(0);
      updatedSegmentProgress[currentGroupIndex] = 100;
      updatedSegmentProgress[currentGroupIndex + 1] = 0;
    } else {
      // Handle the end of the quiz
      alert('Quiz finished. Answers: ' + JSON.stringify(selectedAnswers));
    }
    setSegmentProgress(updatedSegmentProgress);
  };

  const handleNextClick = (option) => {
const updatedSegmentProgress = [...segmentProgress];
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions[currentGroupIndex].length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      updatedSegmentProgress[currentGroupIndex] = (nextQuestionIndex / questions[currentGroupIndex].length) * 100;
    } else if (currentGroupIndex < questions.length - 1) {
      setCurrentGroupIndex(currentGroupIndex + 1);
      setCurrentQuestionIndex(0);
      updatedSegmentProgress[currentGroupIndex] = 100;
      updatedSegmentProgress[currentGroupIndex + 1] = 0;
    } else {
      // Handle the end of the quiz
      alert('All Done!!!');
    }
    setSegmentProgress(updatedSegmentProgress);
  }


  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

 const styles = {
  progressBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '20px',
    padding: '0',
    gap: '4px', // adds space between elements without needing marginRight
  },
  progressBarSegment: {
    height: '20px',
    flexGrow: 1,
    backgroundColor: '#fff', // soft purple
    borderRadius: '10px', // more rounded corners
    overflow: 'hidden',
  },
  progressBarFill: (progress) => ({
    width: `${progress}%`,
    height: '100%',
    backgroundColor: '#f4cae0', // soft pink
    transition: 'width 0.5s ease-in-out',
    borderRadius: '10px', // keep the rounded corners when filling
  }),
  questionContainer: {
    marginBottom: '30px',
    backgroundColor: '#fff', // white background for cleanliness
    padding: '20px',
    color: '#333333',
    borderRadius: '15px', // rounded corners for a soft look
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // subtle shadow for depth
  },
  questionText: {
    fontSize: '20px',
    fontWeight: '500', // not too bold, keep it soft
    color: '#333333', // soft dark color for text
    marginBottom: '15px',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  contentImg: {
    width: '200px'
  },
  optionButton: {
    padding: '15px 25px', // more padding for a larger touch target
    cursor: 'pointer',
    userSelect: 'none',
    marginTop: '10px',
    border: 'none', // no border for a cleaner look
    borderRadius: '20px', // highly rounded for a softer look
    background: '#f0e6f6', // matching the progress bar color
    color: '#333333', // soft dark color for text
    fontSize: '18px', // larger font for readability
    fontWeight: '400', // light weight for a softer appearance
    transition: 'background-color 0.3s, transform 0.2s', // smooth transition for interactions
    outline: 'none',
    '&:hover': { // pseudo-selector for hover state
      backgroundColor: '#e2d4e6', // a slightly darker pastel for hover interaction
      transform: 'translateY(-2px)', // a subtle lift effect on hover
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // slight shadow on hover for depth
    },
    '&:focus': { // pseudo-selector for focus state
      boxShadow: '0 0 0 2px rgba(244, 202, 224, 0.5)', // soft glow for accessibility
    },
  }
};

 const renderItem = () => {
    const item = questions[currentGroupIndex][currentQuestionIndex];
    if (item.type === "question") {
      return renderQuestion(item);
    } else if (item.type === "content") {
      return renderContent(item);
    }
  };

const renderQuestion = (question) => {
    return (
<div style={styles.questionContainer}>
        <div>{question.text}</div>
        <div>
          {question.options.map((option, index) => (
            <button key={index} style={styles.optionButton} onClick={() => handleAnswerOptionClick(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
      );
  };

   const renderContent = (content) => {
    // Render logic for content pages, including next button
    return (
      <div style={styles.questionContainer}>
        <div>{content.title}</div>
        <div>
        <img style={styles.contentImg} src={content.image} alt={content.title} />
        <p>{content.text}</p>
        <button style={styles.optionButton} onClick={handleNextClick}>Next</button>
      </div>
      </div>
    );
  };

  return (
    <div>
      <div style={styles.progressBarContainer}>
        {segmentProgress.map((progress, index) => (
          <div key={index} style={{ ...styles.progressBarSegment, marginRight: index < segmentProgress.length - 1 ? '4px' : '0' }}>
            <div style={styles.progressBarFill(progress)}></div>
          </div>
        ))}
      </div>
      
{renderItem()}



      {/* You can also add navigation buttons, question counters, etc., here */}
    </div>
  );
};

export default Quiz;
