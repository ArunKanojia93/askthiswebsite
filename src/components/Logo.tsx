import Image from "next/image";

export const Logo = () => {
  return <Image src="/logo.png" alt="logo" width={40} height={40} className="rounded-full shadow-[0_0_4px_2px] shadow-blue-700 absolute left-4 top-4 z-10" />;
};
