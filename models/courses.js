import { mongoose, models } from "mongoose";
import { Schema } from "mongoose";

const CoursesSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    tag: { type: String, required: true },
    link: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Courses =
  models.Courses || mongoose.model("Courses", CoursesSchema);
