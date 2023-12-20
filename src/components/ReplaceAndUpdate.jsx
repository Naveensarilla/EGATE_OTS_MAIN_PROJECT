import React, { useState, useEffect } from 'react';

const ReplaceAndUpdate = () => {
  const [exams, setExams] = useState([]);
  const [course,setCourse] = useState([]);
  const [test,setTest] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
const [selectedCourse,setSelectedCourse] = useState(" ");
const [selectedTest,setSelectedTest] = useState(" ");
const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  useEffect(() => {
    fetchExams();
  }, []); 

  const fetchExams = async () => {
    try {
      const response = await fetch('http://localhost:3081/examRAU');
      const data = await response.json();
      setExams(data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const handleExamChange =async (event) => {
    const examId = event.target.value;
    setSelectedExam(examId);
    try{
      const response =await fetch(
        `http://localhost:3081/CourseRAU/${examId}`
      );
      const data = await response.json();
      setCourse(data);
    }
    catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  const handleCourseChange = async(event) => {
    const selectedCourse =event.target.value;
    setSelectedCourse(selectedCourse);
    try{
      const response =await fetch(
        `http://localhost:3081/TestRAU/${selectedCourse}`
      );
      const data = await response.json();
      setTest(data);
    }
    catch (error) {
      console.error("Error fetching Test data:", error);
    }
  }

  const handleTestChange= async(event) => {
    const selectedTest=event.target.value;
    setSelectedTest(selectedTest);
    try {
      const response = await fetch(
        `http://localhost:3081/subjectRAU/${selectedTest}`
      );

      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects data:", error);
    }
  }
  const handleSubjectChange = async (event) => {
    const selectedSubject = event.target.value;
    setSelectedSubject(selectedSubject);
 
    // Fetch sections data based on the selected subject
    try {
      const response = await fetch(`http://localhost:3081/sectionRAU/${selectedSubject}/${selectedTest}`);
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.error('Error fetching sections data:', error);
    }
  };
  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  return (
    <div className="otsMainPages">
      <h2>Replace and Update</h2>
      <div>
      <label htmlFor="examSelect">Select an Exam:</label>
      <select id="examSelect" onChange={handleExamChange} value={selectedExam}>
        <option value="" disabled>Select an exam</option>
        {exams.map((exam) => (
          <option key={exam.examId} value={exam.examId}>{exam.examName}</option>
        ))}
      </select>
      </div>
      <br/>
      <div>
        <label html="courseSelect">Select Course</label>
        <select id="courseSelect" onChange={handleCourseChange} value={selectedCourse}>
        <option value="">Select a Course</option>
        {course.map((course)=>(
          <option key={course.courseCreationId } value={course.	courseCreationId }>{course.courseName}</option>
          ))}
        </select>
      </div>
      <br/>
      <div>
        <label html="testSelect">Select test</label>
        <select id="testSelect" onChange={handleTestChange} value={selectedTest}>
        <option value="">Select a Test</option>
        {test.map((test)=>(
          <option key={test.testCreationTableId  } value={test.	testCreationTableId  }>{test.TestName}</option>
          ))}
        </select>
      </div>
      <br/>
      <div className="uploadedDocumentFilds">
            <label htmlFor="subjectSelect">Select Subject:</label>
            <select
              id="subjectSelect"
              onChange={handleSubjectChange}
              value={selectedSubject}
            >
              <option value="">Select a Subject</option>
              {subjects.map((subject) => (
                <option key={subject.subjectId} value={subject.subjectId}>
                  {subject.subjectName}
                </option>
              ))}
            </select>
          </div>
          <br/>
          <div className="uploadedDocumentFilds">
            <label htmlFor="sectionsSelect">Select Sections:</label>
            <select
              id="sectionsSelect"
              onChange={handleSectionChange}
              value={selectedSection}
            >
              <option value="">Select a Section</option>
              {sections.map((section) => (
                <option key={section.sectionId} value={section.sectionId}>
                  {section.sectionName}
                </option>
              ))}
            </select>
          </div>
    </div>
  );
};

export default ReplaceAndUpdate;