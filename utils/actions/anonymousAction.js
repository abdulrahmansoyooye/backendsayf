"use server";

import { Anonymous } from "@/models/anonymous";
import { connectToDb } from "../database";

export const getAnonymousMessage = async () => {
  await connectToDb();
  try {
    const foundArticle = await Anonymous.find({});

    return JSON.parse(JSON.stringify(foundArticle.reverse()));
  } catch (error) {
    console.log(error);
  }
};
