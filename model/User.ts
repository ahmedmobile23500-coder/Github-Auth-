import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // ✅ make email OPTIONAL for GitHub OAuth
    email: {
      type: String,
      unique: true,
      sparse: true, // IMPORTANT: allows null without breaking unique index
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      default: null,
    },

    githubId: {
      type: String,
      unique: true,
      sparse: true, // IMPORTANT: prevents duplicate issues
      default: null,
    },

    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User ||
  mongoose.model("User", userSchema);