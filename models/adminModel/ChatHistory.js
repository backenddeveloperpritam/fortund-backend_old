import mongoose from 'mongoose';

const chatHistorySchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LinkedProfile",
    },
    transactionId: {
      type: String,
      default: "",
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers",
    },
    astrologerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Astrologer",
    },
    startTime: {
      type: Date,
      default: null,
    },
    endTime: {
      type: Date,
      default: null,
    },
    durationInSeconds: {
      type: String,
      default: "",
    },
    chatPrice: {
      type: Number,
      default: 0,
    },
    commissionPrice: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "Created",
    },
    totalChatPrice: {
      type: String,
      default: "",
    },
  },
  { collection: "ChatHistory", timestamps: true }
);

export default mongoose.model("ChatHistory", chatHistorySchema);
