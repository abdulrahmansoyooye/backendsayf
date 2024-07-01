"use server";
import { Courses } from "@/models/courses";
import { connectToDb } from "../database";

export const getCourses = async () => {
  console.log("fetching Courses");
  await connectToDb();
  try {
    const courses = await Courses.find({});

    const response = JSON.parse(JSON.stringify(courses));
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getEachCourse = async (id) => {
  console.log("fetching this course");
  await connectToDb();
  try {
    const course = await Courses.findById(id);

    const response = JSON.parse(JSON.stringify(course));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const EditCourse = async (
  courseId,
  title,
  description,
  tag,
  link,
  image
) => {
  console.log("Editing this course");
  await connectToDb();
  try {
    await Courses.findByIdAndUpdate(courseId, {
      title,
      description,
      tag,
      link,
      image,
    });

    return { message: "Podcast has Edited", status: 201 };
  } catch (error) {
    console.log(error);
  }
};

export const DeleteCourse = async (id) => {
  console.log("Deleting this course");
  await connectToDb();
  try {
    const course = await Courses.findByIdAndDelete(id);

    const response = JSON.parse(JSON.stringify(course));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createCourse = async (title, description, tag, link, imageUrl) => {
  try {
    await connectToDb();
    const course = await Courses.create({
      title,
      description,
      tag,
      link,
      imageUrl,
    });
    const res = await course.save();
    console.log(res);
    return { message: "Podcast has been Created", status: 201 };
  } catch (error) {
    console.log(error);
    return error;
  }
};
