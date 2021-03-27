import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeSettings } from "./reducers/settingsReducer";
import Timer from './components/Timer'
import Settings from './components/Settings'
import Main from './components/Main'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeSettings())
  }, [dispatch])

  return (
    <div>
      <Main />
    </div>
  );
}

export default App;
