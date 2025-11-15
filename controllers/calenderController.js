const CalendarTask = require("../models/calenderItem");

// GET tasks for a specific date
exports.getTasksByDate = async (req, res) => {
  try {
    const { userId, date } = req.params;
    const record = await CalendarTask.findOne({ userId, date });

    res.json(record || { tasks: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SAVE or UPDATE tasks
exports.saveTasks = async (req, res) => {
  try {
    const { userId, date, tasks } = req.body;

    const updated = await CalendarTask.findOneAndUpdate(
      { userId, date },
      { userId, date, tasks },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Toggle single checkbox
exports.toggleTask = async (req, res) => {
  try {
    const { userId, date, index } = req.body;

    const record = await CalendarTask.findOne({ userId, date });
    if (!record) return res.status(404).json({ error: "Task Not Found" });

    record.tasks[index].done = !record.tasks[index].done;
    await record.save();

    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a specific task
exports.deleteTask = async (req, res) => {
  try {
    const { userId, date, index } = req.body;

    const record = await CalendarTask.findOne({ userId, date });
    if (!record) return res.status(404).json({ error: "Task Not Found" });

    record.tasks.splice(index, 1);
    await record.save();

    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get pending tasks for reminder (for 10PM cron)
exports.getPendingTasksForToday = async (req, res) => {
  try {
    const today = new Date();
    const formatted = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;

    const pending = await CalendarTask.find({
      date: formatted,
      tasks: { $elemMatch: { done: false } }
    });

    res.json(pending);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
