import mongoose from "mongoose";

const liveCallsSchema = new mongoose.Schema(
    {
        roomId: {
            type: String,
            default: ''
        },
        streamId: {
            type: String,
            default: ''
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customers",
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
            type: Number,
            default: 0,
        },
        maxDuration: {
            type: Number,
            default: 0,
        },
        amount: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ['Ongoing', 'Completed'],
            default: "Ongoing",
        },
    },
    { collection: "LiveCalls", timestamps: true }
);

export default mongoose.model("LiveCalls", liveCallsSchema);
