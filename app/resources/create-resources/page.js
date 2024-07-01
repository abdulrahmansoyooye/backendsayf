"use client";

import FileUpload from "@/components/FileUpload";

import { createResources } from "@/utils/actions/resourcesActions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateNewPodcast = () => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [pdf, setPdf] = useState(null);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    setTitle("");
    setTag("");
    try {
      const res = await createResources(title, pdf, tag);
      if (res.status === 201) {
        router.push("/resources");
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
          Create Resources
        </div>
        {message && <p className="text-center text-red-500">{message}</p>}

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
            <label className="font-[500]">Upload Pdf </label>
            <FileUpload file={pdf} setFile={setPdf} />
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

          <button type="submit" className="black_btn">
            Create Resources
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewPodcast;
