import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeSettings } from "./reducers/settingsReducer";
import './base.scss'

import Main from './components/Main/Main'

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
