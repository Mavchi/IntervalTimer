const initialState = {
  timeLast: null, // last time update was called
  timeLeft: 0, 
  running: false,
};

export const types = {
  SET_TIMER: "SET_TIMER",
  START_TIMER: "START_TIMER",
  UPDATE_TIMER: "UPDATE_TIMER",
  RESET_TIMER: "RESET_TIMER",
  STOP_TIMER: "STOP_TIMER",
};

const timerReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case types.SET_TIMER:
      newState.timeLeft = action.data*1000;
      initialState.timeLeft= action.data * 1000;
      return newState;
    case types.START_TIMER:
      newState.timeLast = new Date().getTime()
      newState.running = true;
      return newState
    case types.UPDATE_TIMER:
      if (!newState.running) {
        return state
      }
      newState.timeLeft -= new Date().getTime() - newState.timeLast
      newState.timeLast = new Date().getTime()

      if (newState.timeLeft <= 0) {
          newState.timeLeft = 0
          newState.running = false
      }
      return newState;
    case types.RESET_TIMER:
      return initialState;
    case types.STOP_TIMER:
      newState.timeLast = null;
      newState.running = false;
      return newState;
    default:
      return initialState;
  }
};
/*
export const initializeTimer = (workout) => {
    return async dispatch => {
        newTimer = {

        }

        dispatch({
            type: types.SET_TIMER,
            data: newTimer,
        })
    }
}
*/
export default timerReducer;
