import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import timerReducer from "./reducers/timerReducer";

const reducer = combineReducers({
  timer: timerReducer,
});

const store = createStore(
    reducer, 
    composeWithDevTools(
        applyMiddleware(thunk)
));

export default store;
