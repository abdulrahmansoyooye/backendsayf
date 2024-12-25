const Welcome = ({ title, text }) => {
  return (
    <div className="flex flex-col items-center h-[20vh] justify-center ">
      <div className="flex flex-col gap-1 text-center items-center ">
        <h1 className="text-[3rem] font-[500] text-gradient">
          {title}
        </h1>
      
      </div>
    </div>
  );
};

export default Welcome;
