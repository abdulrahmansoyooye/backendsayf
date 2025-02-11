"use client";

import { useEffect, useReducer } from "react";
import Link from "next/link";
import Image from "next/image";
import Welcome from "@/components/Welcome";
import ArticlesCard from "@/components/ArticlesCard";
import { getArticles, getCategory, getsayfArticle } from "@/utils/actions/articleActions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

// Define initial state
const initialState = {
  articles: [],
  categories: [],
  currentCategory: "All",
  error: "",
  loading: true,
};

// Reducer function for state management
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ARTICLES":
      return { ...state, articles: action.payload, loading: false, error: "" };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_CATEGORY":
      return { ...state, currentCategory: action.payload, loading: true };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const Articles = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      try {
        const [articlesData, categoriesData] = await Promise.all([
          getsayfArticle("All"),
          getCategory(),
        ]);

        dispatch({ type: "SET_ARTICLES", payload: articlesData });
        dispatch({ type: "SET_CATEGORIES", payload: categoriesData });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Something went wrong. Try again." });
      }
    }
    fetchData();
  }, []);

  const handleCategoryClick = async (name) => {
    dispatch({ type: "SET_CATEGORY", payload: name });
    try {
      const filteredArticles = await getsayfArticle(name);
      dispatch({ type: "SET_ARTICLES", payload: filteredArticles });
    } catch {
      dispatch({ type: "SET_ERROR", payload: "Something went wrong. Try again." });
    }
  };

  return (
    <div className="flex flex-col">
      <Welcome title="Articles" text="Some articles for you to read" />

      {/* Create Article Button */}
      <Button className="w-1/2 mx-auto">
        <Link href="/articles/create-article">Create Article</Link>
      </Button>

      {/* Error Message */}
      {state.error && <p className="text-red-500 text-center">{state.error}</p>}

      {/* Categories Section */}
      <div className="flex flex-col gap-8 sm:w-4/5 mx-auto p-8">
        <div className="flex gap-4 justify-center flex-wrap">
          <CategoryButton
            name="All"
            isActive={state.currentCategory === "All"}
            onClick={handleCategoryClick}
          />
          {state.categories.map((category) => (
            <CategoryButton
              key={category}
              name={category}
              isActive={category === state.currentCategory}
              onClick={handleCategoryClick}
            />
          ))}
        </div>

        {/* Articles Section */}
        <div className="flex flex-wrap gap-6 justify-center w-full">
          {state.loading ? (
            <SkeletonLoader />
          ) : state.articles.length === 0 ? (
            <NoArticles />
          ) : (
            state.articles.map((article) => <ArticleCard key={article._id} article={article} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Articles;
const CategoryButton = ({ name, isActive, onClick }) => (
  <button
    className={`px-4 py-2 rounded-md border transition-all duration-300 ${
      isActive ? "border-primary bg-primary text-white" : "border-gray-300 bg-gray-100"
    }`}
    onClick={() => onClick(name)}
  >
    {name}
  </button>
);
const SkeletonLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
    {[...Array(6)].map((_, index) => (
      <Card key={index} className="p-4">
        <Skeleton className="h-40 w-full rounded-lg mb-4" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </Card>
    ))}
  </div>
);
const NoArticles = () => (
  <div className="text-center text-gray-500">
    <p>No articles found.</p>
    <Link href="/articles/create-article" className="text-primary underline">
      Create an article
    </Link>
  </div>
);
const ArticleCard = ({ article }) => {
  const { _id, title, content, tag, imageUrl,slug } = article;

  return (
    <Card className="w-full md:w-[45%] lg:w-[30%] overflow-hidden border">
      <Link href={`/articles/${slug}`} className="block">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={250}
          className="w-full h-56 object-cover rounded-t-md"
          priority
        />
      </Link>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Badge>{tag}</Badge>
        </div>
        {/* <p className="text-sm text-gray-600">{content.slice(0, 60)}...</p> */}
        <Link href={`/articles/${slug}`} className="text-primary hover:underline">
          Read Article
        </Link>
      </div>
    </Card>
  );
};
