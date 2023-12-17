import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "./vls.css";

const Ug_Coures = () => {
  const [isIITJeeOpen, setIITJeeOpen] = useState(false);
  const [isNEETOpen, setNEETOpen] = useState(false);
  const [isBITSATOpen, setBITSATOpen] = useState(false);

  const toggleDropdown = (exam) => {
    switch (exam) {
      case "IIT-JEE":
        setIITJeeOpen(!isIITJeeOpen);
        setNEETOpen(false);
        setBITSATOpen(false);
        break;
      case "NEET":
        setNEETOpen(!isNEETOpen);
        setIITJeeOpen(false);
        setBITSATOpen(false);
        break;
      case "BITSAT":
        setBITSATOpen(!isBITSATOpen);
        setIITJeeOpen(false);
        setNEETOpen(false);
        break;
      default:
        setIITJeeOpen(false);
        setNEETOpen(false);
        setBITSATOpen(false);
        break;
    }
  };

  const [selectedLinkComponents, setLinkComponents] = useState(
    localStorage.getItem("selectedLinkComponents") || null
  );

  useState(() => {
    localStorage.setItem("selectedLinkComponents", selectedLinkComponents);
  }, [selectedLinkComponents]);

  const LinkComponents = {
    Math: <Topic />,

    // Ug_Coures : <Ug_Coures />,
  };

  const handleButton = (LinkComponents) => {
    setLinkComponents(LinkComponents);
  };

  return (
    <div className="Ug_Coures_-container">
      <div className="Ug_Coures_-contant">  
        <div className="Ug_Coures_-dropdown">
          <button onClick={() => toggleDropdown("IIT-JEE")}>IIT-JEE</button>
          {isIITJeeOpen && (
            <div className="dropdown-content">
              <li>
                <button style={{background:'#bda9a9', color:'#fff' ,padding:'5px 20px'}} onClick={() => handleButton("Math")}>Math</button>
              </li>
              <li>
                <Link to="/Physics">Physics</Link>
              </li>
              <li>
                <Link to="/Chemistry">Chemistry</Link>
              </li>
            </div>
          )}

          <button onClick={() => toggleDropdown("NEET")}>NEET</button>
          {isNEETOpen && (
            <div className="dropdown-content">
              <li>
                <Link to="/Topic">Biology</Link>
              </li>
              <li>
                <Link to="/Physics">Physics</Link>
              </li>
              <li>
                <Link to="/Chemistry">Chemistry</Link>
              </li>
            </div>
          )}

          <button onClick={() => toggleDropdown("BITSAT")}>BITSAT</button>
          {isBITSATOpen && (
            <div className="dropdown-content">
              <li>
                <Link to="/Math">Math</Link>
              </li>
              <li>
                <Link to="/Physics">Physics</Link>
              </li>
              <li>
                <Link to="/Chemistry">Chemistry</Link>
              </li>
              <li>
                <Link to="/English">English</Link>
              </li>
              <li>
                <Link to="/LogicalReasoning">Logical Reasoning</Link>
              </li>
            </div>
          )}
        </div>
      </div>

      <div className="Ug_Coures_-Coures_-contantt">
        {selectedLinkComponents && LinkComponents[selectedLinkComponents]}
      </div>
    </div>
  );
};

export default Ug_Coures;

export const Topic = () => {
  const topics = [
    "Sets, Relations, and Functions",
    "Complex Numbers",
    "Matrices and Determinants",
    "Permutations and Combinations",
    "Mathematical Induction",
    "Binomial Theorem and Its Simple Applications",
    "Sequences and Series",
    "Limit, Continuity, and Differentiability",
    "Integral Calculus",
    "Differential Equations",
    "Coordinate Geometry",
    "Three Dimensional Geometry",
    "Vector Algebra",
    "Statistics and Probability",
  ];
  return (
    <div>
      <div className="iit-jee_-topicsList">
        {topics.map((topic, index) => (
        //   <li key={index}>{topic}</li>
          <Link className="a_-Links" to='/topicsIn' key={index}>{topic}</Link>
        ))}
      </div>
    </div>
  );
};
