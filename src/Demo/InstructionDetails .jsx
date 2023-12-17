// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const InstructionDetails  = () => {
//   const { instructionId } = useParams();
//   const [imageSrc, setImageSrc] = useState(null);

//   useEffect(() => {
//     const fetchImage = async () => {
//       try {
//         const response = await fetch(`http://localhost:3081/getInstructionImage/4`);
        
//         if (!response.ok) {
//           throw new Error("Failed to fetch image");
//         }

//         // Convert the binary image data to a base64 string
//         const imageBlob = await response.blob();
//         const base64Image = await convertBlobToBase64(imageBlob);

//         // Set the base64 image string to the state
//         setImageSrc(`data:image/jpeg;base64,${base64Image}`);
//       } catch (error) {
//         console.error("Error fetching image:", error);
//       }
//     };

//     fetchImage();
//   }, [instructionId]);

//   const convertBlobToBase64 = (blob) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result.split(",")[1]);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   };

//   return (
//     <div>
//       {imageSrc ? (
//         <img src={imageSrc} alt="Instruction" />
//       ) : (
//         <p>Loading image...</p>
//       )}
//     </div>
//   );
// };

// export default InstructionDetails ;


import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const InstructionDetails = () => {
  const { instructionId, id } = useParams();
  const [imageSrc, setImageSrc] = useState(null);
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructionData = async () => {
      try {
        const response = await fetch(`http://localhost:3081/getInstructionData/${instructionId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch instruction data");
        }

        const data = await response.json();
        setImageSrc(`data:image/jpeg;base64,${data.image}`);
        setPoints(data.points);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching instruction data:", error);
        setLoading(false);
      }
    };

    fetchInstructionData();
  }, [instructionId]);

  return (
    <div className="otsMainPages">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <img src={imageSrc} alt="Instruction" />
         
            {points.map((point) => (
               <ul>
              <li key={point.instructionId}>{point.points}</li>
              <Link
              to={`/InstructionPage/editIns/${point.instructionId}/${point.id}`}
              title="Edit this point"
            > dfsd</Link>
          </ul>

            ))}
        </div>
      )}
    </div>
  );
};

export default InstructionDetails;
