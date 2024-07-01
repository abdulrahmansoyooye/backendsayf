import { mongoose, models } from "mongoose";
import { Schema } from "mongoose";

const PodcstSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    tag: { type: String, required: true },
    imageUrl: { type: String, required: true },
    audio: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Podcasts =
  models.Podcasts || mongoose.model("Podcasts", PodcstSchema);
