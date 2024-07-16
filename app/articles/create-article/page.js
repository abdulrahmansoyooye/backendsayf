"use client";

import FileUpload from "@/components/FileUpload";
import { createArticle, getCategory } from "@/utils/actions/articleActions";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    ["bold", "italic", "underline", "strike"],
    ["link", "image", "video"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
];
const CreateNewArticle = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [tag, setTag] = useState("");

  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const [categories, setCategories] = useState([
    "Productivity",
    "Self Development",
    "Spirituality & Mental Health",
    "Relationship",
    "Career",
  ]);
  const [categoryValue, setCategoryValue] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setTitle("");
    setContent("");

    try {
      const res = await createArticle(
        title,
        content,
        categoryValue,
        image,
        tag
      );
      if (res.status === 201) {
        router.push("/articles");
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
          Create Article
        </div>
        {message && <p className="text-center text-red-500">{message}</p>}
        <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
          <label className="font-[500]">Category </label>
          <div className="flex justify-between w-full flex-col gap-[1rem] border rounded-md p-[1rem]">
            <div className="flex gap-[1rem] flex-wrap ">
              {categories.length > 0
                ? categories.map((item, index) => (
                    <div
                      className={`border p-[1rem] rounded-md hover:bg-alt-color transition-all duration-500 cursor-pointer ${
                        categoryValue == item && " border-primary-color"
                      }`}
                      onClick={() => setCategoryValue(item)}
                      key={`${index}-${item}`}
                    >
                      {item}
                    </div>
                  ))
                : "No Catgories Available"}
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
            <label className="font-[500]">Content </label>
            <ReactQuill
              value={content}
              onChange={setContent}
              required
              modules={modules}
              formats={formats}
            />
          </div>

          <button type="submit" className="black_btn">
            Create Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewArticle;
