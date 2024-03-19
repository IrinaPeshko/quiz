import React, { useState } from "react";
import LoadingPage from "./LoadingPage";
import FinalPage from "./FinalPage";
import { questions } from "../data/Questions";

const Quiz = () => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [answerResults, setAnswerResults] = useState(
    questions.map((group) => group.map(() => null))
  );
  const [segmentProgress, setSegmentProgress] = useState(
    questions.map(() => 0)
  );

  const handleAnswerOptionClick = (option, e) => {
    const questionIndex =
      currentQuestionIndex +
      questions
        .slice(0, currentGroupIndex)
        .reduce((acc, group) => acc + group.length, 0);

    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });

    e.target.blur();

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
      setIsLoading(true);
    }
    setSegmentProgress(updatedSegmentProgress);
  };

  const resetQuiz = () => {
    setCurrentGroupIndex(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizFinished(false);
    setIsLoading(false);
    setAnswerResults(questions.map((group) => group.map(() => null)));
    setSegmentProgress(questions.map(() => 0));
  };

  const styles = {
    progressBarContainer: {
      display: "flex",
      flexDirection: "row",
      marginBottom: "20px",
      padding: "0",
      gap: "4px",
    },
    progressBarSegment: {
      height: "20px",
      flexGrow: 1,
      backgroundColor: "#fff",
      borderRadius: "10px",
      overflow: "hidden",
    },
    progressBarFill: (progress) => ({
      width: `${progress}%`,
      height: "100%",
      backgroundColor: "#f4cae0",
      transition: "width 0.5s ease-in-out",
      borderRadius: "10px",
    }),
    questionContainer: {
      marginBottom: "30px",
      width: "80vw",
      maxWidth: "730px",
      backgroundColor: "#fff",
      padding: "20px",
      color: "#333333",
      borderRadius: "15px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    questionText: {
      fontSize: "20px",
      fontWeight: "500",
      color: "#333333",
      marginBottom: "15px",
    },
    optionsContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      gap: "10px",
      flexWrap: "wrap",
    },
    contentImg: {
      width: "200px",
    },
  };

  const renderItem = () => {
    if (quizFinished && isLoading) {
      return (
        <LoadingPage
          answerResults={answerResults}
          setIsLoading={setIsLoading}
        />
      );
    } else if (quizFinished && !isLoading) {
      return <FinalPage answerResults={answerResults} onRetry={resetQuiz} />;
    } else {
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
        <div style={styles.questionText}>{question.text}</div>
        <div style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={(e) => handleAnswerOptionClick(option, e)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = (content) => {
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
          <button onClick={handleNextClick}>Next</button>
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
      </div>
    );
  } else {
    return <div> {renderItem()}</div>;
  }
};

export default Quiz;
