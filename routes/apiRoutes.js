const express = require('express');
const router = express.Router();
const db = require('../models');



// All Workouts 
router.get('/api/workouts/range', (req, res) => {
    db.Workout.find({})
    .then((allWorkouts) => {
        res.json(allWorkouts)
    })
    .catch((err) =>{
        res.status(400).json(err);
        console.log(err);
    });
});


// Last Workout
router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then((lastWorkout) => {
        res.json(lastWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  });

  // Post request to create workout
router.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
      .then((newWorkout) => {
        res.json(newWorkout)
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      });
  });
  
  // Put request to add an exercise to a workout
  router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
      req.params.id,
      { $push: { exercises: req.body } },
      {
        new: true
      }
    )
      .then((newExercise) => {
        res.json(newExercise)
      })
      .catch((err) => {
        res.status(400).json(err);
        console.log(err);
      })
  });
  
  module.exports = router;