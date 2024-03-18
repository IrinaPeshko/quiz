import React from "react";

const ProgressBar = ({ title, progress }) => {
  const styles = {
    container: {
      marginBottom: "20px",
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

const FinalProgressBar = () => {
  const progressBarData = [
    { title: "Your profile", progress: 100 },
    { title: "Personality traits", progress: 100 },
    { title: "Relationship Pattern", progress: 19 },
  ];

  return (
    <div>
      {progressBarData.map((item, index) => (
        <ProgressBar key={index} title={item.title} progress={item.progress} />
      ))}
    </div>
  );
};

export default FinalProgressBar;
