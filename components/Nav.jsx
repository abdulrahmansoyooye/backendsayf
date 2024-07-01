"use client";
import Link from "next/link";

const Nav = () => {
  return (
    <div className="nav p-[1rem_2rem] sm:p-[2rem_6rem_2rem] z-[1000] gap-[0.5rem] flex max-md:flex-col justify-between ">
      <Link href={"/"} className="font-[400] cursor-pointer navitem">
        <h1 className="text-[1.2rem] font-[600] text-secondary-color">
          Backend
        </h1>
      </Link>
      {/* Desktop */}
      <div className="flex justify-end gap-[2rem] text-[0.9rem]">
        <Link href={`/articles`}>Articles</Link>
        <Link href={`/podcasts`}>Podcasts</Link>
        <Link href={`/courses`}>Courses</Link>
        <Link href={`/resources`}>Resources</Link>
      </div>
    </div>
  );
};

export default Nav;
