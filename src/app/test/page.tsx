import Image from "next/image";

const TestPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        src="/forest.avif"
        width={500}
        height={500}
        alt="forest"
        className="h-[500px] w-[500px]"
      />
    </div>
  );
};

export default TestPage;
