"use client";

import FileUpload from "@/components/FileUpload";
import { GenerateSlug } from "@/constants";
import { createArticle, getCategory } from "@/utils/actions/articleActions";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
  "video",
];

const CreateNewArticle = () => {
  const [article, setArticle] = useState({
    title: "",
    image: "",
    slug: "",
    tag: "",
    content: "",
    category: "",
  });

  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([ "Productivity",
    "Self Development",
    "Spirituality & Mental Health",
    "Relationship",
    "Career"]);
  const router = useRouter();

  // Fetch categories dynamically
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategory();
        if (res) {
          setCategories(res);
        } else {
          setMessage("Failed to load categories");
        }
      } catch (error) {
        setMessage("Error fetching categories");
      }
    };
    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setArticle((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Generate slug from title
  const handleSlugGeneration = () => {
    setArticle((prev) => ({ ...prev, slug: GenerateSlug(article.title) }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await createArticle(
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
        setMessage(res.message || "Failed to create article");
      }
    } catch (error) {
      console.error("Error creating article:", error);
      setMessage("An error occurred while creating the article.");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Card className="p-6">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl text-center mb-4 font-bold">Create Article</h2>
          {message && <p className="text-center text-red-500">{message}</p>}

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
                  {categories.length > 0 ? (
                    categories.map((category, index) => (
                      <SelectItem key={index} value={category}>
                        {category}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="" disabled>
                      No Categories Available
                    </SelectItem>
                  )}
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
                <Button type="button" onClick={handleSlugGeneration} variant="outline">
                  Generate Slug
                </Button>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Image</Label>
              {article.image && (
                <img src={article.image} alt="Preview" className="h-40 object-contain  w-full rounded-md mt-2" />
              )}
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
              Create Article
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateNewArticle;
