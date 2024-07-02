import { mongoose, models } from "mongoose";
import { Schema } from "mongoose";

const NewsletterSchema = new Schema(
  {
    title: { type: String, required: true },

    link: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Newsletter =
  models.Newsletter || mongoose.model("Newsletter", NewsletterSchema);
