import mongoose from 'mongoose';

const { Schema } = mongoose;

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
  customerIds: {
    type: [{
      customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
      },
      notificationRead: {
        type: Boolean,
        default: false,
      },
    }],
    required: true,
    validate: {
      validator: function (arr) {
        return arr.length > 0;
      },
      message: 'At least one customer ID must be provided.',
    }
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

const CustomerNotification = mongoose.model('CustomerNotification', notificationSchema);

export default CustomerNotification;
