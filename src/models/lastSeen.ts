import mongoose from "mongoose";

const { Schema } = mongoose;

const LastSeenSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        message: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
  },

  { timestamps: true }
);

export default mongoose.models.LastSeen || mongoose.model("LastSeen", LastSeenSchema);
