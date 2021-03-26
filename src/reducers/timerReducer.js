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

const initiatedState = {}

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
      initialState.timeLeft = newState.timeLeft;
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
          console.log("onnistuu");
          newState.timeLeft = newState.playList[newState.index].time;
          initiatedState.timeLeft = newState.timeLeft;
          newState.currentType = newState.playList[newState.index].type;
        }
      }
      return newState;
    case timerTypes.RESET_TIMER:
      newState.timeLeft = newState.playList[newState.index].time;
      return newState;
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
    initiatedState.timeLast = null
    initiatedState.timeLeft = 0
    initiatedState.running = false;
      
    initiatedState.playList = [];
    initiatedState.index = 0;

    // no need for prepare-timer, if its 0
    if (workout.prepare !== 0) {
      initiatedState.currentType = workoutTypes.PREPARE;
      initiatedState.playList.push({
        type: workoutTypes.PREPARE,
        time: workout.prepare * 1000,
      });
    } else {
      // no need for prepare-timer, if its 0
      initiatedState.currentType = workoutTypes.WORK;
    }
    for (let i = 0; i < workout.rounds; i++) {
      for (let j = 0; j < workout.sets; j++) {
        initiatedState.playList.push({
          type: workoutTypes.WORK,
          time: workout.work * 1000,
        });
        if (j !== workout.sets - 1) {
          initiatedState.playList.push({
            type: workoutTypes.REST,
            time: workout.restBetweenSets * 1000,
          });
        } else {
          if (i !== workout.rounds - 1) {
            initiatedState.playList.push({
              type: workoutTypes.REST,
              time: workout.restBetweenRounds * 1000,
            });
          }
        }
      }
    }
    initiatedState.playList.push({
      type: workoutTypes.FINISHED,
      time: 0,
    });
    initiatedState.timeLeft = initiatedState.playList[0].time;

    dispatch({
      type: timerTypes.SET_TIMER,
      data: initiatedState,
    });
  };
};

export default timerReducer;
