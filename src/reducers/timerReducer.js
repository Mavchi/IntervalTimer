const initialState = {
  timeLast: null, // last time update was called
  timeLeft: 0,
  running: false,
};

export const timerTypes = {
  SET_TIMER: "SET_TIMER",
  START_TIMER: "START_TIMER",
  UPDATE_TIMER: "UPDATE_TIMER",
  RESET_TIMER: "RESET_TIMER",
  STOP_TIMER: "STOP_TIMER",
};

export const workoutTypes = {
    
}

const timerReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case timerTypes.SET_TIMER:
      return action.data;
    case timerTypes.START_TIMER:
      newState.timeLast = new Date().getTime();
      newState.running = true;
      return newState;
    case timerTypes.UPDATE_TIMER:
      if (!newState.running || newState.playList[newState.index]==='Finished') {
        return state;
      }
      newState.timeLeft -= new Date().getTime() - newState.timeLast;
      newState.timeLast = new Date().getTime();

      if (newState.timeLeft <= 0) {
        newState.index += 1

        if (!newState.playList[newState.index] === "Finished") {

        }
          newState.timeLeft = 0;
        newState.running = false;
      }
      return newState;
    case timerTypes.RESET_TIMER:
      return initialState;
    case timerTypes.STOP_TIMER:
      newState.timeLast = null;
      newState.running = false;
      return newState;
    default:
      return initialState;
  }
};

export const initializeTimer = (workout) => {
  return async (dispatch) => {
    const newTimer = {
      timeLast: null,
      timeLeft: 0,
      running: false,
    };
    newTimer.playList = [];
    newTimer.index = 0;
    newTimer.playList.push({
      type: "Prepare",
      time: workout.prepare,
    });
    for (let i = 0; i < workout.rounds; i++) {
      for (let j = 0; j < workout.sets; j++) {
        newTimer.playList.push({
          type: "Work",
          time: workout.work,
        });
        if (j !== workout.sets - 1) {
          newTimer.playList.push({
            type: "Rest",
            time: workout.restBetweenSets,
          });
        } else {
          if (i !== workout.rounds - 1) {
            newTimer.playList.push({
              type: "Rest",
              time: workout.restBetweenRounds,
            });
          }
        }
      }
    }
    newTimer.playList.push({
      type: "Finished",
      time: 0,
    });
    newTimer.timeLeft = newTimer.playList[0].time * 1000;

    dispatch({
      type: timerTypes.SET_TIMER,
      data: newTimer,
    });
  };
};

export default timerReducer;
