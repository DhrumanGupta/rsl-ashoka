import React from "react";
import MaxWidthContainer from "./MaxWidthContainer";

function Footer() {
  return (
    <MaxWidthContainer className="pt-8">
      <footer className="w-full">
        <p className="text-center text-gray-300">
          Made by{" "}
          <a className="text-blue-500 underline" href="https://rushilgupta.in" target="_blank">
            Rushil Gupta
          </a>{" "}
          and{" "}
          <a className="text-blue-500 underline" href="https://berlm.me" target="_blank">
            Dhruman Gupta
          </a>
        </p>
        {/* <hr className="my-4 divide-secondary h-[1px]" /> */}
        <p className="text-center text-gray-400 my-4 pt-4 border-t-[1px] border-t-gray-400">
          © 2024-2025 Ashoka Racquet Sports League. All Rights Reserved.
        </p>
      </footer>
    </MaxWidthContainer>
  );
}

export default Footer;
