"use server";

import { sayfArticle } from "@/models/sayfArticle";
import { connectToDb } from "../database";

export const getsayfArticle = async (category) => {

  await connectToDb();
  try {
    if (category == "All") {
      const res = await sayfArticle.find({});
      return JSON.parse(JSON.stringify(res.reverse()));
    } else {
      const foundArticle = await sayfArticle.find({ category });

      return JSON.parse(JSON.stringify(foundArticle.reverse()));
    }
  } catch (error) {
    console.log(error);
  }
};
export const getEachArticle = async (slug) => {
  
  await connectToDb();
  try {
    const article = await sayfArticle.findOne({slug});

    const response = JSON.parse(JSON.stringify(article));
    return response;
  } catch (error) {
    console.log(error);
  }
};



export const EditArticle = async (
  slugValue,
  title,
  content,
 category,
 imageUrl,
 slug,
 tag
 
) => {
  await connectToDb();
  try {
    const updatedArticle = await sayfArticle.findOneAndUpdate(
      { slug:slugValue }, 
      {
        title,
        content,
        imageUrl,
        tag,
        slug, 
        category,
      },
      { new: true } // Return the updated document and validate
    );

    if (!updatedArticle) {
      return { message: "Article not found", status: 404 }; // Handle not found case
    }

    return { message: "Article was Edited", status: 201 }; 
  } catch (error) {
    console.error("Error editing article:", error); // Use console.error for errors
    return { message: "Error editing article", status: 500, error: error.message }; // Return error details
  }
};

export const DeleteArticle = async (slug) => {
  await connectToDb();
  try {
    const deletedArticle = await sayfArticle.findOneAndDelete({ slug });

    if (!deletedArticle) {
      return { message: "Article not found", status: 404 };
    }

    return { message: "Article was deleted", status: 200 }; 
  } catch (error) {
    console.error("Error deleting article:", error);
    return { message: "Error deleting article", status: 500, error: error.message };
  }
};

export const createArticle = async (
  title,
  content,
  category,
  imageUrl,
  slug,
  tag
) => {
  await connectToDb();

  if (!category) {
    return { message: "Add a category to continue", status: 400 }; // 400 Bad Request
  }
  if (!imageUrl) {
    return { message: "Add an Image to continue", status: 400 };
  }
  if (!slug) {
    return { message: "Add a slug to continue", status: 400 };
  }

  try {
    const newArticle = await sayfArticle.create({
      title,
      content,
      category,
      imageUrl,
      slug,
      tag,
    });
    return { message: "Article has been Created", status: 201 }; // 201 Created
  } catch (error) {
    console.error("Error creating article:", error);
    return { message: "Error creating article", status: 500, error: error.message };
  }
};
export const getCategory = async () => {
  await connectToDb();
  try {
    const article = await sayfArticle.find({});
    const foundCategory = article.map(({ category }) => category);
    const formattedCateogries = [...new Set(foundCategory)];
    const response = JSON.parse(JSON.stringify(formattedCateogries));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getRelatedsayfArticle = async (podcastId) => {
  await connectToDb();
  try {
    const foundArticle = await sayfArticle.findById(podcastId);

    const relatedsayfArticle = await sayfArticle.find({
      category: foundArticle.category,
    });

    const filteredArticle = relatedsayfArticle.filter(
      ({ _id }) => _id == JSON.stringify(foundPodcast._id)
    );
    const response = JSON.parse(JSON.stringify(filteredArticle));
    return response;
  } catch (error) {
    console.log(error);
  }
};
