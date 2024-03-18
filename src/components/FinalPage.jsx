const FinalPage = ({ answerResults }) => {
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

  const styles = {
    header: {
      textAlign: "center",
    },
  };

  return (
    <div>
      <h1 style={styles.header}>Your result:</h1>
      {progressBarData.map((item, index) => (
        <FinalProgressBar
          key={index}
          title={item.title}
          progress={item.progress}
          color={colors[index % colors.length]}
        />
      ))}
    </div>
  );
};

export default FinalPage;

const FinalProgressBar = ({ title, progress, color }) => {
  console.log(color);
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
        <p>{progress}%</p>
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
