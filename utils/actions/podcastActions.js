"use server";
import { Podcasts } from "@/models/podcasts";
import { connectToDb } from "../database";

export const getPodcasts = async (category) => {
  console.log("fetching Podcasts");
  await connectToDb();
  try {
    if (category == "All") {
      const res = await Podcasts.find({});
      return JSON.parse(JSON.stringify(res.reverse()));
    } else {
      const foundCategory = await Podcasts.find({ category });
      if (!foundCategory) {
        return {
          message: `"${category}" wasn't found`,
          status: 404,
        };
      }
      return JSON.parse(JSON.stringify(foundCategory));
    }
  } catch (error) {
    console.log(error);
  }
};
export const getEachPodcast = async (id) => {
  console.log("fetching this podcast");
  await connectToDb();
  try {
    const podcast = await Podcasts.findById(id);

    const response = JSON.parse(JSON.stringify(podcast));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const EditPodcast = async (
  podcastId,
  title,
  description,
  imageUrl,
  tag,
  audio,
  category
) => {
  console.log("Editing this podcast");
  await connectToDb();
  try {
    await Podcasts.findByIdAndUpdate(podcastId, {
      title,
      description,
      imageUrl,
      tag,
      audio,
      category,
    });

    return { message: "Podcast was Edited", status: 201 };
  } catch (error) {
    console.log(error);
  }
};

export const DeletePodcast = async (id) => {
  console.log("Deleting this podcast");
  await connectToDb();
  try {
    await Podcasts.findByIdAndDelete(id);

    return { message: "Podcast was Edited", status: 201 };
  } catch (error) {
    console.log(error);
  }
};

export const createPodcast = async (
  title,
  description,
  tag,
  categoryValue,
  imageUrl,
  audio
) => {
  await connectToDb();
  if (!categoryValue) {
    return { message: "Add a category to continue" };
  }
  if (!image) {
    return { message: "Add an Image to continue" };
  }
  if (!audio) {
    return { message: "Add an Audio to continue" };
  }
  try {
    await Podcasts.create({
      title,
      description,
      tag,
      category: categoryValue,
      imageUrl,
      audio,
    });
    return { message: "Podcast has been Created", status: 201 };
  } catch (error) {
    console.log(error);
  }
};

export const getPodcastCategories = async () => {
  await connectToDb();
  try {
    const podcasts = await Podcasts.find({});
    const foundCategory = podcasts.map(({ category }) => category);
    const formattedCateogries = [...new Set(foundCategory)];
    const response = JSON.parse(JSON.stringify(formattedCateogries));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getRelatedPodcasts = async (podcastId) => {
  await connectToDb();
  try {
    const foundPodcast = await Podcasts.findById(podcastId);

    const relatedPodcasts = await Podcasts.find({
      category: foundPodcast.category,
    });
    console.log(JSON.stringify(foundPodcast._id));
    const filteredPodcast = relatedPodcasts.filter(
      ({ _id }) => _id == JSON.stringify(foundPodcast._id)
    );
    const response = JSON.parse(JSON.stringify(filteredPodcast));
    return response;
  } catch (error) {
    console.log(error);
  }
};
