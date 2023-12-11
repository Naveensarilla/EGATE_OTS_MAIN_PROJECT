import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UploadedDoc = () => {
  const [data, setData] = useState([]);

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

  return (
    <div className="documentInfo_container">
      <div className="otsTitels" style={{ padding: "0" }}>
    
      </div>
      <div className="documentInfo_contant">
        {/* {data.map((item) => (
          <ul
            key={item.document_Id}
            style={{ display: "flex" }}
            className={item.document_Id % 2 === 0 ? "evenRow" : "oddRow"}
          >
            <li className="documentInfo">
              <div style={{ display: "flex", gap: "1rem", padding: "10px" }}>
                <p style={{ width: "110px" }}> Doc ID: {item.document_Id}</p>
                <p style={{ width: "500px" }}> Name: {item.documen_name}</p>
                <p style={{ width: "170px" }}>
                  Test Creation Table ID: {item.testCreationTableId}
                </p>
                <p style={{ width: "140px" }}>subject Id : {item.subjectId}</p>
              </div>
            </li>

            <div className="Open_Instruction_Points">
              {" "}
              <Link
                to={`/getSubjectData/${item.subjectId}/${item.testCreationTableId}`}
              >
                Open Document
              </Link>
            </div>
          </ul>
        ))} */}

        <div>
          <table className="otc_-table">
            <thead className="otsGEt_-contantHead otc_-table_-header">
              <tr>
                <td>Id</td>
                <td>document name</td>
                <td>Open document</td>
              </tr>
            </thead>
            <tbody className="otc_-table_-tBody">
              {data.map((item) => (
                <tr
                  key={item.document_Id}
                
                  className={item.document_Id % 2 === 0 ? "evenRow" : "oddRow"}
                >
                  <td> {item.document_Id}</td>
                  <td>{item.documen_name}</td>
                  <td  >
                    <div className="EditDelete_-btns">
                    <Link className="Ots_-edit "
                      to={`/getSubjectData/${item.subjectId}/${item.testCreationTableId}`}
                    >
                      Open Document
                    </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
