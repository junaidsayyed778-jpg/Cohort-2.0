import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    enum: ["USD", "EUR", "JPY", "INR"],
    default: "INR",
  },
  price: {
    amount: {
      type: Number,
      required: true,
    },
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      alt: {
        type: String,
        required: true,
      },
    },
  ],
});
