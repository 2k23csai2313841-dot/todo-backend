const mongoose = require("mongoose");

const calenderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },

    date: {
      type: String, // format: "27-10-2025"
      required: true
    },

    tasks: [
      {
        text: { type: String, required: true },
        done: { type: Boolean, default: false }
      }
    ]
  },
  { timestamps: true }
);

// To avoid duplicate entries for same user & date
calenderSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("CalendarTask", calenderSchema);
