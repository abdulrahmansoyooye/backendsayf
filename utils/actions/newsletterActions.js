"use server";
import { Newsletter } from "@/models/newsletter";
import { connectToDb } from "../database";

export const getNewsletter = async () => {
  await connectToDb();
  try {
    const newsletter = await Newsletter.find({});

    const response = JSON.parse(JSON.stringify(newsletter.reverse()));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const EditNewsletter = async (newsletterId, title, link,publishDate) => {

  await connectToDb();
  try {
    await Newsletter.findByIdAndUpdate(newsletterId, {
      title,
      link,
      publishDate
    });

    return { message: "Newsletter has Edited", status: 201 };
  } catch (error) {
    console.log(error);
  }
};

export const DeleteNewsletter = async (id) => {

  await connectToDb();
  try {
    const newsletter = await Newsletter.findByIdAndDelete(id);

    const response = JSON.parse(JSON.stringify(newsletter));
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getEachNewsletter = async (id) => {

  await connectToDb();
  try {
    const newsletter = await Newsletter.findById(id);

    const response = JSON.parse(JSON.stringify(newsletter));
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const createNewsletter = async (title, link,publishDate) => {
  try {
    await connectToDb();
    const newsletter = await Newsletter.create({
      title,
      link,
      publishDate
    });
    await newsletter.save();
    return { message: "Podcast has been Created", status: 201 };
  } catch (error) {
    console.log(error);
    return error;
  }
};
