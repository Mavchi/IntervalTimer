import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSettingsAudio } from "../reducers/settingsReducer";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Slider from "@material-ui/core/Slider";

import IconBack from "@material-ui/icons/ArrowBackIosRounded";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";

const useStyles = makeStyles((theme) => ({
  iconBack: {},
  navTitle: {
    position: "relative",
    marginLeft: "1rem",
  },
  title: {
    margin: "1rem 0",
  },
  root: {
    display: "flex",
    backgroundColor: "white",
    borderBottom: "1px solid grey",
    alignItems: "center",
  },
  controls: {
    marginLeft: "auto",
  },
}));

const Settings = ({ type }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const settings = useSelector((state) => state.settings);

  console.log(settings);
  const handleChange = (type) => {
    if (type === "volume") {
      return (event, newValue) => {
        dispatch(updateSettingsAudio("volume", newValue));
      };
    }

    if (type === "vibration") {
      return (event) => {
        dispatch(updateSettingsAudio(event.target.name, event.target.checked));
      };
    }
  };

  if (!settings || !settings.audio) {
    return null;
  }

  console.log(settings["audio"]["vibration"]);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <IconBack className={classes.iconBack} />
          <Typography variant="h6" color="inherit" className={classes.navTitle}>
            Settings
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.title}>
          <Typography component="h5" variant="h5">
            Sound
          </Typography>
        </div>

        <div className={classes.root}>
          <Typography component="h5" variant="h5">
            Volume
          </Typography>
          <VolumeDown />
          <Slider
            value={settings.audio.volume}
            onChange={handleChange("volume")}
            aria-labelledby="continuous-slider"
          />
          <VolumeUp />
        </div>

        <div className={classes.root}>
          <Typography component="h5" variant="h5">
            Vibration
          </Typography>
          <div className={classes.controls}>
            <Switch
              name="vibration"
              checked={settings.audio.vibration}
              onChange={handleChange("vibration")}
              color="default"
              inputProps={{ "aria-label": "checkbox with default color" }}
            />
          </div>
        </div>
        
      </main>
    </React.Fragment>
  );
};

export default Settings;
