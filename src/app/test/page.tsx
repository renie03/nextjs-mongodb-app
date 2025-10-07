import Image from "next/image";
import NoAvatar from "@/assets/noavatar.png";

const TestPage = () => {
  return (
    <div className="">
      <div className="flex flex-col items-center my-5 gap-5">
        <Image src="/noavatar.png" alt="" width={800} height={800} />
        <Image src={NoAvatar} alt="" width={800} height={800} />
      </div>
    </div>
  );
};

export default TestPage;
