import React from "react";
import Link from "next/link";
import { FaArrowCircleUp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-center sm:justify-between">
        <span className="hidden sm:block">LOGO</span>
        <p className="text-slate-200">All rights reserved.</p>
        <div>
          <Link href="/">
            <FaArrowCircleUp className="text-white w-10 h-10" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
