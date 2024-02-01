import React from "react";
import Link from "next/link";
import { FaArrowCircleUp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-2 sm:p-10 flex items-center justify-evenly sm:justify-between">
        <Link href={"/"}>
          <span className="text-transparent hidden sm:block bg-clip-text bg-gradient-to-r from-secondary-600 to-primary-400">
            PAWAN
          </span>
        </Link>
        <p className="text-slate-200 text-center">
          Copyright &copy; 2024 <br />
          All rights reserved by <Link href="https://instagram.com">Pawan</Link>
        </p>
        <div>
          <Link href="/">
            <FaArrowCircleUp className="text-white w-8 h-8 sm:w-10 sm:h-10" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
