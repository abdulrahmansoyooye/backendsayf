"use client";

import "react-quill/dist/quill.snow.css";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { EditNewsletter, getEachNewsletter } from "@/utils/actions/newsletterActions";
import DatePicker from "@/components/DatePicker";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const [publishDate, setPublishdate] = useState("");

  const { newsletterId } = useParams();
  const router = useRouter();
  const 
  EditNewsletterWithId = EditNewsletter.bind(null, newsletterId);
  useEffect(() => {
    async function fetchpodcasts() {
      try {
        const res = await getEachNewsletter(newsletterId);
        setTitle(res.title);
        setLink(res.link);
        setPublishdate(res.publishDate)
      } catch (error) {
        setMessage("Something went wrong. Try Again");
      }
    }
    fetchpodcasts();
  }, []);
  const handleSubmit = async () => {
    setTitle("");
    setLink("");
    setPublishdate("")

    try {
      const res = await 
      EditNewsletterWithId(title, link);
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
            <label className="font-[500]">Link </label>
            <input
              value={link}
              name="link"
              type="text"
              onChange={(e) => setLink(e.target.value)}
              className="input"
            />
          </div>
          <div className="w-full"><DatePicker publishDate={publishDate} setPublishdate={setPublishdate}/></div>
          

          <button type="submit" className="black_btn">
            Edit Newsletter
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
