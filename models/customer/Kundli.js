import mongoose from 'mongoose';

const kundliSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers",
    },
    name: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
      default: "",
    },
    tob: {
      type: String,
      default: "",
    },
    place: {
      type: String,
      default: 0,
    },
    lat: {
      type: Number,
      default: "",
    },
    long: {
      type: Number,
      default: "",
    }
  },
  { collection: "Kundli", timestamps: true }
);

const Kundli = mongoose.model("Kundli", kundliSchema);
export default Kundli;
