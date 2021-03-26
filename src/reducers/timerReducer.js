/*
State looks like:
currentType: "Prepare",
index: 0,
playList: [{
  type: "Prepare",
  time: 45000
}]
running: false,
timeLast: 1616745690462,
timeLeft: 43000,
*/

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
  PREPARE: "Prepare",
  REST: "Rest",
  WORK: "Work",
  FINISHED: "Finished",
};

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
      if (
        !newState.running ||
        newState.playList[newState.index] === workoutTypes.FINISHED
      ) {
        newState.running = false;
        return newState;
      }
      newState.timeLeft -= new Date().getTime() - newState.timeLast;
      newState.timeLast = new Date().getTime();

      if (newState.timeLeft <= 0) {
        newState.index += 1;
        
        if (newState.playList[newState.index].type !== workoutTypes.FINISHED) {
          console.log('onnistuu')
            newState.timeLeft = newState.playList[newState.index].time
            newState.currentType = newState.playList[newState.index].type
        }
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

    // no need for prepare-timer, if its 0
    if (workout.prepare !== 0) {
      newTimer.currentType = workoutTypes.PREPARE;
      newTimer.playList.push({
        type: workoutTypes.PREPARE,
        time: workout.prepare * 1000,
      });
    } else {
      // no need for prepare-timer, if its 0
      newTimer.currentType = workoutTypes.WORK;
    }
    for (let i = 0; i < workout.rounds; i++) {
      for (let j = 0; j < workout.sets; j++) {
        newTimer.playList.push({
          type: workoutTypes.WORK,
          time: workout.work * 1000,
        });
        if (j !== workout.sets - 1) {
          newTimer.playList.push({
            type: workoutTypes.REST,
            time: workout.restBetweenSets * 1000,
          });
        } else {
          if (i !== workout.rounds - 1) {
            newTimer.playList.push({
              type: workoutTypes.REST,
              time: workout.restBetweenRounds * 1000,
            });
          }
        }
      }
    }
    newTimer.playList.push({
      type: workoutTypes.FINISHED,
      time: 0,
    });
    newTimer.timeLeft = newTimer.playList[0].time

    dispatch({
      type: timerTypes.SET_TIMER,
      data: newTimer,
    });
  };
};

export default timerReducer;
