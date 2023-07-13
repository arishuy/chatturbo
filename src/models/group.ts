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
    ],
    theme: { 
      type: String,
      default: "linear-gradient(129deg, #e0fce6 0%, #d8fdff 50%, #e7e0ff 100%)"
    }
  },

  { timestamps: true }
);

export default mongoose.models.Group || mongoose.model("Group", GroupSchema);
