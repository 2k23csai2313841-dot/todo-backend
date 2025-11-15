const express = require("express");
const router = express.Router();
const controller = require("../controllers/calenderController");

// GET tasks for a date
router.get("/:userId/:date", controller.getTasksByDate);

// SAVE or UPDATE tasks
router.post("/", controller.saveTasks);

// Toggle checkbox
router.put("/toggle", controller.toggleTask);

// Delete task
router.put("/delete", controller.deleteTask);

// Cron purpose → pending tasks
router.get("/pending/today", controller.getPendingTasksForToday);

module.exports = router;
