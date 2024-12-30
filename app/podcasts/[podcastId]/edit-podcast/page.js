"use client";

import "react-quill/dist/quill.snow.css";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EditPodcast, getEachPodcast } from "@/utils/actions/podcastActions";
import FileUpload from "@/components/FileUpload";
import DatePicker from "@/components/DatePicker";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [image, setImage] = useState("");
  const [audio, setAudio] = useState("");
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([
    "Self Development",
    "Productivity",
    "Career",
  ]);
  const [publishDate, setPublishdate] = useState("");

  const [categoryValue, setCategoryValue] = useState("");
  const { podcastId } = useParams();
  const router = useRouter();
  const EditPodcastWithId = EditPodcast.bind(null, podcastId);

  useEffect(() => {
    async function fetchpodcasts() {
      try {
        const res = await getEachPodcast(podcastId);
        setTitle(res.title);
        setDescription(res.description);
        setTag(res.tag);
        setImage(res.imageUrl);
        setAudio(res.audio);
        setCategoryValue(res.category);
        setPublishdate(res.publishDate)

      } catch (error) {
        setError("Something went wrong. Try Again");
      }
    }
    fetchpodcasts();
  }, []);
  const handleSubmit = async () => {
    setTitle("");
    setDescription("");
    setTag("");
    setPublishdate("")
    try {
      const res = await EditPodcastWithId(
        title,
        description,
        image,
        tag,
        audio,
        categoryValue,
        publishDate
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
        {message && <p className="text-center text-red-500">{message}</p>}

        <div className="flex flex-col gap-[2rem]">
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
            <label className="font-[500]">Image </label>
            <img
              src={image}
              alt="alt-image"
              className="h-[50px] object-contain border"
            />
          </div>
          <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
            <label className="font-[500]">Edit Image </label>
            <FileUpload file={image} setFile={setImage} type={"image"}/>
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
          <div>
          <DatePicker publishDate={publishDate} setPublishdate={setPublishdate}/>
        </div>
          <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
            <label className="font-[500]">Edit Audio </label>
            <FileUpload file={audio} setFile={setAudio} type={"audio"} />
          </div>
          <button type="submit" className="black_btn">
            Edit Podcast
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
