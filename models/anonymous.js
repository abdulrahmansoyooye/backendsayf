import { mongoose, models } from "mongoose";
import { Schema } from "mongoose";

const AnonymousMessageSchema = new Schema(
  {
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Anonymous =
  models.Anonymous || mongoose.model("Anonymous", AnonymousMessageSchema);
