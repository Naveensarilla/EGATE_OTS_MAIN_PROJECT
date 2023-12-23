import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Replace_And_Update = () => {
  const { examId } = useParams(); // Corrected variable name
  const [selectedExam, setSelectedExam] = useState(""); // Updated state variable name
  const [exams, setExams] = useState([]); // Updated state variable name
  const [courses, setCourses] = useState([]);
  const [tests, setTests] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTest, setSelectedTest] = useState("");

  useEffect(() => {
    // Fetch the list of exams
    axios.get("http://localhost:3081/examReplace_And_Update").then((res) => {
      setExams(res.data); // Updated state variable name
    });
  }, []);

  const handleExamChange = async (e) => {
    const selectedExamId = e.target.value;
    setSelectedExam(selectedExamId);

    try {
      // Fetch the list of courses for the selected exam
      const res = await fetch(
        `http://localhost:3081/coures_Replace_And_Update/${selectedExamId}`
      );
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses data:", error);
    }
  };

  const handleCourseChange = async (e) => {
    const selectedCourseId = e.target.value;
    setSelectedExam(selectedCourseId);

    try {
      // Fetch the list of tests for the selected course
      const res = await fetch(
        `http://localhost:3081/test_Replace_And_Update/${selectedCourseId}`
      );
      const data = await res.json();
      setTests(data);
    } catch (error) {
      console.error("Error fetching tests data:", error);
    }
  };

  const handleTestChange = async (e) => {
    const selectedTestValue = e.target.value;
    setSelectedTest(selectedTestValue);

    try {
      // Fetch the list of subjects for the selected test
      const res = await fetch(
        `http://localhost:3081/subject_Replace_And_Update/${selectedTestValue}`
      );
      const data = await res.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects data:", error);
    }
  };

  const handleSubjectChange = async (event) => {
    const selectedSubjectValue = event.target.value;
    setSelectedSubject(selectedSubjectValue);
  
    try {
      // Fetch sections data based on the selected subject and test
      const response = await fetch(
        `http://localhost:3081/sections/${selectedSubjectValue}/${selectedTest}`
      );
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.error("Error fetching sections data:", error);
    }
  };
  

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  return (
    <div className="otsMainPages">
      <div>
        <p>Selected Exam: {examId}</p>
      </div>

      <select onChange={handleExamChange}>
        <option>Select Exam</option>
        {exams.map((exam) => (
          <option key={exam.examId} value={exam.examId}>
            {exam.examName}
          </option>
        ))}
      </select>

      <p>Select Course {examId}</p>
      <select onChange={handleCourseChange}>
        <option>Select Course</option>
        {courses.map((course) => (
          <option key={course.courseCreationId} value={course.courseCreationId}>
            {course.courseName}
          </option>
        ))}
      </select>

      <p>Select Test{examId}</p>
      <select onChange={handleTestChange}>
        <option>Select Test</option>
        {tests.map((test) => (
          <option key={test.courseCreationId} value={test.courseCreationId}>
            {test.TestName}
          </option>
        ))}
      </select>

      <p>Select subjects{examId}</p>

      <select id="subjectSelect" onChange={handleSubjectChange}>
        <option value="">Select a Subject</option>
        {subjects.map((subject) => (
          <option key={subject.subjectId} value={subject.subjectId}>
            {subject.subjectName}
          </option>
        ))}
      </select>

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
  );
};
