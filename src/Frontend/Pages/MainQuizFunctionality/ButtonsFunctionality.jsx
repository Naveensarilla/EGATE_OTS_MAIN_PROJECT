
import React, { createContext, useContext,useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../RightSidebar/RightSidebar.css";

import PropTypes from "prop-types";

// const buttons = [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
//   23, 24, 25, 26, 27, 28, 29, 30,
// ];



const ButtonsFunctionality = ({
    onQuestionSelect,
    questionStatus,
    seconds,
    setQuestionStatus,
    answeredCount,
    notAnsweredCount,
    answeredmarkedForReviewCount,
    markedForReviewCount,
    VisitedCount,
    selectedSubject,
    questionData, 
    updateButtonStatus,
}) => {



    const sections = [
        // Your section data here (adjust based on your actual data structure)
        { sectionId: 1, sectionName: 'Mathematics', subject: 'Mathematics' },
        { sectionId: 2, sectionName: 'Chemistry', subject: 'Chemistry' },
        { sectionId: 3, sectionName: 'Physics', subject: 'Physics' },
        { sectionId: 4, sectionName: 'Biology', subject: 'Biology' },

    ];


    const renderQuestionButtons = questionData.map((question, index) => {

        let className = "right_bar_Buttons ";
        if (questionStatus && questionStatus[index] === "answered") {
          className += " instruction-btn1";
        } else if (questionStatus && questionStatus[index] === "notAnswered") {
          className += " instruction-btn2";
        } else if (questionStatus && questionStatus[index] === "marked") {
          className += " instruction-btn3";
        } else if (
          questionStatus &&
          questionStatus[index] === "Answered but marked for review"
        ) {
          className += " instruction-btn4";
        } else if (questionStatus && questionStatus[index] === "Visited") {
          className += " instruction-btn6";
        }

        return (

            
            <li key={question}>
                {/* Add your logic for rendering question buttons here */}
                <button onClick={() => handleButtonClick(index + 1)}
                className={className}
                // className="right_bar_Buttons"
                >
                    {index + 1}
                </button>
            </li>
        );
    });


    const renderSectionButtons = () => {
        // Filter sections based on the selected subject
        const filteredSections = sections.filter(
            (section) => section.subject === selectedSubject
        );


        console.log("Filtered Sections:", filteredSections);
        console.log("Question Data:", questionData);
        // Render buttons for filteredSections
        return filteredSections.map((section, index) => (
            <li key={index}>
                <p className="section-btn" onClick={() => handleButtonClick(section.sectionId)}>
                    You are viewing<span className="subject"> {section.sectionName} </span>Section
                    Question Palette
                </p>
            </li>
        ));
    };





    const [activeQuestion, setActiveQuestion] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [isPaused, setIsPaused] = useState(false);


    const handleButtonClick = (questionNumber) => {
        onQuestionSelect(questionNumber);
        setAnsweredQuestions([...answeredQuestions, questionNumber]);
        setIsPaused(false);
    
        const currentStatus = questionStatus[questionNumber - 1];
    
        if (currentStatus === "notVisited") {
            // Mark the question as "not answered" initially when visited for the first time
            const updatedQuestionStatus = [...questionStatus];
            updatedQuestionStatus[questionNumber - 1] = "notAnswered";
            setQuestionStatus(updatedQuestionStatus);
            console.log(`Question ${questionNumber} was not answered.`);
        } else if (currentStatus === "marked") {
            // Mark the question as "Marked for review" by default if not visited
            const updatedQuestionStatus = [...questionStatus];
            updatedQuestionStatus[questionNumber - 1] = "markedForReview";
            setQuestionStatus(updatedQuestionStatus);
            console.log(`Question ${questionNumber} was marked for review.`);
        } else if (currentStatus !== "answered") {
            // Mark the question as "answered" only if it was not answered before
            const updatedQuestionStatus = [...questionStatus];
            updatedQuestionStatus[questionNumber - 1] = "answered";
            setQuestionStatus(updatedQuestionStatus);
            console.log(`Question ${questionNumber} was answered.`);
        }
        // Add any other logic or state updates you need
    };



    ButtonsFunctionality.propTypes = {
        onQuestionSelect: PropTypes.func.isRequired,
        questionStatus: PropTypes.arrayOf(PropTypes.string),
        onResumeTimer: PropTypes.func.isRequired, // Define the prop type for onResumeTimer
        questionData: PropTypes.array.isRequired, 
        setQuestionStatus: PropTypes.func.isRequired,
    };


    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timers, setTimers] = useState(new Array().fill(0));
    const [timer, setTimer] = useState(0);

    useEffect(() => {



        // Set the timer to the saved value for the current question
        setTimer(timers[currentQuestionIndex] || 0);

        let interval;
        // interval = setInterval(() => {
        //     setTimer(prevTimer => prevTimer + 1);
        // }, 1000);

        if (!isPaused) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        }

        // Clear the interval when the component unmounts or when the user moves to the next question
        return () => {
            clearInterval(interval);
        };
    }, [currentQuestionIndex, timers, isPaused]);

    const visted = () => {
        setQuestionStatus(Array(1).fill("Visited"));
    };



    const totalTime = 180 * 60; // 180 minutes in seconds
    const [wtimer, setWTimer] = useState(totalTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setWTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        // Clear the interval and handle time-up logic when timer reaches 0
        if (wtimer <= 0) {
            clearInterval(interval);
            // Handle time-up logic here (e.g., navigate to a different component)
        }

        // Clean up the interval on component unmount or when navigating away
        return () => {
            clearInterval(interval);
        };
    }, [wtimer]);


    const WformatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes
            }:${remainingSeconds > 9 ? remainingSeconds : "0" + remainingSeconds}`;
    };













    return (
        <div className="right-side-bar">
            <div className="rightSidebar-topHeader">
                <p>Name of the person</p>
                <p>Time Left: {WformatTime(wtimer)}</p>
            </div>
            <div className="sidebar-header">
                <p className="header-para">{renderSectionButtons()}</p>
            </div>

            <div className="ques-btn">
                <ul className="btn-ul quesAns-btn ">{renderQuestionButtons}</ul>
            </div>

            {/* <div key={index}>
                <button className='quesAns-btn'>{item}</button>
            </div> */}

            <div className="sidebar-footer">
                <h4 className="sidebar-footer-header">Legend</h4>
                <div className="footer-btns">
                    <div className="inst-btns">
                        <button className="instruction-btn1">{answeredCount}</button>
                        <p>Answerd</p>
                        <br />
                    </div>
                    <br />
                    <div className="inst-btns">
                        <button className="instruction-btn2">{notAnsweredCount}</button>
                        <p>Not Answered</p>
                        <br />
                    </div>
                    <br />
                    <div className="inst-btns">
                        <button className="instruction-btn3">
                            {answeredmarkedForReviewCount}
                        </button>
                        <p>Marked</p>
                        <br />
                    </div>
                    <br />
                    <div className="inst-btns">
                        <button className="instruction-btn4">{markedForReviewCount}</button>
                        <p>Answered but marked for review</p>
                    </div>
                    <br />
                    <div className="inst-btns">
                        <button className="instruction-btn5">{VisitedCount}</button>
                        <p>Not Visited</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ButtonsFunctionality;