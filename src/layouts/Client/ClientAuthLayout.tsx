

const ClientAuthLayout = ({ children }: any) => {
  return (

    <div className="min-h-screen min-w-screen bg-bg-login bg-cover flex justify-center items-center py-14">
      <div className="bg-[#07070762]  shadow-[#fbceb5] shadow-2xl   sm:w-[38rem] sm:h-[38rem]  sm:rounded-full  w-[25rem] h-[45rem]   rounded-3xl px-5">
        <div className="flex justify-center items-center w-[100%] h-[100%]  ">
          {children}
        </div>

      </div>
    </div>
  );
};

export default ClientAuthLayout;
