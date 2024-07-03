"use client";
import FileUpload from "@/components/FileUpload";

import { createPodcast } from "@/utils/actions/podcastActions";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CreateNewPodcast = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [tag, setTag] = useState("");
  const [audio, setAudio] = useState(null);
  const [message, setMessage] = useState("");

  const [categories, setCategories] = useState([
    "Self Development",
    "Productivity",
    "Career",
  ]);
  const [categoryValue, setCategoryValue] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setTitle("");
    setImage("");
    setDescription("");
    setTag("");
    try {
      const res = await createPodcast(
        title,
        description,
        tag,
        categoryValue,
        image,
        audio
      );
      if (res.status === 201) {
        router.push("/podcasts");
      } else {
        setMessage(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-[2rem] w-[50%] max-lg:w-full m-auto serif">
      <form action={handleSubmit}>
        <div className="text-[1.5rem] text-center mb-[1rem] text-gradient">
          Create Podcast
        </div>
        {message && <p className="text-center text-red-500">{message}</p>}
        <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
          <label className="font-[500]">Category </label>
          <div className="flex justify-between w-full flex-col gap-[1rem] border rounded-md p-[1rem]">
            <div className="flex gap-[1rem] flex-wrap ">
              {categories.map((item, index) => (
                <div
                  className={`border p-[1rem] rounded-md hover:bg-alt-color transition-all duration-500 cursor-pointer ${
                    categoryValue == item && " border-primary-color"
                  }`}
                  onClick={() => setCategoryValue(item)}
                  key={`${index}-${item}`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[2rem]">
          <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
            <label className="font-[500]">Title </label>
            <input
              value={title}
              name="title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
            <label className="font-[500]">Description </label>
            <input
              value={description}
              name="description"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              className="input"
              required
            />
          </div>
          {image && (
            <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
              <label className="font-[500]">Image </label>
              <img
                src={image}
                alt="alt-image"
                className="h-[50px] object-contain border"
              />
            </div>
          )}
          <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
            <label className="font-[500]">Upload Image </label>
            <FileUpload file={image} setFile={setImage} />
          </div>
          <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
            <label className="font-[500]">Tag </label>
            <input
              value={tag}
              name="tag"
              type="text"
              onChange={(e) => setTag(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
            <label className="font-[500]">Upload Podcast </label>
            <FileUpload file={audio} setFile={setAudio} audio />
          </div>
          <button type="submit" className="black_btn">
            Create Podcast
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewPodcast;
