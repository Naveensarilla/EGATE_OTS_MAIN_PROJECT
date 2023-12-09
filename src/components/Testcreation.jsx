import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./css/Testcreation.css";

const Testcreation = () => {
  const [testName, setTestName] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");
  const [totalQuestions, setTotalQuestions] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [calculator, setCalculator] = useState("no");
  const [status, setStatus] = useState("inactive");
  const [typeOfTests, setTypeOfTests] = useState([]);
  const [selectedtypeOfTest, setSelectedtypeOfTest] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState("");
  const [numberOfSections, setNumberOfSections] = useState(1);
  const [QuestionLimitChecked, setQuestionLimitChecked] = useState(false);
  const [sectionsData, setSectionsData] = useState([
    {
      selectedSubjects: "",
      sectionName: "",
      noOfQuestions: "",
      QuestionLimit: "",
    },
  ]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [testData, setTestData] = useState([]);
  const [selectedInstruction, setSelectedInstruction] = useState("");
  const [instructionsData, setInstructionsData] = useState([]);

  useEffect(() => {
    const fetchInstructions = async () => {
      try {
        const response = await fetch("http://localhost:3081/instructions");
        const data = await response.json();
        setInstructionsData(data);
      } catch (error) {
        console.error("Error fetching instructions:", error);
      }
    };

    fetchInstructions();
  }, []);

  useEffect(() => {
    fetch("http://localhost:3081/testcourses")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetch(`http://localhost:3081/course-typeoftests/${selectedCourse}`)
        .then((response) => response.json())
        .then((data) => setTypeOfTests(data))
        .catch((error) =>
          console.error("Error fetching course_typeoftests:", error)
        );
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedCourse) {
      fetch(`http://localhost:3081/course-subjects/${selectedCourse}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched subjects:", data);
          setSubjects(data);
        })
        .catch((error) =>
          console.error("Error fetching course-subjects:", error)
        );
    }
  }, [selectedCourse]);

  const handleOpenForm = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  const handleSelectChange = (e) => {
    setSelectedCourse(e.target.value);
  };
  const handleSelectTypeOfTest = (e) => {
    setSelectedtypeOfTest(e.target.value);
  };

  const handleSelectSubjects = (e) => {
    setSelectedSubjects(e.target.value);
  };
  const handleInputChange = (e) => {
    setTestName(e.target.value);
  };
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleTotalQuestionsChange = (e) => {
    setTotalQuestions(e.target.value);
  };

  const handleTotalMarksChange = (e) => {
    setTotalMarks(e.target.value);
  };
  const handleInstructionChange = (e) => {
    setSelectedInstruction(e.target.value);
  };
  const handleCalculatorChange = (e) => {
    setCalculator(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleQuestionLimitChange = (e) => {
    setQuestionLimitChecked(e.target.checked);
  };

  const handleSectionChange = (e, index, field) => {
    // Create a copy of the sectionsData array
    const updatedSectionsData = [...sectionsData];

    // Ensure that the array at the given index is initialized
    if (!updatedSectionsData[index]) {
      updatedSectionsData[index] = {};
    }

    // Update the specified field in the copied array
    updatedSectionsData[index][field] = e.target.value;

    // Set the updated array to the state
    setSectionsData(updatedSectionsData);
  };

  const addSection = () => {
    setNumberOfSections((prevSections) => prevSections + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log the sectionsData before making the request
      console.log("Sections Data Before Request:", sectionsData);

      // Assuming you have the testCreationTableId from the test creation
      // const testCreationTableId = getTestCreationTableId();

      // Make a request to create test and sections
      const response = await fetch("http://localhost:3081/create-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testName,
          selectedCourse,
          selectedtypeOfTest,
          startDate,
          startTime,
          endDate,
          endTime,
          duration,
          totalQuestions,
          totalMarks,
          calculator,
          status,
          sectionsData,
          selectedInstruction,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const feachTestData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3081/test_creation_table"
        );
        const data = await response.json(); // Convert the response to JSON
        setTestData(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    feachTestData();
  }, []);

  function formatTime(dateTimeString) {
    const formattedTime = moment(dateTimeString, "HH:mm:ss.SSSSSS").format(
      "HH:mm"
    );
    return formattedTime !== "Invalid date" ? formattedTime : "Invalid Time";
  }

  // function formatDate(dateString) {
  //   const date = new Date(dateString);
  //   const day = date.getDate().toString().padStart(2, "0");
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // }
  const handleDelete = async (testCreationTableId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:3081/test_table_data_delete/${testCreationTableId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result.message);
        const updatedtestData = testData.filter(
          (test) => test.testCreationTableId !== testCreationTableId
        );
        console.log("Before:", testData);
        console.log("After:", updatedtestData);
        setTestData(updatedtestData);
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    } else {
      // The user canceled the deletion
      console.log("Deletion canceled.");
    }
  };

  return (
    <div style={{width:'100%'}} className="otsMainPages">
    
      <div className="TestCreation_-container">
      <div style={{background:'#1a374d',color:'#fff',padding:'10px'}}><h2>Test Creation</h2></div>
<br />
      {!isFormVisible && (
       <div className="">
         <button className="instructionBTN" type="button" onClick={handleOpenForm}>
          Add Test
        </button>
       </div>

      )}
      {isFormVisible && (
        
        <form onSubmit={handleSubmit}>
            
          <div className="testCreation_-contant ">
           <div>
           <button type="button" onClick={handleCloseForm}>
              Close Form
            </button>
           </div>

            <div className="testCreation_-contant_-flexCOntant examSubjects_-contant">
              <div className="testCreation_-list">
                <label>Test Name:</label>
                <input
                  type="text"
                  value={testName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="testCreation_-list">
                <label>Status:</label>
                <select value={status} onChange={handleStatusChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="testCreation_-contant_-flexCOntant  examSubjects_-contant">
              <div className="testCreation_-list">
                <label>Select Course:</label>
                <select value={selectedCourse} onChange={handleSelectChange}>
                  <option value="" disabled>
                    Select a course
                  </option>
                  {courses.map((course) => (
                    <option
                      key={course.courseCreationId}
                      value={course.courseCreationId}
                    >
                      {course.courseName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="testCreation_-list">
                <label>Type of Tests:</label>
                <select
                  value={selectedtypeOfTest}
                  onChange={handleSelectTypeOfTest}
                >
                  <option value="" disabled>
                    Select a type of test
                  </option>
                  {typeOfTests.map((typeOfTest) => (
                    <option
                      key={typeOfTest.TypeOfTestId}
                      value={typeOfTest.TypeOfTestId}
                    >
                      {typeOfTest.TypeOfTestName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="testCreation_-contant_-flexCOntant  examSubjects_-contant ">
              <div className="testCreation_-list">
                <label>Test Start Date:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </div>
              <div className="testCreation_-list">
                <label>Start Time:</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={handleStartTimeChange}
                />
              </div>
            </div>

            <div className="testCreation_-contant_-flexCOntant  examSubjects_-contant">
              <div className="testCreation_-list">
                <label>Test End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>
              <div className="testCreation_-list">
                <label>End Time:</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={handleEndTimeChange}
                />
              </div>
            </div>

            <div className="testCreation_-contant_-flexCOntant  examSubjects_-contant">
              <div className="testCreation_-list">
                <label>Instructions:</label>
                <select
                  value={selectedInstruction}
                  onChange={handleInstructionChange}
                >
                  <option value="" disabled>
                    Select an instruction
                  </option>
                  {instructionsData.map((instruction) => (
                    <option
                      key={instruction.instructionId}
                      value={instruction.instructionId}
                    >
                      {instruction.instructionHeading}
                    </option>
                  ))}
                </select>
              </div>
              <div className="testCreation_-list">
                <label>Calculator:</label>
                <select value={calculator} onChange={handleCalculatorChange}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
            <div className="testCreation_-contant_-flexCOntant  examSubjects_-contant">
              <div className="testCreation_-list">
                <label>Duration (in minutes):</label>
                <input
                  type="number"
                  value={duration}
                  onChange={handleDurationChange}
                  min="1"
                />
              </div>
              <div className="testCreation_-list">
                <label>Total Questions:</label>
                <input
                  type="number"
                  value={totalQuestions}
                  onChange={handleTotalQuestionsChange}
                  min="1"
                />
              </div>
            </div>

            <div className="testCreation_-contant_-flexCOntant  examSubjects_-contant">
              <div className="testCreation_-list">
                <label>Total Marks:</label>
                <input
                  type="number"
                  value={totalMarks}
                  onChange={handleTotalMarksChange}
                  min="1"
                />
              </div>
              <div className="testCreation_-list">
                <label>SECTION</label>
                <label>Question Limit:</label>
                <input
                  className="inputLable"
                  type="checkbox"
                  checked={QuestionLimitChecked}
                  onChange={handleQuestionLimitChange}
                />
              </div>
            </div>

            <div className="testCreation_-contant_-flexCOntant  examSubjects_-contant">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Subjects:</th>
                    <th>Section</th>
                    <th>No of Question</th>
                    {QuestionLimitChecked && <th>Question Limit</th>}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: numberOfSections }, (_, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div>
                          <select
                            value={sectionsData[index]?.selectedSubjects || ""}
                            onChange={(e) =>
                              handleSectionChange(e, index, "selectedSubjects")
                            }
                          >
                            <option value="" disabled>
                              Select a Subject
                            </option>
                            {subjects.map((Subject) => (
                              <option
                                key={Subject.subjectId}
                                value={Subject.subjectId}
                              >
                                {Subject.subjectName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td>
                        <input
                          type="text"
                          value={sectionsData[index]?.sectionName || ""}
                          onChange={(e) =>
                            handleSectionChange(e, index, "sectionName")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={sectionsData[index]?.noOfQuestions || ""}
                          onChange={(e) =>
                            handleSectionChange(e, index, "noOfQuestions")
                          }
                        />
                      </td>
                      {QuestionLimitChecked && (
                        <td>
                          <input
                            type="number"
                            value={sectionsData[index]?.QuestionLimit || ""}
                            onChange={(e) =>
                              handleSectionChange(e, index, "QuestionLimit")
                            }
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <button className="instructionBTN" type="button" onClick={addSection}>
                +
              </button>
            </div>


     
          <div>
          <button className="instructionBTN" type="submit">Submit</button>
          </div>
          </div>
        </form>
      )}

    </div>
    
    <h2 className="otsTitels" style={{padding:'0'}}>Created test Details</h2>
    <div className="testCreation_-GettingDAta_-container"> 
   
        <table className="testCreation_-GettingDAta">
          
          <thead style={{background:'#1a374d', color:'white'}}>
            <tr>
              <th>Serial no</th>
              <th>Test Name</th>
              <th>Selected Course</th>
              <th>Test Start Date</th>
              <th>Test End Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {testData.map((test, index) => (
              <tr key={test.testCreationTableId} className={test.testCreationTableId % 2 === 0 ? "color1" : 'color2'}>
                <td>{index + 1}</td>
                <td>{test.TestName}</td>
                <td>{test.courseName}</td>
                <td>{test.testStartDate}</td>
                <td>{test.testEndDate}</td>
                <td>{formatTime(test.testStartTime)}</td>
                <td>{formatTime(test.testEndTime)}</td>
                <td>{test.status}</td>
                <td>
                  <div>
                    <Link to={`/testupdate/${test.testCreationTableId}`}>
                      {" "}
                      <button className="courseupdate_btn">
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                    </Link>
                    <button
                      className="coursedelte_btn"
                      onClick={() => handleDelete(test.testCreationTableId)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Testcreation;
