import { mongoose, models } from "mongoose";
import { Schema } from "mongoose";

const ResourcesSchema = new Schema(
  {
    title: { type: String, required: true },
    pdf: { type: String, required: true },
    tag: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Resources =
  models.Resources || mongoose.model("Resources", ResourcesSchema);
