import mongoose from "mongoose";

const galleryRequestsSchema = new mongoose.Schema(
    {
        astrologerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Astrologer",
            required: true
        },
        galleryImage: [{
            type: String
        }],
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        }
    },
    { collection: "AstrologerGalleryRequests", timestamps: true }
);

export default mongoose.model("AstrologerGalleryRequests", galleryRequestsSchema);
