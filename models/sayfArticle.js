import { mongoose, models } from "mongoose";
import { Schema } from "mongoose";

export const ArticleSchema = new Schema(
  {
    title: String,
    content: String,
    category: String,
    imageUrl: String,
    tag: String,
  },
  {
    timestamps: true,
  }
);

export const sayfArticle =
  models.sayfArticle || mongoose.model("sayfArticle", ArticleSchema);
