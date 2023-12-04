const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

const mongoPass = "ZNsFm6WKpJPmzHJ0";
const mongoURI = `mongodb+srv://amarjeetabdar:${mongoPass}@gymdata.rrq4us9.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(mongoURI)
  .then(() => {
    app.listen(4000, () => {
      console.log("Connected to db. Listening on port " + 4000);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
