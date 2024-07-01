import mongoose from "mongoose";
let isconnected = false;
export const connectToDb = async () => {
  if (isconnected) {
    console.log("Mongodb is connected already");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "backend",
    });
    console.log("Mongodb connected");
    isconnected = true;
  } catch (error) {
    console.log(error);
  }
};
