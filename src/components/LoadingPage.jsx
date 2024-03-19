import React, { useEffect, useState } from "react";

const LoadingPage = ({ answerResults, setIsLoading }) => {
  const animationDuration = 5000;
  const [animatedProgress, setAnimatedProgress] = useState(
    answerResults.map(() => 0)
  );
  const [isLoadingArray, setIsLoadingArray] = useState(
    answerResults.map(() => false)
  );
  useEffect(() => {
    answerResults.forEach((_element, index) => {
      setTimeout(() => {
        setAnimatedProgress((prev) => {
          const newProgress = [...prev];
          newProgress[index] = 100;
          if (index === answerResults.length - 1) {
            setTimeout(() => {
              setIsLoading(false);
            }, animationDuration + 700);
          }
          return newProgress;
        });
        setIsLoadingArray((prev) => {
          const newLoadingArray = [...prev];
          newLoadingArray[index] = true;
          return newLoadingArray;
        });
      }, animationDuration * index);
    });
  }, [answerResults]);

  const styles = {
    header: {
      textAlign: "center",
    },
  };
  return (
    <div>
      <h1 style={styles.header}>
        Your responses are being processed. Please wait.
      </h1>
      {answerResults.map((item, index) => (
        <LoadingProgressBar
          key={index}
          title={`Group ${index + 1}`}
          progress={animatedProgress[index]}
          animationDuration={animationDuration}
          isLoading={isLoadingArray[index]}
          setIsLoadingArray={setIsLoadingArray}
          index={index}
        />
      ))}
    </div>
  );
};

export default LoadingPage;

const LoadingProgressBar = ({
  title,
  progress,
  animationDuration,
  isLoading,
  setIsLoadingArray,
  index,
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    setCurrentProgress(progress);
    let pastTime = 0;
    const timer = setInterval(() => {
      pastTime += 100;
      const newProgress = Math.min(
        progress * (pastTime / animationDuration),
        progress
      );
      setDisplayProgress(Math.round(newProgress));
      if (pastTime >= animationDuration) {
        clearInterval(timer);
        setIsLoadingArray((prev) => {
          const newLoadingArray = [...prev];
          newLoadingArray[index] = false;
          return newLoadingArray;
        });
      }
    }, 100);
    return () => clearInterval(timer);
  }, [progress]);

  const styles = {
    container: {
      margin: "0 auto 20px",
      width: "80vw",
      maxWidth: "700px",
    },
    title: {
      display: "flex",
      justifyContent: "space-between",
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
      backgroundColor: currentProgress === 100 ? "#6200ee" : "#6200ea",
      width: `${currentProgress}%`,
      transition: `width ${animationDuration}ms ease-in-out`,
    },
    loadingContainer: {
      display: "flex",
      gap: "10px",
      alineItems: "center",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        <p>{title}</p>
        <div style={styles.loadingContainer}>
          {isLoading && <div className="spinner" />} {displayProgress}%
        </div>
      </div>
      <div style={styles.barContainer}>
        <div
          style={{
            ...styles.bar,
            width: `${currentProgress}%`,
            backgroundColor: progress === 100 ? "#6200ee" : "#6200ea",
          }}
        />
      </div>
    </div>
  );
};
