const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./models/Task");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://mongo:27017/tasksdb")
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err));

// GET Tasks
app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// ADD Task
app.post("/api/tasks", async (req, res) => {
  const task = new Task({ text: req.body.text });
  await task.save();
  res.json(task);
});

// DELETE Task
app.delete("/api/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});