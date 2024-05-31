import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';

dotenv.config();

const capitalizeFirstLetter = (string) => {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};


const astrologerSchema = new mongoose.Schema({
  displayName: {
    type: String,
    unique: true,
    required: [true, 'Display name is required'],
    validate: {
      validator: function (v) {
        return /^[A-Z].*/.test(v);
      },
      message: props => `${props.value} must start with an uppercase letter`
    },
    set: capitalizeFirstLetter
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  phoneCode: {
    type: String,
    required: [true, 'Phone code is required']
  },
  phoneNumber: {
    type: Number,
    required: [true, 'Phone number is required']
  },

  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female', 'Other'],
  },
  dateOfBirth: {
    type: Date,
    default: "",
  },
  experience: {
    type: String,
    default: "",
  },
  language: [String],
  address: {
    type: String,
    default: "",
  },
  currencyType: {
    type: String,
    default: "",
  },
  currencyValue: {
    type: Number,
    default: 0
  },
  country: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  zipCode: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
  educationQualification: {
    type: String,
    default: "",
  },
  astrologyQualification: {
    type: String,
    default: "",
  },
  follower_count: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  avgRating: {
    type: Number,
    default: 0,
  },
  profileImage: {
    type: String,
    default: "",
  },
  idProofImage: {
    type: String,
    default: "",
  },
  galleryImage: [{
    type: String
  }],
  bankProofImage: {
    type: String,
    default: "",
  },
  bankAcountNumber: {
    type: Number,
    default: "",
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
  accouuntHolderName: {
    type: String,
    default: "",
  },
  addharNumber: {
    type: Number,
    default: "",
  },
  panNumber: {
    type: String,
    default: "",
  },
  chatPrice: {
    type: Number,
    default: 0,
  },
  companyChatPrice: {
    type: Number,
    default: 0,
  },
  callPrice: {
    type: Number,
    default: 0,
  },
  companyCallPrice: {
    type: Number,
    default: 0,
  },
  liveVideoPrice: {
    type: Number,
    default: 0,
  },
  companyLiveVideoPrice: {
    type: Number,
    default: 0,
  },
  liveCallPrice: {
    type: Number,
    default: 0,
  },
  companyLiveCallPrice: {
    type: Number,
    default: 0,
  },
  skill: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    },
  ],
  expertise: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expertise",
    },
  ],
  remedies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Remedies",
    },
  ],
  astrologerType: {
    type: String,
    enum: ["Consultation", "Teaching", "Pandit", "All"],
    default: "",
  },
  status: {
    type: String,
    enum: ["Active", "Blocked"],
    default: "Active",
  },
  isDeleted: {
    type: Number,
    default: 0,
  },
  isLoggined: {
    type: Number,
    default: 0,
  },
  fcmToken: {
    type: String,
    default: "",
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  isLive: {
    type: Boolean,
    default: false,
  },
  preferredDays: [String],
  wallet_balance: {
    type: Number,
    default: 0,
  },
  chatStatus: {
    type: String, // offline, online, busy
    enum: ["Offline", "Online", "Busy"],
    default: "Offline",
  },
  callStatus: {
    type: String, // offline, online, busy
    enum: ["Offline", "Online", "Busy"],
    default: "Offline",
  },
  device_id: {
    type: String,
    default: "",
  },
  live_notification: {
    type: Boolean,
    default: true,
  },
  chat_notification: {
    type: Boolean,
    default: true,
  },
  call_notification: {
    type: Boolean,
    default: true,
  },
  refreshToken: {
    type: String
  }
}, { collection: "Astrologer", timestamps: true });

astrologerSchema.pre('find', function () {
  this.where({ isDeleted: { $ne: true } });
});

astrologerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

astrologerSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

astrologerSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      displayName: this.displayName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

astrologerSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

astrologerSchema.plugin(mongoosePaginate);

const Astrologer = mongoose.model("Astrologer", astrologerSchema);

export default Astrologer;
