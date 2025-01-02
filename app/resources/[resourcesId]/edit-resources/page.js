"use client";

import "react-quill/dist/quill.snow.css";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EditPodcast, getEachPodcast } from "@/utils/actions/podcastActions";
import FileUpload from "@/components/FileUpload";
import {
  EditResources,
  getEachResources,
} from "@/utils/actions/resourcesActions";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [pdf, setPdf] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const { resourcesId } = useParams();
  const router = useRouter();
  const EditResourcesWithId = EditResources.bind(null, resourcesId);
  useEffect(() => {
    async function fetchpodcasts() {
      try {
        const res = await getEachResources(resourcesId);
        setTitle(res.title);
        setTag(res.tag);
       setPdf(res.pdf)
      } catch (error) {
        setMessage("Something went wrong. Try Again");
      }
    }
    fetchpodcasts();
  }, []);
  const handleSubmit = async () => {
    setTitle("");
    setPdf("");
    setTag("");
    setDescription("");
    try {
      const res = await EditResourcesWithId(title, pdf, tag, description);
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
            <label className="font-[500]">Edit Image </label>
            <FileUpload file={pdf} setFile={setPdf} type={"pdf"}/>
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
            <label className="font-[500]">Description </label>
            <input
              value={description}
              name="tag"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              className="input"
            />
          </div>

          <button type="submit" className="black_btn">
            Edit Resources
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
