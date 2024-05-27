import mongoose from 'mongoose';

const appVersionSchema = new mongoose.Schema({
    versionName: {
        type: String,
        default: ''
    },
    versionCode: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: 0
    },
}, { collection: 'AppVersion', timestamps: true });

const AppVersionModel = mongoose.model('AppVersion', appVersionSchema);

export default AppVersionModel;
