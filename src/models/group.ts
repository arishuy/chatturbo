import mongoose from "mongoose";

const { Schema } = mongoose;

const GroupSchema = new Schema(
  {
    name: { type: String, trim: true },
    avatar: {
      type: String,
      trim: true,
      default:
        "https://res.cloudinary.com/dndjxbram/image/upload/v1687956906/wbvg8vzrqmevcd24uf4z.png",
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    lastSeen: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LastSeen",
      }
    ]
  },

  { timestamps: true }
);

export default mongoose.models.Group || mongoose.model("Group", GroupSchema);
