// // import React from 'react'
// import React, { useEffect, useRef, useState } from 'react';
// import './Instructions.scss'
// import { useNavigate } from "react-router-dom";

// const Instructions = ({ seconds }) => {

//     const [countdown, setCountdown] = useState(seconds);
//     const timerId = useRef();

//     useEffect(() => {
//         if (countdown <= 0) {
//             clearInterval(timerId.current);
//             alert("End");
//         }
//     }, [countdown]);
//     const navigate = useNavigate();
//     const startCountdown = () => {
//         timerId.current = setInterval(() => {
//             setCountdown((prev) => prev - 1);
//         }, 1000);
//         navigate('/Paper');
//     };



//     return (
//         <div>
//             <div id="ins1Text" className="contentClass">
//                 <div className="insDiv">

//                     <p align="center">
//                         <strong>Please read the following instructions carefully.</strong>
//                     </p>

//                     <p>
//                         <strong>General Instructions:</strong>
//                     </p>

//                     <p>
//                         &nbsp;&nbsp;&nbsp;&nbsp;1. Total time available for this test will be displayed on the next. <br />
//                         &nbsp;&nbsp;&nbsp;&nbsp;2. The clock has been set at the server and the countdown timer at the top right corner of your screen will display the time remaining for you to complete the exam. When the clock runs out the exam ends by default - you are not required to end or submit your. <br />
//                         &nbsp;&nbsp;&nbsp;&nbsp;3. The question palette at the right of screen shows one of the following statuses of each of the questions numbered: <br />
//                     </p>

//                     <p>&nbsp;</p>

//                     <div>&nbsp;</div>

//                     <div>
//                         <div className="grayDiv">1.</div>
//                         <div >You have not visited the question yet.</div>
//                     </div>

//                     <div>&nbsp;</div>
//                     <div>&nbsp;</div>
//                     <div>
//                         <div className="orangeDiv">3</div>
//                         <div >You have not answered the question.</div>
//                     </div>

//                     <div >&nbsp;</div>
//                     <div >&nbsp;</div>
//                     <div >
//                         <div className="greenDiv">5</div>
//                         <div >You have answered the question.</div>
//                     </div>

//                     <div >&nbsp;</div>
//                     <div >&nbsp;</div>
//                     <div >
//                         <div className="purpleDiv">7</div>
//                         <div >You have NOT answered the question but have marked the question for review.</div>
//                     </div>

//                     <div>&nbsp;</div>
//                     <div >&nbsp;</div>
//                     <div >
//                         <div className="purpleTickDiv">9</div>
//                         <div>You have answered the question but marked it for review.</div>
//                     </div>

//                     <div >&nbsp;</div>
//                     <p>&nbsp;</p>
//                     <p>The Marked for Review status simply acts as a reminder that you have set to look at the question again. If an answer is selected for a question that is Marked for Review, the answer will be considered in the final evaluation.</p>

//                     <p ><strong>Navigating to a question:</strong></p>

//                     <p>&nbsp;&nbsp;&nbsp;&nbsp;4. To select a question to answer, you can do one of the following: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. Click on the question number on the question palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. Click on Save and Next to save answer to current question and to go to the next question in sequence. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. Click on Mark for Review and Next to save answer to current question, mark it for review, and to go to the next question in sequence.</p>

//                     <p>&nbsp;&nbsp;&nbsp;&nbsp;5. You can view the entire paper by clicking on the <strong>Question Paper</strong> button.</p>

//                     <p ><strong>Answering questions:</strong></p>

//                     <p>&nbsp;&nbsp;&nbsp;&nbsp;6. For multiple choice type question :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. To select your answer, click on one of the option buttons &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. To change your answer, click the another desired option button &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. To save your answer, you MUST click on <strong>Save &amp; Next</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d. To deselect a chosen answer, click on the chosen option again or click on the <strong>Clear Response</strong> button. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e. To mark a question for review click on Mark for Review &amp; Next. If an answer is selected for a question that is Marked for Review, the answer will be considered in the final evaluation.</p>

//                     <p>&nbsp;&nbsp;&nbsp;&nbsp;7. To change an answer to a question, first select the question and then click on the new answer option followed by a click on the <strong>Save &amp; Next</strong> button.</p>

//                     <p>&nbsp;&nbsp;&nbsp;&nbsp;8. Questions that are saved or marked for review after answering will ONLY be considered for evaluation.</p>

//                     <p><strong>Navigating through sections:</strong></p>

//                     <p>&nbsp;&nbsp;&nbsp;&nbsp;9. Sections in this question paper are displayed on the top bar of the screen. Questions in a section can be viewed by clicking on the section name. The section you are currently viewing is highlighted.</p>

//                     <p>&nbsp;&nbsp;&nbsp;&nbsp;10. After clicking the Save &amp; Next button on the last question for a section, you will automatically be taken to the first question of the next section.</p>

//                     <p>&nbsp;&nbsp;&nbsp;&nbsp;11. You can move the mouse cursor over the section names to view the status of the questions for that section.</p>

//                     <p>&nbsp;&nbsp;&nbsp;&nbsp;12. You can shuffle between sections and questions anytime during the examination as per your convenience.</p>
//                 </div>
//                 <div className='test-btn'>
//                     <button onClick={startCountdown} className='play-btn'>
//                         Next<span class="material-symbols-outlined">
//                             double_arrow
//                         </span>
//                     </button>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default Instructions











import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai"
import { Link,useParams } from "react-router-dom";
import './Instructions.scss'
// =============================== nav-data ===============================
import { Navbar, Intro_content } from "../../Data/Introduction_page_DATA";

// =============================== css ===============================
// import "./styles/introducationpage.css";
const Introduction_page = () => {
    return (
        <div>
            <Header />
            <Intro_container />
        </div>
    );
};

export default Introduction_page;

export const Header = () => {

    
    return (
        <>
            {Navbar.map((nav, index) => {
                return (
                    <div className="Quiz_header" key={index}>
                        <div className="Q_logo">
                            <img src={nav.Q_logo} alt="" />
                        </div>
                        <div className="Q_title">
                            <h1>{nav.Q_page_title}</h1>
                        </div>
                    </div>
                );
            })}
        </>
    );
};
export const Intro_container = () => {
    const { testCreationTableId } = useParams();
    return (
        <>
            {Intro_content.map((Intro_content, index) => {
                return (

                    <div key={index} className="Q_container">
                        <h2>{Intro_content.Intro_content_text_center}</h2>
                        <h3>{Intro_content.Intro_content_text_subheading_1}</h3>
                        <ol>
                            <li>{Intro_content.Intro_content_points_1}</li>
                            <li>{Intro_content.Intro_content_points_2}</li>
                            <li>{Intro_content.Intro_content_points_3}</li>
                            <div className="img_container">
                                <p>

                                    <div className=" intro_img intro_img1">1</div>{" "}
                                    {Intro_content.Intro_content_points_p1}
                                </p>
                                <p>

                                    <div className=" intro_img intro_img2">3</div>
                                    {Intro_content.Intro_content_points_p2}
                                </p>
                                <p>

                                    <div className="  intro_img intro_img3">5</div>
                                    {Intro_content.Intro_content_points_p3}
                                </p>
                                <p>

                                    <div className=" intro_img intro_img4">7</div>
                                    {Intro_content.Intro_content_points_p4}
                                </p>
                                <p>

                                    <div className=" intro_img intro_img5">9</div>
                                    {Intro_content.Intro_content_points_p5}
                                </p>
                            </div>
                            <p>{Intro_content.Intro_content_points_p}</p>
                            <h3>{Intro_content.Intro_content_text_subheading_2}</h3>
                            <li>
                                {Intro_content.Intro_content_points_4}

                                <ol>
                                    <li>{Intro_content.Intro_content_points_4_a}</li>
                                    <li>{Intro_content.Intro_content_points_4_b}</li>
                                    <li>{Intro_content.Intro_content_points_4_c}</li>
                                </ol>
                            </li>

                            <li>
                                {Intro_content.Intro_content_points_5}{" "}
                                <span> {Intro_content.span_1}</span>
                                {Intro_content.Intro_content_points_5__}
                            </li>
                            <h3>{Intro_content.Intro_content_text_subheading_3}</h3>
                            <li>
                                {Intro_content.Intro_content_points_6}
                                <ol>
                                    <li>{Intro_content.Intro_content_points_6_a}</li>
                                    <li>{Intro_content.Intro_content_points_6_b}</li>
                                    <li>
                                        {Intro_content.Intro_content_points_6_c}
                                        <span> {Intro_content.span_2}</span>
                                    </li>
                                    <li>
                                        {Intro_content.Intro_content_points_6_d}
                                        <span> {Intro_content.span_3}</span>{" "}
                                        {Intro_content.Intro_content_points_6_d__}
                                    </li>
                                    <li>{Intro_content.Intro_content_points_6_e}</li>
                                </ol>
                            </li>
                            <li>
                                {Intro_content.Intro_content_points_7}
                                <span> {Intro_content.span_4}</span>{" "}
                                {Intro_content.Intro_content_points_7__}
                            </li>
                            <li>{Intro_content.Intro_content_points_8}</li>
                            <h3>{Intro_content.Intro_content_text_subheading_4}</h3>
                            <li>{Intro_content.Intro_content_points_9}</li>
                            <li>{Intro_content.Intro_content_points_10}</li>
                            <li>{Intro_content.Intro_content_points_11}</li>
                            <li>{Intro_content.Intro_content_points_12}</li>
                        </ol>
                    </div>
                );
            })}
            <div className="intro_next_btn_container">
                <Link to={`/General_intructions_page/${testCreationTableId}`}className="intro_next_btn">NEXT <AiOutlineArrowRight /></Link>
            </div>
        </>
    );
};
