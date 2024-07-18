"use client";
import { EditArticle, getEachArticle } from "@/utils/actions/articleActions";
import "react-quill/dist/quill.snow.css";

import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import FileUpload from "@/components/FileUpload";
import dynamic from "next/dynamic";
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
const Edit = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [tag, setTag] = useState("");
  const [categories, setCategories] = useState([
    "Productivity",
    "Self Development",
    "Spirituality & Mental Health",
    "Relationship",
    "Career",
  ]);
  const [categoryValue, setCategoryValue] = useState("");

  const [message, setMessage] = useState("");
  const { articleId } = useParams();
  const router = useRouter();
  const EditArticleWithId = EditArticle.bind(null, articleId);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await getEachArticle(articleId);
        setTitle(res.title);
        setContent(res.content);
        setTag(res.tag);
        setImage(res.imageUrl);
        setCategoryValue(res.category);
      } catch (error) {
        setError("Something went wrong. Try Againarticles");
      }
    }
    fetchArticles();
  }, []);
  const handleSubmit = async () => {
    setTitle("");
    setContent("");
    try {
      const res = await EditArticleWithId(
        title,
        content,
        image,
        tag,
        categoryValue
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
        {" "}
        {message && <p className="text-center text-red-500">{message}</p>}
        <div className="flex flex-col gap-[2rem]">
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
          <div className="flex gap-[1rem] items-start flex-col  pb-[1rem]">
            <label className="font-[500]">Title</label>
            <input
              value={title}
              name="title"
              type="text"
              className="input"
              onChange={(e) => setTitle(e.target.value)}
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
          <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
            <div className="flex gap-[1rem] justify-between flex-col  pb-[1rem]">
              <label className="font-[500]">Image </label>
              <img
                src={image}
                alt="alt-image"
                className="h-[50px] object-contain border"
              />
            </div>
            <label className="font-[500]">Edit Image </label>
            <FileUpload file={image} setFile={setImage} />
          </div>
          <div className="flex gap-[1rem] items-start flex-col  pb-[1rem]">
            <label className="font-[500]">Content</label>
            <div className="w-full">
              <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
              />
            </div>
          </div>

          <button type="submit" className="black_btn">
            Edit Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
