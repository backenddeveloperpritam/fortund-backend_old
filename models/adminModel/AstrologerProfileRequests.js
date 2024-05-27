import mongoose from "mongoose";

const profileRequestsSchema = new mongoose.Schema(
  {
    astrologerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Astrologer",
      required: true
    },
    profileImage: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { collection: "AstrologerProfileRequests", timestamps: true }
);

export default mongoose.model("AstrologerProfileRequests", profileRequestsSchema);
