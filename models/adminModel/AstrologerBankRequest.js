import mongoose from "mongoose";

const bankRequestsSchema = new mongoose.Schema(
  {
    astrologerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Astrologer",
      required: true
    },
    bankAccountNumber: {
      type: Number,
      default: null,
    },
    bankName: {
      type: String,
      default: "",
    },
    accountType: {
      type: String,
      default: "",
    },
    ifscCode: {
      type: String,
      default: "",
    },
    accountHolderName: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    }
  },
  { collection: "AstrologerBankRequests", timestamps: true }
);

export default mongoose.model("AstrologerBankRequests", bankRequestsSchema);
