import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Anton, Poppins, Open_Sans } from "next/font/google";

export const openSans = Open_Sans({
  weight: ["300", "600", "800"],
  style: ["normal"],
  subsets: ["latin-ext", "latin", "vietnamese"],
  display: "swap",
});

interface Props {}

function Navbar(props: Props) {
  const {} = props;

  return (
    <nav className="md:mx-12 mx-4 mt-6 md:mt-8 mb-6 md:mb-8 flex justify-between items-center select-none">
       {/* Use the logo from the main navbar if available or the one from contact */}
      <Image src="/r3actr.png" width={160} height={100} className="w-[80px] md:w-[100px] h-auto object-contain" alt="Logo" />
      <Link href="/">
        <button
          className={`px-5 py-2.5 md:px-7 md:py-3 bg-black text-[#b2de21] text-sm md:text-base ${openSans.className} font-bold rounded-xl md:rounded-2xl hover:scale-105 hover:bg-[#b2de21] hover:text-black transition-all duration-300 whitespace-nowrap border-2 border-black`}
        >
          BACK HOME
        </button>
      </Link>
    </nav>
  );
}

export default Navbar;


