"use client";

import { createNewsletter } from "@/utils/actions/newsletterActions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DatePicker from "@/components/DatePicker";
const CreateNewPodcast = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const [publishDate, setPublishdate] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setTitle("");
    setLink("");
    setPublishdate("")
    try {
      const res = await createNewsletter(title, link,publishDate);
      if (res.status === 201) {
        router.push("/newsletter");
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
          Add a newsletter
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
            <label className="font-[500]">Link </label>
            <input
              value={link}
              name="link"
              type="text"
              onChange={(e) => setLink(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="w-full">

            <DatePicker publishDate={publishDate} setPublishdate={setPublishdate}/>
          </div>
          <button type="submit" className="black_btn">
            Add newsletter
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewPodcast;
