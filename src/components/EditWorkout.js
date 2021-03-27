import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import { ContactsOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2rem",
  },
  title: {},
  controlBox: {
  },
}));

const EditWorkout = () => {
  const [rounds, setRounds] = useState(2);
  const [sets, setSets] = useState(3);
  const [work, setWork] = useState(45);
  const [restBetweenRounds, setRestBetweenRounds] = useState(60);
  const [restBetweenSets, setRestBetweenSets] = useState(15);
  const [prepare, setPrepare] = useState(5);
  const classes = useStyles();

  const handleChange = ( type, label ) => {
    if (label === "rounds") {
      if (type === "text-input") {
        return (event) => {
          console.log(event.target.value)
          setRounds(event.target.value);
        };
      }
      if (type === "slider") {
        return (event, newValue) => {
          console.log(newValue);
          setRounds(newValue);
        };
      }
    }

    if (label === "sets") {
      if (type === "text-input") {
        return (event) => {
          console.log(event.target.value);
          setSets(event.target.value);
        };
      }
      if (type === "slider") {
        return (event, newValue) => {
          console.log(newValue);
          setSets(newValue);
        };
      }
    }

    if (label === "rest-between-rounds") {
      if (type === "text-input") {
        return (event) => {
          setRestBetweenRounds(event.target.value);
        };
      }
      if (type === "slider") {
        return (event, newValue) => {
          setRestBetweenRounds(newValue);
        };
      }
    }

    if (label === "rest-between-sets") {
      if (type === "text-input") {
        return (event) => {
          setRestBetweenSets(event.target.value);
        };
      }
      if (type === "slider") {
        return (event, newValue) => {
          setRestBetweenSets(newValue);
        };
      }
    }
  };

  return (
    <section className={classes.root}>
      <Typography component="h5" variant="h5" className={classes.title}>
        Rounds
      </Typography>
      <Grid container alignItems="center">
        <Grid item className={classes.controlBox} margin={2} xs={10}>
          <Slider
            value={rounds}
            aria-labelledby="discrete-slider-small-steps"
            step={1}
            marks
            min={1}
            max={10}
            valueLabelDisplay="auto"
            onChange={handleChange("slider", "rounds")}
          />
        </Grid>
        <Grid item className={classes.controlBox} xs={2}>
          <Input
            value={rounds}
            margin="dense"
            inputProps={{
              step: 1,
              min: 1,
              max: 10,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
            onChange={handleChange("text-input", "rounds")}
          />
        </Grid>
      </Grid>

      <Typography component="h5" variant="h5" className={classes.title}>
        Sets
      </Typography>
      <Grid container alignItems="center">
        <Grid item className={classes.controlBox} margin={2} xs={10}>
          <Slider
            value={sets}
            aria-labelledby="discrete-slider-small-steps"
            step={1}
            marks
            min={1}
            max={10}
            valueLabelDisplay="auto"
            onChange={handleChange("slider", "sets")}
          />
        </Grid>
        <Grid item className={classes.controlBox} xs={2}>
          <Input
            value={sets}
            margin="dense"
            inputProps={{
              step: 1,
              min: 1,
              max: 10,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
            onChange={handleChange("text-input", "sets")}
          />
        </Grid>
      </Grid>

      <Typography component="h5" variant="h5" className={classes.title}>
        Rest between rounds
      </Typography>
      <Grid container alignItems="center">
        <Grid item className={classes.controlBox} margin={2} xs={10}>
          <Slider
            value={restBetweenRounds}
            aria-labelledby="discrete-slider-small-steps"
            step={5}
            marks
            min={0}
            max={300}
            valueLabelDisplay="auto"
            onChange={handleChange("slider", "rest-between-rounds")}
          />
        </Grid>
        <Grid item className={classes.controlBox} xs={2}>
          <Input
            value={restBetweenRounds}
            margin="dense"
            inputProps={{
              step: 5,
              min: 0,
              max: 300,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
            onChange={handleChange("text-input", "rest-between-rounds")}
          />
        </Grid>
      </Grid>

      <Typography component="h5" variant="h5" className={classes.title}>
        Rest between sets
      </Typography>
      <Grid container alignItems="center">
        <Grid item className={classes.controlBox} margin={2} xs={10}>
          <Slider
            value={restBetweenSets}
            aria-labelledby="discrete-slider-small-steps"
            step={5}
            marks
            min={0}
            max={300}
            valueLabelDisplay="auto"
            onChange={handleChange("slider", "rest-between-sets")}
          />
        </Grid>
        <Grid item className={classes.controlBox} xs={2}>
          <Input
            value={restBetweenSets}
            margin="dense"
            inputProps={{
              step: 5,
              min: 0,
              max: 300,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
            onChange={handleChange("text-input", "rest-between-sets")}
          />
        </Grid>
      </Grid>
    </section>
  );
};

export default EditWorkout;

/*
Workout: {
    rounds: 2,
    sets: 2,
    rest_between_sets: 15,
    rest_between_rounds: 60,
    work: 45,
    prepare: 5,
}
*/
