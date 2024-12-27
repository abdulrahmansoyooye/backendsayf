"use client";
import DeleteItem from "@/components/DeleteItem";
import Welcome from "@/components/Welcome";
import {
  DeleteNewsletter,
  getNewsletter,
} from "@/utils/actions/newsletterActions";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {Button} from "@/components/ui/button"

const Newsletter = () => {
  const [newsletter, setNewsletter] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [newsletterId, setNewsletterId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    async function fetchNewsletter() {
      try {
        const res = await getNewsletter();
        setNewsletter(res);
      } catch (error) {
        setError("Something went wrong. Try Againnewsletter");
      }
    }

    fetchNewsletter();
  }, []);
  const handleDelete = (_id) => {
    setNewsletterId(_id);
    setDeleteModal(!deleteModal);
  };
  const DeleteThisnewsletter = async () => {
    await DeleteNewsletter(newsletterId);

    window.location.reload();
  };
  return (
    <div className="flex flex-col">
      <Welcome title="Newsletter" text="Some newsletter for you to read" />
      {error && <p>{error}</p>}
      {deleteModal && (
        <DeleteItem
          DeleteThis={DeleteThisnewsletter}
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
        />
      )}
         <Button className="w-[50%] m-auto ">
        <Link href="/newsletter/create-newsletter">
         Create Newsletter
        </Link>
      </Button>
      <div className="flex flex-col gap-[2rem] sm:w-[80%] m-[2rem_auto] p-[2rem] ">
        <div className="flex gap-[2rem] justify-center flex-wrap  w-full">
          {newsletter && newsletter.length === 0 ? (
            <Link
              href={`/articles/create-article`}
              className="font-[400] cursor-pointer"
            >
              {`No Result`}
            </Link>
          ) : (
            newsletter.map(({ _id, title, link }) => (
              <div
                className=" border-alt-color border-2 rounded-md w-[45%] max-lg:w-full transition-all duration-300 "
                key={_id}
              >
                <div className="">
                  <div className="font-[400] cursor-pointer">
                    <div className="flex flex-col gap-[2rem] p-[1rem]">
                      <div className="flex justify-between flex-wrap gap-[0.5rem]">
                        <div className="text-[1.5rem] font-[500]">{title}</div>
                      </div>

                      <div className="flex w-full flex-wrap gap-[1rem] hover:text-primary-color ">
                        {" "}
                        <div className="primary_btn">
                          <Link href={`/newsletter/${_id}/edit-newsletter`}>
                            Edit
                          </Link>
                        </div>
                        <div
                          className="hover:scale-[1.2] transition-all duration-500 border border-red-500 border-1 p-[1rem] rounded-md w-full text-center"
                          onClick={() => handleDelete(_id)}
                        >
                          Delete Newsletter
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

export default Newsletter;
