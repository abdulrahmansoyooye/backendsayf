"use client";
import { getAnonymousMessage } from "@/utils/actions/anonymousAction";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [content, setcontent] = useState([
    {
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero suscipit aliquam laudantium cupiditate, non tenetur molestias cumque obcaecati recusandae atque odio, officia eveniet ex sed? Quo, nesciunt. A, tempora? Beatae!",
      _id: 1,
    },
    {
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero suscipit aliquam laudantium cupiditate, non tenetur molestias cumque obcaecati recusandae atque odio, officia eveniet ex sed? Quo, nesciunt. A, tempora? Beatae!",
      _id: 2,
    },
  ]);
  useEffect(() => {
    (async function fetchcontent() {
      try {
        const res = await getAnonymousMessage();

        setcontent(res);
      } catch (error) {
        setError("Something went wrong. Try Againcontent");
      }
    })();
  }, []);
  return (
    <main className="flex gap-[2rem] p-[2rem] flex-col">
      <div className="flex flex-wrap  gap-[2rem] items-center  justify-center  p-[2rem] m-[2rem] rounded-md">
        <div className=" p-[1rem] bg-white border rounded-md hover:scale-[1.2] transition-all duration-300">
          <Link
            href={`/articles/create-article`}
            className="font-[400] cursor-pointer"
          >
            <div>Article</div>
          </Link>
        </div>
        <div className=" p-[1rem]   bg-white border  rounded-md hover:scale-[1.2] transition-all duration-300">
          <Link
            href={`/podcasts/create-podcast`}
            className="font-[400] cursor-pointer"
          >
            <div>Podcast</div>
          </Link>
        </div>
        <div className=" p-[1rem]  bg-white border rounded-md hover:scale-[1.2] transition-all duration-300">
          <Link
            href={`/courses/create-course`}
            className="font-[400] cursor-pointer"
          >
            <div>Course</div>
          </Link>{" "}
        </div>
        <div className=" p-[1rem]  bg-white border rounded-md hover:scale-[1.2] transition-all duration-300">
          <Link
            href={`/resources/create-resources`}
            className="font-[400] cursor-pointer"
          >
            <div>Resources</div>
          </Link>{" "}
        </div>
        <div className=" p-[1rem]  bg-white border rounded-md hover:scale-[1.2] transition-all duration-300">
          <Link
            href={`/newsletter/create-newsletter`}
            className="font-[400] cursor-pointer"
          >
            <div>Newsletter</div>
          </Link>{" "}
        </div>
      </div>
      <div className="flex flex-col  gap-[1rem]">
        <div className="text-[1.5rem] w-full text-center">
          Anonymous Messages
        </div>
        <div className="flex gap-[2rem] justify-center flex-wrap w-full ">
          {content && content.length === 0 ? (
            <Link
              href={`/content/create-article`}
              className="font-[400] cursor-pointer"
            >
              {`No Result`}
            </Link>
          ) : (
            content.map(({ _id, content }) => (
              <div
                className="border rounded-lg w-[45%] max-lg:w-full transition-all duration-300 "
                key={_id}
              >
                <div className="">
                  <div
                    className="flex flex-col gap-[2rem] p-[1rem]"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
