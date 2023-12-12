import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const Asection = () => {
  // ------------------------exam cards fetching code------------------------------------------

  const [examCardName, setExamCardName] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4009/examData`)
      .then((response) => {
        setExamCardName(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // ------------------------exam cards fetching code------------------------------------------
  return (
    <>
      <ul className="card_container_ul">
        {examCardName.map((cardItem) => (
          <li key={cardItem.examId} >
            <div className="card_container_li" >
              <h3>{cardItem.examName}</h3>
              <li>
                {" "}
                Validity: ({cardItem.startDate}) to ({cardItem.endDate})
              </li>
              <li>
                <br />
                <div className="start_now">
                  <Link to={`/feachingcourse/${cardItem.examId}`}>
                    Start Now{" "}
                  </Link>
                </div>
              </li>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

// ------------------------------------------------------------------------- Footer ---------------------------------------------
