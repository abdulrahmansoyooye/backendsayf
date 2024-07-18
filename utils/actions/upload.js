"use server";

import { utapi } from "@/lib/uploadthing";

export const uploadFiles = async (formData) => {
  const files = formData.get("file");
  try {
    const response = await utapi.uploadFiles(files);
    return response;
  } catch (error) {
    console.log(error);
  }
};
