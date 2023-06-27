import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    recipientGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    content: { type: String, trim: true },
    parentMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    type : { type: String, enum:['text','photo','audio','file'] ,default: "text" },
    hearts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },

  { timestamps: true }
);

export default mongoose.models.Message || mongoose.model("Message", messageSchema);
