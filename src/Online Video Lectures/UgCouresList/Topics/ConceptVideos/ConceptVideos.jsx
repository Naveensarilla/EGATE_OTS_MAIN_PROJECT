import React, { useState } from "react";
import video1 from "../Videos/video1.mp4";
import video2 from "../Videos/video1.mp4";
import video3 from "../Videos/video1.mp4";
import { Link } from "react-router-dom";

const VideoModal = ({ onClose, videoSource }) => {
  return (
    <div
      style={{
        zIndex: "99",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: 10,
          cursor: "pointer",
        }}
        onClick={onClose}
      >
        Close
      </button>
      <video width="640" height="360" controls controlsList="nodownload">
        <source src={videoSource} />
      </video>
    </div>
  );
};

export const ConceptVideos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");

  const openModal = (videoSource) => {
    setCurrentVideo(videoSource);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const videoSets = [
    { id: 1, title: "Lecture 1", videoSource: video1 },
    { id: 2, title: "Lecture 2", videoSource: video2 },
    { id: 3, title: "Lecture 3", videoSource: video3 },
    { id: 4, title: "Lecture 4", videoSource: video3 },
    { id: 5, title: "Lecture 5", videoSource: video1 },
    { id: 6, title: "Lecture 6", videoSource: video2 },
    { id: 7, title: "Lecture 7", videoSource: video3 },
    { id: 8, title: "Lecture  8 ", videoSource: video3 },
    { id: 9, title: "Lecture 9", videoSource: video3 },
    { id: 10, title: "Lecture 10", videoSource: video1 },
    { id: 11, title: "Lecture 11", videoSource:'https://drive.google.com/uc?export=view&id=1WFTRKYMWf-IggC6LBMLDPZVaUSGltZov' },
    { id: 12, title: "Lecture 12", videoSource:'https://drive.google.com/uc?export=view&id=1WFTRKYMWf-IggC6LBMLDPZVaUSGltZov' },
    { id: 13, title: "Lecture 13", videoSource: 'https://drive.google.com/uc?export=view&id=142uQ9Ew_mE2Hq-1U1qCyNKcsb85-5m3V' },
    // Add more video sets as needed
  ];
  return (
    <div className="ConceptVideos_-container">
      <h1>Complex Number</h1>
      <div className="iit-jee_-topicsList">
        {videoSets.map((videoSet) => (
          <div className="iit-jee_-List" key={videoSet.id}>
            <div className="T_-topics_-List">
              <h4>Complex Number {videoSet.title}</h4>
              <button
                className="instructionBTN"
                onClick={() => openModal(videoSet.videoSource)}
              >
                View
              </button>
            </div>
            <div className="Practice_-Questions">
              <h4>Practice Questions</h4>
              <Link
                to="/p_Questions"
                style={{ background: "#8bb5d3" }}
                className="instructionBTN"
              >
                Questions
              </Link>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <VideoModal onClose={closeModal} videoSource={currentVideo} />
      )}
    </div>
  );
};
