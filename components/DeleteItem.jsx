import { useState } from "react";

const DeleteItem = ({ DeleteThis, setDeleteModal }) => {
  const handleClick = () => {
    setDeleteModal(false);
  };
  const handleSubmit = () => {
    DeleteThis();
  };
  return (
    <div className="border p-[1rem] rounded-md cursor-pointer">
      <div className="flex z-[100] items-center fixed bg-[#f6f6f6f8] top-0 right-0 h-[100vh] w-[100vw] px-[2rem] overflow-hidden">
        <div className="bg-white w-[50%] max-lg:w-full z-[100]  m-auto  p-[2rem] rounded-md flex flex-col  gap-[2rem] items-center">
          <h1 className="font-[500] teaxt-center">
            Are you sure you wanna delete this?
          </h1>
          <div className="flex flex-wrap gap-[1rem]">
            <button className="black_btn w-full" onClick={handleSubmit}>
              Yes! Delete it jare
            </button>

            <button
              className="bg-red-500 rounded-md p-[1rem] text-white w-full"
              onClick={handleClick}
            >
              No! Don't delete oo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteItem;
