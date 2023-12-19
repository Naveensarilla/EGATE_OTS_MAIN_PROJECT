
// import React, { useState, useEffect } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import PaperHeader from "../../Components/PaperHeader/PaperHeader";
// import "../Paper/Paper.css";
// import ButtonsFunctionality from "./ButtonsFunctionality";
// import TestResultsPage from "./TestResultsPage";




// const QuestionsFunctionality = ({ answeredQuestions }) => {

//     const [selectedSubject, setSelectedSubject] = useState(null);

//     const handleSubjectSelect = (subject) => {
//         // Set the selected subject when a subject button is clicked
//         setSelectedSubject(subject);
//     };

//     const [questionData, setQuestionData] = useState([]);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [Subjects, setSubjects] = useState([]);
//     const { testCreationTableId, subjectId } = useParams();
//     const [sections, setSections] = useState([]);


//     const [questionStatus, setQuestionStatus] = useState(
//         Array(questionData.length).fill("notAnswered")
//     );

//     const [answeredCount, setAnsweredCount] = useState(0);
//     const [notAnsweredCount, setNotAnsweredCount] = useState(0);
//     const [answeredmarkedForReviewCount, setAnsweredmarkedForReviewCount] =
//         useState(0);
//     const [markedForReviewCount, setMarkedForReviewCount] = useState(0);
//     const [VisitedCount, setVisitedCount] = useState(0);


//     const updateCounters = () => {
//         let answered = 0;
//         let notAnswered = 0;
//         let marked = 0;
//         let markedForReview = 0;
//         let Visited = 0;

//         questionStatus.forEach((status) => {
//             if (status === "answered") {
//                 answered++;
//             } else if (status === "notAnswered") {
//                 notAnswered++;
//             } else if (status === "marked") {
//                 marked++;
//             } else if (status === "Answered but marked for review") {
//                 markedForReview++;
//             } else if (status === "notVisited") {
//                 Visited++;
//             }
//         });

//         setAnsweredCount(answered);
//         setNotAnsweredCount(notAnswered);
//         setAnsweredmarkedForReviewCount(marked);
//         setMarkedForReviewCount(markedForReview);
//         setVisitedCount(Visited);
//     };


//     // ---------------------------------Timer code Start--------------------------------
//     const [timer, setTimer] = useState(0);
//     const [timers, setTimers] = useState(new Array(questionData.length).fill(0));

//     const formatTime = (seconds) => {
//         const hours = Math.floor(seconds / 3600);

//         const minutes = Math.floor((seconds % 3600) / 60);

//         const remainingSeconds = seconds % 60;

//         return `${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes
//             }:${remainingSeconds > 9 ? remainingSeconds : "0" + remainingSeconds}`;
//     };

//     useEffect(() => {
//         // Set the timer to the saved value for the current question
//         setTimer(timers[currentQuestionIndex] || 0);
//         let interval;
//         interval = setInterval(() => {
//             setTimer((prevTimer) => prevTimer + 1);
//         }, 1000);
//         // Clear the interval when the component unmounts or when the user moves to the next question
//         return () => {
//             clearInterval(interval);
//         };
//     }, [currentQuestionIndex, timers]);
//     // ------------------------------------Timer code end--------------------------------


//     useEffect(() => {
//         const fetchSubjects = async () => {
//             try {
//                 const response = await fetch(
//                     `http://localhost:3081/subjects/${testCreationTableId}`
//                 );
//                 const data = await response.json();
//                 setSubjects(data);
//             } catch (error) {
//                 console.error(error);
//             }
//         };




//         const fetchSections = async () => {
//             try {
//                 const response = await fetch(
//                     `http://localhost:3081/fetchSections/${testCreationTableId}`
//                 );
//                 const data = await response.json();
//                 setSections(data);
//             } catch (error) {
//                 console.error(error);
//             }
//         };






//         const fetchQuestionData = async () => {
//             try {
//                 const response = await fetch(
//                     `http://localhost:3081/getPaperData/${testCreationTableId}`
//                 );
//                 const data = await response.json();

//                 // Check if the data has both 'questions' and 'options' properties
//                 if (data && data.questions && data.options) {
//                     // Assuming both questions and options are arrays, you might want to merge them
//                     const mergedData = data.questions.map((question, index) => ({
//                         ...question,
//                         options: data.options.slice(index * 4, (index + 1) * 4), // Assuming 4 options per question
//                     }));

//                     setQuestionData(mergedData);
//                     setQuestionStatus([
//                         "notAnswered",
//                         ...Array(mergedData.length - 1).fill("notVisited"),
//                     ]);
//                 } else {
//                     console.error("API response does not have expected structure:", data);
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         };


//         fetchSubjects();
//         fetchSections();
//         fetchQuestionData();
//     }, [testCreationTableId]);


//     useEffect(() => {
//         // Call the updateCounters function initially when the component mounts
//         updateCounters();
//     }, [questionStatus]);



//     const [selectedAnswers, setSelectedAnswers] = useState(
//         Array(questionData.length).fill("")
//     );






//     const onAnswerSelected = (OptionLetter) => {
//         const updatedSelectedAnswers = [...selectedAnswers];
//         updatedSelectedAnswers[activeQuestion] = OptionLetter;
//         setSelectedAnswers(updatedSelectedAnswers);

//         const updatedQuestionStatus = [...questionStatus];
//         updatedQuestionStatus[activeQuestion] = "answered";
//         setQuestionStatus(updatedQuestionStatus);
//     };

//     const [activeQuestion, setActiveQuestion] = useState(0);


//     const markForReview = () => {
//         // Update questionStatus for the marked question
//         const updatedQuestionStatus = [...questionStatus];
//         if (selectedAnswers[activeQuestion]) {
//             updatedQuestionStatus[activeQuestion] = "Answered but marked for review";
//             if (selectedAnswers[activeQuestion] === "Answered but marked for review") {
//                 updatedQuestionStatus[activeQuestion] = "Answered but marked for review";
//             }
//         } else if (!selectedAnswers[activeQuestion]) {
//             updatedQuestionStatus[activeQuestion] = "marked";
//         }

//         setQuestionStatus(updatedQuestionStatus);
//     };






//     const clearResponse = () => {
//         const updatedSelectedAnswers = [...selectedAnswers];
//         updatedSelectedAnswers[currentQuestionIndex] = "";
//         setSelectedAnswers(updatedSelectedAnswers);
//     };


//     // const goToPreviousQuestion = () => {
//     //     setCurrentQuestionIndex((prevIndex) => {
//     //         // Save the current timer value for the question
//     //         const updatedTimers = [...timers];
//     //         updatedTimers[prevIndex] = timer;
//     //         setTimers(updatedTimers);
//     //         // Move to the previous question
//     //         return prevIndex > 0 ? prevIndex - 1 : prevIndex;
//     //     });

//     //     if (questionData.length > 0) {
//     //         setActiveQuestion((prevActiveQuestion) => prevActiveQuestion > 0 ? prevActiveQuestion - 1 : prevActiveQuestion);
//     //     }
//     // };




//     const goToPreviousQuestion = () => {
//         setCurrentQuestionIndex((prevIndex) => {
//             // Save the current timer value for the question
//             const updatedTimers = [...timers];
//             updatedTimers[prevIndex] = timer;
//             setTimers(updatedTimers);
//             // Move to the previous question
//             return prevIndex - 1;
//         });

//         setActiveQuestion((prevActiveQuestion) => prevActiveQuestion - 1);
//     };


//     const handleNextClick = () => {


//         setCurrentQuestionIndex((prevIndex) => {
//             // Save the current timer value for the question

//             const updatedTimers = [...timers];

//             updatedTimers[prevIndex] = timer;

//             setTimers(updatedTimers);
//             return prevIndex + 1;
//         });

//         const updatedQuestionStatus = [...questionStatus];

//         if (activeQuestion < questionData.length - 1) {
//             // Check the status of the next question
//             const nextQuestionStatus = questionStatus[activeQuestion + 1];

//             if (nextQuestionStatus === "answered") {
//                 updatedQuestionStatus[activeQuestion + 1] = "answered";
//             } else if (nextQuestionStatus === "notAnswered") {
//                 updatedQuestionStatus[activeQuestion + 1] = "notAnswered";
//             } else if (!markForReview() === false) {
//                 markForReview();
//             }

//             setActiveQuestion((prevActiveQuestion) => prevActiveQuestion + 1);
//         }

//         updateCounters();

//         // Set status of the next question (if any) to "notAnswered"

//         if (activeQuestion < questionData.length - 1) {
//             const updatedQuestionStatus = [...questionStatus];
//             const nextQuestionStatus = questionStatus[activeQuestion + 1];

//             if (nextQuestionStatus === "notVisited") {
//                 updatedQuestionStatus[activeQuestion + 1] = "notAnswered";
//             }

//             if (selectedAnswers[activeQuestion] === "answered") {
//                 updatedQuestionStatus[activeQuestion] = "answered";
//             } else if (markForReview() === true) {
//                 updatedQuestionStatus[activeQuestion] = "Answered but marked for review";
//             } else if (markForReview() === false) {
//                 updatedQuestionStatus[activeQuestion] = "marked";
//             }

//             if (nextQuestionStatus === "notAnswered") {
//                 updatedQuestionStatus[activeQuestion + 1] = "notAnswered";
//             }

//             setQuestionStatus(updatedQuestionStatus);
//         }


//     };


//     const [accuracy, setAccuracy] = useState(0);
//     const [averageScore, setAverageScore] = useState(0);
//     const [topScore, setTopScore] = useState(0);
//     const [liveRank, setLiveRank] = useState(0);

//     const calculateQuestionCounts = () => {
//         let answered = 0;
//         let notAnswered = 0;
//         let markedForReview = 0;
//         let answeredmarkedForReviewCount = 0;
//         let VisitedCount = 0;

//         questionStatus.forEach((status, index) => {
//             if (status === "answered") {
//                 answered++;
//             } else if (status === "notAnswered") {
//                 notAnswered++;
//             } else if (status === "marked") {
//                 markedForReview++;
//             } else if (status === "Answered but marked for review") {
//                 answeredmarkedForReviewCount++;
//             } else if (status === "notVisited") {
//                 VisitedCount++;
//             }
//         });

//         return {
//             answered,
//             notAnswered,
//             markedForReview,
//             answeredmarkedForReviewCount,
//             VisitedCount,
//         };
//     };


//     const [showResult, setShowResult] = useState(false);
//     const navigate = useNavigate();
    

//     const handleSubmit = () => {
//         window.alert("Your Test has been Submitted!! Click Ok to See Result.");



//         // Call the function to get question counts
//         const {
//             answered,
//             notAnswered,
//             markedForReview,
//             answeredmarkedForReviewCount,
//             VisitedCount,
//         } = calculateQuestionCounts();


//         // Add any additional logic you need for submitting the exam
//         // For example, you might want to send this data to the server.
//          // Redirect to the result page
//          navigate("/result", {
//             state: {
//               answeredCount: answered,
//               notAnsweredCount: notAnswered,
//               markedForReviewCount: markedForReview,
//               answeredmarkedForReviewCount: answeredmarkedForReviewCount,
//               VisitedCount: VisitedCount,
//             },
//         });
//     };



//     const handleQuestionSelect = (questionNumber) => {
//         setCurrentQuestionIndex(questionNumber - 1);
//         setActiveQuestion(questionNumber - 1);
//     };







//     return (

//         <div className="Main-Page otsMainPages">
//            {showResult ? (
//         // Render the ResultPage component here
//         <TestResultsPage
//           answeredCount={answeredCount}
//           notAnsweredCount={notAnsweredCount}
//           markedForReviewCount={markedForReviewCount}
//           answeredmarkedForReviewCount={answeredmarkedForReviewCount}
//           VisitedCount={VisitedCount}
//         />
//       ) : (
//         <div>
//         <div>
//             <PaperHeader />
//         </div>
//         <div className="QUESTIONS_CONTAINER">
//             <div className="QUESTIONS_CONTAINER_subpart">
//             <div className="subjects">
//             {Subjects.map((subjectTitle, index) => (
//                 <li key={index}>
//                     <Link ><button className="subject-btn" onClick={() => handleSubjectSelect(subjectTitle.subjectName)}>{subjectTitle.subjectName}</button></Link>
//                     {/* <button className="subject-btn">{subjectTitle.subjectName}</button> */}
//                 </li>
//             ))}

//         </div>


//         <div className="second-header">
//             <div className="single-select-question">
//                 {sections.map((sectionTitle, index) => (
//                     <li key={index}>
//                         <p>{sectionTitle.sectionName}</p>

//                     </li>
//                 ))}
//                 {/* Single Select Question */}
//             </div>
//             <div className="right-header">
//                 <div className="marks">
//                     Marks: <div className="plus-mark">+1</div>
//                     <div className="minus-mark">-1</div>
//                 </div>
//                 <div>Timer: {formatTime(timer)}</div>
//             </div>
//         </div>


//         <div className="Question_No_heading">
//             <p>  Question No. {currentQuestionIndex + 1}  of {questionData.length}</p>
//         </div>

    
//         <div  className="_quizexampart ">
// {questionData.length > 0 && (
//             <div className="quizexampart_q_O_container">
//                 <h4>
//                     {/* {currentQuestionIndex + 1}. */}

//                     <img
//                         src={`data:image/png;base64,${questionData[currentQuestionIndex].question_img}`}
//                         alt={`Question ${currentQuestionIndex + 1}`}
//                     />
//                 </h4>

//                 {questionData[currentQuestionIndex].options.map(
//                     (OptionImage, optionIndex) => (
//                         <li key={optionIndex}>
//                             <input
//                                 type="radio"
//                                 name={`question-${currentQuestionIndex}-option`}
//                                 value={optionIndex}
//                                 checked={
//                                     selectedAnswers[currentQuestionIndex] === optionIndex
//                                 }
//                                 onChange={() => onAnswerSelected(optionIndex)}
//                             />
//                             {OptionImage && OptionImage.option_img && (
//                                 <img
//                                     key={OptionImage.question_id}
//                                     src={`data:image/png;base64,${OptionImage.option_img}`}
//                                     alt={`Option ${optionIndex + 1}`}
//                                 />
//                             )}
//                         </li>
//                     )
//                 )}
//                 <div className="flex-right">
//                     <button className="clear-btn" onClick={markForReview}>
//                         Mark for Review & Next
//                     </button>
//                     <button className="clear-btn" onClick={clearResponse}>
//                         Clear Response
//                     </button>
//                     <button
//                         className="previous-btn"
//                         onClick={goToPreviousQuestion}
//                         disabled={currentQuestionIndex === 0}
//                     >
//                         <i className="fa-solid fa-angles-left"></i> Previous
//                     </button>
//                     <button className="save-btn" onClick={handleNextClick}>
//                         Next <i className="fa-solid fa-angles-right"></i>
//                     </button>
//                 </div>
//             </div>
//         )}
// </div>
//             </div>


// <div className="rightsidebar">
//                 <ButtonsFunctionality
//                     onQuestionSelect={handleQuestionSelect}
//                     questionStatus={questionStatus}
//                     setQuestionStatus={setQuestionStatus}
//                     answeredCount={answeredCount}
//                     notAnsweredCount={notAnsweredCount}
//                     answeredmarkedForReviewCount={answeredmarkedForReviewCount}
//                     markedForReviewCount={markedForReviewCount}
//                     VisitedCount={VisitedCount}
//                     selectedSubject={selectedSubject}
//                     questionData={questionData}
//                 />
//                 <button onClick={handleSubmit} id="resume_btn">
//                     Submit
//                 </button>
//             </div>

//         </div>
     
       
      
      

//     </div>
//       )}
            



//         </div>
//     )
// }

// export default QuestionsFunctionality




import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ButtonsFunctionality from "./ButtonsFunctionality";
const QuestionsFunctionality = () => {
  const [data, setData] = useState(null);
  const { subjectId, testCreationTableId } = useParams();
  const [Subjects, setSubjects] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sections, setSections] = useState([]);
  const [currentSectionName, setCurrentSectionName] = useState("");
  // const [currentSection, setCurrentSection] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questionStatus, setQuestionStatus] = useState(
    Array.isArray(data) ? Array(data.questions.length).fill("notAnswered") : []
  );

  // ----------------------------------BUTTON CODE-----------------------------------------------------

  const [answeredCount, setAnsweredCount] = useState(0);
  const [notAnsweredCount, setNotAnsweredCount] = useState(0);
  const [answeredmarkedForReviewCount, setAnsweredmarkedForReviewCount] =
    useState(0);
  const [markedForReviewCount, setMarkedForReviewCount] = useState(0);
  const [VisitedCount, setVisitedCount] = useState(0);

  const navigate = useNavigate();
  const [activeQuestion, setActiveQuestion] = useState(0);

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

  // const { subjectId, testCreationTableId } = useParams();
  // const [Subjects, setSubjects] = useState([]);
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Function to set data in local storage
  const setLocalStorageData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Function to get data from local storage
  const getLocalStorageData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  // const [selectedAnswersMap, setSelectedAnswersMap] = useState({});
  const [markedQuestions, setMarkedQuestions] = useState([]);

  const initialSelectedOption = localStorage.getItem("selectedAnswers") || [];

  // const [selectedAnswers, setSelectedAnswers] = useState(initialSelectedOption);

  // ----------------------------------BUTTON CODE-----------------------------------------------------

  //working code
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all subjects
        const responseSubjects = await fetch(
          `http://localhost:3081/subjects/${testCreationTableId}`
        );
        const subjectsData = await responseSubjects.json();
        setSubjects(subjectsData);
        console.log(subjectsData);

        // Find the least subjectId
        const leastSubjectId =
          subjectsData.length > 0
            ? Math.min(...subjectsData.map((subject) => subject.subjectId))
            : null;

        // If subjectId is not provided, set it to the least subjectId
        const defaultSubjectId = subjectId || leastSubjectId;

        // Fetch data for the default subject
        const response = await fetch(
          `http://localhost:3081/getPaperData/${testCreationTableId}/${defaultSubjectId}`
        );
        const result = await response.json();
        setData(result);

        // Initialize selected answers based on the saved answers for the current subject
        const selectedAnswersForSubject =
          selectedAnswersMap[defaultSubjectId] || [];
        setSelectedAnswers(selectedAnswersForSubject);

        // Construct the link with the least subjectId
        const linkUrl = `/subjects/${testCreationTableId}/${
          subjectId || leastSubjectId
        }`;
        // Use linkUrl as needed in your component

        //  ---------------------------------------------------------
        const responseSections = await fetch(
          `http://localhost:3081/fetchSections/${testCreationTableId}/${defaultSubjectId}`
        );
        const sectionsData = await responseSections.json();
        const sortedSections = sectionsData.sort(
          (a, b) => b.noOfQuestions - a.noOfQuestions
        );
        setSections(sortedSections);

        // Track the current section index and current question count
        let currentSectionIndex = 0;
        let currentQuestionCount = 0;
        let currentSectionName = "";

        // Function to update the current section based on the question count
        const updateCurrentSection = () => {
          currentSectionIndex += 1;
          currentQuestionCount = 0;
          currentSectionName =
            sortedSections[currentSectionIndex]?.sectionName || "";
        };

        // Initial display of questions
        const displayQuestions = () => {
          const currentSection = sortedSections[currentSectionIndex];

          if (currentQuestionCount < currentSection.noOfQuestions) {
            // Set the initial section name if not set
            if (!currentSectionName) {
              setCurrentSectionName(currentSection.sectionName);
              console.log(
                `Displaying questions for ${currentSection.sectionName}`
              );
            }

            currentQuestionCount += 1;
          } else {
            updateCurrentSection();
            displayQuestions();
          }
        };

        displayQuestions();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [testCreationTableId, subjectId]);

  //WORKING CODE FOR ALL SECTIONS TO DISPLAY
  // const [sections, setSections] = useState([]);
  // useEffect(() => {
  //   const fetchSections = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3081/fetchSections/${testCreationTableId}`
  //       );
  //       const data = await response.json();
  //       setSections(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchSections();
  // }, [testCreationTableId]);

  // const [sections, setSections] = useState([]);
  // useEffect(() => {
  //   const fetchSections = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3081/fetchSections/${testCreationTableId}/${defaultSubjectId}`
  //       );
  //       const data = await response.json();
  //       setSections(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchSections();
  // }, [testCreationTableId,subjectId]);

  const [selectedAnswersMap, setSelectedAnswersMap] = useState({});
  //working code
  const handleSubjectsClick = async (clickedSubjectId) => {
    setData(null);
    setCurrentQuestionIndex(0); // Reset current question index

    // Check if there are selected answers for the current subject
    const selectedAnswersForSubject =
      selectedAnswersMap[clickedSubjectId] || [];
    setSelectedAnswers(selectedAnswersForSubject);

    try {
      const response = await fetch(
        `http://localhost:3081/getPaperData/${testCreationTableId}/${clickedSubjectId}`
      );
      const subjectsData = await response.json();

      if (subjectsData && subjectsData.questions) {
        setData(subjectsData);
      } else {
        console.error("Invalid data format:", subjectsData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //working code
  const handleNextClick = () => {
    // Update the current question index to move to the next question
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < data.questions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePreviousClick = () => {
    // Update the current question index to move to the previous question
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const clearResponse = () => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestionIndex] = "";
    setSelectedAnswers(updatedSelectedAnswers);
  };

  // ---------------------------------Timer code Start--------------------------------
  const [timer, setTimer] = useState(0);
  // const [timers, setTimers] = useState(new Array(data.length).fill(0));
  const [timers, setTimers] = useState(Array(data));
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 9 ? hours : "0" + hours}:${
      minutes > 9 ? minutes : "0" + minutes
    }:${remainingSeconds > 9 ? remainingSeconds : "0" + remainingSeconds}`;
  };

  //working code
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

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  //working code
  const onAnswerSelected = (optionIndex) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestionIndex] = optionIndex;

    // Update the selected answers map for the current subject
    setSelectedAnswersMap((prevMap) => ({
      ...prevMap,
      [data.subjectId]: updatedSelectedAnswers,
    }));

    setSelectedAnswers(updatedSelectedAnswers);
  };

  return (
    <div>
      <div className="subjects">
        {Subjects.map((subjectTitle) => (
          <li key={subjectTitle.subjectId}>
            <button
              onClick={() => handleSubjectsClick(subjectTitle.subjectId)}
              className="subject-btn"
            >
              {/* {subjectTitle.subjectId[0]} */}
              {subjectTitle.subjectName}
            </button>
          </li>
        ))}
      </div>

      <div className="second-header">
        {/* <div className="single-select-question">
          {sections.map((sectionTitle, index) => (
            <li key={index}>
              <p>{sectionTitle.sectionName}</p>
            </li>
          ))}
        </div> */}

        <div className="right-header">
          <div className="marks">
            Marks: <div className="plus-mark">+1</div>
            <div className="minus-mark">-1</div>
          </div>
          <div>Timer: {formatTime(timer)}</div>
        </div>
      </div>

      {data !== null && data.questions.length > 0 ? (
        <div className="qps_button_sections">
          <div className="question_paper_section">
            <div className="single-select-question">
              <li>
                <p>Current Section: {currentSectionName}</p>
              </li>
            </div>
            <div className="question">
              {/* Render the current question based on currentQuestionIndex */}
              <h3>{currentQuestionIndex + 1}.</h3>
              <img
                src={`data:image/png;base64,${data.questions[currentQuestionIndex].question_img}`}
                alt="Question"
              />
            </div>

            {/* Map over options for the current question and render them */}
            {data.options
              .filter(
                (opt) =>
                  opt.question_id ===
                  data.questions[currentQuestionIndex].question_id
              )
              .map((option, optionIndex) => (
                <div className="option" key={option.option_id}>
                  <li key={optionIndex}>
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}-option`}
                      value={optionIndex}
                      checked={
                        selectedAnswers[currentQuestionIndex] === optionIndex
                      }
                      // onChange={() => onAnswerSelected(subjectIndex, optionIndex)}
                      onChange={() => onAnswerSelected(optionIndex)}
                    />
                    <img
                      src={`data:image/png;base64,${option.option_img}`}
                      alt="Option"
                    />
                  </li>
                </div>
              ))}

            <div>
              <button className="clear-btn" onClick={clearResponse}>
                Clear Response
              </button>
              <button
                className="previous-btn"
                onClick={handlePreviousClick}
                disabled={currentQuestionIndex === 0}
              >
                <i className="fa-solid fa-angles-left"></i> Previous
              </button>
              <button className="save-btn" onClick={handleNextClick}>
                Next <i className="fa-solid fa-angles-right"></i>
              </button>
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
              data={data}
            />
            <button onClick={handleSubmit} id="resume_btn">
              Submit
            </button>
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default QuestionsFunctionality;