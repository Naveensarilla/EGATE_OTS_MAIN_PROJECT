import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:3081";

const GettinggInstructions = () => {
  const [points, setPoints] = useState([]);
  const { instructionId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/instructionpoints/${instructionId}`
        );

        if (response.data.success) {
          // Assuming the points are fetched correctly, convert them to strings
          const formattedPoints = response.data.points.map((item) => ({
            ...item,
            points: String(item.points),
          }));

          setPoints(formattedPoints);
          console.log("Response:", response.data);
          console.log("instructionId:", instructionId);
        } else {
          console.error("Error in response:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [instructionId]);

  const handleDeletePoint = async (instructionId, id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3081/deletepoint/${instructionId}/${id}`
      );
      window.location.reload();

      console.log("Delete Point Response:", response.data);
      // Add logic to update your component state or perform other actions after deletion
    } catch (error) {
      console.error("Error deleting point:", error.message);
    }
  };

  return (
    <div className="Instruction_points">
      <h2 className="otsTitels"> Instruction Points</h2>
      {/* {points.map((item, index) => (
        <div>
     
          <ul key={index}>
            <li>{item.points}</li>
            <li>
              <Link
                to={`/InstructionPage/editIns/${item.instructionId}/${item.id}`}
                title="Edit this point"
              >
                <i className="fa-solid fa-pencil"></i>
              </Link>
            </li>
            <li>
              <button
                className="InstructiondelPoint"
                title="delete this point"
                onClick={() => handleDeletePoint(item.instructionId, item.id)}
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </li>
          </ul>
        </div>
      ))} */}
     {/* <p>{item.instructionHeading}</p> */}
      <table>
        <thead className="otsGEt_-contantHead">
          <tr>
            <th>No</th>
            <th>points</th>
      
            <th>Edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {points.map((item, index) => (
            <tr key={index}  className={item.id % 2 === 0 ? "color1" : 'color2'}>
              <td>{item.id}</td>
              <td>{item.points}</td>
              <td>
           
              <div className="Open_Instruction_Points">  <Link 
                  to={`/InstructionPage/editIns/${item.instructionId}/${item.id}`}
                  title="Edit this point"
                >
                  <i className="fa-solid fa-pencil"></i>
                </Link></div>
              </td>
              <td>
                <div><button
                  className="InstructiondelPoint"
                  title="delete this point"
                  onClick={() => handleDeletePoint(item.instructionId, item.id)}
                >
                  <i class="fa-solid fa-trash"></i>
                </button></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GettinggInstructions;

// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";

// const API_BASE_URL = "http://localhost:3081";

// const GettinggInstructions = () => {
//   const [points, setPoints] = useState([]);
//   const [instructionHeading, setInstructionHeading] = useState("");
//   const { instructionId } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/instructionpoints/${instructionId}`
//         );

//         if (response.data.success) {
//           // Assuming the points are fetched correctly, convert them to strings
//           const formattedPoints = response.data.points.map((item) => ({
//             ...item,
//             points: String(item.points),
//           }));

//           setPoints(formattedPoints);

//           // Check if instructionHeading exists in response.data
//           if (response.data.instructionHeading) {
//             setInstructionHeading(response.data.instructionHeading);
//           }

//           console.log("Response:", response.data);
//           console.log("instructionId:", instructionId);
//         } else {
//           console.error("Error in response:", response.data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error.message);
//       }
//     };

//     fetchData();
//   }, [instructionId]);

//   const handleDeletePoint = async (instructionId, id) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:3081/deletepoint/${instructionId}/${id}`
//       );
//       window.location.reload();

//       console.log("Delete Point Response:", response.data);
//       // Add logic to update your component state or perform other actions after deletion
//     } catch (error) {
//       console.error("Error deleting point:", error.message);
//     }
//   };

//   return (
//     <div className="Instruction_points">
//     <p>{points.instructionHeading}</p>
//       {points.map((item, index) => (
//         <div key={index}>
//           <ul>
//             <li>{item.points}</li>
//             <Link
//               to={`/InstructionPage/editIns/${item.instructionId}/${item.id}`}
//               title="Edit this point"
//             >
//               <i className="fa-solid fa-pencil"></i>
//             </Link>
//             <button
//               className="InstructiondelPoint"
//               title="delete this point"
//               onClick={() => handleDeletePoint(item.instructionId, item.id)}
//             >
//               <i className="fa-solid fa-trash"></i>
//             </button>
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GettinggInstructions;
