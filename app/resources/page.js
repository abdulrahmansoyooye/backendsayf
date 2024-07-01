"use client";
import DeleteItem from "@/components/DeleteItem";
import Welcome from "@/components/Welcome";
import {
  DeleteResources,
  getResources,
} from "@/utils/actions/resourcesActions";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [resourcesId, setresourcesId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    async function fetchResources() {
      try {
        const res = await getResources();
        setResources(res);
      } catch (error) {
        setError("Something went wrong. Try AgainResources");
      }
    }

    fetchResources();
  }, []);
  const handleDelete = (_id) => {
    setresourcesId(_id);
    setDeleteModal(!deleteModal);
  };
  const DeleteThisResources = async () => {
    await DeleteResources(resourcesId);
    router.push("/resources");
  };
  return (
    <div className="flex flex-col serif">
      <Welcome title="Resources" text="Some Resources for you to read" />
      {error && <p>{error}</p>}
      <div className="flex flex-col gap-[2rem] sm:w-[80%] m-[2rem_auto] p-[2rem] ">
        {deleteModal && (
          <DeleteItem
            DeleteThis={DeleteThisResources}
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
          />
        )}
        <div className="flex gap-[2rem] justify-center flex-wrap  w-full">
          {resources && resources.length === 0 ? (
            <Link
              href={`/articles/create-article`}
              className="font-[400] cursor-pointer"
            >
              {`No Result`}
            </Link>
          ) : (
            resources.map(({ _id, title, pdf, tag }) => (
              <div
                className=" border-alt-color border-2 rounded-md w-[45%] max-lg:w-full transition-all duration-300 "
                key={_id}
              >
                <div className="">
                  <div className="font-[400] cursor-pointer">
                    <div className="w-full">
                      <img
                        src={"/assets/pdf.png"}
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

                      <div className="flex w-full flex-wrap gap-[1rem] hover:text-primary-color ">
                        {" "}
                        <div className="hover:scale-[1.2] transition-all duration-500 border border-primary-color border-1 p-[1rem] rounded-md w-full text-center">
                          <Link href={`/resources/${_id}/edit-resources`}>
                            Edit
                          </Link>
                        </div>
                        <div
                          className="hover:scale-[1.2] transition-all duration-500 border border-red-500 border-1 p-[1rem] rounded-md w-full text-center"
                          onClick={() => handleDelete(_id)}
                        >
                          Delete Resources
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;
