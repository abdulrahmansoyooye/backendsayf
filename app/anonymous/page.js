"use client";
import { getAnonymousMessage } from "@/utils/actions/anonymousAction";
import moment from "moment";
import React, { useEffect, useState } from "react";

const Anonymous = () => {
  const format = (type, createdAt) => {
    if (type == "date") {
      return moment(createdAt).format("MMMM d");
    } else {
      return moment(createdAt).format("dddd");
    }
  };
  const [content, setcontent] = useState([
    {
      content: "Lorem ipsum, dolor sit amet consectetur.",
      _id: 1,
    },
    {
      content: "Lorem ipsum, dolor sit amet consectetur.",
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
            content.map(({ _id, content, createdAt }) => (
              <div
                className="flex flex-col gap-[1rem] border rounded-lg w-[45%] max-lg:w-full p-[1rem] transition-all duration-300 "
                key={_id}
              >
                <div
                  className="flex flex-col gap-[2rem] "
                  dangerouslySetInnerHTML={{ __html: content }}
                />
                <div className="flex-between text-[11px] text-slate-500">
                  <div>{format("time", createdAt)}</div>
                  <div>{format("date", createdAt)}</div>
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
