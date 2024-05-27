import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    }
});

const Announcement = mongoose.model('Announcement', announcementSchema);

export default Announcement;
