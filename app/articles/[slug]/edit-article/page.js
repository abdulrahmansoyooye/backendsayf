"use client";

import { EditArticle, getEachArticle } from "@/utils/actions/articleActions";
import { useParams, useRouter } from "next/navigation";
import { GenerateSlug } from "@/constants";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import FileUpload from "@/components/FileUpload";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

// Dynamic import for ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
// Quill modules and formats
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

const EditArticlePage = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [article, setArticle] = useState({
    title: "",
    content: "",
    image: "",
    tag: "",
    category: "",
    slug: "",
  });

  const categories = [
    "Productivity",
    "Self Development",
    "Spirituality & Mental Health",
    "Relationship",
    "Career",
  ];

  // Fetch article data
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await getEachArticle(slug);
        setArticle({
          title: res.title,
          content: res.content,
          tag: res.tag,
          slug: res.slug,
          image: res.imageUrl,
          category: res.category,
        });
      } catch (error) {
        setMessage("Failed to load article");
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  // Handle form submission
  const handleEditArticle = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await EditArticle(
        slug,
        article.title,
        article.content,
        article.category,
        article.image,
        article.slug,
        article.tag
      );

      if (res.status === 201) {
        router.push("/articles");
      } else {
        setMessage(res.message || "Failed to edit article");
      }
    } catch (error) {
      setMessage("Something went wrong. Try again.");
      console.error("Error editing article:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setArticle((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Generate slug from title
  const handleSlug = () => {
    setArticle((prev) => ({ ...prev, slug: GenerateSlug(article.title) }));
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Card className="p-6">
        <form onSubmit={handleEditArticle}>
          {message && <p className="text-red-500 text-center mb-4">{message}</p>}
          <div className="space-y-6">
            {/* Category Selection */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={article.category}
                onValueChange={(value) => setArticle((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Title Input */}
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                name="title"
                value={article.title}
                onChange={handleChange}
                placeholder="Enter article title"
                required
              />
            </div>

            {/* Tag Input */}
            <div className="space-y-2">
              <Label>Tag</Label>
              <Input
                name="tag"
                value={article.tag}
                onChange={handleChange}
                placeholder="Enter article tag"
                required
              />
            </div>

            {/* Slug Input */}
            <div className="space-y-2">
              <Label>Slug</Label>
              <div className="flex gap-2">
                <Input
                  name="slug"
                  value={article.slug}
                  onChange={handleChange}
                  placeholder="Enter article slug"
                  required
                />
                <Button type="button" onClick={handleSlug} variant="outline">
                  Generate Slug
                </Button>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Image</Label>
              {article.image && <Image src={article.image} width={100} height={100} alt="article-img" className="h-40 object-contain  w-full rounded-md mt-2"/>}
              <FileUpload file={article.image} setFile={(file) => setArticle((prev) => ({ ...prev, image: file }))} type="image" />
            </div>

            {/* Content Editor */}
            <div className="space-y-2">
              <Label>Content</Label>
              <ReactQuill
                value={article.content}
                onChange={(value) => setArticle((prev) => ({ ...prev, content: value }))}
                modules={modules}
                formats={formats}
                required
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Edit Article
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditArticlePage;
