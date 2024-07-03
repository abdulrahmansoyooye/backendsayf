"use client";

import "react-quill/dist/quill.snow.css";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EditCourse, getEachCourse } from "@/utils/actions/courseActions";
import FileUpload from "@/components/FileUpload";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [image, setImage] = useState("");

  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const { courseId } = useParams();
  const router = useRouter();

  const EditCourseWithId = EditCourse.bind(null, courseId);
  useEffect(() => {
    async function fetchcourses() {
      try {
        const res = await getEachCourse(courseId);
        setTitle(res.title);
        setDescription(res.description);
        setTag(res.tag);
        setLink(res.link);
        setImage(res.imageUrl);
      } catch (error) {
        setMessage("Something went wrong. Try Again");
      }
    }
    fetchcourses();
  }, []);
  const handleSubmit = async () => {
    setTitle("");
    setDescription("");
    setTag("");
    setLink("");
    try {
      const res = await EditCourseWithId(title, description, tag, link, image);
      if (res.status === 201) {
        router.push("/courses");
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
            />
          </div>
          <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
            <label className="font-[500]">Image </label>
            <img
              src={image}
              alt="alt-image"
              className="h-[50px] object-contain border"
            />
          </div>
          <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
            <label className="font-[500]">Edit Image </label>
            <FileUpload file={image} setFile={setImage} />
          </div>
          <div className="flex gap-[1rem] justify-between flex-col pb-[1rem]">
            <label className="font-[500]">Link </label>
            <input
              value={link}
              name="link"
              type="text"
              onChange={(e) => setLink(e.target.value)}
              className="input"
            />
          </div>
          <button type="submit" className="black_btn">
            Edit course
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
