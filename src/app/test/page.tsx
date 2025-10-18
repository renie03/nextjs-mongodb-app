import { Image } from "@imagekit/next";

const TestPage = () => {
  return (
    <div className="flex items-center justify-center h-screen gap-5">
      <Image
        src="/forest.avif"
        width={500}
        height={500}
        alt="Picture of the author"
      />
      <div className="relative w-[500px] h-[500px]">
        <Image
          src="/forest.avif"
          alt="Picture of the author"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default TestPage;
