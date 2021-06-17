const router = require("express").Router();
const db = require('../models');

//All workouts
router.get('/api/workouts/range', (req, res) => {

  db.Workout.
    aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },

        }
      }
    ])
    .then((allWorkouts) => {
      res.json(allWorkouts)

    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
});

//Last workout
router.get("/api/workouts", (req, res) => {
  db.Workout.
    aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },

        }
      }
    ])
    .then((lastWorkout) => {
      res.json(lastWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
});


//Create a workout
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

// Add an exercise to a workout
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