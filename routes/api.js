const router = require("express").Router();
const db = require("../models/workout.js");
const path = require("path");

// stats
router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

// exercise
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/exercise?", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

//get
router.get("/api/workouts", (req, res) => {
  db.find({ id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.get("/api/workouts/range", ({ body }, res) => {
  db.find({})
    .sort({ day: -1 })
    .limit(10)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/api/workouts", (req, res) => {
  db.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  db.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true, runValidators: true }
  )
    .then((dbworkout) => {
      res.json(dbworkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
