import mongoose from "mongoose";

const earningSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "",
    },

    astrologerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Astrologer",
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers",
    },
    transactionId: {
      type: String,
      default: "",
    },
    totalPrice: {
      type: String,
      default: "",
    },
    adminPrice: {
      type: String,
      default: "",
    },
    partnerPrice: {
      type: String,
      default: "",
    },
    historyId: {
      type: String,
      default: "",
    },
    duration: {
      type: Number,
      default: 0,
    },
    startTime: {
      type: String,
      default: "",
    },
    endTime: {
      type: String,
      default: "",
    },
  },
  { collection: "AdminEarning", timestamps: true }
);

const AdminEarning = mongoose.model("AdminEarning", earningSchema);

export default AdminEarning;
