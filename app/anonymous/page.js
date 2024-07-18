"use client";
import { getAnonymousMessage } from "@/utils/actions/anonymousAction";
import React, { useEffect, useState } from "react";

const Anonymous = () => {
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
    <div className="flex flex-wrap  gap-[2rem] items-center  justify-center  p-[2rem] m-[2rem] rounded-md">
      <div className="flex flex-col  gap-[1rem]">
        <div className="flex w-full justify-around max-lg:flex-col gap-[1rem] items-center">
          {" "}
          <div className="text-[1.5rem] w-full text-center">
            Anonymous Messages
          </div>
          {/* <div className="text-[1rem] cursor-pointer sm:w-[20%] w-[50%] text-center border border-red-500 p-[1rem] rounded-lg">
            Clear Message
          </div> */}
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
    </div>
  );
};

export default Anonymous;
