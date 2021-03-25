import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { types } from "../reducers/timerReducer";

const Timer = () => {
  const timer = useSelector((state) => state.timer);
  const dispatch = useDispatch();
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
      dispatch({ type: types.SET_TIMER, data: 10 })
  }, [dispatch])
  
  const handleStart = () => {
    if (intervalId) {
        clearInterval(intervalId)
        setIntervalId(null)
    }
    dispatch({ type: types.START_TIMER });
    setIntervalId(setInterval(
      () => dispatch({ type: types.UPDATE_TIMER }),
      1000
    ))
  };

  const handleStop = () => {
    clearInterval(intervalId);
    dispatch({ type: types.STOP_TIMER})
  };

  const handleReset = () => {
    clearInterval(intervalId);
    dispatch({ type: types.RESET_TIMER});
  };

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
