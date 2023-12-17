import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Topics css/Topics.css";

import { PracticeQuestions } from "./PracticeQuestions/PracticeQuestions";
import { TopicTest } from "./TopicTest/TopicTest";
import { Doutes } from "./Doutes/Doutes";
import { ConceptVideos } from "./ConceptVideos/ConceptVideos";
// import Ug_Coures from "../Ug_Coures";

export const Topics_List = () => {
  const [selectedLinkComponents, setLinkComponents] = useState(
    localStorage.getItem("selectedLinkComponents") || null
  );

  useState(() => {
    localStorage.setItem("selectedLinkComponents", selectedLinkComponents);
  }, [selectedLinkComponents]);

  const LinkComponents = {
    ConceptVideos: <ConceptVideos />,
    PracticeQuestions: <PracticeQuestions />,
    TopicTest: <TopicTest />,
    Doutes: <Doutes />,
    // Ug_Coures : <Ug_Coures />,
  };

  const handleButton = (LinkComponents) => {
    setLinkComponents(LinkComponents);
  };

  return (
    <div>
      <div className="Topics_List_-container">
        <div className="Topics_List_-LinkBtns">
          <div className="Topics_List_-dropdown">
            <button onClick={() => handleButton("ConceptVideos")}>
              Concept Videos
            </button>

            <button onClick={() => handleButton("PracticeQuestions")}>
              Practice Questions
            </button>

            <button onClick={() => handleButton("TopicTest")}>
              Topic Test
            </button>

            <button onClick={() => handleButton("Doutes")}>doubts</button>
          </div>
        </div>

        <div>
          {selectedLinkComponents && LinkComponents[selectedLinkComponents]}
        </div>
      </div>
      <div></div>
    </div>
  );
};
