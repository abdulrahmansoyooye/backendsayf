"use client";

import FileUpload from "@/components/FileUpload";
import { createCourse } from "@/utils/actions/courseActions";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
const CreateNewCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [tag, setTag] = useState("");
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const handleSubmit = async () => {
    setTitle("");
    setLink("");
    setDescription("");
    setTag("");
    try {
      const res = await createCourse(title, description, tag, link, image);
      if (res.status === 201) {
        router.push("/courses");
      } else {
        setMessage(res.message);
      }
    } catch (error) {
      setMessage(error);
    }
  };
  return (
    <div className="p-[2rem] w-[50%] max-lg:w-full m-auto serif">
      <form action={handleSubmit}>
        <div className="text-[1.5rem] text-center mb-[1rem] text-gradient">
          Create Course
        </div>
        {message && <p className="text-center text-red-500">{message}</p>}

        <div className="flex flex-col gap-[2rem]">
          <div className="flex gap-[1rem] justify-between flex-col pb-[1rem]">
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
            <ReactQuill
              value={description}
              onChange={setDescription}
              required
              modules={modules}
              formats={formats}
            />
          </div>
          <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
            <label className="font-[500]">Upload Image </label>
            <FileUpload file={image} setFile={setImage} type={"image"}/>
          </div>

          <div className="flex gap-[1rem] justify-between flex-col pb-[1rem]">
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

          <div className="flex gap-[1rem] justify-between flex-col pb-[1rem]">
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

          <button type="submit" className="black_btn">
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewCourse;
