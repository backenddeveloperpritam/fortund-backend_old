import mongoose from "mongoose";

const phoneRequestsSchema = new mongoose.Schema(
  {
    astrologerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Astrologer",
      required: true
    },
    phoneNumber: {
      type: Number,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { collection: "AstrologerPhoneNumberRequests", timestamps: true }
);

export default mongoose.model("AstrologerPhoneNumberRequests", phoneRequestsSchema);
