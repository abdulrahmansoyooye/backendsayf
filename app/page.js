import Link from "next/link";

export default function Home() {
  return (
    <main className="flex gap-[2rem] justify-center  items-start h-[100vh] flex-wrap">
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
    </main>
  );
}
