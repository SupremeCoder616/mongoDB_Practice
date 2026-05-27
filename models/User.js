import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  city: String,
  state: String,
  pincode: Number
});

const userSchema = new mongoose.Schema({
  name: {
    firstName: String,
    lastName: String
  },

  age: {
    type: Number,
    index: true   // 🔥 for index testing
  },

  email: {
    type: String,
    unique: true
  },

  skills: [String], // 🔥 array

  address: addressSchema, // 🔥 nested document

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const User = mongoose.model("User", userSchema);