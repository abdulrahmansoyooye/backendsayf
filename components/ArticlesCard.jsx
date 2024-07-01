import Image from "next/image";
import Link from "next/link";

const ArticlesCard = ({ categoryId, _id, title, content, _createdAt }) => {
  console.log(categoryId);
  const data = `${content.slice(
    0,
    220
  )} <a className="text-primary-color">...</a>`;
  return (
    <div className=" border-alt-color border-2 rounded-md w-[45%] max-lg:w-full transition-all duration-300">
      <div className="">
        <Link href={`/articles/${_id}`} className="font-[400] cursor-pointer">
          <div className="w-full">
            <img
              src={"/assets/article3.jpg"}
              className="w-full h-[250px] object-cover rounded-md "
              alt="article-img"
            />
          </div>
          <div className="flex flex-col gap-[2rem] p-[1rem] ">
            <div
              className="text-[1.4rem] font-[600] text-primary-color serif"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <div dangerouslySetInnerHTML={{ __html: data }} className="" />
            <div className="flex gap-1 justify-end  hover:text-primary-color ">
              {" "}
              <p className="hover:scale-[1.2] transition-all duration-500 border border-primary-color border-1 p-[1rem] rounded-md max-lg:w-full text-center">
                Continue Reading
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ArticlesCard;
