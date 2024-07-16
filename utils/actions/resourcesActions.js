"use server";

import { Resources } from "@/models/resources";
import { connectToDb } from "../database";

export const getResources = async () => {
  console.log("fetching Resources");
  await connectToDb();
  try {
    const res = await Resources.find({});
    return JSON.parse(JSON.stringify(res.reverse()));
  } catch (error) {
    console.log(error);
  }
};
export const getEachResources = async (id) => {
  console.log("fetching this Resources");
  await connectToDb();
  try {
    const resources = await Resources.findById(id);

    const response = JSON.parse(JSON.stringify(resources));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const EditResources = async (
  resourcesId,
  title,
  pdf,
  tag,
  description
) => {
  console.log("Editing this Resources");
  await connectToDb();
  try {
    await Resources.findByIdAndUpdate(resourcesId, {
      title,
      pdf,
      tag,
      description,
    });

    return { message: "Resources was Edited", status: 201 };
  } catch (error) {
    console.log(error);
  }
};

export const DeleteResources = async (id) => {
  console.log("Deleting this Resources");
  await connectToDb();
  try {
    await Resources.findByIdAndDelete(id);

    return { message: "Resources was Edited", status: 201 };
  } catch (error) {
    console.log(error);
  }
};

export const createResources = async (title, pdf, tag, description) => {
  await connectToDb();

  try {
    await Resources.create({
      title,
      pdf,
      tag,
      description,
    });
    return { message: "Resources has been Created", status: 201 };
  } catch (error) {
    console.log(error);
  }
};
