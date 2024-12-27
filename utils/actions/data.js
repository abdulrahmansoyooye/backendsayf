"use server"

import { Anonymous } from "@/models/anonymous";
import { Courses } from "@/models/courses";
import { sayfArticle } from "@/models/sayfArticle";
import { Newsletter } from "@/models/newsletter";
import { Podcasts } from "@/models/podcasts";
import { Resources } from "@/models/resources";

import { connectToDb } from "../database";
import { Users, BookOpen, Receipt, CreditCard } from "lucide-react"

export const getAllData = async () => {

  await connectToDb();
  try {
    
      const foundArticles = await sayfArticle.find({}).count();
      const foundCourses = await Courses.find({}).count();
      const foundPodcasts = await Podcasts.find({}).count();
      const foundNewsletter = await Newsletter.find({}).count();
      const foundResources = await Resources.find({}).count();
      const foundMessages = await Anonymous.find({});
      const metrics = [
        {
          title: "Total Articles",
          value: foundArticles,
          icon: BookOpen
        },
        {
          title: "Total Podcasts",
          value: foundPodcasts,
          icon: BookOpen
        },
        {
          title: "Total Courses",
          value: foundCourses,
          icon: CreditCard
        },
        {
            title: "Total Newsletters",
            value: foundNewsletter,
            icon: CreditCard
          },
        {
          title: "Total Resources",
          value: foundResources,
          icon: Receipt
        },
      
      ]
      return JSON.parse(JSON.stringify(metrics));
    
  } catch (error) {
    console.log(error);
  }
};


export const getMessages = async () => {
  await connectToDb();
  try {
    const foundMessage = await Anonymous.find({}).limit(4);

    return JSON.parse(JSON.stringify(foundMessage.reverse()));
  } catch (error) {
    console.log(error);
  }
};