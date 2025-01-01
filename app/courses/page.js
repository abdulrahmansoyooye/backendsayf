"use client";

import Welcome from "@/components/Welcome";
import { getCourses } from "@/utils/actions/courseActions";
import Link from "next/link";
import { useEffect, useState } from "react";
import {Button} from "@/components/ui/button"

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchcourses() {
      try {
        const res = await getCourses();
        setCourses(res);
      } catch (error) {
        setError("Something went wrong. Try Againcourses");
      }
    }
    fetchcourses();
  }, []);
  return (
    <div className="flex flex-col">
      <Welcome title="Courses" text="Some courses for you to read" />
      {error && <p>{error}</p>}
      <Button className="w-[50%] m-auto ">
        <Link href="/courses/create-course">
         Create Course
        </Link>
      </Button>
      <div className="flex flex-col gap-[2rem] sm:w-[80%] m-[2rem_auto] p-[2rem] ">
        <div className="flex gap-[2rem] justify-center flex-wrap  w-full">
          {courses && courses.length === 0 ? (
            <Link
              href={`/articles/create-article`}
              className="font-[400] cursor-pointer"
            >
              {`No Result`}
            </Link>
          ) : (
            courses.map(
              ({ _id, title, description, tag, link, audio, imageUrl }) => (
                <div className=" border-alt-color border-2 rounded-md w-[45%] max-lg:w-full transition-all duration-300">
                  <div className="">
                    <Link
                      href={`/courses/${_id}`}
                      className="font-[400] cursor-pointer"
                    >
                      <div className="w-full">
                        <img
                          src={imageUrl}
                          className="w-full h-[250px] object-cover rounded-md "
                          alt="article-img"
                        />
                      </div>
                      <div className="flex flex-col gap-[2rem] p-[1rem] ">
                        <div className="flex justify-between">
                          <div className="text-[1.5rem] font-[600] text-primary-color ">
                            {title}
                          </div>
                          <div className="bg-slate-100 p-[0.5rem] text-slate-700 rounded-md text-[0.75rem]">
                            #{tag}
                          </div>
                        </div>
                        
                        <div className="flex gap-1 justify-end  hover:text-primary-color ">
                          {" "}
                          <p className="hover:scale-[1.2] transition-all duration-500 border border-primary-color border-1 p-[1rem] rounded-md max-lg:w-full text-center">
                            See Course
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
