const Loading = () => {
  return (
    <div className="min-h-[85vh]">
      <div className="flex flex-col md:flex-row gap-5 lg:gap-10 animate-pulse">
        <div className="w-full md:w-5/12 aspect-2/1 md:aspect-5/4 bg-bgSoft rounded-xl" />
        <div className="w-full md:w-7/12 flex flex-col justify-between mt-1 md:mt-1.5">
          <div className="mb-4">
            <div className="h-6 w-20 bg-bgSoft rounded mb-1.5 md:mb-2.5" />
            <div className="h-5 w-20 bg-bgSoft rounded mb-2.5 lg:mb-6.5" />
            <div className="h-5 w-full bg-bgSoft rounded mb-2" />
            <div className="h-5 w-full bg-bgSoft rounded" />
          </div>
          <div>
            <div className="hidden md:block h-5 w-15 bg-bgSoft rounded mb-2" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 bg-bgSoft rounded-full" />
                <div className="h-5 w-20 bg-bgSoft rounded" />
              </div>
              <div className="h-5 w-18 lg:w-20 bg-bgSoft rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
