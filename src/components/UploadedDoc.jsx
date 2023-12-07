import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UploadedDoc = () => {
  const [data, setData] = useState([]);
const [documentData,setDocumentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3081/documentName");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (document_Id) => {
    // Display a confirmation dialog before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:3081/DocumentDelete/${document_Id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result.message);
        const updatedDocumentData = documentData.filter(
          (item) => item.document_Id !== document_Id
        );
        console.log("Before:", documentData);
        console.log("After:", updatedDocumentData);
        setDocumentData(updatedDocumentData);
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    } else {
      // The user canceled the deletion
      console.log("Deletion canceled.");
    }
  };
  return (
    <div className="documentInfo_container">
      <h2 style={{ textTransform: "uppercase" }}>uploaded documents</h2>
      <div className="documentInfo_contant">
        {data.map((item) => (
          <ul key={item.document_Id} style={{ display: "flex" }} className={item.document_Id % 2 === 0 ? "evenRow" : "oddRow"}>
            <li className="documentInfo">
              <div style={{ display: "flex", gap: "1rem", padding: "10px" }}>
                <p style={{ width: "110px" }}> Doc ID: {item.document_Id}</p>
                <p style={{ width: "500px" }}> Name: {item.documen_name}</p>
                <p style={{ width: "170px" }}>
               Test:- {item.TestName}
                </p>
                <p style={{ width: "140px" }}>Subject:- {item.subjectName}</p>
              </div>
            </li>
            <Link to={`/getSubjectData/${item.subjectId}/${item.testCreationTableId}`}>Open Document</Link>
            <button  className="coursedelte_btn"   onClick={() => handleDelete(item.document_Id)}><i className="fa-regular fa-trash-can"></i></button>
          </ul>
        ))}
      </div>
    </div>
  );
};
