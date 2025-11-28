require("dotenv").config();
const path = require("path");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const mongoUrl = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

// Local Imports
const rootdir = require("./utils/pathutils");
const todoRouter = require("./router/todoItemRouter");
const calenderRouter = require("./router/calenderRouter");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: ["https://todo-app-jade-six-65.vercel.app","https://anubhav-task.vercel.app","http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.static(path.join(rootdir, "public")));

// Routes
app.use("/api/todo", todoRouter);
app.use("/api/task", calenderRouter);

// MongoDB Connect
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("🚀 MongoDB Connected");
    app.listen(port, () =>
      console.log(`🔥 Server Running → http://localhost:${port}`)
    );
  })
  .catch((err) => console.log("❌ MongoDB Error:", err));

