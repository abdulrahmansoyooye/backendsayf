"use server";
import { Newsletter } from "@/models/newsletter";
import { connectToDb } from "../database";

export const getNewsletter = async () => {
  console.log("fetching Newsletter");
  await connectToDb();
  try {
    const newsletter = await Newsletter.find({});

    const response = JSON.parse(JSON.stringify(newsletter));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const EditNewsletter = async (newsletterId, title, link) => {
  console.log("Editing this Newsletter");
  await connectToDb();
  try {
    await Newsletter.findByIdAndUpdate(newsletterId, {
      title,
      link,
    });

    return { message: "Newsletter has Edited", status: 201 };
  } catch (error) {
    console.log(error);
  }
};

export const DeleteNewsletter = async (id) => {
  console.log("Deleting this Newsletter");
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
  console.log("fetching this Resources");
  await connectToDb();
  try {
    const newsletter = await Newsletter.findById(id);

    const response = JSON.parse(JSON.stringify(newsletter));
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const createNewsletter = async (title, link) => {
  try {
    await connectToDb();
    const newsletter = await Newsletter.create({
      title,
      link,
    });
    await newsletter.save();
    return { message: "Podcast has been Created", status: 201 };
  } catch (error) {
    console.log(error);
    return error;
  }
};
