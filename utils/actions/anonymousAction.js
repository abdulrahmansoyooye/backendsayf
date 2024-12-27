"use server";

import { Anonymous } from "@/models/anonymous";
import { connectToDb } from "../database";

export const getAnonymousMessage = async () => {
  await connectToDb();
  try {
    const foundMessage = await Anonymous.find({});

    return JSON.parse(JSON.stringify(foundMessage.reverse()));
  } catch (error) {
    console.log(error);
  }
};
