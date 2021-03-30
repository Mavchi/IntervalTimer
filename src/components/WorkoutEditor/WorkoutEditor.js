import React, { useState } from "react";
import { container, headerPrimary, headerSecondary, row } from './style.module.scss';

const EditWorkout = () => {
  const [rounds, setRounds] = useState(2);
  const [sets, setSets] = useState(3);
  const [work, setWork] = useState(45);
  const [restBetweenRounds, setRestBetweenRounds] = useState(60);
  const [restBetweenSets, setRestBetweenSets] = useState(15);
  const [prepare, setPrepare] = useState(5);

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

    if (label==="work") {
      if (type === "text-input") {
        return (event) => {
          setWork(event.target.value)
        }
      }
    }

    if (label === 'prepare') {
      if (type === 'text-input') {
        return (event) => {
          setPrepare(event.target.value);
        };
      }
    }
  };

  return (
    <section className={container}>
      <div className={row}>
        <h5 className={headerSecondary}>Rounds</h5>
        <input type='number' value={rounds} min={1} max={10} step={1} onChange={handleChange('text-input', 'rounds')} />
      </div>

      <div className={row}>
        <h5 className={headerSecondary}>Sets</h5>
        <input type='number' value={sets} min={1} max={10} step={1} onChange={handleChange('text-input', 'sets')} />
      </div>

      <div className={row}>
        <h5 className={headerSecondary}>Rest between rounds</h5>
        <input type='number' value={restBetweenRounds} min={0} max={90} step={15} onChange={handleChange('text-input', 'rest-between-rounds')} />
      </div>

      <div className={row}>
        <h5 className={headerSecondary}>Rest between sets</h5>
        <input type='number' value={restBetweenSets} min={0} max={90} step={15} onChange={handleChange('text-input', 'rest-between-sets')} />
      </div>

      <div className={row}>
        <h5 className={headerSecondary}>Work</h5>
        <input type='number' value={work} min={0} max={90} step={15} onChange={handleChange('text-input', 'work')} />
      </div>

      <div className={row}>
        <h5 className={headerSecondary}>Prepare</h5>
        <input type='number' value={prepare} min={0} max={90} step={15} onChange={handleChange('text-input', 'prepare')} />
      </div>
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
