import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/dndjxbram/image/upload/v1687838044/e0pz9eaz3f16trot8jup.jpg"
    },
    cover_img: {
      type: String,
      default: "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    quote: {
      type: String,
      default: "What a beautiful day!"
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    waitingAcceptedFriends: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],
    waitingRequestFriends: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      
    ],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
