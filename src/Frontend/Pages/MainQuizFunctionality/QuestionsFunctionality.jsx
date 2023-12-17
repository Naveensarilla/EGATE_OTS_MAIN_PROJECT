import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PaperHeader from "../../Components/PaperHeader/PaperHeader";
import "../Paper/Paper.css";
import ButtonsFunctionality from "./ButtonsFunctionality";
import TestResultsPage from "./TestResultsPage";

const QuestionsFunctionality = ({ answeredQuestions }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleSubjectSelect = (subject) => {
    // Set the selected subject when a subject button is clicked
    setSelectedSubject(subject);
  };

  const [questionData, setQuestionData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [Subjects, setSubjects] = useState([]);
  const { testCreationTableId, subjectId } = useParams();
  const [sections, setSections] = useState([]);

  const [questionStatus, setQuestionStatus] = useState(
    Array(questionData.length).fill("notAnswered")
  );

  const [answeredCount, setAnsweredCount] = useState(0);
  const [notAnsweredCount, setNotAnsweredCount] = useState(0);
  const [answeredmarkedForReviewCount, setAnsweredmarkedForReviewCount] =
    useState(0);
  const [markedForReviewCount, setMarkedForReviewCount] = useState(0);
  const [VisitedCount, setVisitedCount] = useState(0);

  const updateCounters = () => {
    let answered = 0;
    let notAnswered = 0;
    let marked = 0;
    let markedForReview = 0;
    let Visited = 0;

    questionStatus.forEach((status) => {
      if (status === "answered") {
        answered++;
      } else if (status === "notAnswered") {
        notAnswered++;
      } else if (status === "marked") {
        marked++;
      } else if (status === "Answered but marked for review") {
        markedForReview++;
      } else if (status === "notVisited") {
        Visited++;
      }
    });

    setAnsweredCount(answered);
    setNotAnsweredCount(notAnswered);
    setAnsweredmarkedForReviewCount(marked);
    setMarkedForReviewCount(markedForReview);
    setVisitedCount(Visited);
  };

  // ---------------------------------Timer code Start--------------------------------
  const [timer, setTimer] = useState(0);
  const [timers, setTimers] = useState(new Array(questionData.length).fill(0));

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);

    const minutes = Math.floor((seconds % 3600) / 60);

    const remainingSeconds = seconds % 60;

    return `${hours > 9 ? hours : "0" + hours}:${
      minutes > 9 ? minutes : "0" + minutes
    }:${remainingSeconds > 9 ? remainingSeconds : "0" + remainingSeconds}`;
  };

  useEffect(() => {
    // Set the timer to the saved value for the current question
    setTimer(timers[currentQuestionIndex] || 0);
    let interval;
    interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    // Clear the interval when the component unmounts or when the user moves to the next question
    return () => {
      clearInterval(interval);
    };
  }, [currentQuestionIndex, timers]);
  // ------------------------------------Timer code end--------------------------------

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          `http://localhost:3081/subjects/${testCreationTableId}`
        );
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSections = async () => {
      try {
        const response = await fetch(
          `http://localhost:3081/fetchSections/${testCreationTableId}`
        );
        const data = await response.json();
        setSections(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchQuestionData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3081/getPaperData/${testCreationTableId}`
        );
        const data = await response.json();

        // Check if the data has both 'questions' and 'options' properties
        if (data && data.questions && data.options) {
          // Assuming both questions and options are arrays, you might want to merge them
          const mergedData = data.questions.map((question, index) => ({
            ...question,
            options: data.options.slice(index * 4, (index + 1) * 4), // Assuming 4 options per question
          }));

          setQuestionData(mergedData);
          setQuestionStatus([
            "notAnswered",
            ...Array(mergedData.length - 1).fill("notVisited"),
          ]);
        } else {
          console.error("API response does not have expected structure:", data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubjects();
    fetchSections();
    fetchQuestionData();
  }, [testCreationTableId]);

  useEffect(() => {
    // Call the updateCounters function initially when the component mounts
    updateCounters();
  }, [questionStatus]);

  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questionData.length).fill("")
  );

  const onAnswerSelected = (OptionLetter) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[activeQuestion] = OptionLetter;
    setSelectedAnswers(updatedSelectedAnswers);

    const updatedQuestionStatus = [...questionStatus];
    updatedQuestionStatus[activeQuestion] = "answered";
    setQuestionStatus(updatedQuestionStatus);
  };

  const [activeQuestion, setActiveQuestion] = useState(0);

  const markForReview = () => {
    // Update questionStatus for the marked question
    const updatedQuestionStatus = [...questionStatus];
    if (selectedAnswers[activeQuestion]) {
      updatedQuestionStatus[activeQuestion] = "Answered but marked for review";
      if (
        selectedAnswers[activeQuestion] === "Answered but marked for review"
      ) {
        updatedQuestionStatus[activeQuestion] =
          "Answered but marked for review";
      }
    } else if (!selectedAnswers[activeQuestion]) {
      updatedQuestionStatus[activeQuestion] = "marked";
    }

    setQuestionStatus(updatedQuestionStatus);
  };

  const clearResponse = () => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestionIndex] = "";
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      // Save the current timer value for the question
      const updatedTimers = [...timers];
      updatedTimers[prevIndex] = timer;
      setTimers(updatedTimers);
      // Move to the previous question
      return prevIndex - 1;
    });

    setActiveQuestion((prevActiveQuestion) => prevActiveQuestion - 1);
  };

  const handleNextClick = () => {
    setCurrentQuestionIndex((prevIndex) => {
      // Save the current timer value for the question

      const updatedTimers = [...timers];

      updatedTimers[prevIndex] = timer;

      setTimers(updatedTimers);
      return prevIndex + 1;
    });

    const updatedQuestionStatus = [...questionStatus];

    if (activeQuestion < questionData.length - 1) {
      // Check the status of the next question
      const nextQuestionStatus = questionStatus[activeQuestion + 1];

      if (nextQuestionStatus === "answered") {
        updatedQuestionStatus[activeQuestion + 1] = "answered";
      } else if (nextQuestionStatus === "notAnswered") {
        updatedQuestionStatus[activeQuestion + 1] = "notAnswered";
      } else if (!markForReview() === false) {
        markForReview();
      }

      setActiveQuestion((prevActiveQuestion) => prevActiveQuestion + 1);
    }

    updateCounters();

    // Set status of the next question (if any) to "notAnswered"

    if (activeQuestion < questionData.length - 1) {
      const updatedQuestionStatus = [...questionStatus];
      const nextQuestionStatus = questionStatus[activeQuestion + 1];

      if (nextQuestionStatus === "notVisited") {
        updatedQuestionStatus[activeQuestion + 1] = "notAnswered";
      }

      if (selectedAnswers[activeQuestion] === "answered") {
        updatedQuestionStatus[activeQuestion] = "answered";
      } else if (markForReview() === true) {
        updatedQuestionStatus[activeQuestion] =
          "Answered but marked for review";
      } else if (markForReview() === false) {
        updatedQuestionStatus[activeQuestion] = "marked";
      }

      if (nextQuestionStatus === "notAnswered") {
        updatedQuestionStatus[activeQuestion + 1] = "notAnswered";
      }

      setQuestionStatus(updatedQuestionStatus);
    }
  };

  const [accuracy, setAccuracy] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [liveRank, setLiveRank] = useState(0);

  const calculateQuestionCounts = () => {
    let answered = 0;
    let notAnswered = 0;
    let markedForReview = 0;
    let answeredmarkedForReviewCount = 0;
    let VisitedCount = 0;

    questionStatus.forEach((status, index) => {
      if (status === "answered") {
        answered++;
      } else if (status === "notAnswered") {
        notAnswered++;
      } else if (status === "marked") {
        markedForReview++;
      } else if (status === "Answered but marked for review") {
        answeredmarkedForReviewCount++;
      } else if (status === "notVisited") {
        VisitedCount++;
      }
    });

    return {
      answered,
      notAnswered,
      markedForReview,
      answeredmarkedForReviewCount,
      VisitedCount,
    };
  };

  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    window.alert("Your Test has been Submitted!! Click Ok to See Result.");

    // Call the function to get question counts
    const {
      answered,
      notAnswered,
      markedForReview,
      answeredmarkedForReviewCount,
      VisitedCount,
    } = calculateQuestionCounts();

    // Add any additional logic you need for submitting the exam
    // For example, you might want to send this data to the server.
    // Redirect to the result page
    navigate("/result", {
      state: {
        answeredCount: answered,
        notAnsweredCount: notAnswered,
        markedForReviewCount: markedForReview,
        answeredmarkedForReviewCount: answeredmarkedForReviewCount,
        VisitedCount: VisitedCount,
      },
    });
  };

  const handleQuestionSelect = (questionNumber) => {
    setCurrentQuestionIndex(questionNumber - 1);
    setActiveQuestion(questionNumber - 1);
  };

  return (
    <div className="Main-Page otsMainPages">
      {showResult ? (
        // Render the ResultPage component here
        <TestResultsPage
          answeredCount={answeredCount}
          notAnsweredCount={notAnsweredCount}
          markedForReviewCount={markedForReviewCount}
          answeredmarkedForReviewCount={answeredmarkedForReviewCount}
          VisitedCount={VisitedCount}
        />
      ) : (
        <div>
          <div>
            <PaperHeader />
          </div>
          <div className="QUESTIONS_CONTAINER">
            <div className="QUESTIONS_CONTAINER_subpart">
              <div className="subjects">
                {Subjects.map((subjectTitle, index) => (
                  <li key={index}>
                    <Link>
                      <button
                        className="subject-btn"
                        onClick={() =>
                          handleSubjectSelect(subjectTitle.subjectName)
                        }
                      >
                        {subjectTitle.subjectName}
                      </button>
                    </Link>
                    {/* <button className="subject-btn">{subjectTitle.subjectName}</button> */}
                  </li>
                ))}
              </div>

              <div className="second-header">
                <div className="single-select-question">
                  {sections.map((sectionTitle, index) => (
                    <li key={index}>
                      <p>{sectionTitle.sectionName}</p>
                    </li>
                  ))}
                  {/* Single Select Question */}
                </div>
                <div className="right-header">
                  <div className="marks">
                    Marks: <div className="plus-mark">+1</div>
                    <div className="minus-mark">-1</div>
                  </div>
                  <div>Timer: {formatTime(timer)}</div>
                </div>
              </div>

              <div className="Question_No_heading">
                <p>
                  {" "}
                  Question No. {currentQuestionIndex + 1} of{" "}
                  {questionData.length}
                </p>
              </div>

              <div className="_quizexampart ">
                {questionData.length > 0 && (
                  <div className="quizexampart_q_O_container">
                    <h4>
                      {/* {currentQuestionIndex + 1}. */}

                      <img
                        src={`data:image/png;base64,${questionData[currentQuestionIndex].question_img}`}
                        alt={`Question ${currentQuestionIndex + 1}`}
                      />
                    </h4>

                    {questionData[currentQuestionIndex].options.map(
                      (OptionImage, optionIndex) => (
                        <li key={optionIndex}>
                          <input
                            type="radio"
                            name={`question-${currentQuestionIndex}-option`}
                            value={optionIndex}
                            checked={
                              selectedAnswers[currentQuestionIndex] ===
                              optionIndex
                            }
                            onChange={() => onAnswerSelected(optionIndex)}
                          />
                          {OptionImage && OptionImage.option_img && (
                            <img
                              key={OptionImage.question_id}
                              src={`data:image/png;base64,${OptionImage.option_img}`}
                              alt={`Option ${optionIndex + 1}`}
                            />
                          )}
                        </li>
                      )
                    )}
                    <div className="flex-right">
                      <button className="clear-btn" onClick={markForReview}>
                        Mark for Review & Next
                      </button>
                      <button className="clear-btn" onClick={clearResponse}>
                        Clear Response
                      </button>
                      <button
                        className="previous-btn"
                        onClick={goToPreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                      >
                        <i className="fa-solid fa-angles-left"></i> Previous
                      </button>
                      <button className="save-btn" onClick={handleNextClick}>
                        Next <i className="fa-solid fa-angles-right"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="rightsidebar">
              <ButtonsFunctionality
                onQuestionSelect={handleQuestionSelect}
                questionStatus={questionStatus}
                setQuestionStatus={setQuestionStatus}
                answeredCount={answeredCount}
                notAnsweredCount={notAnsweredCount}
                answeredmarkedForReviewCount={answeredmarkedForReviewCount}
                markedForReviewCount={markedForReviewCount}
                VisitedCount={VisitedCount}
                selectedSubject={selectedSubject}
                questionData={questionData}
              />
              <button onClick={handleSubmit} id="resume_btn">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionsFunctionality;
