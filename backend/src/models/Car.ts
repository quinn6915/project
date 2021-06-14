import mongoose, { Document, Schema } from "mongoose";

interface ICar extends Document {
  title: String;
  description: String;
  imageUrl: String;
  user: String;
  date: String;
  comments: any;
}

const carSchema = new mongoose.Schema<ICar>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  date: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

export const Car = mongoose.model<ICar>("Car", carSchema);
