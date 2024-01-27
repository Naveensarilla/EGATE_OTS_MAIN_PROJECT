import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Exampg = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  useEffect(() => {
    // Fetch courses from the server
    axios.get('http://localhost:3081/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (selectedCourse !== null) {
      // Fetch subjects and departments based on the selected course
      Promise.all([
        axios.get(`http://localhost:3081/sub/${selectedCourse}`),
        axios.get(`http://localhost:3081/departments/${selectedCourse}`)
      ])
      .then(([subjectsResponse, departmentsResponse]) => {
        console.log("Subjects Response:", subjectsResponse.data);
        setSubjects(subjectsResponse.data);
  
        console.log("Departments Response:", departmentsResponse.data);
        setDepartments(departmentsResponse.data);
      })
      .catch(error => {
        console.error("Error fetching subjects or departments:", error);
      });
    }
  }, [selectedCourse]);
  
  

  const handleRadioChange = (event) => {
    const selectedCourseValue = event.target.value;
    console.log("Selected Course Value:", selectedCourseValue);
    setSelectedCourse(selectedCourseValue);
  };
  const handleSubjectCheckboxChange = (subjectId) => {
    const updatedSelectedSubjects = selectedSubjects.includes(subjectId)
      ? selectedSubjects.filter(id => id !== subjectId)
      : [...selectedSubjects, subjectId];

    setSelectedSubjects(updatedSelectedSubjects);
  };

  const handleDepartmentCheckboxChange = (departmentId) => {
    const updatedSelectedDepartments = selectedDepartments.includes(departmentId)
      ? selectedDepartments.filter(id => id !== departmentId)
      : [...selectedDepartments, departmentId];

    setSelectedDepartments(updatedSelectedDepartments);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the selected course, e.g., send it to the server
    console.log('Selected Course:', selectedCourse);

    // Example: Sending selected course to the server
    axios.post('http://localhost:3081/submit-course', { course: selectedCourse })
      .then(response => {
        console.log('Server response:', response.data);
        // Add any additional logic here based on the server response
      })
      .catch(error => {
        console.error('Server request failed:', error);
      });
  };

  return (
    <div className='otsMainPages'>
      <form onSubmit={handleSubmit}>
        <h2>Select a Course</h2>

        {courses.map(course => (
          <div key={course.course_id}>
            <label>
            <input
  type="radio"
  name="course"
  value={course.course_id}
  checked={selectedCourse === course.course_id}
  onChange={handleRadioChange}
/>
              {course.course_name}
            </label>
          </div>
        ))}

        <button type="submit">Submit</button>

        <h2>Subjects for Selected Course</h2>
        <ul>
          {subjects.map(subject => (
            <li key={subject.subjectId}>
              <label>
                <input
                  type="checkbox"
                  value={subject.subjectId}
                  checked={selectedSubjects.includes(subject.subjectId)}
                  onChange={() => handleSubjectCheckboxChange(subject.subjectId)}
                />
                {subject.subjectName}
              </label>
            </li>
          ))}
        </ul>

        <h2>Departments for Selected Course</h2>
        <ul>
          {departments.map(department => (
            <li key={department.departmentId}>
              <label>
                <input
                  type="checkbox"
                  value={department.departmentId}
                  checked={selectedDepartments.includes(department.departmentId)}
                  onChange={() => handleDepartmentCheckboxChange(department.departmentId)}
                />
                {department.departmentName}
              </label>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default Exampg;
