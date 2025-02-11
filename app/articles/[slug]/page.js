"use client";

import DeleteItem from "@/components/DeleteItem";
import { DeleteArticle, getEachArticle } from "@/utils/actions/articleActions";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EachArticle = () => {
  const { slug } = useParams();
  const router = useRouter();

  const [article, setArticle] = useState({
    title: "",
    content: "",
    error: "",
    isLoading: true,
  });

  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await getEachArticle(slug);
        setArticle({ title: res.title, content: res.content, error: "", isLoading: false });
      } catch (error) {
        setArticle({ ...article, error: "Something went wrong. Try Again", isLoading: false });
      }
    };
    fetchArticle();
  }, [slug]);

  const handleDelete = () => setDeleteModal(!deleteModal);

  const deleteArticle = async () => {
    await DeleteArticle(slug);
    router.push("/articles");
  };

  if (article.isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-8 px-4 rubik">
      {article.error && <p className="text-red-500 text-center">{article.error}</p>}
      
      <div className="flex flex-col gap-6 lg:w-2/3 border-r-2 p-4">
        {deleteModal && <DeleteItem DeleteThis={deleteArticle} setDeleteModal={setDeleteModal} />}
        
        <div>
          <h1 className="text-2xl font-semibold text-primary-color serif">{article.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: article.content }} className="text-gray-700 mt-4" />
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Link href={`/articles/${slug}/edit-article`} className="primary_btn">
            Edit
          </Link>
          <button 
            onClick={handleDelete} 
            className="border border-red-600 p-3 rounded-md flex items-center gap-2 text-red-600 hover:scale-105 transition-all"
          >
            <Image src="/assets/delete.png" width={20} height={20} alt="delete" />
            Delete Article
          </button>
        </div>
      </div>
      
      <div className="w-full lg:w-1/3">
        <h2 className="text-lg font-medium p-4">See Related Articles</h2>
      </div>
    </div>
  );
};

export default EachArticle;
