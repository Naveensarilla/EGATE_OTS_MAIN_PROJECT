import React, { useEffect, useState } from "react";
import Header from "./Header";
import Leftnav from "./Leftnav";
import Dashboard from "./Dashboard";
import Examcreation from "./Examcreation";

export const Ots_home = () => {
  const [selectedComponent, setSelectedComponent] = useState(
    localStorage.getItem("selectedComponent") || null
  );

  useEffect(() => {
    // Save selectedComponent to localStorage when it changes
    localStorage.setItem("selectedComponent", selectedComponent);
  }, [selectedComponent]);

  const components = {
    Exam_creation: <Dashboard/>,
    Coures_creation: <Examcreation />,
    // Test_Creation: <Test_Creation />,
    // Add more components as needed
  };

  const handleButtonClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="appp">
      <div className="common_grid_app">
        <div className="link_section_forBTns">
          <div className="egate_Admin_logo">
            <img
              src="https://www.egradtutor.in/static/media/egradtutor_logo.8618a543e8680bdda92e.png"
              alt=""
            />
          </div>
          <button onClick={() => handleButtonClick("Exam_creation")}>
            Exam Creation
          </button>
          <button onClick={() => handleButtonClick("Coures_creation")}>
            Coures Creation
          </button>
          <button onClick={() => handleButtonClick("Test_Creation")}>
            Test Creation
          </button>
          <div className="nav_desdhfjdhsf"></div>
          <div className="nav_desdhfjdhsfh"></div>
        </div>
      </div>

      <div>{selectedComponent && components[selectedComponent]}</div>
    </div>
  );
};
