import React, { useEffect, useRef, useState } from 'react';
import './CountDown.css'
import { useNavigate } from 'react-router-dom'

const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);

    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    return minutes + ':' + seconds;
};

function CountDown({ seconds }) {
    const [countdown, setCountdown] = useState(seconds);
    const timerId = useRef();

    useEffect(() => {
        if (countdown <= 0) {
            clearInterval(timerId.current);
            alert("End");
        }
    }, [countdown]);

    const navigate = useNavigate();
    const startCountdown = () => {
        timerId.current = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);
        navigate('/Paper');
    };

    const stopCountdown = () => {
        clearInterval(timerId.current);
    };

    return (
        <div>
            <h1>Time Left: {formatTime(countdown)}</h1>
            <div className='timer-btns'>
                <button onClick={startCountdown}>Start Quiz</button>
                <button onClick={stopCountdown}>Stop Quiz</button>
            </div>
        </div>
    );
}

export default CountDown;