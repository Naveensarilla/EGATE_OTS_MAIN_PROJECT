import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Leftnav from "./components/Leftnav.jsx";
import Dashbaord from "./components/Dashboard.jsx";
import ExamCreation from "./components/Examcreation.jsx";
import Coursecreation from "./components/Coursecreation.jsx";
import NewExamUpdataion from "./components/NewExamUpdataion.jsx";
import Coureseupdate from "./components/Coureseupdate.jsx";
import InstructionPage from "./components/InstructionPage.jsx";
import { UpdateInstruction } from "./components/UpdateInstruction.jsx";
import Testcreation from "./components/Testcreation.jsx";
import TestUpdate from "./components/TestUpdate.jsx";
import DocumentUpload from "./components/DocumentUpload.jsx";
import GettinggInstructions from "./components/GettinggInstructions .jsx";


import Document_ImageInfo from "./components/Document_ImageInfo.jsx";
function App() {
  return (
    <Router>
      <Header />
      <div className="common_grid_app">
        <Leftnav />
        <Routes>
          <Route path="/" element={<Dashbaord />} />
          <Route path="/exams" element={<ExamCreation />} />
          <Route path="/update/:examId" element={<NewExamUpdataion />} />
          <Route path="Coursecreation" element={<Coursecreation />} />
          <Route
            path="/courseupdate/:courseCreationId"
            element={<Coureseupdate />}
          />
          <Route path="/InstructionPage" element={<InstructionPage />} />
          <Route path="/Testcreation" element={<Testcreation />} />
          <Route
            path="/testUpdate/:testCreationTableId"
            element={<TestUpdate />}
          />
          <Route path="/DocumentUpload" element={<DocumentUpload />} />
          {/* <Route path="/Testcreation" element={<EditInstructions />} /> */}
          <Route
            path="/InstructionPage/editIns/:instructionId/:id"
            element={<UpdateInstruction />}
          />
           <Route
            path="/Instruction/editIns/:instructionId/"
            element={<GettinggInstructions />}
          />

          {/* document list */}
          <Route
            path="/getSubjectData/:subjectId/:testCreationTableId"
            element={<Document_ImageInfo />}
          />
        </Routes>
      </div>

      {/* demo */}

      {/* below code working */}
      {/* <YourComponent /> */}
      {/* <QuestionDetails /> */}
      {/* <DocgetImages /> */}
      {/* <ImageComponent /> */}
    </Router>
  );
}

export default App;
