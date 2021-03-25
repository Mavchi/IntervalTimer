import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { timerTypes, initializeTimer } from "../reducers/timerReducer";

const workout = {
  rounds: 2,
  sets: 3,
  restBetweenSets: 30,
  restBetweenRounds: 60,
  prepare: 5,
  work: 45,
}

const Timer = () => {
  const timer = useSelector((state) => state.timer);
  const dispatch = useDispatch();
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
      dispatch(initializeTimer(workout));
  }, [dispatch])

  const handleStart = () => {
    if (intervalId) {
        clearInterval(intervalId)
        setIntervalId(null)
    }
    dispatch({ type:timerTypes.START_TIMER });
    setIntervalId(setInterval(
      () => dispatch({ type:timerTypes.UPDATE_TIMER }),
      1000
    ))
  };

  const handleStop = () => {
    clearInterval(intervalId);
    dispatch({ type:timerTypes.STOP_TIMER})
  };

  const handleReset = () => {
    clearInterval(intervalId);
    dispatch({ type:timerTypes.RESET_TIMER});
  };


  console.log(timer);
  return (
    <main>
      {Math.round(timer.timeLeft/1000)}
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </main>
  );
};

export default Timer;
