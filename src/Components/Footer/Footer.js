import React from "react";

function Footer() {
  return (
    <div className="w-full h-[20rem] bg-[#2c3440] flex flex-col">
      <div className="w-full  flex flex-col sm:flex-row justify-center sm:justify-between px-2 ">
        <div className="w-full h-full gap-1 sm:gap-5 sm:ml-12 mt-4 text-[14px] sm:text-xl  flex flex-row justify-start  items-center ">
          <a href="/" className="t font-bold text-[#96a6b7]  hover:text-[#fff]">
            Anasayfa
          </a>
        </div>
        <div className="w-full sm:w-2/5  sm:mr-12 sm:mt-8 flex flex-col justify-start sm:justify-end items-center gap-5  ">
          <p className="t font-bold text-[#96a6b7] text-[14px] sm:text-xl  ">
            İletişim
          </p>
          <p className="t font- text-[#96a6b7] text-[14px] sm:text-xl  ">
            email:&nbsp;{" "}
            <a
              href="mailto:eray_6960@hotmail.com"
              className=" font- text-[#96a6b7]  hover:text-[#fff]"
            >
              eray_6960@hotmail.com
            </a>
          </p>
          <p className="t font- flex flex-row flex-wrap text-[#96a6b7] text-[14px] sm:text-xl ">
            github:&nbsp;{" "}
            <div className="flex flex-col ">
              <a
                className="hover:text-[#fff]"
                href="https://github.com/Stringodd/readit-2nd"
              >
                Stringodd/readit-2nd
              </a>
              <a
                className="hover:text-[#fff]"
                href="https://github.com/headless-astro/readit-api"
              >
                headless-astro/readit-api
              </a>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
