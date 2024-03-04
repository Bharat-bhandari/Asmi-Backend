const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    designation: String,
    companyName: String,
    orgType: String,
    address: String,
    state: String,
    pinCode: String,
    gstin: String,
    companyPan: String,
    bankAccountName: String,
    bankAccountNumber: String,
    bankName: String,
    bankBranchState: String,
    ifsc: String,
    panCardImage: String,
    gstImage: String,
    chequeImage: String,
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
