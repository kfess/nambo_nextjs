import Image from "next/image";

export const About = () => {
  return (
    <>
      <div>なんぼの支払いになるん？を簡単に！</div>
      <h4>nambo. とは</h4>
      <Image
        src="/about-nambo.png"
        alt="About Nambo."
        width={1000}
        height={400}
      />
    </>
  );
};
