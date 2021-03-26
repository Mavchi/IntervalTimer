import cloneDeep from "lodash.clonedeep";

////// ON DEPLOYED VERSION FROM SERVER /////
const defaultSettings = {
  audio: {
    on: true,
    volume: 100,
    vibration: false,
    flashlight: false,
    screenFlash: false,
    voiceAssistant: false,
    //textToSpeechMotor: ?,
  },
  screen: {
    ducking: true, // reduce music during alert
    rotation: false, // rotation during workout
    locking: false, // screen locking during workout
    brightness: "Device", // screen brightness (device,dim,bright)
  },
  theme: "Default", // theme-colors (light, dark, pink, blue etc)
  version: "0.0.1",
};

export const settingsTypes = {
  INIT: "SETTINGS_INIT",
  UPDATE: "SETTINGS_UPDATE_AUDIO",
};

const settingsReducer = (state = [], action) => {
  const newState = cloneDeep(state);
  switch (action.type) {
    case settingsTypes.INIT:
      return action.data;
    case settingsTypes.UPDATE:
      newState.audio[action.data.variable] = action.data.value;
      return newState;
    default:
      return state;
  }
};

export const initializeSettings = () => {
  return async (dispatch) => {
    dispatch({
      type: "SETTINGS_INIT",
      data: defaultSettings,
    });
  };
};

export const updateSettingsAudio = (variable, value) => {
  return async (dispatch) => {
    dispatch({
      type: settingsTypes.UPDATE,
      data: {
        variable,
        value,
      },
    });
  };
};

export default settingsReducer;
