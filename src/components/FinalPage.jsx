const FinalPage = ({ answerResults, onRetry }) => {
  const colors = ["#E0B0FF", "#ADD8E6", "#FFB6C1"];

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

  const handleRetryClick = () => {
    onRetry();
  };

  const styles = {
    header: {
      textAlign: "center",
    },

    completionSymbolsBlock: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
    },
  };

  return (
    <div>
      <h1 style={styles.header}>Your result</h1>
      {progressBarData.map((item, index) => (
        <FinalProgressBar
          key={index}
          title={item.title}
          progress={item.progress}
          color={colors[index % colors.length]}
        />
      ))}
      <div style={styles.completionSymbolsBlock}>
        {progressBarData.map((item, index) => (
          <CompletionSymbol
            key={index}
            progress={item.progress}
            color={colors[index % colors.length]}
          />
        ))}
      </div>
      <button onClick={handleRetryClick}>Try Again</button>
    </div>
  );
};

const FinalProgressBar = ({ title, progress, color }) => {
  const styles = {
    container: {
      marginBottom: "20px",
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
      backgroundColor: color,
      width: `${progress}%`,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        <p>{title}</p>
        <p>{Math.round(progress)}%</p>
      </div>
      <div style={styles.barContainer}>
        <div
          style={{
            ...styles.bar,
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
};

const CompletionSymbol = ({ progress, color }) => {
  const getCompletionSymbol = (progress) => {
    if (progress === 100) {
      return "✓";
    } else if (progress > 0) {
      return "•";
    } else {
      return "✕";
    }
  };

  const styles = {
    completionSymbol: {
      color: color,
      fontSize: "30px",
    },
  };

  return <p style={styles.completionSymbol}>{getCompletionSymbol(progress)}</p>;
};

export default FinalPage;
