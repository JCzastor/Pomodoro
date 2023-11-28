import React from 'react'
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import StartButton from './StartButton';
import PauseButton from './PauseButton';
import InitializeButton from './InitializeButton';
import StopButton from './StopButton';
import SettingsButton from './SettingsButton';
import ReactSlider from "react-slider";
import './Slider.css';

const red = '#f54e4e';
const green = '#4aec8c';

function Timer() {
    const [workMinutes, setWorkMinutes] = useState(25);
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [intervals, setIntervals] = useState(4);
    const [intervalsDef, setIntervalsDef] = useState(0);

    const [isInitialized, setIsInitialized] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [seconds, setSeconds] = useState(0);
    const [mode, setMode] = useState('work'); //work/break

    const secondsRef = useRef(seconds);
    const isPausedRef = useRef(isPaused);
    const isInitializedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function tick() {
        secondsRef.current--;
        setSeconds(secondsRef.current);
    }

    function initTimer() {
        setIntervalsDef(intervals);
        setSeconds(workMinutes*60);
        secondsRef.current=seconds;
    }

    function switchMode() {
        if(mode === 'break') {
            setIntervals(intervals - 1);
        }
        const nextMode = modeRef.current === 'work' ? 'break' : 'work';
        setMode(nextMode)
        modeRef.current = nextMode;
        const nextSeconds = (nextMode === 'work' ? workMinutes : breakMinutes) * 60;
        setSeconds(nextSeconds);
        secondsRef.current = nextSeconds;
        console.log("Swtich")
        console.log(intervals)
    }

    useEffect(() => {
        if(intervals === 0){
            setIsInitialized(false);
            setIsPaused(true);
            setIntervals(intervalsDef);
            return;
        }
        if(isInitialized === false){
            setSeconds(workMinutes*60);
            secondsRef.current=seconds;
        }
        const interval = setInterval(() => {
            if(isPausedRef.current) {
                return;
            }
            if (secondsRef.current === 0) {
                return switchMode();
            }
            tick();
        }, 10);

        return () => clearInterval(interval);
      })

    const totalSeconds = mode === 'work' ? workMinutes * 60 : breakMinutes * 60;
    const percentage = Math.round(seconds / totalSeconds * 100);

    const minutesLeft = Math.floor(seconds / 60);
    let secondsLeft = seconds % 60;
    if(secondsLeft < 10) secondsLeft = '0' + secondsLeft;


    return (
        <div className="timer">
            <div className="progressBar">
                <CircularProgressbar value={percentage} text={minutesLeft + ':' + secondsLeft} styles={
                    buildStyles({
                    textColor: '#eee',
                    pathColor: mode === 'work' ? red : green,
                    trailColor: 'rgba(255, 255, 255,.2',
                })}/>
            </div>
            <div>
                {isInitialized ? isPaused ?
                <StartButton onClick={() => { setIsPaused(false); isPausedRef.current = false;}}/>
                : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true;}}/>
                : <InitializeButton onClick={() => {setIsPaused(false); isPausedRef.current = false; setIsInitialized(true); isInitializedRef.current = true; initTimer()}}/>}
                {isInitialized ? <StopButton onClick={()=> {setIsInitialized(false); setIntervals(intervalsDef);}}/> : null}
            </div>
            <div className="Settings">
                <label>Work Minutes: {workMinutes}:00</label>
                <ReactSlider
                    className={'slider'}
                    thumbClassName={'thumb'}
                    trackClassName={'track'}
                    value={workMinutes}
                    onChange={(newValue: any) => setWorkMinutes(newValue)}
                    min={1}
                    max={120}
                />
                <label>Break Minutes {breakMinutes}:00</label>
                <ReactSlider
                    className={'slider green'}
                    thumbClassName={'thumb green'}
                    trackClassName={'track'}
                    value={breakMinutes}
                    onChange={(newValue: any) => setBreakMinutes(newValue)}
                    min={1}
                    max={60}
                />
                <label>Number of Intervals: {intervals}</label>
                <ReactSlider
                    className={'slider'}
                    thumbClassName={'thumb'}
                    trackClassName={'track'}
                    value={intervals}
                    onChange={(newValue: any) => setIntervals(newValue)}
                    min={1}
                    max={10}
                />
            </div>
        </div>
    )
}

export default Timer;