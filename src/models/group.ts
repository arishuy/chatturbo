import mongoose from "mongoose";

const { Schema } = mongoose;

const GroupSchema = new Schema(
  {
    name: { type: String, trim: true },
    avatar: {
      type: String,
      trim: true,
      default:
        "https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png",
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },

  { timestamps: true }
);

export default mongoose.models.Group || mongoose.model("Group", GroupSchema);
