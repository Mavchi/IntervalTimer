import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeSettings } from "./reducers/settingsReducer";
//import Timer from './components/Timer'
import Settings from './components/Settings'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeSettings())
  }, [dispatch])

  return (
    <div>
      <Settings />
    </div>
  );
}

export default App;
