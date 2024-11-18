"use client";

import DeleteItem from "@/components/DeleteItem";
import { DeletePodcast, getEachPodcast } from "@/utils/actions/podcastActions";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const EachPodcast = () => {
  const { podcastId } = useParams();
  const [error, setError] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchpodcasts() {
      try {
        const res = await getEachPodcast(podcastId);
        setTitle(res.title);
        setDescription(res.description);
        setTag(res.tag);
      } catch (error) {
        setError("Something went wrong. Try Againpodcasts");
      }
    }

    fetchpodcasts();
  }, []);
  const handleDelete = () => {
    setDeleteModal(!deleteModal);
  };
  const DeleteThisPodcast = async () => {
    await DeletePodcast(podcastId);
    router.push("/podcasts");
  };
  return (
    <div className="flex max-lg:flex-col gap-[4rem] mt-[4rem] serif">
      {error && <p>{error}</p>}
      <div className="flex flex-col  gap-[4rem] max-lg:w-full w-[70%] border-r-2 p-[1rem_2rem]">
        {deleteModal && (
          <DeleteItem
            DeleteThis={DeleteThisPodcast}
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
          />
        )}
        <div className="flex flex-col gap-[2rem] ">
          <div className="flex justify-between">
            <div className="text-[1.5rem] font-[600] text-primary-color ">
              {title}
            </div>
            <div className="bg-slate-100 p-[0.5rem] text-slate-700 rounded-md text-[0.75rem]">
              #{tag}
            </div>
          </div>
          <div className="text-slate-700 ">{description}</div>
        </div>
        <div className="flex gap-[1rem] justify-between max-lg:flex-col ">
          <Link
            className="primary_btn"
            href={`/podcasts/${podcastId}/edit-podcast`}
          >
            Edit
          </Link>
          <div
            className="border border-red-600 p-[1rem] cursor-pointer flex gap-[1rem] justify-center items-center rounded-md  w-[150px] h-[60px] max-lg:w-full hover:scale-[1.2] transition-all duration-500"
            onClick={handleDelete}
          >
            <Image
              src={"/assets/delete.png"}
              width={20}
              height={20}
              alt="delete"
              className="object-contain "
            />
            Delete
          </div>
        </div>
      </div>
      {/*  */}
      <div>
        <div className="text-[1.2rem] p-[2rem] font-[500]">
          See Related podcasts
        </div>
      </div>
    </div>
  );
};

export default EachPodcast;
