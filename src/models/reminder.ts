import mongoose from "mongoose";

const { Schema } = mongoose;

const ReminderSchema = new Schema(
    {
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        title: { type: String, trim: true },
        description: { type: String, trim: true },
        startDateTime: { type: Date, default: Date.now },
        startTime: { type: Date, trim: true },
        endTime: { type: Date, trim: true },
        color: { type: String, trim: true },
        location: { type: String, trim: true },
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
        }
  },

  { timestamps: true }
);

export default mongoose.models.Reminder || mongoose.model("Reminder", ReminderSchema);
