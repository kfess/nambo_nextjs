import Image from "next/image";

export const About = () => {
  return (
    <>
      <div className="text-center font-medium py-3 bg-nambo-green text-white">
        なんぼの支払いになるん？を簡単に！
      </div>
      <h4 className="text-center p-5 text-2xl">
        <div className="pb-5">nambo. とは</div>
        <Image
          src="/about-nambo.png"
          alt="About Nambo."
          width={1000}
          height={400}
        />
      </h4>
    </>
  );
};
