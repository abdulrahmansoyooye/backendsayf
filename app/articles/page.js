"use client";
import ArticlesCard from "@/components/ArticlesCard";
import Welcome from "@/components/Welcome";
import {
  getArticles,
  getCategory,
  getsayfArticle,
} from "@/utils/actions/articleActions";
import Link from "next/link";
import { useEffect, useState } from "react";
import {Button} from "@/components/ui/button"
const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await getsayfArticle("All");
        setArticles(res);
      } catch (error) {
        setError("Something went wrong. Try Againarticles");
      }
    }
    async function fetchCatrogries() {
      try {
        const res = await getCategory();
        setCategories(res);
      } catch (error) {
        setError("Something went wrong. Try Againarticles");
      }
    }
    fetchCatrogries();
    fetchArticles();
  }, []);

  const handleCategoryClick = async (name, _id) => {
    setCurrentCategory(name);

    setArticles([]);
    try {
      const res = await getsayfArticle(name);
      console.log(articles);
      setArticles(res);
    } catch (error) {
      setError("Something went wrong. Try Againarticles");
    }
  };
  return (
    <div className="flex flex-col ">
      <Welcome title="Articles" text="Some articles for you to read" />
      {error && <p>{error}</p>}
      <Button className="w-[50%] m-auto ">
        <Link href="/articles/create-article">
         Create Article
        </Link>
      </Button>
      <div className="flex flex-col gap-[2rem] sm:w-[80%] m-[2rem_auto]   p-[2rem] ">
        <div className="flex gap-[1rem] justify-center flex-wrap ">
          <div
            className={`cursor-pointer  hover:border-primary-color p-[0.5rem] transition-all duration-500   bg-alt-color rounded-md  text-center w-[150px] ${
              currentCategory == "All" && "border border-1 border-primary-color"
            }`}
            onClick={() => handleCategoryClick("All")}
          >
            <h1 className="font-[500]">All</h1>
          </div>
          {categories &&
            categories.map((category) => (
              <div
                className={`cursor-pointer border hover:border-primary-color p-[0.5rem] transition-all duration-500 bg-alt-color border-alt-color border-1 rounded-md  text-center  w-[150px] ${
                  category == currentCategory && "border-primary-color"
                }`}
                onClick={() => handleCategoryClick(category)}
                key={category}
              >
                <div className="font-[500]">{category}</div>
              </div>
            ))}
        </div>
        <div className="flex gap-[2rem] justify-center flex-wrap  w-full">
          {articles && articles.length === 0 ? (
            <Link
              href={`/articles/create-article`}
              className="font-[400] cursor-pointer"
            >
              {`No Result`}
            </Link>
          ) : (
            articles.map(({ _id, title, content, tag, imageUrl }) => (
              <div
                className=" border-alt-color border-2 rounded-md w-[45%] max-lg:w-full transition-all duration-300 "
                key={_id}
              >
                <div className="">
                  <Link
                    href={`/articles/${_id}`}
                    className="font-[400] cursor-pointer"
                  >
                    <div className="w-full">
                      <img
                        src={imageUrl}
                        className="w-full h-[250px] object-cover rounded-md "
                        alt="article-img"
                      />
                    </div>
                    <div className="flex flex-col gap-[2rem] p-[1rem]">
                      <div className="flex justify-between flex-wrap gap-[0.5rem]">
                        <div className="text-[1.5rem] font-[500]">{title}</div>
                        <div className="bg-slate-100 p-[0.5rem] text-slate-700 rounded-md text-[0.75rem]">
                          #{tag}
                        </div>
                      </div>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: content.slice(0, 30),
                        }}
                      />
                      <div className="flex w-full hover:text-primary-color ">
                        {" "}
                        <p className="primary_btn">Read Article</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Articles;

const OtherCategories = ({ articles }) => {
  return articles.map(({ _id, title, content }) => (
    <ArticlesCard _id={_id} title={title} content={content} key={_id} />
  ));
};

const AllCategories = ({ articles, categoryId }) => {
  return articles.map(({ _id, title, content }) => (
    <ArticlesCard
      _id={_id}
      title={title}
      content={content}
      categoryId={categoryId}
      key={_id}
    />
  ));
};
