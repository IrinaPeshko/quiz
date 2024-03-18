import React from "react";

const ProgressBar = ({ title, progress }) => {
  const styles = {
    container: {
      marginBottom: "20px",
      width: "80vw",
      maxWidth: "700px"
    },
    title: {
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    barContainer: {
      height: "10px",
      backgroundColor: "#e0e0e0",
      borderRadius: "5px",
      overflow: "hidden",
    },
    bar: {
      height: "100%",
      borderRadius: "5px",
      transition: "width 0.5s ease-in-out",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>{title}</div>
      <div style={styles.barContainer}>
        <div
          style={{
            ...styles.bar,
            width: `${progress}%`,
            backgroundColor: progress === 100 ? "#6200ee" : "#6200ea",
          }}
        />
      </div>
    </div>
  );
};

const FinalProgressBar = ({ answerResults }) => {
  const calculateProgress = (results) => {
    const correctAnswers = results.filter((result) => {
      if (result || result === null) {
        return true;
      }
    }).length;
    const totalQuestions = results.length;
    return (correctAnswers / totalQuestions) * 100;
  };

  const progressBarData = answerResults.map((groupResults, index) => ({
    title: `Group ${index + 1}`,
    progress: calculateProgress(groupResults),
  }));

  return (
    <div>
      {progressBarData.map((item, index) => (
        <ProgressBar key={index} title={item.title} progress={item.progress} />
      ))}
    </div>
  );
};

export default FinalProgressBar;
