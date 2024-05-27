import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const notificationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'default_image_url_if_needed',
  },
  astrologerIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Astrologer',
  }],
  customerIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Customers',
  }],
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = model('Notification', notificationSchema);

export default Notification;
