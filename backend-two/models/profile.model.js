import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    bio: { type: String },
    interests: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Profile", userSchema);
