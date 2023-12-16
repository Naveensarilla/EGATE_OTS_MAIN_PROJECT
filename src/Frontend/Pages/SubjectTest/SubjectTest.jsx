// import React, { useEffect, useRef, useState } from 'react';
// import './SubjectTest.css'
// import { useNavigate } from 'react-router-dom'
// import HomeHeader from '../../Components/HomeHeader/HomeHeader';

// const SubjectTest = ({ seconds }) => {

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

//     const myComponentStyle1 = {
//         color: 'white'
//     }
//     const myComponentStyle2 = {
//         color: 'white'
//     }
//     return (
//         <div className='home-main-page'>
//             <div>
//                 <HomeHeader />
//             </div>
//             <div className='test-card'>
//                 <div className='test-card-header'>
//                     <div className='test-contents1'><h3 className='jee-test-1'>JEE MAIN 2024 TEST-1</h3><span style={myComponentStyle2} class="material-symbols-outlined">
//                         lock_open
//                     </span></div>
//                     <p className='testCard-second-header'>Available Till: 31 May,2024</p>
//                     <p className='free-title'>FREE</p>
//                 </div>
//                 <div>
//                     <div className='test-contents2'><span style={myComponentStyle1} class="material-symbols-outlined">help</span><p>90 Questions</p></div>

//                     <div className='test-contents2'><span style={myComponentStyle1} class="material-symbols-outlined">
//                         schedule
//                     </span><p>180 Minutes</p></div>

//                     <div className='test-contents2'><span style={myComponentStyle1} class="material-symbols-outlined">
//                         trending_up
//                     </span><p>300 Marks</p></div>

//                     <div className='test-btn'><button onClick={startCountdown} className='play-btn'><span class="material-symbols-outlined">
//                         chevron_right
//                     </span>Start Test</button></div>

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default SubjectTest

import React, { useEffect, useState } from "react";
import "./SubjectTest.css";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import logo from "../../Images/logo.jpg";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import Instructions from "../Instructions/Instructions";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
const SubjectTest = () => {
  //{ seconds }

  const [testCard, setTestCard] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4009/test_paper/201")
      .then((response) => {
        setTestCard(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // const [countdown, setCountdown] = useState(seconds);
  // const timerId = useRef();

  // useEffect(() => {
  //     if (countdown <= 0) {
  //         clearInterval(timerId.current);
  //         alert("End");
  //     }
  // }, [countdown]);
  // const navigate = useNavigate();
  // const startCountdown = () => {
  //     timerId.current = setInterval(() => {
  //         setCountdown((prev) => prev - 1);
  //     }, 1000);
  //     navigate('/Paper');
  // };

  const myComponentStyle1 = {
    // color: 'white'
  };
  const myComponentStyle2 = {
    // color: 'white'
  };
  // const [showAlert1, setShowAlert1] = useState(false);
  // const [showAlert2, setShowAlert2] = useState(false);

  // const openAlert1 = () => {
  //     setShowAlert1(true);
  // };

  // const closeAlert1 = () => {
  //     setShowAlert1(false);
  // };

  // const openAlert2 = () => {
  //     setShowAlert2(true);
  // };

  // const closeAlert2 = () => {
  //     setShowAlert2(false);
  // };

  // const countries = [
  //     { id: "1", name: "INDIA" },
  //     { id: "2", name: "USA" },
  //     { id: "3", name: "GERMANY" },
  //     { id: "4", name: "KOREA" },
  //     { id: "5", name: "AFRICA" },
  // ];

  // const states = [
  //     { id: "1", countryId: "1", name: "Haryana" },
  //     { id: "2", countryId: "1", name: "Delhi" },
  //     { id: "3", countryId: "1", name: "Telangana" },
  //     { id: "4", countryId: "1", name: "Andhra Pradesh" },
  //     { id: "5", countryId: "2", name: "Texas" },
  //     { id: "6", countryId: "2", name: "California" },
  // ];

  // const cities = [
  //     { id: "1", stateId: "1", name: "Faridabad" },
  //     { id: "2", stateId: "1", name: "Palwal" },
  //     { id: "3", stateId: "2", name: "Mandi House" },
  //     { id: "4", stateId: "2", name: "kalka Ji" },
  //     { id: "5", stateId: "3", name: "Hyderabad" },
  //     { id: "6", stateId: "3", name: "Gachibowli" },

  //     { id: "1", stateId: "5", name: "Houston" },
  //     { id: "2", stateId: "5", name: "Austin" },
  //     { id: "3", stateId: "6", name: "Los Angeles" },
  //     { id: "4", stateId: "6", name: "Son Diego" },
  //     { id: "5", stateId: "4", name: "Vijyawada" },
  //     { id: "6", stateId: "4", name: "Thirupati" },
  // ];

  // const [country, setCountry] = useState([]);
  // const [state, setState] = useState([]);
  // const [city, setCity] = useState([]);

  // useEffect(() => {
  //     setCountry(countries);
  // }, []);

  // const handleCountry = (id) => {
  //     const dt = states.filter((x) => x.countryId === id);
  //     setState(dt);
  // };

  // const handleState = (id) => {
  //     const dt = cities.filter((x) => x.stateId === id);
  //     setCity(dt);
  // };

  // const [value, setValue] = useState();

  // var User = null;

  // const [isOpen1, setIsOpen1] = useState(false);
  // const [isOpen2, setIsOpen2] = useState(false);
  return (
    <div className="main_conatiner">
      {/*******************starting code NAVBAR CONTENT ****************/}
      <div>
        <div className="navbar-div">
          <img src={logo} alt="logo" width="250px" />

          <div className="auth-btn">
            <div className="Login_logOUT">
              {/* {!User ? ( */}
              {/* <div >
                                    <div><button onClick={openAlert1}>LOGIN</button>
                                        <button onClick={openAlert2}>SIGNUP</button></div>


                                </div> */}
              {/* // ) : ( */}
              {/* <>
                                    <button onClick={() => setIsOpen1(!isOpen1)}>{User}</button>
                                    {isOpen1 && (
                                        <div>
                                            <div>
                                                <p>Profile</p>
                                                <p>Log Out</p>
                                            </div>
                                        </div>

                                    )}
                                    <div>
                                        <button onClick={() => setIsOpen2(!isOpen2)}>Courses</button>
                                        {isOpen2 && (
                                            <div>
                                                <p>IIT</p>
                                                <p>JEE</p>
                                            </div>
                                        )}
                                    </div>
                                </> */}
              {/* )} */}
            </div>
            {/* <div>
              {
                User = null ?<div><button onClick={openAlert1}>LOGIN</button> 
                  <button onClick={openAlert2}>SIGNUP</button></div>: 
                <>
                  <button onClick={() => setIsOpen1(!isOpen1)}>{User}</button>
                  {isOpen1 && (
                    <div>
                      <p>Profile</p>
                      <p>Log Out</p>
                    </div>
                  )}
                  <div>
                      <button onClick={() => setIsOpen2(!isOpen2)}>Courses</button>
                      {isOpen2 && (
                        <div>
                          <p>Profile</p>
                          <p>Log Out</p>
                        </div>
                      )}
                  </div>
                </>
              }
            </div> */}
            {/* <div><button onClick={openAlert1}>LOGIN</button></div> */}
            {/* <div><button onClick={openAlert2}>SIGNUP</button></div> */}
            {/* {
              dropDown && (
                <div>
                  <button onClick={() => setIsOpen(!isOpen)}>Toggle Dropdown</button>
                  {isOpen && (
                    <div>
                      <p>Profile</p>
                      <p>Log Out</p>
                    </div>
                  )}
                </div>
              )
            } */}
          </div>
        </div>
      </div>
      {/*******************end code NAVBAR CONTENT ****************/}

      {/********************* Show alert 1 start code ****************/}

      {/* {showAlert1 && (
                <div id="divContent1">
                 
                    <div>
                        <div className="login_close_container">
                            <h4>LOGIN</h4>
                            <p>
                                <span
                                    id="close-icon"
                                    class="material-symbols-outlined"
                                    onClick={closeAlert1}
                                >
                                    close
                                </span>
                            </p>
                        </div>
                        <form action="" id="form">
                            <p>
                                <h5>Mobile Number or Email :</h5>
                                <input
                                    type="text"
                                    placeholder="Enter your Mobile Number or Email"
                                />
                            </p>
                            <p>
                                <h5>Password :</h5>
                                <input type="text" placeholder="Enter your Password" />
                            </p>
                            <p>
                                <Link>Forgot Password?</Link>
                            </p>
                        </form>
                        <div>
                            <button>Submit</button>
                            <button onClick={openAlert2}>Don't Have Account? SIGNUP</button>
                        </div>
                    </div>
                </div>
            )} */}

      {/********************* Show alert 1 end code ****************/}

      {/********************* Show alert 2 start code ****************/}
      {/* {showAlert2 && (
                <div id='divContent2'>

                    <div>
                        <div className='login_close_container'><h4>SIGNUP</h4><p><span id='close-icon' class="material-symbols-outlined" onClick={closeAlert2}>
                            close
                        </span></p></div>
                        ***************** form start code ******************
                        <form action="" id='form'>
                            <p>
                                <h5>Name :</h5>
                                <input type="text" placeholder="Enter your Name" />
                            </p>
                            <p>
                                <h5>Email Address :</h5>
                                <input type="text" placeholder="Enter your Email Address" />
                            </p>
                            <p>
                                <PhoneInput
                                    placeholder="Enter phone number"
                                    value={value}
                                    onChange={setValue} />
                            </p>
                            <p>
                                <h5>Password :</h5>
                                <input type="password" placeholder="Enter your password" />
                            </p>
                            <p><select id="ddlCountry" className='form-control select-class' onChange={(e) => handleCountry(e.target.value)}>
                                <option value="0">Select Country</option>
                                {
                                    country &&
                                        country !== undefined ?
                                        country.map((ctr, index) => {
                                            return (
                                                <option key={index} value={ctr.id}>{ctr.name}</option>
                                            )
                                        })
                                        : "No Country"

                                }
                            </select>
                            </p>
                            <br></br>
                            <p><select id="ddlStates" className='form-control select-class' onChange={(e) => handleState(e.target.value)}>
                                <option value="0">Select State</option>
                                {
                                    state &&
                                        state !== undefined ?
                                        state.map((ctr, index) => {
                                            return (
                                                <option key={index} value={ctr.id}>{ctr.name}</option>
                                            )
                                        })
                                        : "No State"

                                }
                            </select>
                            </p>
                            <br></br>
                            <p><select id="ddlCity" className='form-control select-class'>
                                <option value="0">Select City</option>
                                {
                                    city &&
                                        city !== undefined ?
                                        city.map((ctr, index) => {
                                            return (
                                                <option key={index} value={ctr.id}>{ctr.name}</option>
                                            )
                                        })
                                        : "No City"

                                }
                            </select>
                            </p>
                        </form>
                        ***************** form end code ******************

                        <div>
                            <button>Submit</button>
                            <button>Login</button>
                        </div>
                    </div>

                </div>
            )} */}
      {/********************* Show alert 2 end code ****************/}

      <div className="ls-bar-exam-page">
        {/****************** LeftSidebar Component render *******************/}
        <div>
          <LeftSidebar />
        </div>

        {/********************starting code Exam page Header  *****************/}
        <div className="exam-middle-div">
          <div>
            <h3 className="exam-heading">JEE MAIN Full Test</h3>
          </div>
          <div className="home-main-page">
            {/* <h2>JEE MAIN Full Test</h2> */}
            <div>
              <div>
                <div className="header-div1">
                  <p className="div-heading">Online Test for JEE Main</p>
                </div>
                <div className="header-div2">
                  <div className="header-links">
                  <NavLink to='/' activeclassname="active" className="content-link">
                      Full Test
                    </NavLink>
                  <NavLink to='/SubjectTest' activeclassname="active" className="content-link">
                      Subject Test
                    </NavLink>
               
                    {/* <NavLink activeclassname="active" className="content-link">
                      Subject Test
                    </NavLink> */}
                    <NavLink  to='/ChapterTest'  activeclassname="active" className="content-link">
                      Chapter Test
                    </NavLink>
                    <NavLink  to='/PreviousTest'  activeclassname="active" className="content-link">
                      Previous Years{" "}
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            {/********************end code Exam page Header  *****************/}

            {/********************starting testcard code  *****************/}
            <div className="test-card">
              <ul>
                {/* {testData.map((item) => ( */}
                {/* <li key={item.test_year_id}> */}
                <li>
                  <div className="test-card-header">
                    <div className="test-contents1">
                      <h3>
                        JEE MAIN 2024 TEST-1
                        {/* {item.year}-{item.paper_name} */}
                      </h3>
                      <span
                        style={myComponentStyle2}
                        class="material-symbols-outlined"
                      >
                        lock_open
                      </span>
                    </div>
                    <p className="testCard-second-header">
                      Available Till: 31 May,2024
                    </p>
                    <p className="free-title">FREE</p>
                  </div>
                  <div>
                    <div className="test-contents2">
                      <span
                        style={myComponentStyle1}
                        class="material-symbols-outlined"
                      >
                        help
                      </span>
                      <p>90 Questions</p>
                    </div>
                    <div className="test-contents2">
                      <span
                        style={myComponentStyle1}
                        class="material-symbols-outlined"
                      >
                        schedule
                      </span>
                      <p>180 Minutes</p>
                    </div>
                    <div className="test-contents2">
                      <span
                        style={myComponentStyle1}
                        class="material-symbols-outlined"
                      >
                        trending_up
                      </span>
                      <p>300 Marks</p>
                    </div>
                    <div className="test-btn">
                      <Link
                        className="play-btn"
                        to="/Instructions"
                        element={<Instructions />}
                      >
                        <span class="material-symbols-outlined">
                          chevron_right
                        </span>
                        Start Test
                      </Link>
                    </div>
                  </div>
                </li>
                {/* ))} */}
              </ul>
            </div>
            {/********************end testcard code  *****************/}
          </div>
        </div>
      </div>

      {/*       
      {
        afterlogin_dashboard &&
        <div className="dashboard" id="dashboard">

        </div>
      } */}
    </div>
    // <div className='home-main-page'>
    //     <div>
    //         <HomeHeader />
    //     </div>
    //     <div className='test-card'>
    //         <div className='test-card-header'>
    //             <div className='test-contents1'><h3 className='jee-test-1'>JEE MAIN 2024 TEST-1</h3><span style={myComponentStyle2} class="material-symbols-outlined">
    //                 lock_open
    //             </span></div>
    //             <p className='testCard-second-header'>Available Till: 31 May,2024</p>
    //             <p className='free-title'>FREE</p>
    //         </div>
    //         <div>
    //             <div className='test-contents2'><span style={myComponentStyle1} class="material-symbols-outlined">help</span><p>90 Questions</p></div>

    //             <div className='test-contents2'><span style={myComponentStyle1} class="material-symbols-outlined">
    //                 schedule
    //             </span><p>180 Minutes</p></div>

    //             <div className='test-contents2'><span style={myComponentStyle1} class="material-symbols-outlined">
    //                 trending_up
    //             </span><p>300 Marks</p></div>

    //             {/* <div className='test-btn'><button onClick={startCountdown} className='play-btn'><span class="material-symbols-outlined">
    //                 chevron_right
    //             </span>Start Test</button></div> */}
    //             <div className='test-btn'>
    //                 <Link className='play-btn' to='/Instructions' element={<Instructions />}><span class="material-symbols-outlined">
    //                     chevron_right
    //                 </span>Start Test</Link>
    //             </div>

    //         </div>
    //     </div>
    // </div>
  );
};

export default SubjectTest;
