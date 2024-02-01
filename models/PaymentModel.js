const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  recipientName: {
    type: String,
  },
  recipientEmail: {
    type: String,
  },
  deliveryDate: {
    type: Date,
  },
  message: {
    type: String,
  },
  giftCardCode: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
