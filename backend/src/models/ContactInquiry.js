const mongoose = require('mongoose');

const contactInquirySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      default: '',
      trim: true
    },
    mobileNumber: {
      type: String,
      default: '',
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    subject: {
      type: String,
      default: '',
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    unread: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ContactInquiry', contactInquirySchema);
