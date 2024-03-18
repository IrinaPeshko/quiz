import React, { useState } from "react";
import LoadingPage from "./LoadingPage";
import FinalPage from "./FinalPage"
import { questions } from "../data/Questions";

const Quiz = () => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [answerResults, setAnswerResults] = useState(
    questions.map((group) => group.map(() => null))
  );
  const [segmentProgress, setSegmentProgress] = useState(
    questions.map(() => 0)
  );

  const handleAnswerOptionClick = (option) => {
    const questionIndex =
      currentQuestionIndex +
      questions
        .slice(0, currentGroupIndex)
        .reduce((acc, group) => acc + group.length, 0);

    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });

    const updatedSegmentProgress = [...segmentProgress];
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions[currentGroupIndex].length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      updatedSegmentProgress[currentGroupIndex] =
        (nextQuestionIndex / questions[currentGroupIndex].length) * 100;
    } else if (currentGroupIndex < questions.length - 1) {
      setCurrentGroupIndex(currentGroupIndex + 1);
      setCurrentQuestionIndex(0);
      updatedSegmentProgress[currentGroupIndex] = 100;
      updatedSegmentProgress[currentGroupIndex + 1] = 0;
    } else {
      setQuizFinished(true);
      setIsLoading(true);
    }
    setSegmentProgress(updatedSegmentProgress);
    const currentQuestion = questions[currentGroupIndex][currentQuestionIndex];

    // Checking the correctness of the selected option
    const isCorrect = option === currentQuestion.correctAnswer;
    const updatedAnswerResults = [...answerResults];
    updatedAnswerResults[currentGroupIndex][currentQuestionIndex] = isCorrect;
    setAnswerResults(updatedAnswerResults);
  };

  const handleNextClick = (option) => {
    const updatedSegmentProgress = [...segmentProgress];
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions[currentGroupIndex].length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      updatedSegmentProgress[currentGroupIndex] =
        (nextQuestionIndex / questions[currentGroupIndex].length) * 100;
    } else if (currentGroupIndex < questions.length - 1) {
      setCurrentGroupIndex(currentGroupIndex + 1);
      setCurrentQuestionIndex(0);
      updatedSegmentProgress[currentGroupIndex] = 100;
      updatedSegmentProgress[currentGroupIndex + 1] = 0;
    } else {
      setQuizFinished(true);
      setIsLoading(true)
    }
    setSegmentProgress(updatedSegmentProgress);
  };

  const styles = {
    progressBarContainer: {
      display: "flex",
      flexDirection: "row",
      marginBottom: "20px",
      padding: "0",
      gap: "4px", // adds space between elements without needing marginRight
    },
    progressBarSegment: {
      height: "20px",
      flexGrow: 1,
      backgroundColor: "#fff", // soft purple
      borderRadius: "10px", // more rounded corners
      overflow: "hidden",
    },
    progressBarFill: (progress) => ({
      width: `${progress}%`,
      height: "100%",
      backgroundColor: "#f4cae0", // soft pink
      transition: "width 0.5s ease-in-out",
      borderRadius: "10px", // keep the rounded corners when filling
    }),
    questionContainer: {
      marginBottom: "30px",
      width: "90%",
      backgroundColor: "#fff", // white background for cleanliness
      padding: "20px",
      color: "#333333",
      borderRadius: "15px", // rounded corners for a soft look
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // subtle shadow for depth
    },
    questionText: {
      fontSize: "20px",
      fontWeight: "500", // not too bold, keep it soft
      color: "#333333", // soft dark color for text
      marginBottom: "15px",
    },
    optionsContainer: {
      display: "flex",
      flexDirection: "column",
    },
    contentImg: {
      width: "200px",
    },
    optionButton: {
      padding: "15px 25px", // more padding for a larger touch target
      cursor: "pointer",
      userSelect: "none",
      marginTop: "10px",
      marginRight: "7px",

      border: "none", // no border for a cleaner look
      borderRadius: "20px", // highly rounded for a softer look
      background: "#f0e6f6", // matching the progress bar color
      color: "#333333", // soft dark color for text
      fontSize: "18px", // larger font for readability
      fontWeight: "400", // light weight for a softer appearance
      transition: "background-color 0.3s, transform 0.2s", // smooth transition for interactions
      outline: "none",
      "&:hover": {
        // pseudo-selector for hover state
        backgroundColor: "#e2d4e6", // a slightly darker pastel for hover interaction
        transform: "translateY(-2px)", // a subtle lift effect on hover
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // slight shadow on hover for depth
      },
      "&:focus": {
        // pseudo-selector for focus state
        boxShadow: "0 0 0 2px rgba(244, 202, 224, 0.5)", // soft glow for accessibility
      },
    },
  };

  const renderItem = () => {
    if (quizFinished && isLoading) {
      return <LoadingPage answerResults={answerResults} setIsLoading={setIsLoading}/>
    } else if(quizFinished && !isLoading) {
     return <FinalPage answerResults={answerResults}/>
    }else{
      const item = questions[currentGroupIndex][currentQuestionIndex];
      if (item.type === "question") {
        return renderQuestion(item);
      } else if (item.type === "content") {
        return renderContent(item);
      }
    }
  };

  const renderQuestion = (question) => {
    return (
      <div style={styles.questionContainer}>
        <div>{question.text}</div>
        <div>
          {question.options.map((option, index) => (
            <button
              key={index}
              style={styles.optionButton}
              onClick={() => handleAnswerOptionClick(option)}
            >
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
          <img
            style={styles.contentImg}
            src={content.image}
            alt={content.title}
          />
          <p>{content.text}</p>
          <button style={styles.optionButton} onClick={handleNextClick}>
            Next
          </button>
        </div>
      </div>
    );
  };

  if (!quizFinished) {
    return (
      <div>
        <div style={styles.progressBarContainer}>
          {segmentProgress.map((progress, index) => (
            <div
              key={index}
              style={{
                ...styles.progressBarSegment,
                marginRight: index < segmentProgress.length - 1 ? "4px" : "0",
              }}
            >
              <div style={styles.progressBarFill(progress)}></div>
            </div>
          ))}
        </div>

        {renderItem()}

        {/* You can also add navigation buttons, question counters, etc., here */}
      </div>
    );
  } else {
    return <div> {renderItem()}</div>;
  }
};

export default Quiz;
